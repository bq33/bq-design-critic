#!/usr/bin/env node
// BQ Design Critic: an independent, dependency-free MCP stdio server.
// It structures agent-supplied evidence; it does not inspect images itself.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import readline from 'node:readline';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rubric = JSON.parse(readFileSync(path.join(root, 'rubric.json'), 'utf8'));
const ids = rubric.dimensions.map(d => d.id);
const severityRank = { P0: 0, P1: 1, P2: 2, P3: 3 };

export function prepareCritique({ surface = 'page', audience = 'visitors', goal = 'complete the primary task', brand = '' } = {}) {
  return {
    instruction: `Critique the ${surface} for ${audience}. The main user goal is to ${goal}. ${brand ? `Maintain the brand requirements: ${brand}.` : 'Preserve the existing brand.'}`,
    evidenceNeeded: ['Current screen and task context', 'Desktop and mobile screenshots or live app (if accessible)', 'Interaction states and keyboard behavior where actually tested', 'Existing brand style and copy constraints'],
    process: ['Observe before editing', 'Rate only directly observed dimensions with evidence', 'Flag P0 to P3 findings and the smallest plausible fixes', 'Prioritize at most three fixes', 'Retest and explicitly label untested behavior'],
    importantLimits: ['A screenshot alone cannot verify keyboard use, motion preference, runtime performance, or screen reader behavior', 'Do not invent evidence, score missing categories, or claim to have used a browser if none was used']
  };
}

export function scoreReview({ ratings = [], issues = [], context = {} } = {}) {
  if (!Array.isArray(ratings) || !Array.isArray(issues)) throw new Error('ratings and issues must be arrays');
  const scored = new Map();
  for (const rating of ratings) {
    const { dimension, score, evidence } = rating ?? {};
    if (!ids.includes(dimension)) throw new Error(`Unknown dimension: ${dimension}`);
    if (scored.has(dimension)) throw new Error(`Duplicate dimension: ${dimension}`);
    if (typeof score !== 'number' || !Number.isFinite(score) || score < 0 || score > 5) throw new Error(`Score for ${dimension} must be a finite number from 0 to 5`);
    if (typeof evidence !== 'string' || evidence.trim().length < 12) throw new Error(`Evidence for ${dimension} must be specific (at least 12 characters)`);
    scored.set(dimension, { score, evidence: evidence.trim() });
  }
  const sorted = issues.map((x, i) => {
    if (!x || !Object.hasOwn(severityRank, x.severity)) throw new Error(`Issue ${i + 1}: severity must be P0, P1, P2, or P3`);
    if (x.dimension && !ids.includes(x.dimension)) throw new Error(`Issue ${i + 1}: unknown dimension ${x.dimension}`);
    for (const key of ['location', 'observation', 'impact', 'fix']) {
      if (typeof x[key] !== 'string' || !x[key].trim()) throw new Error(`Issue ${i + 1}: ${key} is required`);
    }
    return { severity: x.severity, dimension: x.dimension ?? null, location: x.location.trim(), observation: x.observation.trim(), impact: x.impact.trim(), fix: x.fix.trim(), verification: typeof x.verification === 'string' ? x.verification.trim() : '' };
  }).sort((a, b) => severityRank[a.severity] - severityRank[b.severity]);
  const ratedWeight = rubric.dimensions.filter(x => scored.has(x.id)).reduce((sum, d) => sum + d.weight, 0);
  const weightedSum = rubric.dimensions.filter(x => scored.has(x.id)).reduce((sum, d) => sum + scored.get(d.id).score / 5 * d.weight, 0);
  const full = ratedWeight === 100;
  const p0 = sorted.filter(x => x.severity === 'P0').length;
  return {
    context,
    status: full ? 'complete' : 'incomplete',
    overallScore: full ? Math.round(weightedSum) : null,
    provisionalScoreForRatedDimensionsOnly: ratedWeight ? Math.round(weightedSum / ratedWeight * 100) : null,
    ratedWeight,
    totalWeight: 100,
    ratedDimensions: rubric.dimensions.filter(x => scored.has(x.id)).map(x => ({ dimension: x.id, name: x.name, weight: x.weight, ...scored.get(x.id) })),
    unreviewedDimensions: rubric.dimensions.filter(x => !scored.has(x.id)).map(x => x.id),
    shipGate: !full ? 'not_assessed_all_dimensions' : p0 > 0 ? 'blocked_by_p0' : 'no_reported_p0',
    issues: sorted,
    topThreeFixes: sorted.slice(0, 3).map(x => ({ severity: x.severity, location: x.location, fix: x.fix, verification: x.verification })),
    warnings: ['Scores reflect supplied observations, not independent visual recognition or accessibility certification.'].concat(!full ? ['The overall score is withheld until all dimensions have been reviewed with evidence.'] : [])
  };
}

