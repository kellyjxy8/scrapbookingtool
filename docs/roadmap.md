# Roadmap

## Session plan

| # | Session | Status |
|---|---|---|
| 1 | Static A4-ratio grid (fixed 2x2, no interaction) | Done |
| — | Split into index.html / styles.css / script.js | Done |
| 2 | Draggable dividers — drag a line, adjacent cells resize live | Next |
| 3 | Upload tray — multi-photo upload, drag from tray into a cell | Not started |
| 4 | Export — on-screen layout → print-ready PDF at correct DPI | Not started |
| 5 | Save/persist — IndexedDB save of current project state | Not started |
| 6 | Gallery — list of saved projects, thumbnails, reopen | Not started |
| 7 | Recursive cell-splitting (drop a new layout onto an existing cell) | Later, deliberately last |

## Key decisions

- No accounts, no sharing, no multi-user — single-user personal tool.
- No framework, no backend — vanilla HTML/CSS/JS, fully client-side.
- Persistence via IndexedDB (not localStorage) — needed for storing image blobs.
- Export via html2canvas + jsPDF, targeting ~300 DPI / A4 (~2480×3508px).
- Splitting/dividers modeled as a recursive split-tree (like tiling window managers), built in two stages: fixed-grid dragging first, arbitrary splitting later.