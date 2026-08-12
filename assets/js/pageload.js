// pageload.js — shared site behavior and data population
(function(){
  const NAV_ITEMS = [
    ['Home', '/'],
    ['Experience', '/experience.html'],
    ['Projects', '/projects.html'],
    ['Education', '/education.html'],
    ['Honors', '/honors.html'],
    ['Hobbies', '/hobbies.html']
  ];

  function currentPath(){
    const path = window.location.pathname.replace(/\/+$/, '');
    return path === '' ? '/' : path;
  }

  function buildNavigation(){
    const nav = document.querySelector('.topnav');
    if(!nav) return;

    const path = currentPath();
    nav.innerHTML = NAV_ITEMS.map(([label, href]) => {
      const active = href === '/' ? path === '/' || path === '/index.html' : path === href;
      return `<a href="${href}"${active ? ' class="active" aria-current="page"' : ''}>${label}</a>`;
    }).join('');
    nav.setAttribute('aria-label', 'Main navigation');

    const header = document.querySelector('.site-header');
    const inner = document.querySelector('.topbar-inner');
    if(!header || !inner) return;

    let menuButton = document.getElementById('mobile-menu-toggle');
    let mobileMenu = document.getElementById('mobile-menu');

    if(!menuButton){
      menuButton = document.createElement('button');
      menuButton.id = 'mobile-menu-toggle';
      menuButton.className = 'mobile-menu-toggle';
      menuButton.type = 'button';
      menuButton.setAttribute('aria-controls', 'mobile-menu');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      menuButton.innerHTML = '<span></span><span></span><span></span>';
      inner.appendChild(menuButton);
    }

    if(!mobileMenu){
      mobileMenu = document.createElement('nav');
      mobileMenu.id = 'mobile-menu';
      mobileMenu.className = 'mobile-menu';
      mobileMenu.setAttribute('aria-label', 'Mobile navigation');
      mobileMenu.innerHTML = NAV_ITEMS.map(([label, href]) => {
        const active = href === '/' ? path === '/' || path === '/index.html' : path === href;
        return `<a href="${href}"${active ? ' class="active" aria-current="page"' : ''}>${label}</a>`;
      }).join('');
      header.appendChild(mobileMenu);
    }

    const closeMenu = () => {
      header.classList.remove('menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    };

    menuButton.addEventListener('click', () => {
      const open = header.classList.toggle('menu-open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });

    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if(event.key === 'Escape') closeMenu();
    });
  }

  function setupMouseLight(){
    let light = document.getElementById('mouse-light');
    if(!light){
      light = document.createElement('div');
      light.id = 'mouse-light';
      light.setAttribute('aria-hidden', 'true');
      document.body.appendChild(light);
    }

    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if(window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

    window.addEventListener('mousemove', event => {
      light.style.left = `${event.clientX}px`;
      light.style.top = `${event.clientY}px`;
    }, {passive:true});
  }

  function setupContact(data){
    const pill = document.getElementById('contact-pill');
    const panel = document.getElementById('contact-panel');
    if(!pill || !panel) return;

    const email = data?.contact?.email || 'erik.mesic@live.com';
    const linkedin = data?.contact?.linkedin || 'https://www.linkedin.com/in/erikmesic/';
    pill.textContent = `Contact • ${email}`;

    const emailLink = panel.querySelector('[data-contact-email]');
    const linkedinLink = panel.querySelector('[data-contact-linkedin]');
    if(emailLink){ emailLink.href = `mailto:${email}`; emailLink.textContent = email; }
    if(linkedinLink){ linkedinLink.href = linkedin; linkedinLink.textContent = linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com/, ''); }

    const close = document.getElementById('contact-close');
    const closePanel = () => { panel.style.display='none'; panel.setAttribute('aria-hidden','true'); };
    pill.addEventListener('click', () => { panel.style.display='block'; panel.setAttribute('aria-hidden','false'); });
    close?.addEventListener('click', closePanel);
    panel.addEventListener('click', event => { if(event.target === panel) closePanel(); });
  }

  function setupTheme(){
    const toggle = document.getElementById('theme-toggle');
    const saved = localStorage.getItem('site-theme');
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const apply = theme => {
      document.documentElement.classList.toggle('light', theme === 'light');
      localStorage.setItem('site-theme', theme);
      if(toggle) toggle.textContent = theme === 'light' ? '☼' : '☾';
    };
    apply(saved || (prefersDark ? 'dark' : 'light'));
    toggle?.addEventListener('click', () => {
      const current = localStorage.getItem('site-theme') || 'dark';
      apply(current === 'light' ? 'dark' : 'light');
    });
  }

  async function loadData(){
    try{
      const res = await fetch('/assets/js/data.json', {cache:'no-store'});
      if(!res.ok) throw new Error(`data.json returned ${res.status}`);
      const data = await res.json();

      document.querySelectorAll('[data-site-name]').forEach(el => el.textContent = data.name || 'Erik Mesic');
      const headline = document.getElementById('headline');
      if(headline && data.headline) headline.textContent = data.headline;
      const summary = document.getElementById('summary');
      if(summary && data.summary) summary.textContent = data.summary;

      document.querySelectorAll('.footer p').forEach(p => p.textContent = `© ${new Date().getFullYear()} ${data.name || 'Erik Mesic'}`);

      const cardRoot = document.getElementById('featured-projects');
      if(cardRoot && data.projects){
        cardRoot.innerHTML = '';
        data.projects.forEach(p => {
          const slug = p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
          const a = document.createElement('a');
          a.className = 'card';
          a.href = `/projects/${encodeURIComponent(slug)}.html`;
          a.innerHTML = `<h3>${p.name}</h3><p class="muted">${(p.tags||[]).join(', ')}</p><p>${p.description || ''}</p>`;
          cardRoot.appendChild(a);
        });
      }

      const timelineRoot = document.getElementById('timeline');
      if(timelineRoot && data.experience){
        timelineRoot.innerHTML = '';
        data.experience.forEach(e => {
          const item = document.createElement('div');
          item.className = 'timeline-item';
          item.innerHTML = `<h3>${e.title}</h3><div class="muted">${e.company} • ${e.range}${e.location ? ' • ' + e.location : ''}</div>`;
          if(e.bullets?.length){
            const ul = document.createElement('ul');
            e.bullets.forEach(b => { const li=document.createElement('li'); li.textContent=b; ul.appendChild(li); });
            item.appendChild(ul);
          } else if(e.description){
            const p=document.createElement('p'); p.textContent=e.description; item.appendChild(p);
          }
          timelineRoot.appendChild(item);
        });
      }

      const honorsRoot = document.getElementById('honors-list');
      if(honorsRoot && data.honors){
        honorsRoot.innerHTML = '';
        const grouped = {};
        data.honors.forEach(h => { (grouped[h.year] ||= []).push(h); });
        Object.keys(grouped).sort((a,b)=>b-a).forEach(year => {
          const yearH=document.createElement('h3'); yearH.textContent=year; honorsRoot.appendChild(yearH);
          grouped[year].forEach(h => {
            const li=document.createElement('li');
            li.innerHTML=`<strong>${h.title}</strong> — ${h.issuer} · ${h.month || ''} ${h.year}<div class="muted">${h.note || ''}</div>`;
            honorsRoot.appendChild(li);
          });
        });
      }

      const hobbiesRoot = document.getElementById('hobbies-root');
      if(hobbiesRoot && data.hobbies){
        hobbiesRoot.innerHTML='';
        data.hobbies.forEach(h => { const d=document.createElement('div'); d.className='hobby-item'; d.innerHTML=`<h4>${h}</h4>`; hobbiesRoot.appendChild(d); });
      }

      const pimg=document.querySelector('.profile-photo');
      if(pimg && data.contact?.photo){
        pimg.src=data.contact.photo;
        pimg.addEventListener('error', () => {
          pimg.classList.add('profile-photo-missing');
          pimg.removeAttribute('src');
        }, {once:true});
      }

      setupContact(data);
    }catch(err){
      console.error('Error loading data.json', err);
      setupContact({});
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildNavigation();
    setupMouseLight();
    setupTheme();
    loadData();
  });
})();
