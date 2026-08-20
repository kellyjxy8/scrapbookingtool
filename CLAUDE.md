# Collage Tool — Project Brief

## The problem
Manually arranging photos in Canva to maximize space on a printed page is slow and fiddly. There's also no good tool for "custom collage, printed on standard paper (A4), with photos of different sizes arranged efficiently" — existing collage makers (Pi7, PixGrid, Canva) offer either fixed/preset grids or fully freeform canvases, but not draggable dividers that resize the cells around them.

## The product
A personal (not public-facing), local, browser-based tool: start a named collage project → pick a print size (A4) → start from a default grid → drag photos in from an upload tray → resize cells by dragging the dividers, or split a cell further for a denser layout → export a print-ready file. Output is meant for home/FedEx printing into a self-adhesive photo album.

**Explicitly out of scope:** accounts, login, sharing/social features, multi-user anything, automated content aggregation. This is a single-user personal tool, not a product being validated for other users.

## Core mechanic
A **recursive split-tree layout** (same underlying model as tiling window managers, e.g. i3, or split panes in VS Code): each region either holds a photo or splits into two sub-regions with a moveable divider. Divider drag resizes the two adjacent regions live. Any region can be split further.

**Build sequencing (deliberately staged, not all at once):**
1. Fixed grid, draggable dividers only (no arbitrary splitting yet)
2. Add recursive splitting on top, once the divider-drag mechanic is solid

## Where the current build status lives
Session-by-session status, the tech stack, and technical decisions are **maintained in the GitHub repo** (`CLAUDE.md` and `docs/roadmap.md`), not duplicated here — that's the up-to-date source since it's edited in the same sitting as the code. This brief only covers what's stable: the problem, the product shape, and the learning goal.

## Tooling / workflow
- **Git + GitHub**, used lightly — commit after each session works, real commit messages, no need for branches on a solo project.
- **VS Code** as home base, with the Live Server extension for instant preview on save.
- **Claude Code** (in VS Code's integrated terminal) does the actual building — small, reviewable requests ("add one draggable divider," not "build the whole resize system"), diffs read before approving.
- **This Claude.ai Project** is for planning/thinking/understanding — not code changes.

## Learning goal (why this project exists)
Building toward "builder PM" literacy — correct technical understanding, not engineering mastery. The priority is understanding *why* a technical approach was chosen (tradeoffs, alternatives considered) over memorizing syntax. When reviewing AI-generated code, the useful question is "why this approach and not a simpler one," not just "what does this line do."

**A known pattern to watch for:** tendency to spiral in open-ended planning/scoping and lose confidence in an idea's viability as a result. The corrective principle already adopted: decide every fork in favor of the smallest version that still teaches something, and prefer building a small real thing over further upfront planning.