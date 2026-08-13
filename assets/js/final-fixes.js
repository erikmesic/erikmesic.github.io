/* Final interaction fixes. Loaded after the legacy polish layers so these rules win. */
(function(){
  const HEADSHOT='/assets/img/headshot.jpg';
  const DISCLAIMER='* Responses are provided for general recruiting context and may contain inaccuracies. For factually reliable information, please contact Erik directly.';

  function closeAssistant(){
    const root=document.getElementById('erik-assistant');
    if(!root)return;
    root.classList.remove('open');
    root.querySelector('.assistant-panel')?.setAttribute('aria-hidden','true');
    root.querySelector('.assistant-launch')?.setAttribute('aria-expanded','false');
  }
  function closeContact(){
    const panel=document.getElementById('contact-panel');
    if(panel){panel.setAttribute('aria-hidden','true');panel.style.display='none';}
  }
  function portrait(){
    document.querySelectorAll('.profile-photo').forEach(img=>{img.src=HEADSHOT;img.setAttribute('src',HEADSHOT);img.loading='eager';img.fetchPriority='high';img.decoding='async';});
  }
  function controls(){
    const style=document.getElementById('final-fixes-style')||document.createElement('style');
    style.id='final-fixes-style';
    style.textContent=`
      #erik-assistant{position:fixed!important;right:22px!important;bottom:82px!important;left:auto!important;z-index:40!important}
      #contact-pill{position:fixed!important;right:22px!important;bottom:22px!important;left:auto!important;z-index:50!important}
      #contact-panel{position:fixed!important;right:22px!important;bottom:76px!important;left:auto!important;z-index:1000!important}
      #contact-panel[aria-hidden="false"]{z-index:1000!important}
      .signal-grid>div>strong.annotation-underline,.signal-grid>div>strong.annotation-circle,.signal-grid>div>strong.annotation-highlight{display:inline-block!important;width:max-content!important;inline-size:max-content!important;max-width:100%!important;min-width:0!important}
      .annotation-underline::after{left:0!important;right:0!important;width:100%!important}
      .annotation-highlight::after{left:0!important;right:0!important;width:100%!important}
      .annotation-circle::after{left:-.055em!important;right:-.055em!important}
      .annotation-circle::before{left:-.04em!important;right:-.07em!important}
      .assistant-disclaimer{display:block!important;margin:.8rem 0 0!important;padding-top:.55rem!important;border-top:1px solid rgba(186,142,111,.16)!important;font-size:.68rem!important;line-height:1.45!important;opacity:.62!important}

      /* The launcher is readable in light mode; the panel needs its own contrast too. */
      :root.light #erik-assistant .assistant-launch{background:#fff!important;color:#211d19!important;-webkit-text-fill-color:#211d19!important;border-color:rgba(107,75,42,.45)!important}
      :root.light #erik-assistant .assistant-launch span{color:#2f6f6b!important}
      :root.light #erik-assistant .assistant-panel{background:#fff!important;color:#211d19!important;border-color:rgba(107,75,42,.28)!important}
      :root.light #erik-assistant .assistant-panel .assistant-intro,
      :root.light #erik-assistant .assistant-panel .assistant-answer,
      :root.light #erik-assistant .assistant-panel .assistant-ai-note,
      :root.light #erik-assistant .assistant-panel .assistant-disclaimer{color:#211d19!important}
      :root.light #erik-assistant .assistant-panel input{background:#fff!important;color:#211d19!important;border-color:rgba(107,75,42,.35)!important}
      :root.light #erik-assistant .assistant-panel input::placeholder{color:#6b625a!important;opacity:1!important}
      :root.light #erik-assistant .assistant-panel .assistant-suggestions button{color:#211d19!important;border-color:rgba(107,75,42,.3)!important}
      :root.light #erik-assistant .assistant-panel .assistant-close{color:#211d19!important}

      /* Rotate the actual '+' span used by the generated Ask Erik button. */
      #erik-assistant .assistant-launch span{display:inline-block!important;transform:rotate(0deg);transform-origin:center;transition:transform .28s ease}
      #erik-assistant.open .assistant-launch span{transform:rotate(45deg)!important}

      @media(max-width:600px){
        #erik-assistant{right:12px!important;bottom:76px!important;left:auto!important;width:auto!important}
        /* Keep the popup above the launcher, below the mobile header, and independently scrollable. */
        #erik-assistant .assistant-panel{position:fixed!important;top:84px!important;right:12px!important;bottom:132px!important;left:12px!important;width:auto!important;max-width:none!important;max-height:none!important;height:auto!important;overflow-x:hidden!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important}
        #contact-pill{right:12px!important;bottom:12px!important}
        #contact-panel{right:12px!important;bottom:68px!important}
      }
    `;
    if(!style.parentNode)document.head.appendChild(style);
  }
  function disclaimer(){
    const panel=document.querySelector('#erik-assistant .assistant-panel');
    if(panel&&!panel.querySelector('.assistant-disclaimer')){const p=document.createElement('p');p.className='assistant-disclaimer';p.textContent=DISCLAIMER;panel.appendChild(p);}
  }
  function slowTitles(){
    if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
    document.querySelectorAll('.page-title').forEach(el=>{
      if(el.dataset.finalTyped==='true')return;
      const span=el.querySelector('.type-text');if(!span)return;
      const text=(el.getAttribute('aria-label')||span.textContent||'').trim();if(!text)return;
      el.dataset.finalTyped='true';el.innerHTML='';
      const out=document.createElement('span');out.className='type-text';const caret=document.createElement('span');caret.className='type-caret';el.append(out,caret);
      let i=0;const timer=setInterval(()=>{if(i<text.length)out.textContent+=text[i++];else{clearInterval(timer);setTimeout(()=>caret.remove(),1000);}},120);
    });
  }
  function bind(){
    portrait();controls();disclaimer();slowTitles();
    if(document.documentElement.dataset.finalFixesBound==='true')return;
    document.documentElement.dataset.finalFixesBound='true';
    document.addEventListener('click',e=>{if(e.target.closest?.('#contact-pill'))closeAssistant();if(e.target.closest?.('.assistant-launch'))closeContact();},true);
  }
  function start(){bind();new MutationObserver(bind).observe(document.body,{childList:true,subtree:true});window.addEventListener('site:data-ready',bind,{once:false});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
