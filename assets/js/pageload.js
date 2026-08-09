// pageload.js — load data.json, populate pages (experience, honors, projects, hobbies)
async function loadData(){
  try{
    const res = await fetch('/assets/js/data.json');
    const data = await res.json();
    // footer year (applies across pages)
    document.querySelectorAll('.footer p').forEach(p => { p.textContent = '© 2026 Erik Mesic'; });
    document.querySelectorAll('.footer-center').forEach(el=> el.textContent = '© 2026 Erik Mesic');

    // Featured projects on home
    const cardRoot = document.getElementById('featured-projects');
    if(cardRoot && data.projects){
      cardRoot.innerHTML = '';
      data.projects.forEach(p=>{
        const a = document.createElement('a'); a.className = 'card'; a.href = `/projects/${encodeURIComponent(p.name.toLowerCase().replace(/[^a-z0-9]+/g,'-'))}.html`;
        a.innerHTML = `<h3>${p.name}</h3><p class="muted">${(p.tags||[]).join(', ')}</p><p>${p.description}</p>`;
        cardRoot.appendChild(a);
      });
    }

    // Experience timeline
    const timelineRoot = document.getElementById('timeline');
    if(timelineRoot && data.experience){
      timelineRoot.innerHTML = '';
      data.experience.forEach(e=>{
        const item = document.createElement('div'); item.className = 'timeline-item';
        const bullets = e.bullets;
        item.innerHTML = `<h3>${e.title}</h3><div class="muted">${e.company} • ${e.range}${e.location? ' • '+e.location : ''}</div>`;
        if(bullets && bullets.length){
          const ul = document.createElement('ul');
          bullets.forEach(b=>{ const li=document.createElement('li'); li.textContent = b; ul.appendChild(li); });
          item.appendChild(ul);
        } else if(e.description){
          const p = document.createElement('p'); p.textContent = e.description; item.appendChild(p);
        }
        timelineRoot.appendChild(item);
      });
    }

    // Honors (sorted by year descending, display groups)
    const honorsRoot = document.getElementById('honors-list');
    if(honorsRoot && data.honors){
      honorsRoot.innerHTML = '';
      const grouped = {};
      data.honors.forEach(h=>{ grouped[h.year] = grouped[h.year] || []; grouped[h.year].push(h); });
      Object.keys(grouped).sort((a,b)=>b-a).forEach(year=>{
        const yearH = document.createElement('h3'); yearH.textContent = year; honorsRoot.appendChild(yearH);
        grouped[year].forEach(h=>{
          const li = document.createElement('li');
          li.innerHTML = `<strong>${h.title}</strong> — ${h.issuer} · ${h.month || ''} ${h.year}<div class="muted">${h.note || ''}</div>`;
          honorsRoot.appendChild(li);
        });
      });
    }

    // Hobbies page
    const hobbiesRoot = document.getElementById('hobbies-root');
    if(hobbiesRoot && data.hobbies){
      hobbiesRoot.innerHTML = '';
      data.hobbies.forEach(h=>{ const d = document.createElement('div'); d.className = 'hobby-item'; d.innerHTML = `<h4>${h}</h4>`; hobbiesRoot.appendChild(d); });
    }

    // About profile image
    const pimg = document.querySelector('.profile-photo');
    if(pimg && data.contact && data.contact.photo){ pimg.src = data.contact.photo; }
  }catch(err){ console.error('Error loading data.json', err); }
}

document.addEventListener('DOMContentLoaded', ()=>{
  loadData();

  // contact pill behavior and links
  const pill = document.getElementById('contact-pill');
  const panel = document.getElementById('contact-panel');
  const close = document.getElementById('contact-close');
  if(pill && panel){
    pill.addEventListener('click', ()=>{ panel.style.display='block'; panel.setAttribute('aria-hidden','false'); });
    if(close) close.addEventListener('click', ()=>{ panel.style.display='none'; panel.setAttribute('aria-hidden','true'); });
    // clicking outside panel content hides it
    panel.addEventListener('click', (e)=>{ if(e.target === panel) { panel.style.display='none'; panel.setAttribute('aria-hidden','true'); }});
    // keep anchors default so mailto works and external links open
  }

  // theme toggle — persistent across pages via localStorage
  const toggle = document.getElementById('theme-toggle');
  function applyTheme(t){
    if(t === 'light'){
      document.documentElement.classList.add('light');
      if(toggle) toggle.textContent = '☼';
    } else {
      document.documentElement.classList.remove('light');
      if(toggle) toggle.textContent = '☾';
    }
    localStorage.setItem('site-theme', t);
  }
  const saved = localStorage.getItem('site-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
  if(toggle) toggle.addEventListener('click', ()=>{ const cur = localStorage.getItem('site-theme') || (prefersDark ? 'dark' : 'light'); applyTheme(cur === 'light' ? 'dark' : 'light'); });

  // back-to-top
  const back = document.getElementById('back-to-top');
  if(back) back.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

  // Ensure footer year centered (in case inline styles differ)
  document.querySelectorAll('.footer').forEach(f=> f.style.textAlign = 'center');
});
