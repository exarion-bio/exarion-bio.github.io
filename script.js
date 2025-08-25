// Helpers
const $ = (s, r=document) => r.querySelector(s);

// Current year
$('#year').textContent = new Date().getFullYear();

// Copy bio
$('#copyBtn').addEventListener('click', async () => {
  const text = $('#bio').innerText;
  try {
    await navigator.clipboard.writeText(text);
    flash($('#copyBtn'), 'Copied!');
  } catch {
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

// Matrix falling symbols
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let w, h, columns, drops;
function resizeCanvas(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  columns = Math.floor(w / 20);
  drops = Array(columns).fill(1);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const symbols = "アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789★☆✦✧";
const colors = ["#ff4fd8","#b366ff","#7c4dff","#3aa0ff","#64e1ff"];

function draw(){
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,w,h);
  ctx.font = "16px monospace";

  for(let i=0;i<drops.length;i++){
    const text = symbols[Math.floor(Math.random()*symbols.length)];
    ctx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
    ctx.fillText(text, i*20, drops[i]*20);

    if(drops[i]*20 > h && Math.random()>0.975) drops[i]=0;
    drops[i]++;
  }
}
setInterval(draw, 50);
