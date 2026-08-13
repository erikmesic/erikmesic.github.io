// Small, isolated visual fixes kept separate from the site's core data/rendering code.
(function(){
  function install(){
    if(document.getElementById('site-polish-style')) return;
    const style=document.createElement('style');
    style.id='site-polish-style';
    style.textContent=`
      .profile-photo{content:url('/assets/img/headshot.jpg') !important; object-fit:cover;}
      #erik-assistant{right:22px !important;bottom:78px !important;z-index:40 !important;}
      #contact-pill{right:22px !important;bottom:22px !important;z-index:50 !important;}
      #contact-panel{z-index:70 !important;}
      #erik-assistant .assistant-launch{transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease;}
      #erik-assistant .assistant-launch:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(0,0,0,.38);border-color:rgba(186,142,111,.85);}
      #contact-panel[aria-hidden="false"]{z-index:70 !important;}
      .annotation-underline,.annotation-circle,.annotation-highlight{width:max-content;max-width:100%;}
      .annotation-underline::after{left:0;right:0;bottom:-.07em;height:.075em;}
      .annotation-highlight::after{left:0;right:0;bottom:.02em;height:.40em;}
      .annotation-circle::after{left:-.055em;right:-.055em;top:-.08em;bottom:-.06em;}
      .annotation-circle::before{left:-.04em;right:-.07em;top:-.09em;bottom:-.04em;}
      .type-text{white-space:pre-wrap;}
      .masthead-photo-copy{max-width:900px;padding:clamp(28px,5vw,64px);}
      .masthead-photo-copy .eyebrow{letter-spacing:.18em;font-size:.72rem;}
      .masthead-photo-copy h1{font-family:'Libre Baskerville',Georgia,serif;font-weight:400;letter-spacing:-.025em;}
      .masthead-photo-copy .masthead-photo-line{font-size:clamp(2.4rem,6vw,5.8rem);line-height:.92;letter-spacing:-.04em;max-width:9em;text-wrap:balance;margin-top:.08em;}
      .masthead-photo-copy .masthead-photo-line em{font-family:'EB Garamond',Georgia,serif;font-weight:400;}
      .hero.large .hero-inner{max-width:900px;border-top:1px solid rgba(186,142,111,.34);padding-top:clamp(22px,4vw,42px);position:relative;}
      .hero.large .hero-inner::before{content:'I';position:absolute;left:0;top:-.72em;font-family:'EB Garamond',Georgia,serif;font-style:italic;font-size:.78rem;letter-spacing:.12em;opacity:.65;background:var(--bg,#171513);padding-right:.6rem;}
      .hero.large .page-title{font-size:clamp(2.6rem,6vw,5rem);letter-spacing:-.035em;line-height:.98;margin-bottom:.35rem;}
      .hero.large #headline{font-family:'EB Garamond',Georgia,serif;font-size:1.25rem;letter-spacing:.015em;}
      .hero.large #summary{max-width:760px;font-size:1.08rem;line-height:1.65;}
      .project-card-subjects .project-tag,.project-tags .project-tag{display:inline-flex!important;align-items:center;border:1px solid rgba(47,143,138,.32);background:rgba(47,143,138,.075);color:var(--accent-2,#6b8a83);border-radius:4px;padding:.12rem .42rem;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.68rem;line-height:1.35;letter-spacing:.01em;}
      .project-card-subjects .project-tag::before,.project-tags .project-tag::before{content:'`';opacity:.45;}
      .project-card-subjects .project-tag::after,.project-tags .project-tag::after{content:'`';opacity:.45;}
      .project-card-meta>span:nth-child(2){gap:5px;}
      .assistant-disclaimer{margin:.8rem 0 0;padding-top:.55rem;border-top:1px solid rgba(186,142,111,.16);font-size:.68rem;line-height:1.45;opacity:.58;}
      @media(max-width:600px){
        #erik-assistant{right:12px !important;bottom:76px !important;}
        #contact-pill{right:12px !important;bottom:12px !important;}
        .masthead-photo-copy{padding:24px;}
        .masthead-photo-copy .masthead-photo-line{font-size:clamp(2.35rem,12vw,4.2rem);max-width:8em;}
        .hero.large .hero-inner{padding-top:32px;}
      }
    `;
    document.head.appendChild(style);

    /* editorial.js uses a 58ms typewriter interval. Nudge only that specific
       animation to a slower 78ms cadence; other timers remain untouched. */
    if(!window.__erikTypewriterSlowed){
      const nativeSetInterval=window.setInterval.bind(window);
      window.setInterval=function(fn,delay,...args){
        if(delay===58 && typeof fn==='function' && String(fn).includes('i<text.length')) delay=78;
        return nativeSetInterval(fn,delay,...args);
      };
      window.__erikTypewriterSlowed=true;
    }
  }

  function bindRecruiterFaq(){
    if(!window.RECRUITER_FAQ) return false;
    const root=document.getElementById('erik-assistant');
    if(!root || root.dataset.faqBound==='true') return !!root;
    root.dataset.faqBound='true';
    const input=root.querySelector('.assistant-form input');
    const answer=root.querySelector('.assistant-answer');
    const esc=v=>String(v??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
    const run=q=>{const result=window.RECRUITER_FAQ.answer(q);answer.innerHTML=`<strong>${esc(result.title)}</strong><p>${esc(result.text)}</p>`;ensureDisclaimer();};
    document.addEventListener('submit',e=>{if(e.target===root.querySelector('.assistant-form')){e.preventDefault();e.stopImmediatePropagation();run(input.value.trim());}},true);
    document.addEventListener('click',e=>{const button=e.target.closest('.assistant-suggestions button');if(button&&root.contains(button)){e.preventDefault();e.stopImmediatePropagation();input.value=button.textContent.trim();run(input.value);}},true);
    return true;
  }

  function ensureDisclaimer(){
    const root=document.getElementById('erik-assistant');
    if(!root || root.querySelector('.assistant-disclaimer')) return;
    const panel=root.querySelector('.assistant-panel');
    if(!panel) return;
    const note=document.createElement('p');
    note.className='assistant-disclaimer';
    note.textContent='* Responses are provided for general recruiting context and may contain inaccuracies. For factually reliable information, please contact Erik directly.';
    panel.appendChild(note);
  }

  function bindFloatingActions(){
    const contact=document.getElementById('contact-pill');
    const assistant=document.getElementById('erik-assistant');
    if(contact && contact.dataset.assistantCloseBound!=='true'){
      contact.dataset.assistantCloseBound='true';
      contact.addEventListener('click',()=>{
        const panel=assistant?.querySelector('.assistant-panel'),launch=assistant?.querySelector('.assistant-launch');
        if(panel) panel.setAttribute('aria-hidden','true');
        if(launch) launch.setAttribute('aria-expanded','false');
        assistant?.classList.remove('open');
      },true);
    }
    ensureDisclaimer();
  }

  function start(){
    install();
    let tries=0;
    const timer=setInterval(()=>{
      bindFloatingActions();
      if(bindRecruiterFaq()||++tries>40)clearInterval(timer);
    },50);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
