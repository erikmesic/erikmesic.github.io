// Small, isolated visual fixes kept separate from the site's core data/rendering code.
(function(){
  function install(){
    if(document.getElementById('site-polish-style')) return;
    const style=document.createElement('style');
    style.id='site-polish-style';
    style.textContent=`
      /* Keep the canonical portrait source after data population. */
      .profile-photo{content:url('/assets/img/nobgprofesh.png') !important;}

      /* Assistant sits directly above the contact control and shares its lift treatment. */
      #erik-assistant{right:22px !important;bottom:78px !important;}
      #erik-assistant .assistant-launch{transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease;}
      #erik-assistant .assistant-launch:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(0,0,0,.38);border-color:rgba(186,142,111,.85);}
      @media(max-width:600px){#erik-assistant{right:12px !important;bottom:76px !important;}}
    `;
    document.head.appendChild(style);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
