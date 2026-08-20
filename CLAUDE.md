# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project

A personal collage/print-layout tool — plain static site, no framework, no build step, no package manager, no backend. Fully client-side; nothing leaves the user's device.

## Running it

No build or dev server needed. Open `index.html` directly in a browser (Live Server recommended for auto-refresh), or serve the directory with `python3 -m http.server` if `file://` restrictions become an issue once `script.js` does real work.

## Structure

- `index.html` — structure/markup only.
- `styles.css` — all styling, linked from `index.html`.
- `script.js` — behavior.

Keep this separation as the project grows — don't reintroduce inline `<style>`/`<script>` blocks.

## Conventions

- I'm a beginner learning as I go (PM background, not an engineer). Explain unfamiliar code before I approve a diff — the *why* behind an approach, not just what a line does.
- Keep changes small and reviewable. One feature per request, not multiple bundled together.
- Commit after each working piece, with a clear message describing what changed.

## Roadmap

See `docs/roadmap.md` for the full session-by-session plan and current status — only read it when a request needs that context (e.g. "what's next," "are we still following the plan").