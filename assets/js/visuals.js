// visuals.js — mouse light (no lag), subtle particles, and page-title animation tests
(function(){
  // Mouse-light directly follows cursor (no smoothing)
  let light = document.getElementById('mouse-light');
  if(!light){
    light = document.createElement('div');
    light.id = 'mouse-light';
    document.body.appendChild(light);
  }
  window.addEventListener('mousemove', function(e){
    // place center of light at cursor
    light.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  // Particles canvas (simple, low-cost)
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext && canvas.getContext('2d');
  if(ctx){
    let w = canvas.width = innerWidth, h = canvas.height = innerHeight;
    const particles = [];
    const count = 40; // small count for performance
    for(let i=0;i<count;i++){
      particles.push({x:Math.random()*w, y:Math.random()*h, r: Math.random()*1.3+0.3, vx:(Math.random()-0.5)*0.25, vy:(Math.random()-0.5)*0.25, o:0.05+Math.random()*0.12});
    }
    function resize(){ w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
    window.addEventListener('resize', resize);
    function draw(){
      ctx.clearRect(0,0,w,h);
      for(let p of particles){
        p.x = (p.x + p.vx + w) % w;
        p.y = (p.y + p.vy + h) % h;
        ctx.beginPath();
        ctx.fillStyle = `rgba(186,142,111,${p.o})`;
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  // Page title animations — test one per page
  function typeEffect(el, text, speed=30){
    el.textContent = '';
    let i=0;
    const id = setInterval(()=>{ el.textContent += text[i++]||''; if(i>text.length) clearInterval(id); }, speed);
  }
  function underlineNeat(el){
    el.classList.add('title-underline');
    setTimeout(()=> el.classList.add('animated'), 70);
  }
  function messyHighlight(el){
    el.style.background = 'linear-gradient(90deg, rgba(186,142,111,0.12) 0%, rgba(186,142,111,0.08) 100%)';
    el.style.transform = 'skewX(-8deg)';
    setTimeout(()=> el.style.transform = 'skewX(0deg)', 480);
  }
  function circled(el){
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 200 40');
    svg.style.height='12px'; svg.style.display='block'; svg.style.marginTop='8px';
    const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('x','0'); rect.setAttribute('y','0'); rect.setAttribute('width','100%'); rect.setAttribute('height','6');
    rect.setAttribute('rx','3'); rect.style.fill = 'rgba(186,142,111,0.06)';
    svg.appendChild(rect); el.parentNode.insertBefore(svg, el.nextSibling);
  }

  const path = location.pathname.replace(/\/$/, '');
  const titleEls = document.querySelectorAll('.page-title');
  titleEls.forEach(el=>{
    if(path === '' || path === '/index.html' || path === '/'){
      // home: typewriter test
      typeEffect(el, el.textContent, 30);
    } else if(path.includes('/experience')){
      // neat underline test
      underlineNeat(el);
    } else if(path.includes('/projects')){
      // messy highlight test
      messyHighlight(el);
    } else if(path.includes('/education')){
      // circled test
      circled(el);
    } else {
      // default: no effect
    }
  });

})();
