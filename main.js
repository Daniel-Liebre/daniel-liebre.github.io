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

function updateMarquees() {
  fillVerticalMarquee('.marco-left span');
  fillVerticalMarquee('.marco-right span');
}

window.addEventListener('DOMContentLoaded', updateMarquees);
window.addEventListener('resize', updateMarquees);