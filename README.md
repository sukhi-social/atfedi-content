# atfedi-content

The long-form writing on [atfedi.de](https://atfedi.de): the basics (small
how-tos for getting around the fediverse) and the tool guides, in English,
Japanese and Korean.

The site's code lives in [atfedi-de](https://github.com/sukhi-social/atfedi-de).
This repository holds only the words, so changing a sentence never means
touching code, and merging here is the whole deploy.

## Layout

```
content/<section>/<name>.<lang>.md
```

- `content/basics/moving.ko.md` — one page, one language
- `content/tool-pages/fedify/index.en.md` — a page can sit in its own folder

Every page exists in `en`, `ja` and `ko`. A page starts with a `## Title`
line and its lead paragraph.

## Writing and translating

- **One paragraph, one line.** A line break inside a paragraph shows up as a
  gap in Japanese and Korean. Lists, headings and fenced blocks keep their
  own lines.
- **Write it again, don't translate it.** Each language may say things in its
  own order and length. The guides in atfedi-de's
  [`docs/writing.md`](https://github.com/sukhi-social/atfedi-de/blob/main/docs/writing.md)
  and [`docs/translation-ko.md`](https://github.com/sukhi-social/atfedi-de/blob/main/docs/translation-ko.md)
  say more.
- **Keep what isn't prose.** Links, `[icon:…]` marks, `code`, heading levels
  and list items should survive from one language to the next. A link may
  point at a localized page instead.

You can edit the files here directly, or use
[translate.atfedi.de](https://translate.atfedi.de), which shows the source
and your language side by side, one paragraph per row. Sign in with any
fediverse account.

## What reaches the site

A page shows on the site only once a person has sent it from
[write.atfedi.de](https://write.atfedi.de) (or translate.atfedi.de). Drafts
Claude writes here stay off the site until then, and so does any later change
an AI makes: the site keeps the version the person sent until they send again.
The desks always open the newest text, so there is something to rewrite.

The build tells which commit is a send by its author, `<user>@<server>.users.atfedi.de`.
`node scripts/build.mjs` lists the files still waiting.

## Checks and deploy

```sh
node scripts/build.mjs --check   # what pull requests run
node scripts/build.mjs           # writes dist/: the files + index.json
```

A pull request fails on a file that doesn't fit the layout, a page without
its title, or a page missing a language. A translation that seems to have
lost a link or an icon gets a notice on the pull request, not a failure:
sometimes that's on purpose.

Merging to `main` builds `dist/` and mirrors it into the R2 bucket the site
reads from (`.github/workflows/deploy.yml`).

## License

[CC0 1.0](LICENSE). Copy it into your server's guide, translate it, change
it. No need to ask or credit, though a link back is always nice.
