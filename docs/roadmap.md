# Roadmap

## MVP

A user can specify a page size, start from a blank page and split it into any arrangement of regions (uniform or asymmetric) using divider-based splitting, place a photo in each region, and export a print-ready file at that size.

## Session plan

| # | Session | Status |
|---|---|---|
| 1 | Static A4-ratio grid (fixed 2x2, no interaction) | Done |
| — | Split into index.html / styles.css / script.js | Done |
| 2 | Draggable divider — drag a line, adjacent columns resize live | Done |
| 3 | Page size as input — grid takes width/height instead of hardcoded A4 (small) | Done |
| 4 | Recursive splitting from a blank page — the mechanic that makes real layouts possible; builds directly on the divider-drag math from session 2 | Next |
| 5 | Upload — one photo into one region | Not started |
| 6 | Export — on-screen layout → print-ready PDF at correct DPI | Not started |
| 7 | Save/persist — IndexedDB save of current project state | Not started |
| 8 | Gallery — list of saved projects, thumbnails, reopen | Not started |

Backlog (unscheduled ideas, e.g. preset layout gallery, cell delete/merge) is tracked as GitHub Issues on this repo, not in this file.

## Key decisions

- No accounts, no sharing, no multi-user — single-user personal tool.
- No framework, no backend — vanilla HTML/CSS/JS, fully client-side.
- Persistence via IndexedDB (not localStorage) — needed for storing image blobs.
- Export via html2canvas + jsPDF, targeting ~300 DPI / A4 (~2480×3508px).
- Splitting/dividers modeled as a recursive split-tree (like tiling window managers), built in two stages: fixed-grid divider dragging first (session 2, done), then generalized to recursive splitting (session 4) — moved ahead of upload/export because it's the mechanic the rest of the tool depends on, and it reuses the drag math already validated in session 2.