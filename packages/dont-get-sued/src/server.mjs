#!/usr/bin/env node
// Don't Get Sued: local, read-only evidence organizer. NOT legal advice.
// Works over stdio; no network, repository reads, production probes or code execution.
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import readline from 'node:readline';
const rules=JSON.parse(readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../rules.json'),'utf8'));
const order={P0:0,P1:1,P2:2,P3:3};
const known=new Map(rules.controls.map(r=>[r.id,r]));
const warning='NOT LEGAL ADVICE. Review the actual app with a qualified lawyer or legal professional. This tool neither certifies compliance nor prevents litigation.';
function array(v,name) {
  if(v===undefined||v===null) return [];
  if(!Array.isArray(v)||v.some(x=>typeof x!=='string'||x.length>80)) throw Error(name+' must be an array of short strings');
  return [...new Set(v.map(s=>s.trim()).filter(Boolean))];
}
export function profileOf(p={}) {
  if(!p||typeof p!=='object'||Array.isArray(p)) throw Error('profile must be an object');
  const f=p.features??{};
  if(!f||typeof f!=='object'||Array.isArray(f)) throw Error('features must be an object');
  for(const [key,value] of Object.entries(f)) if(!/^[a-z0-9_]{1,60}$/.test(key)||typeof value!=='boolean') throw Error('feature keys must be snake_case and values boolean');
  return {app_name:typeof p.app_name==='string'?p.app_name.slice(0,120):'Unspecified app',platforms:array(p.platforms,'platforms').map(s=>s.toLowerCase()),regions:array(p.regions,'regions').map(s=>s.toUpperCase()),features:{...f}};
}
function relevance(r,p){
  const c=r.conditions??{}, reasons=[];
  if(c.platforms?.length){
    if(p.platforms.length&&!c.platforms.some(v=>p.platforms.includes(v))) return {scope:'not_targeted',note:'Profile excludes this platform; confirm the app inventory.'};
    if(!p.platforms.length) reasons.push('Platform not established');
  }
  if(c.features_any?.length){
    if(c.features_any.some(v=>p.features[v]===true)){}
    else if(c.features_any.every(v=>p.features[v]===false)) return {scope:'not_targeted',note:'Profile excludes these features; validate that declaration.'};
    else reasons.push('Feature status unknown: '+c.features_any.filter(v=>p.features[v]===undefined).join(', '));
  }
  if(c.regions_any?.length){
    if(!p.regions.length) reasons.push('Markets not specified');
    else if(!c.regions_any.some(v=>p.regions.includes(v))) reasons.push('Market not listed; counsel must assess extraterritorial rules');
  }
  return {scope:reasons.length?'needs_context':'review',note:reasons.join('; ')||'Assess actual facts and legal applicability.'};
}
export function getCatalog({category}={}){
  const controls=category?rules.controls.filter(c=>c.category.toLowerCase()===String(category).toLowerCase()):rules.controls;
  return {version:rules.version,lastSourceReview:rules.last_source_review,controlCount:controls.length,controls,disclaimer:warning};
}
export function buildReviewPlan({profile={}}={}){
  const p=profileOf(profile);
  const all=rules.controls.map(r=>({...r,...relevance(r,p)})).sort((a,b)=>order[a.priority]-order[b.priority]||a.id.localeCompare(b.id));
  const applicable=all.filter(r=>r.scope!=='not_targeted');
  return {profile:p,catalogVersion:rules.version,counts:{proposedChecks:applicable.length,contextualChecks:applicable.filter(r=>r.scope==='needs_context').length,notTargeted:all.length-applicable.length},controls:applicable,notTargeted:all.filter(r=>r.scope==='not_targeted').map(r=>({id:r.id,title:r.title,why:r.note})),legalAdvice:false,instructions:['Unknown feature is not presumed absent','A verified technical state does not prove legal compliance','Obtain lawyer review of applicable laws and documents'],disclaimer:warning};
}
export function triageEvidence({profile={},assessments=[]}={}){
  if(!Array.isArray(assessments)||assessments.length>rules.controls.length) throw Error('assessments exceeds catalog or is not an array');
  const plan=buildReviewPlan({profile});
  const scoped=new Set(plan.controls.map(c=>c.id));
  const found=new Map();
  for(const a of assessments){
    if(!a||!known.has(a.id)) throw Error('Unknown control id');
    if(!scoped.has(a.id)) throw Error(a.id+' was not targeted by profile');
    if(found.has(a.id)) throw Error('Duplicate assessment: '+a.id);
    if(!['verified','issue','unverified','not_applicable'].includes(a.status)) throw Error('Invalid assessment status');
    if(a.status!=='unverified' && (typeof a.evidence!=='string'||a.evidence.trim().length<15)) throw Error('Assessment '+a.id+' requires evidence or rationale of at least 15 characters');
    found.set(a.id,{id:a.id,status:a.status,evidence:typeof a.evidence==='string'?a.evidence.trim().slice(0,2000):'',verification:typeof a.verification==='string'?a.verification.slice(0,1000):'',owner:typeof a.owner==='string'?a.owner.slice(0,100):''});
  }
  const checks=plan.controls.map(r=>({id:r.id,title:r.title,category:r.category,priority:r.priority,basis:r.basis,scope:r.scope,source:r.source,requiredEvidence:r.evidence,...(found.get(r.id)||{status:'unverified',evidence:'',verification:'',owner:''})}));
  const issues=checks.filter(r=>r.status==='issue'),unknowns=checks.filter(r=>r.status==='unverified'),verified=checks.filter(r=>r.status==='verified'),notApplicable=checks.filter(r=>r.status==='not_applicable');
  return {profile:plan.profile,reviewResult:'TECHNICAL_EVIDENCE_ONLY',legalComplianceDetermined:false,shipDecision:'NOT_ISSUED_COUNSEL_REVIEW_REQUIRED',counts:{issues:issues.length,unverified:unknowns.length,technicallyVerified:verified.length,reasonedNotApplicable:notApplicable.length,p0Issues:issues.filter(r=>r.priority==='P0').length,total:checks.length},issues,unknowns,verified,notApplicable,topThree:(issues.length?issues:unknowns).slice(0,3),handoffTopics:[...issues.filter(r=>r.basis!=='best_practice'),...unknowns.filter(r=>r.priority==='P0'||r.basis==='conditional_jurisdiction')].slice(0,30).map(r=>({id:r.id,title:r.title,source:r.source,context:r.evidence||r.requiredEvidence})),disclaimer:warning};
}
const indicators=[
  ['public_env_sensitive_name',/\b(?:VITE|NEXT_PUBLIC|EXPO_PUBLIC|REACT_APP)_[A-Z0-9_]*(?:SECRET|PRIVATE_KEY|SERVICE_ROLE|TOKEN)\b/i,'Public variable resembles a secret. Verify the bundle and rotate leaked keys.'],
  ['possible_literal_key',/\b(?:sk_live_[A-Za-z0-9]{10,}|sk-proj-[A-Za-z0-9_-]{12,})\b/,'Potential literal key. Do not include key value in report.'],
  ['service_role_key_reference',/\bSUPABASE_SERVICE_ROLE_KEY\b/,'Check that service-role key is server-only.'],
  ['tracking_sdk_reference',/\b(?:gtag|fbq)\s*\(|google-analytics\.com|connect\.facebook\.net\/.*fbevents/i,'Verify consent or opt-out behavior with network test.'],
  ['session_replay_reference',/\b(?:Hotjar|LogRocket|FullStory|Microsoft\.Clarity)\b/i,'Review session recording masking and consent.'],
  ['external_font_reference',/fonts\.(?:googleapis|gstatic)\.com/i,'Remote font request; assess transfer or self-hosting.'],
  ['raw_html_sink',/\bdangerouslySetInnerHTML\b|\binnerHTML\s*=/,'Check sanitization of untrusted HTML.'],
  ['client_token_storage',/(?:localStorage|sessionStorage)\.setItem\s*\(\s*['"][^'"]*(?:token|secret|password)/i,'Review sensitive browser storage.']
];
export function scanSourceSignals({files=[]}={}){
  if(!Array.isArray(files)||files.length>50) throw Error('files must be an array of up to 50 snippets');
  let total=0;const findings=[];
  for(const f of files){
    if(!f||typeof f.path!=='string'||typeof f.content!=='string') throw Error('Each supplied snippet needs path and content strings');
    if(f.path.length>250||f.content.length>200000) throw Error('Snippet exceeds length limit');
    total+=f.content.length;if(total>600000) throw Error('Total snippets exceed limit');
    const lines=f.content.split(/\r?\n/);
    for(let i=0;i<lines.length&&findings.length<100;i++) for(const [id,re,note] of indicators){
      if(re.test(lines[i])) findings.push({file:f.path,line:i+1,indicator:id,reviewPrompt:note});
      if(findings.length>=100)break;
    }
    if(findings.length>=100)break;
  }
  return {findings,inspectedSnippets:files.length,status:'UNVERIFIED_PATTERN_SIGNALS_ONLY',noRawLinesOrSecretValuesReturned:true,noFindingsDoesNotProveSafety:true,note:'No source files read, code executed, live endpoint tested or network requests made.',disclaimer:warning};
}
export function prepareCounselHandoff({profile={},assessments=[],notes=''}={}){
  if(typeof notes!=='string'||notes.length>4000) throw Error('notes must be a short string');
  const r=triageEvidence({profile,assessments});
  return {title:'Legal review handoff: '+r.profile.app_name,disclaimer:warning,profile:r.profile,verifiedTechnicalEvidence:r.verified,observedGaps:r.issues,unverified:r.unknowns,counselQuestions:['Which laws and store policies apply to this app?','What agreements, notices, choices and user rights are required?','What is required for under-13 users, subscriptions, UGC, AI and regulated data?','What external counsel approvals and release gates are outstanding?'],additionalNotes:notes,releaseApproval:'NOT PROVIDED'};
}
const profileSchema={type:'object',properties:{app_name:{type:'string'},platforms:{type:'array',items:{type:'string'}},regions:{type:'array',items:{type:'string'}},features:{type:'object',additionalProperties:{type:'boolean'}}}};
const assessmentSchema={type:'array',items:{type:'object',required:['id','status'],properties:{id:{type:'string',enum:[...known.keys()]},status:{type:'string',enum:['verified','issue','unverified','not_applicable']},evidence:{type:'string'},verification:{type:'string'},owner:{type:'string'}}}};
const mcpTools=[
{name:'get_legal_risk_catalog',description:'Sourced risk-control catalog. Not legal advice.',inputSchema:{type:'object',properties:{category:{type:'string'}}}},
{name:'build_review_plan',description:'Context-sensitive prelaunch checklist. Unknown is unverified.',inputSchema:{type:'object',properties:{profile:profileSchema}}},
{name:'triage_legal_risk_evidence',description:'Prioritize supplied evidence and unknowns. Never legal approval.',inputSchema:{type:'object',required:['assessments'],properties:{profile:profileSchema,assessments:assessmentSchema}}},
{name:'scan_source_signals',description:'Review provided code snippets only. Pattern leads, not validated vulnerabilities.',inputSchema:{type:'object',required:['files'],properties:{files:{type:'array',items:{type:'object',required:['path','content'],properties:{path:{type:'string'},content:{type:'string'}}}}}}},
{name:'prepare_counsel_handoff',description:'Structured lawyer review questions and facts, not legal approval.',inputSchema:{type:'object',required:['assessments'],properties:{profile:profileSchema,assessments:assessmentSchema,notes:{type:'string'}}}}
];
const call=(name,args)=>({get_legal_risk_catalog:getCatalog,build_review_plan:buildReviewPlan,triage_legal_risk_evidence:triageEvidence,scan_source_signals:scanSourceSignals,prepare_counsel_handoff:prepareCounselHandoff}[name]||(()=>{throw Error('Unknown tool')}))(args);
export function processMessage(req){
 if(!req||req.jsonrpc!=='2.0'||typeof req.method!=='string')return {jsonrpc:'2.0',id:req?.id??null,error:{code:-32600,message:'Invalid request'}};
 if(!Object.hasOwn(req,'id'))return null;
 const base={jsonrpc:'2.0',id:req.id};
 try{
  switch(req.method){
   case 'initialize':return {...base,result:{protocolVersion:req.params?.protocolVersion||'2025-06-18',capabilities:{tools:{listChanged:false}},serverInfo:{name:'dont-get-sued',version:rules.version}}};
   case 'ping':return {...base,result:{}};
   case 'tools/list':return {...base,result:{tools:mcpTools}};
   case 'tools/call':try{const r=call(req.params?.name,req.params?.arguments||{});return {...base,result:{content:[{type:'text',text:JSON.stringify(r,null,2)}],structuredContent:r}};}catch(e){return {...base,result:{content:[{type:'text',text:e.message}],isError:true}};}
   default:return {...base,error:{code:-32601,message:'Unknown method'}};
  }
 }catch(e){return {...base,error:{code:-32603,message:e.message}};}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const rl=readline.createInterface({input:process.stdin,crlfDelay:Infinity});
 rl.on('line',line=>{try{const response=processMessage(JSON.parse(line));if(response)process.stdout.write(JSON.stringify(response)+'\n');}catch{process.stdout.write(JSON.stringify({jsonrpc:'2.0',id:null,error:{code:-32700,message:'Parse error'}})+'\n');}});
}
