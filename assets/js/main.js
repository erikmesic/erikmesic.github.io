// main.js — populate the single-page resume from data.json
async function loadData(){
  try{
    const res = await fetch('/assets/js/data.json');
    const data = await res.json();

    document.getElementById('name').textContent = data.name || 'Your Name';
    document.getElementById('headline').textContent = data.headline || '';
    document.getElementById('summary').textContent = data.summary || '';
    document.getElementById('about-text').textContent = data.about || '';

    // experience
    const expRoot = document.getElementById('experience-list');
    expRoot.innerHTML='';
    (data.experience||[]).forEach(e => {
      const el = document.createElement('div'); el.className='item';
      el.innerHTML = `<strong>${escape(e.title)}</strong> — ${escape(e.company)} <div class="muted">${escape(e.range)} • ${escape(e.location||'')}</div><div style="margin-top:8px">${escape(e.description)}</div>`;
      expRoot.appendChild(el);
    });

    // projects
    const projectsRoot = document.getElementById('projects-list'); projectsRoot.innerHTML='';
    (data.projects||[]).forEach(p=>{
      const c = document.createElement('div'); c.className='card';
      c.innerHTML = `<h3 style="margin:0">${escape(p.name)}</h3><p class="muted">${escape(p.tags?.join(', ')||'')}</p><p>${escape(p.description)}</p>${p.link?`<p><a href="${p.link}" target="_blank" rel="noopener">Project link</a></p>`:''}`;
      projectsRoot.appendChild(c);
    });

    // education
    const eduRoot = document.getElementById('education-list'); eduRoot.innerHTML='';
    (data.education||[]).forEach(ed=>{
      const el = document.createElement('div'); el.className='item';
      el.innerHTML = `<strong>${escape(ed.school)}</strong> — ${escape(ed.degree)} <div class="muted">${escape(ed.range)}</div><div style="margin-top:6px">${escape(ed.details||'')}</div>`;
      eduRoot.appendChild(el);
    });

    // skills
    const skillsRoot = document.getElementById('skills-list'); skillsRoot.innerHTML='';
    (data.skills||[]).forEach(s=>{ const sp = document.createElement('div'); sp.className='chip'; sp.textContent = s; skillsRoot.appendChild(sp); });

    // honors
    const honorsRoot = document.getElementById('honors-list'); honorsRoot.innerHTML='';
    (data.honors||[]).forEach(h=>{ const li=document.createElement('li'); li.textContent = h; honorsRoot.appendChild(li); });

    // updates
    const updatesRoot = document.getElementById('updates-list'); updatesRoot.innerHTML='';
    (data.updates||[]).forEach(u=>{ const d=document.createElement('div'); d.className='item'; d.innerHTML=`<strong>${escape(u.title)}</strong> <div class="muted">${escape(u.date)}</div><div style="margin-top:8px">${escape(u.text)}</div>`; updatesRoot.appendChild(d); });

    // contact
    const email = data.contact?.email || '#';
    const linkedin = data.contact?.linkedin || '#';
    const resume = data.contact?.resume || '#';
    document.getElementById('email-link').textContent = email; document.getElementById('email-link').href = `mailto:${email}`;
    document.getElementById('linkedin-link').href = linkedin; document.getElementById('download-resume').href = resume;

    document.getElementById('footer-year').textContent = new Date().getFullYear();

  }catch(err){
    console.error('Error loading data.json',err);
  }
}

function escape(str){ if(!str && str!==0) return ''; return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

loadData();