function parseHex(value) {
  if (typeof value !== 'string') throw new Error('Colors must be hex strings like #fff or #ffffff');
  let str = value.trim().replace(/^#/, '');
  if (str.length === 3 && /^[\da-f]{3}$/i.test(str)) str = [...str].map(x => x + x).join('');
  if (!/^[\da-f]{6}$/i.test(str)) throw new Error('Colors must be hex strings like #fff or #ffffff');
  return [0, 2, 4].map(i => parseInt(str.slice(i, i + 2), 16) / 255);
}
function luminance(hex) {
  const channels = parseHex(hex).map(x => x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}
export function checkContrast({ foreground, background } = {}) {
  const a = luminance(foreground), b = luminance(background);
  const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  return {
    foreground, background, ratio: Number(ratio.toFixed(2)),
    wcag22: { aaNormalText: ratio >= 4.5, aaLargeText: ratio >= 3, aaaNormalText: ratio >= 7, aaaLargeText: ratio >= 4.5 },
    note: 'Color contrast alone does not verify full WCAG conformance. Transparent colors, gradients, images, and rendered blending require evaluation in context.'
  };
}
const tools = [
  {
    name: 'get_design_rubric', description: 'Return the original design critique dimensions, weights, score anchors, and severity definitions.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false }
  },
  {
    name: 'prepare_critique', description: 'Generate a review brief and evidence checklist for a specific product surface; does not inspect a screenshot.',
    inputSchema: { type: 'object', properties: { surface: { type: 'string' }, audience: { type: 'string' }, goal: { type: 'string' }, brand: { type: 'string' } } }
  },
  {
    name: 'score_design_review', description: 'Score ONLY dimensions independently observed by the calling agent. Requires a score and specific evidence for each rated dimension; returns a full score only with complete coverage.',
    inputSchema: { type: 'object', properties: {
      context: { type: 'object' },
      ratings: { type: 'array', items: { type: 'object', required: ['dimension', 'score', 'evidence'], properties: { dimension: { type: 'string', enum: ids }, score: { type: 'number', minimum: 0, maximum: 5 }, evidence: { type: 'string' } } } },
      issues: { type: 'array', items: { type: 'object', required: ['severity', 'location', 'observation', 'impact', 'fix'], properties: { severity: { type: 'string', enum: ['P0', 'P1', 'P2', 'P3'] }, dimension: { type: 'string', enum: ids }, location: { type: 'string' }, observation: { type: 'string' }, impact: { type: 'string' }, fix: { type: 'string' }, verification: { type: 'string' } } } }
    }, required: ['ratings', 'issues'] }
  },
  {
    name: 'check_text_contrast', description: 'Calculate WCAG 2.2 color contrast ratio and text AA/AAA thresholds for opaque hex color pairs.',
    inputSchema: { type: 'object', required: ['foreground', 'background'], properties: { foreground: { type: 'string', description: 'Hex color, e.g. #222222' }, background: { type: 'string', description: 'Hex color, e.g. #ffffff' } } }
  }
];

function resultObject(result) {
  return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }], structuredContent: result };
}
function callTool(name, args) {
  switch (name) {
    case 'get_design_rubric': return rubric;
    case 'prepare_critique': return prepareCritique(args);
    case 'score_design_review': return scoreReview(args);
    case 'check_text_contrast': return checkContrast(args);
    default: throw new Error(`Unknown tool: ${name}`);
  }
}
function processMessage(req) {
  if (!req || req.jsonrpc !== '2.0' || typeof req.method !== 'string') return { jsonrpc: '2.0', id: req?.id ?? null, error: { code: -32600, message: 'Invalid Request' } };
  if (!Object.hasOwn(req, 'id')) return null; // notifications have no reply
  const base = { jsonrpc: '2.0', id: req.id };
  try {
    switch (req.method) {
      case 'initialize': return { ...base, result: { protocolVersion: req.params?.protocolVersion || '2025-06-18', capabilities: { tools: { listChanged: false } }, serverInfo: { name: 'bq-design-critic', version: '1.0.0' } } };
      case 'ping': return { ...base, result: {} };
      case 'tools/list': return { ...base, result: { tools } };
      case 'tools/call': {
        const name = req.params?.name;
        try { return { ...base, result: resultObject(callTool(name, req.params?.arguments ?? {})) }; }
        catch (e) { return { ...base, result: { content: [{ type: 'text', text: e.message }], isError: true } }; }
      }
      default: return { ...base, error: { code: -32601, message: `Method not found: ${req.method}` } };
    }
  } catch (e) { return { ...base, error: { code: -32603, message: e.message } }; }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const rl = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
  rl.on('line', line => {
    try {
      const req = JSON.parse(line);
      const res = processMessage(req);
      if (res) process.stdout.write(`${JSON.stringify(res)}\n`);
    } catch (e) {
      process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: `Parse error: ${e.message}` } })}\n`);
    }
  });
}
