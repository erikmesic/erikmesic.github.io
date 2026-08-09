// pageload.js — render page-specific content, fill timeline and lists, contact panel behavior
async function fetchData(){
  try{
    const res = await fetch('/assets/js/data.json');
    return res.ok ? res.json() : null;
  }catch(e){console.error(e);return null}
}

function escape(s){ return s ? String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : '' }

async function render(){
  const data = await fetchData();
  if(!data) return;
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  // Home
  const nameEl = document.getElementById('name'); if(nameEl) nameEl.textContent = data.name;
  const headline = document.getElementById('headline'); if(headline) headline.textContent = data.headline;
  const summary = document.getElementById('summary'); if(summary) summary.textContent = data.summary;

  // Projects index
  const projectsRoot = document.getElementById('projects-list');
  if(projectsRoot){ projectsRoot.innerHTML=''; (data.projects||[]).forEach(p=>{ const c=document.createElement('div'); c.className='card'; c.innerHTML=`<h3>${escape(p.name)}</h3><p class="muted">${escape((p.tags||[]).join(', '))}</p><p>${escape(p.description)}</p><p><a href="/projects/${encodeURIComponent(p.name.toLowerCase().replace(/[^a-z0-9]+/g,'-'))}.html">Read more</a></p>`; projectsRoot.appendChild(c); }); }

  // Education
  const eduRoot = document.getElementById('education-list');
  if(eduRoot){ eduRoot.innerHTML=''; (data.education||[]).forEach(ed=>{ const el=document.createElement('div'); el.className='edu-item'; el.innerHTML=`<strong>${escape(ed.school)}</strong><div class="muted">${escape(ed.degree)} • ${escape(ed.range)}</div><p>${escape(ed.details)}</p>`; eduRoot.appendChild(el); }); }

  // Honors
  const honorsRoot = document.getElementById('honors-list');
  if(honorsRoot){ honorsRoot.innerHTML=''; (data.honors||[]).forEach(h=>{ const li=document.createElement('li'); li.textContent = h; honorsRoot.appendChild(li); }); }

  // Timeline (Experience)
  const timelineRoot = document.getElementById('timeline');
  if(timelineRoot){ timelineRoot.innerHTML=''; (data.experience||[]).forEach(e=>{
    const item = document.createElement('div'); item.className='timeline-item';
    const title = document.createElement('h3'); title.textContent = e.title; item.appendChild(title);
    const meta = document.createElement('div'); meta.className='muted'; meta.textContent = `${e.company} • ${e.range}` + (e.location? ' • '+e.location : ''); item.appendChild(meta);
    if(e.description){
      const p = document.createElement('p'); p.textContent = e.description; item.appendChild(p);
    }
    timelineRoot.appendChild(item);
  }); }

}

// Contact panel interactions
function setupContactPanel(){
  const open = document.getElementById('contact-open');
  const panel = document.getElementById('contact-panel');
  const close = document.getElementById('contact-close');
  if(!open || !panel) return;
  open.addEventListener('click', ()=>{ panel.style.display = 'block'; panel.setAttribute('aria-hidden','false'); });
  close.addEventListener('click', ()=>{ panel.style.display = 'none'; panel.setAttribute('aria-hidden','true'); });
  panel.addEventListener('click', (e)=>{ if(e.target === panel){ panel.style.display='none'; panel.setAttribute('aria-hidden','true'); } });
}

// smooth anchor scrolling with topbar offset
function setupAnchors(){
  const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--topbar-height')) || 56;
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset - 12, behavior: 'smooth' }); }
    });
  });
}

// Theme toggle
function setupThemeToggle(){
  const toggle = document.getElementById('theme-toggle');
  if(!toggle) return;
  function applyTheme(t){ if(t==='light') document.documentElement.classList.add('light'); else document.documentElement.classList.remove('light'); localStorage.setItem('site-theme', t); toggle.textContent = t==='light'?'☼':'☾'; }
  toggle.addEventListener('click', ()=>{ const cur = localStorage.getItem('site-theme')||'dark'; applyTheme(cur==='light'?'dark':'light'); });
  const saved = localStorage.getItem('site-theme'); const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; applyTheme(saved || (prefersDark?'dark':'light'));
}

// initialize
document.addEventListener('DOMContentLoaded', ()=>{ render().then(()=>{ setupContactPanel(); setupAnchors(); setupThemeToggle(); }); });
