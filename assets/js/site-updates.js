/* Small, one-shot presentation enhancements layered on top of the site's normal data renderer. */
(function(){
  'use strict';
  const BROWN='#7a4b2f';
  const SELECTED_EXPERIENCES=new Set([
    'Strategic Real Estate and Investments Analyst|Monsoon Asset Management, LLC',
    'Legislative Advocate|Florida SB 1676 (RAISE Act)',
    'Debater|Cross Examination Debate Association (CEDA)',
    'Founder and Co-President|Accelerated Preparation Society',
    'Treasurer|Future Business Leaders of America, Durant High School',
    'Florida Senate Page|Florida Senate Page Program',
    'Founder and President|Homework Helping',
    'Founder and President|Student Collective for Educational Reform'
  ]);
  const SELECTED_HONORS=new Set([
    '2nd Place, Ethan Rosen Incentive Award (ERIA)',
    'Quarterfinalist and 6th Seed, Jacob M. Weigler Gotham Debate Tournament, Novice Division',
    'FBLA International High School Business Law Champion (1st Place)',
    'Mathematics Department Diamond Award',
    '3rd Place, FAMAT Strawberry Crest High School Regionals, Statistics',
    '7th Place, Statistics, University of South Florida Math Bowl Competition',
    '1st Place, H.C.T.E. 2025 Spring Writing Awards, Nonfiction'
  ]);
  const LINKS={
    fblaStandings:'https://www.fbla.org/media/2025/07/TOP_10_NLC_HS.pdf',
    fblaCredentials:'https://www.credly.com/badges/a679ddd4-7638-41f5-bb62-5c5865a240d1/public_url',
    famatResults:'https://famat.org/results/',
    nationalMerit:'https://www.plantcityobserver.com/strawberry-crest-announces-28-national-merit-semifinalists/',
    ippf:'https://www.ippfdebate.com/nyuambassadors',
    ulr:'https://ulrnyu.org/new-page-1',
    sb1676:'https://www.flsenate.gov/Session/Bill/2026/1676',
    raiseAct:'/projects/raise-act-legislative-advocacy.html',
    wshu:'https://www.wshu.org/long-island-news/2026-05-06/nyu-students-debate-coastal-climate-strategy',
    sbu:'https://news.stonybrook.edu/university/3rd-annual-c4e-environmental-forum-ponders-managed-retreat-vs-coastal-defense/',
    linkedin:'https://www.linkedin.com/in/erikmesic/'
  };
  function style(){if(document.getElementById('site-updates-style'))return;const s=document.createElement('style');s.id='site-updates-style';s.textContent=`
    .site-selected-mark{color:${BROWN};font-weight:800;margin-left:.3em}
    .site-selected-label{display:block;margin-top:9px;color:${BROWN};font-size:10px;text-transform:uppercase;letter-spacing:.12em;font-weight:600}
    .site-external-links{display:flex;flex-wrap:wrap;gap:9px;margin-top:9px}
    .site-external-link{font-size:11px;color:${BROWN};text-decoration:underline;text-underline-offset:3px}
    .honor-item-selected{border-top-color:rgba(122,75,47,.3)!important;background:linear-gradient(90deg,rgba(122,75,47,.045),transparent 72%);padding-left:8px;padding-right:8px;border-radius:4px}
    .project-card-meta{font-weight:700!important}
  `;document.head.appendChild(s)}
  function makeLink(text,href){const a=document.createElement('a');a.className='site-external-link';a.href=href;a.textContent=text;if(/^https?:/.test(href)){a.target='_blank';a.rel='noopener noreferrer'}return a}
  function markExperience(){document.querySelectorAll('.timeline-item').forEach(item=>{const h=item.querySelector('.timeline-content h3');const company=item.querySelector('.timeline-company');if(!h||!company)return;const key=`${h.textContent.trim().replace(/\s*\*$/,'')}|${company.textContent.trim()}`;const selected=SELECTED_EXPERIENCES.has(key);item.classList.toggle('timeline-item-featured',selected);item.querySelector('.site-selected-label')?.remove();item.querySelector('.site-selected-mark')?.remove();if(selected){const star=document.createElement('span');star.className='site-selected-mark';star.textContent='*';h.appendChild(star);const label=document.createElement('span');label.className='site-selected-label';label.textContent='Selected experience';item.querySelector('.timeline-content').appendChild(label)}})}
  function addExperienceLinks(){document.querySelectorAll('.timeline-item').forEach(item=>{const title=item.querySelector('h3')?.textContent.trim().replace(/\s*\*$/,'');const company=item.querySelector('.timeline-company')?.textContent.trim()||'';const wrap=item.querySelector('.site-external-links');if(wrap)wrap.remove();let links=[];if(title==='Debater')links=[['WSHU',LINKS.wshu],['SBU News',LINKS.sbu]];else if(title==='Legislative Advocate')links=[['Florida Senate · SB 1676',LINKS.sb1676],['RAISE Act project',LINKS.raiseAct]];else if(title==='NYU Ambassador')links=[['IPPF · NYU Ambassadors',LINKS.ippf]];else if(title==='Associate Editor')links=[['ULR masthead',LINKS.ulr]];else if(title==='Founder and Co-President'&&company.startsWith('Accelerated Preparation Society'))links=[['LinkedIn',LINKS.linkedin]];else if(title==='Founder and President'&&(company.startsWith('Homework Helping')||company.startsWith('Student Collective for Educational Reform')))links=[['LinkedIn',LINKS.linkedin]];else if(title==='Treasurer'&&company.startsWith('Future Business Leaders of America'))links=[['FBLA standings',LINKS.fblaStandings],['Credentials',LINKS.fblaCredentials]];if(!links.length)return;const box=document.createElement('div');box.className='site-external-links';links.forEach(([t,u])=>box.appendChild(makeLink(t,u)));item.querySelector('.timeline-company')?.after(box)})}
  function markHonors(){document.querySelectorAll('.honor-item').forEach(item=>{const strong=item.querySelector('.honor-main strong');if(!strong)return;const title=strong.textContent.trim().replace(/\s*\*$/,'');const selected=SELECTED_HONORS.has(title);item.classList.toggle('honor-item-selected',selected);item.querySelector('.site-selected-mark')?.remove();item.querySelector('.site-selected-label')?.remove();if(selected){const star=document.createElement('span');star.className='site-selected-mark';star.textContent='*';strong.appendChild(star);const label=document.createElement('span');label.className='site-selected-label';label.textContent='Selected honor';item.appendChild(label)}item.querySelector('.site-external-links')?.remove();let links=[];if(title==='FBLA International High School Business Law Champion (1st Place)')links=[['FBLA standings',LINKS.fblaStandings],['Credentials',LINKS.fblaCredentials]];else if(title.includes('FAMAT Strawberry Crest')||title.includes('FAMAT George S. Middleton'))links=[['FAMAT standings',LINKS.famatResults]];else if(title==='National Merit Semifinalist')links=[['Plant City Observer',LINKS.nationalMerit]];if(links.length){const box=document.createElement('div');box.className='site-external-links';links.forEach(([t,u])=>box.appendChild(makeLink(t,u)));item.querySelector('.honor-main')?.after(box)}})}
  function fixDebaterCopy(){document.querySelectorAll('.timeline-item').forEach(item=>{const h=item.querySelector('h3');if(h&&h.textContent.trim().replace(/\s*\*$/,'')==='Debater')item.querySelectorAll('li').forEach(li=>{li.textContent=li.textContent.replace(/\bCompetes\b/g,'Competing').replace(/\bcompetes\b/g,'Competing')})})}
  function fixSirDetail(){const root=document.getElementById('project-detail');if(!root||root.dataset.slug!=='sir-seretse-khama')return;const eyebrow=root.querySelector('.project-header .eyebrow');if(eyebrow)eyebrow.textContent='RESEARCH · Jan 2024 – Feb 2024';const h1=root.querySelector('.project-header h1');if(h1)h1.textContent='Sir Seretse Khama: the Creation of Contemporary Botswana';document.title='Sir Seretse Khama: the Creation of Contemporary Botswana — Erik Mesic';const aside=root.querySelector('.project-aside .muted');if(aside)aside.textContent='Author and primary researcher; reviewed historical research, analyzed Sir Seretse Khama’s particular role, and revised to ensure historical accuracy.'}
  function apply(){style();markExperience();addExperienceLinks();markHonors();fixDebaterCopy();fixSirDetail()}
  let tries=0;const timer=setInterval(()=>{tries++;const rendered=document.querySelector('#timeline .timeline-item,#honors-list .honor-item,#featured-projects .project-card,#education-list .education-card,#project-detail');if(rendered){apply();clearInterval(timer)}else if(tries>60)clearInterval(timer)},200);if(document.readyState!=='loading')setTimeout(()=>{if(tries===0)apply()},100);else document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>{if(tries===0)apply()},100),{once:true});
})();