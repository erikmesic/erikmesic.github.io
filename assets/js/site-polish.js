// Small, isolated visual fixes kept separate from the site's core data/rendering code.
(function(){
  function install(){
    if(document.getElementById('site-polish-style')) return;
    const style=document.createElement('style');
    style.id='site-polish-style';
    style.textContent=`
      /* Use the original headshot; do not substitute the background-removed portrait. */
      .profile-photo{content:url('/assets/img/headshot.jpg') !important; object-fit:cover;}

      /* One consistent floating-button stack on every page: Ask Erik above Contact. */
      #erik-assistant{right:22px !important;bottom:82px !important;z-index:40 !important;}
      #contact-pill{right:22px !important;bottom:22px !important;z-index:50 !important;}
      #contact-panel{right:22px !important;bottom:76px !important;z-index:100 !important;}
      #contact-panel[aria-hidden="false"]{z-index:100 !important;}

      #erik-assistant .assistant-launch{transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease;}
      #erik-assistant .assistant-launch:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(0,0,0,.38);border-color:rgba(186,142,111,.85);}

      /* The signal-grid rules are more specific than the generic annotation rules,
         so explicitly restore an inline formatting box around the actual text. */
      .signal-grid>div strong.annotation-underline,
      .signal-grid>div strong.annotation-circle,
      .signal-grid>div strong.annotation-highlight,
      .timeline-item-featured h3.annotation-underline,
      .timeline-item-featured h3.annotation-circle,
      .timeline-item-featured h3.annotation-highlight,
      .research-interest h3.annotation-underline,
      .research-interest h3.annotation-circle,
      .research-interest h3.annotation-highlight{
        display:inline-block !important;
        width:max-content !important;
        max-width:100% !important;
      }
      .annotation-underline::after{left:0 !important;right:0 !important;bottom:-.07em !important;height:.075em !important;}
      .annotation-highlight::after{left:0 !important;right:0 !important;bottom:.02em !important;height:.40em !important;}
      .annotation-circle::after{left:-.055em !important;right:-.055em !important;top:-.08em !important;bottom:-.06em !important;}
      .annotation-circle::before{left:-.04em !important;right:-.07em !important;top:-.09em !important;bottom:-.04em !important;}

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

      .assistant-disclaimer{display:block !important;margin:.8rem 0 0;padding-top:.55rem;border-top:1px solid rgba(186,142,111,.16);font-size:.68rem;line-height:1.45;opacity:.62;}
      @media(max-width:600px){
        #erik-assistant{right:12px !important;bottom:76px !important;}
        #contact-pill{right:12px !important;bottom:12px !important;}
        #contact-panel{right:12px !important;bottom:68px !important;}
        .masthead-photo-copy{padding:24px;}
        .masthead-photo-copy .masthead-photo-line{font-size:clamp(2.35rem,12vw,4.2rem);max-width:8em;}
        .hero.large .hero-inner{padding-top:32px;}
      }
    `;
    document.head.appendChild(style);
  }

  function closeAssistant(){
    const root=document.getElementById('erik-assistant');
    if(!root)return;
    const panel=root.querySelector('.assistant-panel');
    const launch=root.querySelector('.assistant-launch');
    if(panel) panel.setAttribute('aria-hidden','true');
    if(launch) launch.setAttribute('aria-expanded','false');
    root.classList.remove('open');
  }

  function ensureDisclaimer(){
    const root=document.getElementById('erik-assistant');
    if(!root)return;
    const panel=root.querySelector('.assistant-panel');
    if(!panel || panel.querySelector('.assistant-disclaimer'))return;
    const note=document.createElement('p');
    note.className='assistant-disclaimer';
    note.textContent='* Responses are provided for general recruiting context and may contain inaccuracies. For factually reliable information, please contact Erik directly.';
    panel.appendChild(note);
  }

  function bind(){
    ensureDisclaimer();
    /* Capture the contact click at document level so it works regardless of
       which script owns the Contact button or when that button was created. */
    if(!document.documentElement.dataset.assistantContactClose){
      document.documentElement.dataset.assistantContactClose='true';
      document.addEventListener('click',e=>{
        if(e.target.closest?.('#contact-pill')) closeAssistant();
      },true);
    }
  }

  function start(){
    install();
    bind();
    let tries=0;
    const timer=setInterval(()=>{
      bind();
      if(document.getElementById('erik-assistant') || ++tries>60)clearInterval(timer);
    },50);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
