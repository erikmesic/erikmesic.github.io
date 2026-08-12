// visuals.js — lightweight editorial motion bootstrap
(function(){
  function loadOverrides(){
    if(document.querySelector('link[data-phase1-overrides]'))return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='/assets/css/phase1-overrides.css';
    link.dataset.phase1Overrides='true';
    document.head.appendChild(link);
  }

  function loadEditorial(){
    if(document.querySelector('script[data-editorial]'))return;
    const script=document.createElement('script');
    script.src='/assets/js/editorial.js';
    script.async=false;
    script.dataset.editorial='true';
    script.onerror=()=>console.warn('Editorial motion layer unavailable; core site remains active.');
    document.head.appendChild(script);
  }

  function typeEffect(el,text,speed=42){
    if(!el||el.dataset.typed==='true'||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
    el.dataset.typed='true';
    el.setAttribute('aria-label',text);
    el.innerHTML='';
    const textSpan=document.createElement('span');
    textSpan.className='type-text';
    const caret=document.createElement('span');
    caret.className='type-caret';
    el.append(textSpan,caret);
    let i=0;
    const id=setInterval(()=>{
      if(i<text.length) textSpan.textContent+=text[i++];
      else { clearInterval(id); setTimeout(()=>caret.remove(),500); }
    },speed);
  }

  // Do not observe project-card mutations here. The previous MutationObserver
  // observed the same nodes it modified, causing an endless callback loop.
  function cleanProjectMeta(){
    document.querySelectorAll('.project-card-meta').forEach(meta=>{
      const status=meta.querySelector(':scope > span:first-child');
      const subjects=meta.querySelector(':scope > span:nth-child(2)');
      if(status) status.textContent=status.textContent.replace(/\s*featured\s*·?\s*/ig,'').trim();
      if(subjects){
        subjects.style.whiteSpace='nowrap';
        subjects.style.overflow='hidden';
        subjects.style.textOverflow='ellipsis';
      }
    });
  }

  function init(){
    loadOverrides();
    document.querySelectorAll('.page-title').forEach(el=>typeEffect(el,el.textContent.trim()));
    cleanProjectMeta();
    // Data is rendered asynchronously. Clean the metadata once after it arrives;
    // never continuously observe the DOM.
    window.addEventListener('site:data-ready',cleanProjectMeta,{once:true});
    loadEditorial();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
