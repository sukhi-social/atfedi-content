// Checks the content and builds what goes to R2.
//
//   node scripts/build.mjs           check, then write dist/
//   node scripts/build.mjs --check   check only (pull requests)
//
// Layout: content/<section>/<name>.<lang>.md, where a name may have its own
// folders (tool-pages/fedify/index.ja.md). One "doc" is one page in all its
// languages, named by its path without the language: tool-pages/fedify/index.
//
// Errors (the build fails): a file that doesn't fit the layout, an unknown
// language, a page without its `## Title` line, a doc missing a language.
// Notices (the build goes on): a translation that lost a link, icon, code
// span, heading level or list item the other languages have, paragraph by
// paragraph — the same check the translation desk shows in its gutter.
//
// dist/ holds every file as-is plus index.json:
//   { generated, docs: [{ doc, title: {lang}, lead: {lang}, files: {lang: {path, sha256}} }] }
// `lead` is the paragraph right after the title, on one line — the site uses
// it for cards that link to the page.

import { createHash } from 'node:crypto';
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { paragraphs, unwrap, check } from './markdown.mjs';

const LANGS = ['en', 'ja', 'ko'];
// the language each section was first written in; others are compared to it
const SOURCE_LANG = { basics: 'ko', 'tool-pages': 'en' };

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = join(root, 'content');
const out = join(root, 'dist');
const checkOnly = process.argv.includes('--check');
const inCI = !!process.env.GITHUB_ACTIONS;

const errors = [];
const notices = [];
const error = (file, msg) => errors.push({ file, msg });
const notice = (file, msg) => notices.push({ file, msg });

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );

const docs = new Map();
for (const file of walk(contentDir)) {
  const rel = relative(contentDir, file).split('\\').join('/');
  const m = rel.match(/^([a-z0-9-]+(?:\/[a-z0-9-]+)+)\.([a-z]{2})\.md$/);
  if (!m) {
    error(`content/${rel}`, 'expected content/<section>/<name>.<lang>.md (lowercase, a-z 0-9 -)');
    continue;
  }
  const [, doc, lang] = m;
  if (!LANGS.includes(lang)) {
    error(`content/${rel}`, `unknown language "${lang}" (known: ${LANGS.join(', ')})`);
    continue;
  }
  const markdown = readFileSync(file, 'utf8');
  const title = markdown.match(/^## (.+)$/m)?.[1];
  if (!title) error(`content/${rel}`, 'the page needs a "## Title" line');
  const entry = docs.get(doc) ?? { doc, title: {}, lead: {}, files: {}, text: {} };
  entry.title[lang] = title ?? doc;
  const blocks = paragraphs(markdown).map(unwrap);
  const at = blocks.findIndex((b) => b.startsWith('## '));
  entry.lead[lang] = (at >= 0 && blocks[at + 1] && !blocks[at + 1].startsWith('#') ? blocks[at + 1] : '').trim();
  entry.files[lang] = {
    path: `content/${rel}`,
    sha256: createHash('sha256').update(markdown).digest('hex'),
  };
  entry.text[lang] = markdown;
  docs.set(doc, entry);
}

for (const d of docs.values()) {
  const missing = LANGS.filter((l) => !d.files[l]);
  if (missing.length) error(`content/${d.doc}`, `missing ${missing.join(', ')}`);

  const src = SOURCE_LANG[d.doc.split('/')[0]] ?? 'en';
  if (!d.text[src]) continue;
  const left = paragraphs(d.text[src]).map(unwrap);
  for (const lang of LANGS) {
    if (lang === src || !d.text[lang]) continue;
    const right = paragraphs(d.text[lang]).map(unwrap);
    left.forEach((p, i) => {
      for (const issue of check(p, right[i])) {
        notice(d.files[lang].path, `paragraph ${i + 1}: ${issue.kind} ${issue.detail} (from ${src})`);
      }
    });
  }
}

// GitHub turns these lines into annotations on the pull request.
for (const n of notices) {
  console.log(inCI ? `::notice file=${n.file}::${n.msg}` : `notice  ${n.file}: ${n.msg}`);
}
for (const e of errors) {
  console.log(inCI ? `::error file=${e.file}::${e.msg}` : `error   ${e.file}: ${e.msg}`);
}
console.log(`${docs.size} docs, ${errors.length} errors, ${notices.length} notices`);
if (errors.length) process.exit(1);
if (checkOnly) process.exit(0);

rmSync(out, { recursive: true, force: true });
const index = [...docs.values()]
  .sort((a, b) => a.doc.localeCompare(b.doc))
  .map(({ doc, title, lead, files }) => ({ doc, title, lead, files }));
for (const d of docs.values()) {
  for (const lang of Object.keys(d.files)) {
    const target = join(out, d.files[lang].path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, d.text[lang]);
  }
}
writeFileSync(join(out, 'index.json'), JSON.stringify({ generated: new Date().toISOString(), docs: index }, null, 1));
console.log(`wrote dist/ (${index.length} docs)`);
