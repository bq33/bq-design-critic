import assert from 'node:assert/strict';
import test from 'node:test';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {getCatalog,getPrivacyReview,buildReviewPlan,triageEvidence,scanSourceSignals,prepareCounselHandoff,processMessage} from '../src/server.mjs';

const profile={app_name:'Example',platforms:['web','ios'],regions:['US-CA'],features:{accounts:true,analytics:true,subscriptions:true,database:true,payments:true,marketing_email:false,user_uploads:false,user_content:false}};

test('58 unique sourced controls and disclaimer',()=>{
 const c=getCatalog();
 assert.equal(c.controlCount,58);
 assert.equal(new Set(c.controls.map(x=>x.id)).size,58);
 assert.ok(c.controls.every(x=>x.source?.startsWith('https://')&&x.evidence));
 assert.match(c.disclaimer,/NOT LEGAL ADVICE/);
});
test('market and feature plan includes essential checks and respects declared exclusions',()=>{
 const p=buildReviewPlan({profile});
 assert.ok(p.controls.find(x=>x.id==='PAY-01'));
 assert.ok(p.controls.find(x=>x.id==='STORE-01'));
 assert.ok(p.notTargeted.find(x=>x.id==='MKT-01'));
 assert.ok(p.notTargeted.find(x=>x.id==='UGC-02'));
 assert.equal(p.legalAdvice,false);
});
test('unknown features remain unverified rather than excluded',()=>{
 const p=buildReviewPlan({});
 assert.ok(p.controls.find(x=>x.id==='KID-01'&&x.scope==='needs_context'));
 assert.equal(p.notTargeted.length,0);
});
test('missing evidence never produces legal approval',()=>{
 const r=triageEvidence({profile,assessments:[{id:'PAY-01',status:'issue',evidence:'Recurring price disclosure was missing near the purchase button.'}]});
 assert.equal(r.counts.issues,1);
 assert.ok(r.counts.unverified>15);
 assert.equal(r.legalComplianceDetermined,false);
 assert.equal(r.shipDecision,'NOT_ISSUED_COUNSEL_REVIEW_REQUIRED');
});
test('validated evidence, rationale, duplicated IDs and out-of-scope controls',()=>{
 assert.throws(()=>triageEvidence({assessments:[{id:'SEC-01',status:'verified'}]}),/evidence/);
 assert.throws(()=>triageEvidence({assessments:[{id:'SEC-01',status:'not_applicable',evidence:'tiny'}]}),/evidence/);
 assert.throws(()=>triageEvidence({assessments:[{id:'SEC-01',status:'unverified'},{id:'SEC-01',status:'unverified'}]}),/Duplicate/);
 assert.throws(()=>triageEvidence({profile,assessments:[{id:'MKT-01',status:'unverified'}]}),/not targeted/);
});
test('source signals never reveal supplied key material',()=>{
 const secret='sk_live_ABCDEFGHIJKLMNOP1234';
 const s=scanSourceSignals({files:[{path:'app.ts',content:'const secret="'+secret+'";\nconst font="fonts.googleapis.com";\nfbq("track","View")'}]});
 assert.ok(s.findings.some(x=>x.indicator==='possible_literal_key'));
 assert.ok(s.findings.some(x=>x.indicator==='external_font_reference'));
 assert.ok(s.findings.some(x=>x.indicator==='tracking_sdk_reference'));
 assert.equal(JSON.stringify(s).includes(secret),false);
 assert.equal(s.noFindingsDoesNotProveSafety,true);
});
test('lawyer packet always requires counsel',()=>{
 const r=prepareCounselHandoff({profile,assessments:[{id:'PRV-02',status:'verified',evidence:'Policy live in app menu and public web footer, checked manually.'}]});
 assert.equal(r.releaseApproval,'NOT PROVIDED');
 assert.equal(r.verifiedTechnicalEvidence.length,1);
 assert.ok(r.counselQuestions.length>2);
});
test('privacy modules cover EU GDPR, ePrivacy, UK GDPR/PECR and US state privacy',()=>{
 const modules=[['eu_gdpr','EU GDPR',14],['eu_eprivacy','EU ePrivacy',2],['uk_privacy','UK Privacy',5],['us_state','US State Privacy',3]];
 for(const [framework,category,n] of modules){
  const r=getPrivacyReview({framework,profile:{regions:['US-CA']}});
  assert.equal(r.category,category);
  assert.equal(r.controlCount,n);
  assert.equal(r.applicability,'COUNSEL_REVIEW_REQUIRED');
  assert.ok(r.controls.every(x=>x.source.startsWith('https://')));
  assert.equal(r.noLegalComplianceDetermination,true);
 }
 assert.throws(()=>getPrivacyReview({framework:'not_a_real_law'}),/Unknown privacy framework/);
});
test('EU/EEA, UK and US state country codes are distinct triage signals, not legal verdicts',()=>{
 const de=buildReviewPlan({profile:{regions:['DE']}});
 assert.equal(de.controls.find(x=>x.id==='EU-01').scope,'review');
 assert.equal(de.controls.find(x=>x.id==='UK-01').scope,'needs_context');
 assert.ok(de.profile.marketSignals.includes('EU'));
 const no=buildReviewPlan({profile:{regions:['NO']}});
 assert.equal(no.controls.find(x=>x.id==='EU-01').scope,'review');
 assert.ok(no.profile.marketSignals.includes('EEA'));
 const uk=buildReviewPlan({profile:{regions:['GB']}});
 assert.equal(uk.controls.find(x=>x.id==='UK-01').scope,'review');
 assert.equal(uk.controls.find(x=>x.id==='EU-01').scope,'needs_context');
 const ca=buildReviewPlan({profile:{regions:['US-CA']}});
 assert.equal(ca.controls.find(x=>x.id==='US-01').scope,'review');
 assert.equal(ca.controls.find(x=>x.id==='EU-01').scope,'needs_context');
 assert.ok(ca.privacyFrameworks.some(x=>x.framework==='eu_gdpr'));
});
test('privacy assessments without tested evidence stay unknown and never become compliance certification',()=>{
 const r=triageEvidence({profile:{regions:['DE'],features:{analytics:true}},assessments:[{id:'EPR-01',status:'issue',evidence:'Nonessential ad pixel fired before consent on fresh session.'}]});
 assert.equal(r.legalComplianceDetermined,false);
 assert.equal(r.shipDecision,'NOT_ISSUED_COUNSEL_REVIEW_REQUIRED');
 assert.ok(r.unknowns.some(x=>x.id==='EU-02'));
 assert.ok(r.issues.some(x=>x.id==='EPR-01'));
 const counsel=prepareCounselHandoff({profile:{regions:['DE']},assessments:[]});
 assert.equal(counsel.releaseApproval,'NOT PROVIDED');
 assert.ok(counsel.counselQuestions.some(q=>q.includes('EU GDPR')));
 assert.ok(counsel.privacyFrameworkScreening.length>=4);
});
test('MCP stdio handshake, tool discovery and invocation',async()=>{
 assert.equal(processMessage({jsonrpc:'2.0',method:'notifications/initialized'}),null);
 const src=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../src/server.mjs');
 const child=spawn(process.execPath,[src],{stdio:['pipe','pipe','pipe']});
 const responses=[];let buf='';
 child.stdout.on('data',chunk=>{buf+=chunk.toString();while(buf.includes('\n')){const i=buf.indexOf('\n');responses.push(JSON.parse(buf.slice(0,i)));buf=buf.slice(i+1);}});
 const requests=[
 {jsonrpc:'2.0',id:1,method:'initialize',params:{protocolVersion:'2025-06-18'}},
 {jsonrpc:'2.0',id:2,method:'tools/list'},
 {jsonrpc:'2.0',id:3,method:'tools/call',params:{name:'build_review_plan',arguments:{profile}}}
 ];
 for(const r of requests)child.stdin.write(JSON.stringify(r)+'\n');
 const deadline=Date.now()+3000;
 while(responses.length<3&&Date.now()<deadline)await new Promise(resolve=>setTimeout(resolve,20));
 child.kill();
 assert.equal(responses.length,3);
 assert.equal(responses[0].result.serverInfo.name,'dont-get-sued');
 assert.equal(responses[1].result.tools.length,6);
 assert.ok(responses[2].result.structuredContent.counts.proposedChecks>15);
});
