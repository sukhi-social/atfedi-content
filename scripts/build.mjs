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
// language, a page without its `## Title` line, a doc missing a language, a
// picture that isn't in media/ or isn't named by its own sha256.
//
// Pictures live in media/<sha256>.<webp|png|jpg|gif> and pages point at them
// as ![alt](/media/<name>). The desk names and commits them this way.
// Notices (the build goes on): a translation that lost a link, icon, code
// span, heading level or list item the other languages have, paragraph by
// paragraph — the same check the translation desk shows in its gutter.
//
// dist/ holds every file as-is plus index.json:
//   { generated, docs: [{ doc, title: {lang}, lead: {lang}, files: {lang: {path, sha256}} }] }
// `lead` is the paragraph right after the title, on one line — the site uses
// it for cards that link to the page.
//
// Each file also carries its credits, read from git history (CI checks out
// the whole history for this):
//   credits: { authors: [{ name, ai }], assisted: [name] }
// authors are commit authors, oldest first; ai marks an AI (Claude's commits
// are authored as Claude <noreply@anthropic.com>). assisted collects the
// "Assisted-by:" trailers the desk adds when someone rewrites an AI's text.
//
// What the site shows is what a person passed through write.atfedi.de: for
// each file, the version from the last commit the desk made as someone
// (author <user>@<server>.users.atfedi.de). An AI draft nobody has sent from
// write yet stays off the site, and an AI's change after a person's send
// waits for their next send, while the site keeps the version they sent.
// The desk still reads the newest text, so there is something to rewrite:
//   content/<path>             the newest text (the desk)
//   published/content/<path>   the version people passed (the site)
//   files[lang].published      { sha256, commit, title, lead, credits } or null

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { paragraphs, unwrap, check } from './markdown.mjs';

const LANGS = ['en', 'ja', 'ko'];
// the language each section was first written in; others are compared to it
const SOURCE_LANG = { about: 'ja', basics: 'ko', 'tool-pages': 'en' };

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = join(root, 'content');
const out = join(root, 'dist');
const checkOnly = process.argv.includes('--check');
const inCI = !!process.env.GITHUB_ACTIONS;

// commit emails that mean an AI wrote it, and the name it goes by
const AI_AUTHORS = { 'noreply@anthropic.com': 'Claude' };

// the desk's commits are authored as <user>@<server>.users.atfedi.de
const DESK_EMAIL = /\.users\.atfedi\.de$/;

const git = (args) =>
  execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 1 << 26 });

function credits(path, rev = 'HEAD') {
  let log;
  try {
    log = execFileSync(
      'git',
      ['log', '--reverse', '--format=%an%x1f%ae%x1f%(trailers:key=Assisted-by,valueonly,separator=%x1e)%x1d', rev, '--', path],
      { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    );
  } catch {
    return null; // not a git checkout
  }
  const authors = new Map();
  const assisted = new Set();
  for (const entry of log.split('\x1d')) {
    const [name, email, trailers] = entry.trim().split('\x1f');
    if (!name) continue;
    const ai = AI_AUTHORS[email];
    const key = ai ?? name;
    if (!authors.has(key)) authors.set(key, { name: key, ai: !!ai });
    for (const t of (trailers ?? '').split('\x1e')) if (t.trim()) assisted.add(t.trim());
  }
  return authors.size ? { authors: [...authors.values()], assisted: [...assisted] } : null;
}

// The last commit that sent this file from write, and the file as it was
// then; null when no one has yet.
function passed(path) {
  let log;
  try {
    log = git(['log', '--format=%H%x1f%ae', '--', path]);
  } catch {
    return null; // not a git checkout
  }
  for (const line of log.split('\n')) {
    const [commit, email] = line.split('\x1f');
    if (commit && DESK_EMAIL.test(email ?? '')) return { commit, text: git(['show', `${commit}:${path}`]) };
  }
  return null;
}

// the paragraph right after the `## Title`, on one line
function leadOf(markdown) {
  const blocks = paragraphs(markdown).map(unwrap);
  const at = blocks.findIndex((b) => b.startsWith('## '));
  return (at >= 0 && blocks[at + 1] && !blocks[at + 1].startsWith('#') ? blocks[at + 1] : '').trim();
}

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
  const entry = docs.get(doc) ?? { doc, title: {}, lead: {}, files: {}, text: {}, published: {} };
  entry.title[lang] = title ?? doc;
  entry.lead[lang] = leadOf(markdown);
  const pass = passed(`content/${rel}`);
  entry.files[lang] = {
    path: `content/${rel}`,
    sha256: createHash('sha256').update(markdown).digest('hex'),
    credits: credits(`content/${rel}`),
    published: pass && {
      sha256: createHash('sha256').update(pass.text).digest('hex'),
      commit: pass.commit,
      title: pass.text.match(/^## (.+)$/m)?.[1] ?? title ?? doc,
      lead: leadOf(pass.text),
      credits: credits(`content/${rel}`, pass.commit),
    },
  };
  entry.text[lang] = markdown;
  if (pass) entry.published[lang] = pass.text;
  docs.set(doc, entry);
}

const mediaDir = join(root, 'media');
const media = existsSync(mediaDir) ? readdirSync(mediaDir) : [];
for (const name of media) {
  const m = name.match(/^([0-9a-f]{64})\.(webp|png|jpg|gif)$/);
  if (!m) error(`media/${name}`, 'expected media/<sha256>.<webp|png|jpg|gif>');
  else if (createHash('sha256').update(readFileSync(join(mediaDir, name))).digest('hex') !== m[1]) {
    error(`media/${name}`, "the name isn't the sha256 of the file");
  }
}
for (const d of docs.values()) {
  for (const lang of Object.keys(d.text)) {
    for (const [, name] of d.text[lang].matchAll(/\/media\/([^)\s"]+)/g)) {
      if (!media.includes(name)) error(d.files[lang].path, `picture /media/${name} is not in media/`);
    }
  }
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
const files = [...docs.values()].flatMap((d) => Object.values(d.files));
const waiting = files.filter((f) => f.published?.sha256 !== f.sha256);
for (const f of waiting) if (!inCI) console.log(`draft   ${f.path}: ${f.published ? 'changed since its last send from write' : 'not sent from write yet'}`);
console.log(`${docs.size} docs, ${errors.length} errors, ${notices.length} notices`);
console.log(`${files.length - waiting.length} of ${files.length} files are on the site as they are; the rest wait for a send from write`);
if (errors.length) process.exit(1);
if (checkOnly) process.exit(0);

rmSync(out, { recursive: true, force: true });
const index = [...docs.values()]
  .sort((a, b) => a.doc.localeCompare(b.doc))
  .map(({ doc, title, lead, files }) => ({ doc, title, lead, files }));
mkdirSync(join(out, 'media'), { recursive: true });
mkdirSync(join(out, 'published', 'content'), { recursive: true });
for (const name of media) copyFileSync(join(mediaDir, name), join(out, 'media', name));
for (const d of docs.values()) {
  for (const lang of Object.keys(d.files)) {
    const target = join(out, d.files[lang].path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, d.text[lang]);
    if (d.published[lang] == null) continue;
    const shown = join(out, 'published', d.files[lang].path);
    mkdirSync(dirname(shown), { recursive: true });
    writeFileSync(shown, d.published[lang]);
  }
}
writeFileSync(join(out, 'index.json'), JSON.stringify({ generated: new Date().toISOString(), docs: index }, null, 1));
console.log(`wrote dist/ (${index.length} docs)`);
