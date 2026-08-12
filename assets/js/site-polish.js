// Small, isolated visual fixes kept separate from the site's core data/rendering code.
(function(){
  function install(){
    if(document.getElementById('site-polish-style')) return;
    const style=document.createElement('style');
    style.id='site-polish-style';
    style.textContent=`
      .profile-photo{content:url('/assets/img/nobgprofesh.png') !important;}
      #erik-assistant{right:22px !important;bottom:78px !important;}
      #erik-assistant .assistant-launch{transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease;}
      #erik-assistant .assistant-launch:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(0,0,0,.38);border-color:rgba(186,142,111,.85);}
      .masthead-photo-copy .masthead-photo-line{font-size:clamp(2.4rem,6vw,5.8rem);line-height:.98;letter-spacing:-.035em;max-width:9.5em;text-wrap:balance;}
      .masthead-photo-copy .masthead-photo-line em{font-family:'EB Garamond',Georgia,serif;font-weight:400;}
      @media(max-width:600px){#erik-assistant{right:12px !important;bottom:76px !important;}.masthead-photo-copy .masthead-photo-line{font-size:clamp(2.35rem,12vw,4.2rem);max-width:8em;}}
    `;
    document.head.appendChild(style);
  }
  function bindRecruiterFaq(){
    if(!window.RECRUITER_FAQ) return false;
    const root=document.getElementById('erik-assistant');
    if(!root || root.dataset.faqBound==='true') return !!root;
    root.dataset.faqBound='true';
    const panel=root.querySelector('.assistant-panel');
    const input=root.querySelector('.assistant-form input');
    const answer=root.querySelector('.assistant-answer');
    const esc=v=>String(v??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
    const run=q=>{const result=window.RECRUITER_FAQ.answer(q);answer.innerHTML=`<strong>${esc(result.title)}</strong><p>${esc(result.text)}</p>`;};
    document.addEventListener('submit',e=>{if(e.target===root.querySelector('.assistant-form')){e.preventDefault();e.stopImmediatePropagation();run(input.value.trim());}},true);
    document.addEventListener('click',e=>{const button=e.target.closest('.assistant-suggestions button');if(button&&root.contains(button)){e.preventDefault();e.stopImmediatePropagation();input.value=button.textContent.trim();run(input.value);}},true);
    return true;
  }
  function start(){install();let tries=0;const timer=setInterval(()=>{if(bindRecruiterFaq()||++tries>40)clearInterval(timer)},50);}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
