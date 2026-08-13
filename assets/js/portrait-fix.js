/* Keep the original, clean headshot stable. Do not substitute the background-removed portrait. */
(function(){
  const SRC='/assets/img/headshot.jpg';
  const apply=()=>document.querySelectorAll('.profile-photo').forEach(img=>{
    if(img.getAttribute('src')!==SRC) img.setAttribute('src',SRC);
    img.loading='eager';
    img.fetchPriority='high';
    img.decoding='async';
  });
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
  else apply();
  window.addEventListener('site:data-ready',apply);
})();
