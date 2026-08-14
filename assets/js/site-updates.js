/* Site-specific content updates. Kept separate so the existing site logic remains untouched. */
(function(){
  const selectedExperience=new Set([
    'Strategic Real Estate and Investments Analyst','Legislative Advocate','Debater',
    'Founder and Co-President','Treasurer','Florida Senate Page','Founder and President|Homework Helping',
    'Founder and President|Student Collective for Educational Reform'
  ]);
  const selectedHonors=[
    h=>h.includes('Ethan Rosen Incentive Award (ERIA)'),
    h=>h.includes('Quarterfinalist and 6th Seed, Jacob M. Weigler'),
    h=>h.includes('FBLA International High School Business Law Champion'),
    h=>h.includes('Mathematics Department Diamond Award'),
    h=>h.includes('FAMAT Strawberry Crest High School Regionals'),
    h=>h.includes('University of South Florida Math Bowl Competition'),
    h=>h.includes('H.C.T.E. 2025 Spring Writing Awards')
  ];
  const links={
    associateEditor:'https://ulrnyu.org/new-page-1',
    ambassador:'https://nyucedaengage.com/service/ippf/',
    nationalMerit:'https://www.plantcityobserver.com/strawberry-crest-announces-28-national-merit-semifinalists/',
    sb1676:'https://www.flsenate.gov/Session/Bill/2026/1676',
    raiseProject:'/projects/raise-act-legislative-advocacy.html',
    fblaStandings:'https://www.fbla.org/media/2025/07/TOP_10_NLC_HS.pdf',
    fblaCredentials:'https://www.credly.com/badges/a679ddd4-7638-41f5-bb62-5c5865a240d1/public_url',
    famatStrawberry:'https://famat.org/competitions/206/',
    famatMiddleton:'https://famat.org/competitions/199/'
  };
  const a=(text,href)=>{const el=document.createElement('a');el.href=href;el.textContent=text;el.target=href.startsWith('http')?'_blank':'_self';el.rel=href.startsWith('http')?'noopener noreferrer':'';el.className='site-external-link';return el;};
  function addStyle(){if(document.getElementById('site-updates-style'))return;const s=document.createElement('style');s.id='site-updates-style';s.textContent=`
    .site-selected-mark{display:inline-block;margin-left:.35rem;color:var(--accent);font-weight:700;font-size:.95em;line-height:1}
    .site-selected-label{display:inline-block;margin-top:10px;color:var(--accent);font-size:10px;text-transform:uppercase;letter-spacing:.12em}
    .site-external-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
    .site-external-link{font-size:11px;color:var(--accent-2);text-decoration:underline;text-underline-offset:3px}
    .honor-item-selected{border-top-color:rgba(122,75,47,.28)!important;background:linear-gradient(90deg,rgba(122,75,47,.035),transparent 72%);padding-left:8px;padding-right:8px;border-radius:4px}
    .honor-item-selected .site-selected-label{margin-top:6px}
    @media(max-width:600px){.site-external-links{gap:6px}.site-external-link{font-size:10px}}
  `;document.head.appendChild(s);}
  function markSelected(item,selected){
    item.classList.toggle('timeline-item-featured',selected);
    item.querySelector('.timeline-featured-label')?.remove();
    item.querySelector('.site-selected-label')?.remove();
    item.querySelector('.site-selected-mark')?.remove();
    if(selected){const mark=document.createElement('span');mark.className='site-selected-mark';mark.setAttribute('aria-label','Selected experience');mark.textContent='*';item.querySelector('.timeline-content h3')?.appendChild(mark);const label=document.createElement('span');label.className='site-selected-label';label.textContent='Selected experience';item.querySelector('.timeline-content')?.appendChild(label);}
  }
  function experienceKey(item){const title=item.querySelector('h3')?.textContent?.trim().replace(/\s*\*$/,'')||'';const company=item.querySelector('.timeline-company')?.textContent?.trim()||'';return {title,company};}
  function updateExperience(){
    const items=[...document.querySelectorAll('.timeline-item')];
    items.forEach(item=>{
      const {title,company}=experienceKey(item);const key=`${title}|${company}`;
      const selected=selectedExperience.has(title)||selectedExperience.has(key);
      markSelected(item,selected);
      const meta=item.querySelector('.timeline-meta span:first-child');
      if(title==='Strategic Real Estate and Investments Analyst'&&meta)meta.textContent='June 2026 – September 2026';
      item.querySelector('.site-external-links')?.remove();
      let urls=[];
      if(title==='Associate Editor')urls.push(['Masthead',links.associateEditor]);
      if(title==='Legislative Advocate')urls.push(['Florida Senate · SB 1676',links.sb1676],['RAISE Act project',links.raiseProject]);
      if(title==='NYU Ambassador')urls.push(['IPPF · NYU Ambassadors',links.ambassador]);
      if(!urls.length)continue;
      const wrap=document.createElement('div');wrap.className='site-external-links';urls.forEach(([label,url])=>wrap.appendChild(a(label,url)));item.querySelector('.timeline-company')?.after(wrap);
    });
    const senate=[...document.querySelectorAll('.timeline-item')].find(x=>x.querySelector('h3')?.textContent?.trim().replace(/\s*\*$/,'')==='Florida Senate Page');
    if(senate)markSelected(senate,true);
  }
  function addEducationCard(afterSchool,school,degree,range,details){
    const root=document.getElementById('education-list');if(!root)return false;
    if([...root.querySelectorAll('.education-card h3')].some(x=>x.textContent.trim()===school))return true;
    const cards=[...root.querySelectorAll('.education-card')];const target=cards.find(c=>c.querySelector('h3')?.textContent.trim()===afterSchool);if(!target)return false;
    const card=document.createElement('article');card.className='card education-card';card.innerHTML=`<p class="eyebrow"></p><h3></h3><p><strong></strong></p><p class="muted"></p>`;card.querySelector('.eyebrow').textContent=range;card.querySelector('h3').textContent=school;card.querySelector('strong').textContent=degree;card.querySelector('.muted').textContent=details;target.after(card);return true;
  }
  function updateEducation(){
    addEducationCard('New York University — Stern School of Business','Yonsei University','Non-Degree','Spring 2027','GPA: n/a. Selected for admission to Yonsei University, my first choice, from among a very competitive applicant pool for the International Business Exchange (IBEX) program in Spring 2027 at NYU Stern.');
    addEducationCard('Hillsborough College','University of South Florida','Non-Degree','Fall 2024','GPA: 4.0. Completed Calculus III and Analytic Geography through in-person classes as a dual enrollment student.');
  }
  function updateHonorLinks(item,title){
    const existing=item.querySelector('.site-external-links');existing?.remove();let urls=[];
    if(title.includes('FBLA International High School Business Law Champion'))urls.push(['Standings',links.fblaStandings],['Credentials',links.fblaCredentials]);
    if(title.includes('National Merit Semifinalist'))urls.push(['Plant City Observer',links.nationalMerit]);
    if(title.includes('FAMAT Strawberry Crest'))urls.push(['Competition page',links.famatStrawberry]);
    if(title.includes('FAMAT George S. Middleton'))urls.push(['Competition page',links.famatMiddleton]);
    if(!urls.length)return;const wrap=document.createElement('div');wrap.className='site-external-links';urls.forEach(([label,url])=>wrap.appendChild(a(label,url)));item.querySelector('.honor-main')?.after(wrap);
  }
  function updateHonors(){
    document.querySelectorAll('.honor-item').forEach(item=>{
      const title=item.querySelector('.honor-main strong')?.textContent?.trim().replace(/\s*\*$/,'')||'';const selected=selectedHonors.some(fn=>fn(title));item.classList.toggle('honor-item-selected',selected);item.querySelector('.site-selected-label')?.remove();item.querySelector('.site-selected-mark')?.remove();
      if(selected){const mark=document.createElement('span');mark.className='site-selected-mark';mark.setAttribute('aria-label','Selected honor');mark.textContent='*';item.querySelector('.honor-main strong')?.appendChild(mark);const label=document.createElement('span');label.className='site-selected-label';label.textContent='Selected honor';item.appendChild(label);}
      updateHonorLinks(item,title);
    });
  }
  function updateProjectCards(){
    const featured=document.getElementById('featured-projects'),additional=document.getElementById('additional-projects');
    const changeTitle=(slug,full,short)=>{const card=document.querySelector(`a.project-card[href*="${slug}"]`);if(card){const h=card.querySelector('h3');if(h)h.textContent=short||full;card.dataset.fullProjectTitle=full;}};
    changeTitle('assessing-tucson-property','Assessing Tucson Property: A Deep Analysis of Three Potential Options Following a Distressed Scenario','Assessing Tucson Property');
    changeTitle('can-t-runoff','Can’t Runoff: A Stakeholder Solution for South Florida Eutrophication','Can’t Runoff');
    changeTitle('changing-social-landscapes','Changing Social Landscapes: A Mixed-Method Examination of ChatGPT Bias and Popular Opinion as Factors in Non-Meat Diet Adoption in Core Anglosphere Countries','Changing Social Landscapes');
    const tucson=document.querySelector('a.project-card[href*="assessing-tucson-property"]');const changing=document.querySelector('a.project-card[href*="changing-social-landscapes"]');
    if(tucson?.querySelector('.project-card-meta span:first-child'))tucson.querySelector('.project-card-meta span:first-child').textContent='Investment Analysis · June 2026 – July 2026';
    if(featured&&tucson&&tucson.parentElement!==featured)featured.appendChild(tucson);
    if(additional&&changing&&changing.parentElement!==additional)additional.appendChild(changing);
    [tucson,changing].forEach(card=>{if(!card)return;card.classList.toggle('featured-project',card.parentElement===featured);const label=card.querySelector('.project-featured-label');if(card.parentElement===featured&&!label){const meta=card.querySelector('.project-card-meta');if(meta){const span=document.createElement('span');span.className='project-featured-label';span.textContent='Featured';meta.appendChild(span);}}if(card.parentElement===additional)label?.remove();});
  }
  function updateProjectDetail(){
    const root=document.getElementById('project-detail');if(!root)return;const slug=root.dataset.slug||location.pathname.split('/').pop().replace(/\.html$/,'');const h1=root.querySelector('.project-header h1');const eyebrow=root.querySelector('.project-header .eyebrow');
    const titles={'assessing-tucson-property':'Assessing Tucson Property: A Deep Analysis of Three Potential Options Following a Distressed Scenario','can-t-runoff':'Can’t Runoff: A Stakeholder Solution for South Florida Eutrophication','changing-social-landscapes':'Changing Social Landscapes: A Mixed-Method Examination of ChatGPT Bias and Popular Opinion as Factors in Non-Meat Diet Adoption in Core Anglosphere Countries'};
    if(titles[slug]&&h1){h1.textContent=titles[slug];document.title=`${titles[slug]} — Erik Mesic`;}
    if(slug==='assessing-tucson-property'&&eyebrow)eyebrow.textContent='Investment Analysis · June 2026 – July 2026';
    if(slug==='sir-seretse-khama')renderNewProject(root);
  }
  function renderNewProject(root){
    if(root.dataset.siteUpdateRendered==='true')return;root.dataset.siteUpdateRendered='true';
    root.innerHTML=`<a class="back-link" href="/projects.html">← All projects</a><header class="project-header"><p class="eyebrow">Additional Work</p><h1 class="page-title">Sir Seretse Khama: the Creation of Contemporary Botswana</h1><p class="project-deck">A 36-page historical paper analyzing the role of Sir Seretse Khama in the creation of contemporary Botswana.</p><div class="project-tags"><span class="tag project-tag">history</span><span class="tag project-tag">Botswana</span><span class="tag project-tag">politics</span><span class="tag project-tag">economic development</span></div></header><div class="project-layout"><article class="project-main"><section><h2>Overview</h2><p>Wrote a 36-page historical paper analyzing the role of Sir Seretse Khama in the creation of contemporary Botswana, considering Botswana's relative political stability and economic prosperity. In particular, analyzed the roles of Debswana and the De Beers Group in Botswana's diamond-forward economic development.</p></section></article><aside class="project-aside"><div class="project-aside-rule"></div><p class="eyebrow">Project</p><p class="muted">Additional project details can be added as they are finalized.</p></aside></div>`;
  }
  function addNewProjectCard(){
    const root=document.getElementById('additional-projects');if(!root||root.querySelector('[data-sir-seretse-khama]'))return;const ael=document.createElement('a');ael.dataset.sirSeretseKhama='true';ael.className='card project-card';ael.href='/projects/sir-seretse-khama.html';ael.innerHTML='<div class="project-card-meta"><span>Additional Work</span></div><div class="project-card-subjects"><span class="tag project-tag">history</span><span class="tag project-tag">Botswana</span><span class="tag project-tag">politics</span><span class="tag project-tag">economic development</span></div><h3>Sir Seretse Khama: the Creation of Contemporary Botswana</h3><p>Wrote a 36-page historical paper analyzing the role of Sir Seretse Khama in the creation of contemporary Botswana, considering Botswana’s relative political stability and economic prosperity.</p><span class="project-card-link">Read project →</span>';root.appendChild(ael);}
  function apply(){addStyle();updateEducation();updateExperience();updateHonors();updateProjectCards();updateProjectDetail();addNewProjectCard();}
  function start(){apply();window.addEventListener('site:data-ready',apply);setTimeout(apply,300);setTimeout(apply,1000);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
