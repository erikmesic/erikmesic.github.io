// visuals.js — restrained editorial motion and page-title details
(function(){
  function loadOverrides(){
    if(document.querySelector('link[data-phase1-overrides]')) return;
    const link=document.createElement('link'); link.rel='stylesheet'; link.href='/assets/css/phase1-overrides.css'; link.setAttribute('data-phase1-overrides','true'); document.head.appendChild(link);
  }
  function loadEditorial(){
    if(document.querySelector('script[data-editorial]')) return;
    const script=document.createElement('script'); script.src='/assets/js/editorial.js'; script.defer=true; script.setAttribute('data-editorial','true'); document.body.appendChild(script);
  }
  function typeEffect(el,text,speed=90){
    if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
    el.innerHTML=''; const textSpan=document.createElement('span'); textSpan.className='type-text'; const caret=document.createElement('span'); caret.className='type-caret'; el.append(textSpan,caret); let i=0;
    const id=setInterval(()=>{if(i<text.length)textSpan.textContent+=text[i++];else{clearInterval(id);setTimeout(()=>caret.remove(),800)}},speed);
  }
  function underlineNeat(el){el.classList.add('title-underline');requestAnimationFrame(()=>el.classList.add('animated'));}
  function subtleHighlight(el){el.classList.add('title-highlight');}
  document.addEventListener('DOMContentLoaded',()=>{
    loadOverrides();
    const path=location.pathname.replace(/\/$/,'');
    document.querySelectorAll('.page-title').forEach(el=>{const original=el.getAttribute('data-original-text')||el.textContent.trim();if(path===''||path==='/index.html'||path==='/')typeEffect(el,original,90);else if(path.includes('/experience'))underlineNeat(el);else if(path.includes('/projects'))subtleHighlight(el);});
    loadEditorial();
  });
})();
