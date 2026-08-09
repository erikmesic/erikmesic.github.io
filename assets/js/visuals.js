// particles + mouse light + page title animations
(function(){
  // mouse light follower (no lag)
  let light = document.createElement('div'); light.id='mouse-light'; document.body.appendChild(light);
  window.addEventListener('mousemove', function(e){ light.style.transform = `translate(${e.clientX}px, ${e.clientY}px)` });

  // particles minimal canvas
  const canvas = document.createElement('canvas'); canvas.id='particles-canvas'; document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d'); let w, h, particles=[];
  function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight }
  window.addEventListener('resize', resize); resize();
  function initParticles(){ particles = []; for(let i=0;i<40;i++){ particles.push({x:Math.random()*w, y:Math.random()*h, r:Math.random()*1.3+0.3, vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3, o:0.05+Math.random()*0.12 }) } }
  initParticles();
  function render(){ ctx.clearRect(0,0,w,h); for(let p of particles){ p.x += p.vx; p.y += p.vy; if(p.x<0)p.x=w; if(p.x>w)p.x=0; if(p.y<0)p.y=h; if(p.y>h)p.y=0; ctx.beginPath(); ctx.fillStyle = 'rgba(186,142,111,'+p.o+')'; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); } requestAnimationFrame(render) }
  render();

  // Page title animations: pick effect per path
  function typeEffect(el, text, speed=40){ el.textContent=''; let i=0; const t=setInterval(()=>{ el.textContent += text[i++]||''; if(i>text.length)clearInterval(t)}, speed) }
  function highlightNeat(el){ el.style.transition='background-size .9s ease'; el.style.background='linear-gradient(90deg, rgba(186,142,111,0.08) 0%, rgba(186,142,111,0.08) 100%)'; el.style.backgroundSize='0% 100%'; setTimeout(()=>el.style.backgroundSize='100% 100%',50) }
  function highlightSloppy(el){ el.style.transition='transform .9s cubic-bezier(.2,.9,.3,1)'; el.style.transform='skewX(-8deg)'; setTimeout(()=>el.style.transform='skewX(0deg)',500) }
  function circled(el){ const r= document.createElement('svg'); r.setAttribute('viewBox','0 0 200 50'); r.style.width='100%'; r.style.height='8px'; r.style.display='block'; el.appendChild(r); }

  const path = location.pathname.replace(/\/$/,'') || '/';
  const titleEl = document.querySelector('.page-title');
  if(titleEl){ if(path==='/'||path==='/index.html') typeEffect(titleEl, titleEl.textContent, 30);
    else if(path.includes('experience')) highlightNeat(titleEl);
    else if(path.includes('projects')) highlightSloppy(titleEl);
    else if(path.includes('education')) circled(titleEl);
  }
})();
