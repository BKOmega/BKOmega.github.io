# Bits & Bytes – Home Lab (Starter)

This is a commit-ready starter for your public home lab docs at **BKOmega.github.io** (served at https://www.bitsandbytes.co.uk).

## Branching workflow

- Work in `dev`
- Open a PR from `dev` → `main`
- Merge to publish (GitHub Pages builds from `main`)

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

Then open http://127.0.0.1:4000

## Structure

- `_posts/` — Diary / changelog
- `_guides/` — Step-by-step how-to guides
- `_designs/` — Architecture & decisions
- `_runbooks/` — Break/fix procedures
- `_templates/` — Copy‑paste configs & snippets
- `_notes/` — Scratchpad, gotchas, regex, Grok
- `_data/` — Networks & Services driving the Inventory page

## Anonymisation

Keep real hostnames, users, and public IPs out of the repo. Use representative internal domains and placeholders for secrets.
