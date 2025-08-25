// Helpers
const $ = (s, r=document) => r.querySelector(s);

// Current year
$('#year').textContent = new Date().getFullYear();

// Copy bio
$('#copyBtn').addEventListener('click', async () => {
  const text = $('#bio').innerText;
  try{
    await navigator.clipboard.writeText(text);
    flash($('#copyBtn'), 'Copied!');
  }catch{
    const sel = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents($('#bio'));
    sel.removeAllRanges(); sel.addRange(range);
    document.execCommand('copy');
    sel.removeAllRanges();
    flash($('#copyBtn'), 'Copied!');
  }
});

function flash(btn, text){
  const old = btn.textContent; btn.textContent = text;
  setTimeout(()=>{ btn.textContent = old; }, 1200);
}

// Toggle scanlines
const scan = $('.scanlines');
$('#scanBtn').addEventListener('click', ()=>{
  scan.style.display = (scan.style.display==='none') ? '' : 'none';
});

// Glitch effect on bio
let glitchOn = false; let glitchTimer = null;
$('#glitchBtn').addEventListener('click', () => {
  glitchOn = !glitchOn;
  if(glitchOn){ startGlitch(); flash($('#glitchBtn'), 'Glitch ON'); }
  else{ stopGlitch(); flash($('#glitchBtn'), 'Glitch OFF'); }
});
function startGlitch(){
  const el = $('#bio');
  el.style.textShadow = '2px 0 var(--pink), -2px 0 var(--cyan), 0 0 12px rgba(179,102,255,.5)';
  const step = ()=>{
    const dx = (Math.random()-0.5)*2, dy = (Math.random()-0.5)*2;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
    glitchTimer = requestAnimationFrame(step);
  }; step();
}
function stopGlitch(){
  const el = $('#bio');
  cancelAnimationFrame(glitchTimer); glitchTimer=null;
  el.style.transform = ''; el.style.textShadow='';
}

// Pointer parallax
const aurora = $('.aurora');
window.addEventListener('pointermove', e => {
  const x = (e.clientX / window.innerWidth - .5) * 10;
  const y = (e.clientY / window.innerHeight - .5) * 10;
  aurora.style.transform = `translate(${x}px, ${y}px)`;
}, {passive:true});
