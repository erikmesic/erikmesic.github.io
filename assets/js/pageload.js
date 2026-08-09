// pageload.js — render page-specific content from data.json and add theme toggle
async function fetchData(){
  const res = await fetch('/assets/js/data.json');
  return res.ok ? res.json() : null;
}

function escape(s){ return s?(String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')):'' }

async function render(){
  const data = await fetchData();
  if(!data) return;
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  // Home page elements
  const nameEl = document.getElementById('name'); if(nameEl) nameEl.textContent = data.name;
  const headline = document.getElementById('headline'); if(headline) headline.textContent = data.headline;
  const summary = document.getElementById('summary'); if(summary) summary.textContent = data.summary;

  // Experience page
  const expRoot = document.getElementById('experience-list');
  if(expRoot){ expRoot.innerHTML=''; (data.experience||[]).forEach(e=>{ const el=document.createElement('div'); el.className='item'; el.innerHTML=`<h3>${escape(e.title)}</h3><div class="muted">${escape(e.company)} • ${escape(e.range)} ${e.location? '• '+escape(e.location):''}</div><p style="margin-top:8px">${escape(e.description)}</p>`; expRoot.appendChild(el); }); }

  // Projects page
  const projectsRoot = document.getElementById('projects-list');
  if(projectsRoot){ projectsRoot.innerHTML=''; (data.projects||[]).forEach(p=>{ const c=document.createElement('div'); c.className='card'; c.innerHTML=`<h3>${escape(p.name)}</h3><p class="muted">${escape((p.tags||[]).join(', '))}</p><p>${escape(p.description)}</p>`; projectsRoot.appendChild(c); }); }

  // Education
  const eduRoot = document.getElementById('education-list');
  if(eduRoot){ eduRoot.innerHTML=''; (data.education||[]).forEach(ed=>{ const el=document.createElement('div'); el.className='item'; el.innerHTML=`<strong>${escape(ed.school)}</strong><div class="muted">${escape(ed.degree)} • ${escape(ed.range)}</div><p>${escape(ed.details)}</p>`; eduRoot.appendChild(el); }); }

  // Honors
  const honorsRoot = document.getElementById('honors-list');
  if(honorsRoot){ honorsRoot.innerHTML=''; (data.honors||[]).forEach(h=>{ const li=document.createElement('li'); li.textContent=h; honorsRoot.appendChild(li); }); }

  // Contact page
  const emailLink = document.getElementById('email-link'); if(emailLink) { emailLink.href = 'mailto:'+data.contact.email; emailLink.textContent = data.contact.email }
  const linkedinLink = document.getElementById('linkedin-link'); if(linkedinLink) linkedinLink.href = data.contact.linkedin;
}

// Theme toggle setup
const toggle = document.getElementById('theme-toggle');
function applyTheme(t){ if(t==='light') document.documentElement.classList.add('light'); else document.documentElement.classList.remove('light'); localStorage.setItem('site-theme', t); toggle.textContent = t==='light'?'☼':'☾'; }
if(toggle){ toggle.addEventListener('click', ()=>{ const cur = localStorage.getItem('site-theme')||'dark'; applyTheme(cur==='light'?'dark':'light'); }); const saved = localStorage.getItem('site-theme'); const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; applyTheme(saved || (prefersDark?'dark':'light')); }

render();
