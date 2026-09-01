const page = document.getElementById('page');
const pageWidthInput = document.getElementById('page-width');
const pageHeightInput = document.getElementById('page-height');
const pageUnitSelect = document.getElementById('page-unit');
const pageSizeLabel = document.getElementById('page-size-label');

function updatePageSize() {
  const width = parseFloat(pageWidthInput.value);
  const height = parseFloat(pageHeightInput.value);
  if (!(width > 0) || !(height > 0)) return;

  // CSS aspect-ratio only cares about the ratio between these two numbers,
  // not what unit they're actually in — so mm and inches work identically
  // here. The unit dropdown is just a label for now; it doesn't convert the
  // numbers or affect the on-screen or exported size yet (that arrives with
  // real print-size export in a later session).
  page.style.aspectRatio = `${width} / ${height}`;
  pageSizeLabel.textContent = `${width} × ${height} ${pageUnitSelect.value}`;
}

[pageWidthInput, pageHeightInput, pageUnitSelect].forEach((el) => {
  el.addEventListener('input', updatePageSize);
});

updatePageSize();

const gridRowsInput = document.getElementById('grid-rows');
const gridColsInput = document.getElementById('grid-cols');

// A basic safety floor so a track can't be dragged to zero width/height.
// It's not a guarantee every grid stays comfortably usable — a 10-column
// grid at 5% minimum each already has little room left to redistribute.
const MIN_TRACK_PERCENT = 5;

// colWidths[i] is column i's width as a percentage; rowHeights[j] likewise
// for row j. Both arrays always sum to 100 — every drag redistributes
// between two neighboring tracks rather than changing the total.
let colWidths = [];
let rowHeights = [];

// Sum of the first `count` entries in a track-size array — used to find
// where a divider sits (or where the mouse needs to land) as a percentage
// of the page, since track sizes are stored individually but drag position
// is naturally a running total.
function cumulative(sizes, count) {
  let total = 0;
  for (let i = 0; i < count; i++) total += sizes[i];
  return total;
}

function applyTrackSizes() {
  page.style.gridTemplateColumns = colWidths.map((w) => w + '%').join(' ');
  page.style.gridTemplateRows = rowHeights.map((h) => h + '%').join(' ');
}

function attachDividerDrag(el, axis, index, sizes) {
  function onPointerMove(event) {
    const pageRect = page.getBoundingClientRect();
    const mousePercent = axis === 'x'
      ? ((event.clientX - pageRect.left) / pageRect.width) * 100
      : ((event.clientY - pageRect.top) / pageRect.height) * 100;

    // This divider sits between track `index` and `index + 1`. Everything
    // before/after that pair is untouched — only these two share the delta.
    const before = cumulative(sizes, index);
    const after = cumulative(sizes, index + 2);
    const min = before + MIN_TRACK_PERCENT;
    const max = after - MIN_TRACK_PERCENT;
    const boundary = Math.min(max, Math.max(min, mousePercent));

    sizes[index] = boundary - before;
    sizes[index + 1] = after - boundary;
    applyTrackSizes();
    el.style[axis === 'x' ? 'left' : 'top'] = boundary + '%';
  }

  // Pointer capture (rather than listening on the whole document) keeps
  // every move/up event routed to this divider for the rest of the drag,
  // even if the mouse briefly slips off the thin bar during a fast drag.
  el.addEventListener('pointerdown', (event) => {
    el.classList.add('dragging');
    el.setPointerCapture(event.pointerId);
    el.addEventListener('pointermove', onPointerMove);
  });

  el.addEventListener('pointerup', (event) => {
    el.classList.remove('dragging');
    el.releasePointerCapture(event.pointerId);
    el.removeEventListener('pointermove', onPointerMove);
  });
}

function renderGrid() {
  page.innerHTML = '';
  applyTrackSizes();

  const cols = colWidths.length;
  const rows = rowHeights.length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      const label = document.createElement('span');
      label.textContent = 'Cell ' + (r * cols + c + 1);
      cell.appendChild(label);
      page.appendChild(cell);
    }
  }

  for (let i = 0; i < cols - 1; i++) {
    const divider = document.createElement('div');
    divider.className = 'divider divider--vertical';
    divider.style.left = cumulative(colWidths, i + 1) + '%';
    attachDividerDrag(divider, 'x', i, colWidths);
    page.appendChild(divider);
  }

  for (let j = 0; j < rows - 1; j++) {
    const divider = document.createElement('div');
    divider.className = 'divider divider--horizontal';
    divider.style.top = cumulative(rowHeights, j + 1) + '%';
    attachDividerDrag(divider, 'y', j, rowHeights);
    page.appendChild(divider);
  }
}

function updateGridSize() {
  const cols = Math.max(1, parseInt(gridColsInput.value, 10) || 1);
  const rows = Math.max(1, parseInt(gridRowsInput.value, 10) || 1);

  // Rebuilding from scratch means any manual divider drags reset to even
  // spacing — expected, since asking for a different row/column count is
  // asking for a fresh uniform starting layout.
  colWidths = Array(cols).fill(100 / cols);
  rowHeights = Array(rows).fill(100 / rows);
  renderGrid();
}

[gridRowsInput, gridColsInput].forEach((el) => {
  el.addEventListener('input', updateGridSize);
});

updateGridSize();
