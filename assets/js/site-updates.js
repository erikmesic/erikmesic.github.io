/* Only the requested presentation/link adjustments. The site's existing renderer remains the source of truth. */
(function(){
  'use strict';
  const BROWN='#7a4b2f';
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
    homework:'https://www.linkedin.com/company/homework-helping/',
    aps:'https://www.linkedin.com/company/accelerated-preparation-society/',
    scre:'https://www.linkedin.com/company/student-collective-for-educational-reform/'
  };
  function addStyle(){
    if(document.getElementById('site-updates-style'))return;
    const s=document.createElement('style');
    s.id='site-updates-style';
    s.textContent=`
      .site-honor-mark{color:${BROWN};font-weight:800;margin-left:.3em}
      .site-external-links{display:flex;flex-wrap:wrap;gap:9px;margin-top:9px}
      .site-external-link{font-size:11px;color:${BROWN};text-decoration:underline;text-underline-offset:3px}
      .project-card-meta{font-weight:700!important}
    `;
    document.head.appendChild(s);
  }
  function link(text,href){
    const a=document.createElement('a');a.className='site-external-link';a.href=href;a.textContent=text;
    if(/^https?:/.test(href)){a.target='_blank';a.rel='noopener noreferrer'}
    return a;
  }
  function selectFloridaSenatePage(){
    document.querySelectorAll('.timeline-item').forEach(item=>{
      const title=item.querySelector('h3')?.textContent.trim();
      if(title!=='Florida Senate Page')return;
      item.classList.add('timeline-item-featured');
      if(!item.querySelector('.timeline-featured-label')){
        const label=document.createElement('span');label.className='timeline-featured-label';label.textContent='Selected experience';item.querySelector('.timeline-content')?.appendChild(label);
      }
    });
  }
  function addExperienceLinks(){
    document.querySelectorAll('.timeline-item').forEach(item=>{
      const title=item.querySelector('h3')?.textContent.trim()||'';
      const company=item.querySelector('.timeline-company')?.textContent.trim()||'';
      item.querySelector('.site-external-links')?.remove();
      let urls=[];
      if(title==='Debater')urls=[['WSHU',LINKS.wshu],['SBU News',LINKS.sbu]];
      else if(title==='Legislative Advocate')urls=[['Florida Senate · SB 1676',LINKS.sb1676],['RAISE Act project',LINKS.raiseAct]];
      else if(title==='NYU Ambassador')urls=[['IPPF · NYU Ambassadors',LINKS.ippf]];
      else if(title==='Associate Editor')urls=[['ULR masthead',LINKS.ulr]];
      else if(title==='Founder and Co-President'&&company.startsWith('Accelerated Preparation Society'))urls=[['LinkedIn',LINKS.aps]];
      else if(title==='Founder and President'&&company.startsWith('Homework Helping'))urls=[['LinkedIn',LINKS.homework]];
      else if(title==='Founder and President'&&company.startsWith('Student Collective for Educational Reform'))urls=[['LinkedIn',LINKS.scre]];
      else if(title==='Treasurer'&&company.startsWith('Future Business Leaders of America'))urls=[['FBLA standings',LINKS.fblaStandings],['Credentials',LINKS.fblaCredentials]];
      if(!urls.length)return;
      const box=document.createElement('div');box.className='site-external-links';urls.forEach(([t,u])=>box.appendChild(link(t,u)));
      item.querySelector('.timeline-company')?.after(box);
    });
  }
  function addHonorMarks(){
    const selected=[
      '2nd Place, Ethan Rosen Incentive Award (ERIA)',
      'Quarterfinalist and 6th Seed, Jacob M. Weigler Gotham Debate Tournament, Novice Division',
      'FBLA International High School Business Law Champion (1st Place)',
      'Mathematics Department Diamond Award',
      '3rd Place, FAMAT Strawberry Crest High School Regionals, Statistics',
      '7th Place, Statistics, University of South Florida Math Bowl Competition',
      '1st Place, H.C.T.E. 2025 Spring Writing Awards, Nonfiction'
    ];
    document.querySelectorAll('.honor-item').forEach(item=>{
      const strong=item.querySelector('.honor-main strong');if(!strong)return;
      const title=strong.textContent.trim().replace(/\s*\*$/,'');
      item.querySelector('.site-honor-mark')?.remove();
      if(!selected.includes(title))return;
      const mark=document.createElement('span');mark.className='site-honor-mark';mark.textContent='*';strong.appendChild(mark);
      item.querySelector('.site-external-links')?.remove();
      let urls=[];
      if(title==='FBLA International High School Business Law Champion (1st Place)')urls=[['FBLA standings',LINKS.fblaStandings],['Credentials',LINKS.fblaCredentials]];
      else if(title.includes('FAMAT Strawberry Crest')||title.includes('FAMAT George S. Middleton'))urls=[['FAMAT standings',LINKS.famatResults]];
      else if(title==='National Merit Semifinalist')urls=[['Plant City Observer',LINKS.nationalMerit]];
      if(urls.length){const box=document.createElement('div');box.className='site-external-links';urls.forEach(([t,u])=>box.appendChild(link(t,u)));item.querySelector('.honor-main')?.after(box)}
    });
  }
  function apply(){addStyle();selectFloridaSenatePage();addExperienceLinks();addHonorMarks();}
  function start(){apply();window.addEventListener('site:data-ready',apply);setTimeout(apply,300);setTimeout(apply,1000);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();