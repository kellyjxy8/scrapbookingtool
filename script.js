const page = document.getElementById('page');
const divider = document.getElementById('divider');
const colLeft = document.getElementById('col-left');
const colRight = document.getElementById('col-right');

const MIN_PERCENT = 10;
const MAX_PERCENT = 90;

function setSplit(leftPercent) {
  const clamped = Math.min(MAX_PERCENT, Math.max(MIN_PERCENT, leftPercent));
  colLeft.style.flexBasis = clamped + '%';
  colRight.style.flexBasis = (100 - clamped) + '%';
  divider.style.left = clamped + '%';
}

function onPointerMove(event) {
  const pageRect = page.getBoundingClientRect();
  const leftPercent = ((event.clientX - pageRect.left) / pageRect.width) * 100;
  setSplit(leftPercent);
}

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
