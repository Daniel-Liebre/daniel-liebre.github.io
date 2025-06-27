function fillVerticalMarquee(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  const text = el.getAttribute('data-text') || el.textContent;
  el.setAttribute('data-text', text);

  // Crea un span temporal para medir la altura de una repetición
  const temp = document.createElement('span');
  temp.style.visibility = 'hidden';
  temp.style.position = 'absolute';
  temp.style.whiteSpace = 'pre';
  temp.textContent = text;
  document.body.appendChild(temp);

  const singleHeight = temp.offsetHeight;
  const needed = Math.ceil(window.innerHeight / singleHeight) + 2;
  document.body.removeChild(temp);

  // Repite el texto al menos el doble para loop perfecto
  const repeated = text.repeat(needed);
  el.textContent = repeated + repeated;
}

function fillHorizontalMarquee(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  const text = el.getAttribute('data-text') || el.textContent;
  el.setAttribute('data-text', text);

  // Crea un span temporal para medir el ancho de una repetición
  const temp = document.createElement('span');
  temp.style.visibility = 'hidden';
  temp.style.position = 'absolute';
  temp.style.whiteSpace = 'pre';
  temp.textContent = text;
  document.body.appendChild(temp);

  const singleWidth = temp.offsetWidth;
  const needed = Math.ceil(window.innerWidth / singleWidth) + 2;
  document.body.removeChild(temp);

  // Repite el texto al menos el doble para loop perfecto
  const repeated = text.repeat(needed);
  el.textContent = repeated + repeated;
}

function updateMarquees() {
  fillVerticalMarquee('.marco-left span');
  fillVerticalMarquee('.marco-right span');
  fillHorizontalMarquee('.marco-top span');
  fillHorizontalMarquee('.marco-bottom span');
}

function enableTouchHoverOnBoxes() {
  // Detecta si estamos en vertical
  const isVertical = window.matchMedia('(max-width: 600px), (orientation: portrait)').matches;
  document.querySelectorAll('.box').forEach(box => {
    // Limpia eventos previos
    box.onmousedown = box.onmouseup = box.onmouseleave = box.ontouchstart = box.ontouchend = null;
    box.classList.remove('active');
    if (isVertical) {
      // Touch o click: activa animación
      box.addEventListener('touchstart', addActive, {passive: true});
      box.addEventListener('touchend', removeActive);
      box.addEventListener('mousedown', addActive);
      box.addEventListener('mouseup', removeActive);
      box.addEventListener('mouseleave', removeActive);
    }
  });
  function addActive(e) { this.classList.add('active'); }
  function removeActive(e) { this.classList.remove('active'); }
}

window.addEventListener('DOMContentLoaded', () => {
  updateMarquees();
  enableTouchHoverOnBoxes();
});
window.addEventListener('resize', () => {
  updateMarquees();
  enableTouchHoverOnBoxes();
});
window.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});