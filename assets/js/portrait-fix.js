/* Keep the verified portrait asset stable if data.json contains an old/invalid photo path. */
(function(){
  const SRC='/assets/img/nobgprofesh.png';
  const apply=()=>document.querySelectorAll('.profile-photo').forEach(img=>{
    if(img.getAttribute('src')!==SRC){img.src=SRC;}
    img.loading='eager';
    img.fetchPriority='high';
  });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  window.addEventListener('site:data-ready',apply);
})();
