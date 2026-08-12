// pageload.js — shared site behavior and data population
(function(){
  const NAV_ITEMS = [['Home','/'],['Experience','/experience.html'],['Projects','/projects.html'],['Education','/education.html'],['Honors','/honors.html'],['Hobbies','/hobbies.html']];
  const currentPath=()=>{const p=window.location.pathname.replace(/\/+$/,'');return p===''?'/':p;};

  function buildNavigation(){
    const nav=document.querySelector('.topnav'); if(!nav)return;
    const path=currentPath();
    const links=items=>items.map(([label,href])=>{const active=href==='/'?(path==='/'||path==='/index.html'):path===href;return `<a href="${href}"${active?' class="active" aria-current="page"':''}>${label}</a>`;}).join('');
    nav.innerHTML=links(NAV_ITEMS); nav.setAttribute('aria-label','Main navigation');
    const header=document.querySelector('.site-header'),inner=document.querySelector('.topbar-inner'); if(!header||!inner)return;
    let button=document.getElementById('mobile-menu-toggle'),menu=document.getElementById('mobile-menu');
    if(!button){button=document.createElement('button');button.id='mobile-menu-toggle';button.className='mobile-menu-toggle';button.type='button';button.setAttribute('aria-controls','mobile-menu');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Open navigation');button.innerHTML='<span></span><span></span><span></span>';inner.appendChild(button);}
    if(!menu){menu=document.createElement('nav');menu.id='mobile-menu';menu.className='mobile-menu';menu.setAttribute('aria-label','Mobile navigation');menu.innerHTML=links(NAV_ITEMS);header.appendChild(menu);}
    const close=()=>{header.classList.remove('menu-open');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Open navigation');};
    button.onclick=()=>{const open=header.classList.toggle('menu-open');button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Close navigation':'Open navigation');};
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  }

  function setupMouseLight(){
    let light=document.getElementById('mouse-light'); if(!light){light=document.createElement('div');light.id='mouse-light';light.setAttribute('aria-hidden','true');document.body.appendChild(light);}
    if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||window.matchMedia?.('(pointer: coarse)').matches)return;
    window.addEventListener('mousemove',e=>{light.style.left=`${e.clientX}px`;light.style.top=`${e.clientY}px`;},{passive:true});
  }

  function setupContact(data){
    const pill=document.getElementById('contact-pill'),panel=document.getElementById('contact-panel'); if(!pill||!panel)return;
    const email=data?.contact?.email||'erik.mesic@live.com',linkedin=data?.contact?.linkedin||'https://www.linkedin.com/in/erikmesic/';
    pill.textContent=`Contact • ${email}`;
    const el=panel.querySelector('[data-contact-email]'),ll=panel.querySelector('[data-contact-linkedin]');
    if(el){el.href=`mailto:${email}`;el.textContent=email;} if(ll){ll.href=linkedin;ll.textContent=linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com/,'');}
    const close=()=>{panel.style.display='none';panel.setAttribute('aria-hidden','true');};
    pill.onclick=()=>{panel.style.display='block';panel.setAttribute('aria-hidden','false');};
    document.getElementById('contact-close')?.addEventListener('click',close); panel.addEventListener('click',e=>{if(e.target===panel)close();});
  }

  function setupTheme(){
    const toggle=document.getElementById('theme-toggle'),saved=localStorage.getItem('site-theme'),prefersDark=window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const apply=t=>{document.documentElement.classList.toggle('light',t==='light');localStorage.setItem('site-theme',t);if(toggle)toggle.textContent=t==='light'?'☼':'☾';};
    apply(saved||(prefersDark?'dark':'light')); toggle?.addEventListener('click',()=>apply((localStorage.getItem('site-theme')||'dark')==='light'?'dark':'light'));
  }

  function renderEducation(data){
    const root=document.getElementById('education-list'); if(!root||!data.education)return;
    root.innerHTML='';
    data.education.forEach(e=>{const card=document.createElement('article');card.className='card';card.innerHTML=`<h3>${e.school}</h3><p class="muted">${e.degree}</p><p class="muted">${e.range}</p><p>${e.details||''}</p>`;root.appendChild(card);});
  }

  async function loadData(){
    try{
      const res=await fetch('/assets/js/data.json',{cache:'no-store'}); if(!res.ok)throw new Error(`data.json returned ${res.status}`); const data=await res.json();
      document.querySelectorAll('[data-site-name]').forEach(el=>el.textContent=data.name||'Erik Mesic');
      const headline=document.getElementById('headline');if(headline&&data.headline)headline.textContent=data.headline;
      const summary=document.getElementById('summary');if(summary&&data.summary)summary.textContent=data.summary;
      document.querySelectorAll('.footer p').forEach(p=>p.textContent=`© ${new Date().getFullYear()} ${data.name||'Erik Mesic'}`);
      renderEducation(data);
      const cards=document.getElementById('featured-projects'); if(cards&&data.projects){cards.innerHTML='';data.projects.forEach(p=>{const a=document.createElement('a');a.className='card';a.href=`/projects/${encodeURIComponent(p.slug)}.html`;a.innerHTML=`<h3>${p.name}</h3><p class="muted">${(p.tags||[]).join(' · ')}</p><p>${p.description||''}</p>`;cards.appendChild(a);});}
      const timeline=document.getElementById('timeline');if(timeline&&data.experience){timeline.innerHTML='';data.experience.forEach(e=>{const item=document.createElement('div');item.className='timeline-item';item.innerHTML=`<h3>${e.title}</h3><div class="muted">${e.company} · ${e.range}${e.location?' · '+e.location:''}</div>`;if(e.bullets?.length){const ul=document.createElement('ul');e.bullets.forEach(b=>{const li=document.createElement('li');li.textContent=b;ul.appendChild(li);});item.appendChild(ul);}else if(e.description){const p=document.createElement('p');p.textContent=e.description;item.appendChild(p);}timeline.appendChild(item);});}
      const honors=document.getElementById('honors-list');if(honors&&data.honors){honors.innerHTML='';const grouped={};data.honors.forEach(h=>(grouped[h.year]??=[]).push(h));Object.keys(grouped).sort((a,b)=>b-a).forEach(year=>{const h3=document.createElement('h3');h3.textContent=year;honors.appendChild(h3);grouped[year].forEach(h=>{const li=document.createElement('li');li.innerHTML=`<strong>${h.title}</strong> — ${h.issuer} · ${h.month||''} ${h.year}<div class="muted">${h.note||''}</div>`;honors.appendChild(li);});});}
      const hobbies=document.getElementById('hobbies-root');if(hobbies&&data.hobbies){hobbies.innerHTML='';data.hobbies.forEach(h=>{const d=document.createElement('div');d.className='hobby-item';d.innerHTML=`<h4>${h}</h4>`;hobbies.appendChild(d);});}
      const img=document.querySelector('.profile-photo');if(img&&data.contact?.photo){img.src=data.contact.photo;img.addEventListener('error',()=>{img.classList.add('profile-photo-missing');img.removeAttribute('src');},{once:true});}
      setupContact(data);
    }catch(err){console.error('Error loading data.json',err);setupContact({});}
  }
  document.addEventListener('DOMContentLoaded',()=>{buildNavigation();setupMouseLight();setupTheme();loadData();});
})();
