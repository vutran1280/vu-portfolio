
document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
});
document.querySelectorAll('.carousel').forEach(c => {
  const imgs = Array.from(c.querySelectorAll('img'));
  let idx = 0;
  const show = i => imgs.forEach((img, n) => img.classList.toggle('active', n === i));
  const prev = c.querySelector('.prev');
  const next = c.querySelector('.next');
  if (imgs.length) show(0);
  if (prev) prev.addEventListener('click', () => show(idx = (idx - 1 + imgs.length) % imgs.length));
  if (next) next.addEventListener('click', () => show(idx = (idx + 1) % imgs.length));
});
// --- Click-to-enlarge (lightbox) ---
document.querySelectorAll('.carousel img').forEach(img=>{
  img.addEventListener('click',()=>{
    const overlay=document.createElement('div');
    overlay.style=`position:fixed;inset:0;background:rgba(0,0,0,.9);
                   display:flex;align-items:center;justify-content:center;z-index:9999`;
    const big=document.createElement('img');
    big.src=img.src;
    big.style='max-width:95%;max-height:95%;border-radius:12px;box-shadow:0 0 20px #000;';
    overlay.appendChild(big);
    overlay.onclick=()=>overlay.remove();
    document.body.appendChild(overlay);
  });
});
// Click-to-zoom for Gallery images
(function () {
  const imgs = document.querySelectorAll('.gallery img');
  if (!imgs.length) return;

  function openLightbox(src, altText) {
    const overlay = document.createElement('div');
    overlay.style = `
      position:fixed; inset:0; background:rgba(0,0,0,.9);
      display:flex; align-items:center; justify-content:center; z-index:9999;
    `;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Image preview (click to close)');

    const img = document.createElement('img');
    img.src = src;
    img.alt = altText || '';
    img.style = 'max-width:95vw; max-height:95vh; border-radius:12px; box-shadow:0 0 24px #000; cursor: zoom-out;';

    // Close handlers
    function close() {
      document.removeEventListener('keydown', onKey);
      overlay.remove();
      document.body.style.overflow = '';
    }
    function onKey(e) { if (e.key === 'Escape') close(); }

    overlay.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    overlay.appendChild(img);
    document.body.appendChild(overlay);
  }

  imgs.forEach(el => {
    el.addEventListener('click', () => openLightbox(el.src, el.alt));
  });
})();
