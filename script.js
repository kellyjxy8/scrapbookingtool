const page = document.getElementById('page');
const divider = document.getElementById('divider');
const colLeft = document.getElementById('col-left');
const colRight = document.getElementById('col-right');
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

// Stops a column from being dragged down to nothing (or swallowing the whole
// page), so there's always a visible left and right side to work with.
const MIN_PERCENT = 10;
const MAX_PERCENT = 90;

function setSplit(leftPercent) {
  const clamped = Math.min(MAX_PERCENT, Math.max(MIN_PERCENT, leftPercent));
  // Right column is always "whatever's left over" so the two widths are
  // guaranteed to sum to 100%, even at the min/max clamp.
  colLeft.style.flexBasis = clamped + '%';
  colRight.style.flexBasis = (100 - clamped) + '%';
  divider.style.left = clamped + '%';
}

function onPointerMove(event) {
  const pageRect = page.getBoundingClientRect();
  const leftPercent = ((event.clientX - pageRect.left) / pageRect.width) * 100;
  setSplit(leftPercent);
}

// Pointer capture (rather than listening on the whole document) keeps every
// move/up event routed to the divider for the rest of this drag, even if
// the mouse briefly slips off the thin bar during a fast drag.
divider.addEventListener('pointerdown', (event) => {
  divider.classList.add('dragging');
  divider.setPointerCapture(event.pointerId);
  divider.addEventListener('pointermove', onPointerMove);
});

divider.addEventListener('pointerup', (event) => {
  divider.classList.remove('dragging');
  divider.releasePointerCapture(event.pointerId);
  divider.removeEventListener('pointermove', onPointerMove);
});
