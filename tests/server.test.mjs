import assert from 'node:assert/strict';
import test from 'node:test';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { checkContrast, scoreReview, prepareCritique } from '../src/server.mjs';

const ids = ['task_clarity', 'visual_hierarchy', 'interaction', 'accessibility', 'typography', 'responsiveness', 'motion', 'brand', 'content_trust'];

test('contrast: black on white passes AAA, same color does not pass AA', () => {
  assert.equal(checkContrast({ foreground: '#000', background: '#fff' }).ratio, 21);
  assert.equal(checkContrast({ foreground: '#000', background: '#fff' }).wcag22.aaaNormalText, true);
  assert.equal(checkContrast({ foreground: '#555555', background: '#555555' }).wcag22.aaNormalText, false);
});

test('reviews remain unscored until all dimensions have evidence', () => {
  const r = scoreReview({ ratings: [{ dimension: 'task_clarity', score: 4, evidence: 'Headline names the primary task and the main CTA.' }], issues: [] });
  assert.equal(r.status, 'incomplete');
  assert.equal(r.overallScore, null);
  assert.equal(r.ratedWeight, 20);
  assert.equal(r.shipGate, 'not_assessed_all_dimensions');
});

test('full score and blockers are computed correctly', () => {
  const r = scoreReview({ ratings: ids.map(dimension => ({ dimension, score: 4, evidence: 'Observed in actual desktop and mobile screenshots.' })), issues: [{ severity: 'P0', location: 'Primary action', observation: 'Save action missing in keyboard order', impact: 'Keyboard users cannot submit form', fix: 'Use a semantic button and fix focus order' }] });
  assert.equal(r.overallScore, 80);
  assert.equal(r.shipGate, 'blocked_by_p0');
});

test('invalid or unsupported ratings are rejected', () => {
  assert.throws(() => scoreReview({ ratings: [{ dimension: 'x', score: 5, evidence: 'some meaningful observation' }], issues: [] }), /Unknown dimension/);
  assert.throws(() => scoreReview({ ratings: [{ dimension: 'motion', score: 5, evidence: 'too short' }], issues: [] }), /Evidence/);
});

test('prepared critique acknowledges evidence limits', () => {
  const r = prepareCritique({ surface: 'mobile dashboard', audience: 'new learners', goal: 'complete a lesson' });
  assert.match(r.instruction, /complete a lesson/);
  assert.ok(r.importantLimits.length > 0);
});

test('stdio MCP handshake, tool listing, and tool invocation', async () => {
  const src = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/server.mjs');
  const child = spawn(process.execPath, [src], { stdio: ['pipe', 'pipe', 'pipe'] });
  const lines = [];
  child.stdout.on('data', chunk => {
    lines.push(...chunk.toString().split('\n').filter(Boolean).map(x => JSON.parse(x)));
  });
  child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18' } }) + '\n');
  child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/list' }) + '\n');
  child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'check_text_contrast', arguments: { foreground: '#000', background: '#fff' } } }) + '\n');
  await new Promise(resolve => { child.stdout.on('data', () => { if (lines.length >= 3) resolve(); }); setTimeout(resolve, 1500); });
  child.kill();
  assert.equal(lines.length, 3);
  assert.equal(lines[0].result.serverInfo.name, 'bq-design-critic');
  assert.equal(lines[1].result.tools.length, 4);
  assert.equal(lines[2].result.structuredContent.ratio, 21);
});
