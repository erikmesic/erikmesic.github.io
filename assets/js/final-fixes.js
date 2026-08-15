/* Final interaction fixes. Loaded after the legacy polish layers so these rules win. */
(function(){
  const HEADSHOT='/assets/img/headshot.jpg';
  const DISCLAIMER='* Responses are provided for general recruiting context and may contain inaccuracies. For factually reliable information, please contact Erik directly.';
  function closeAssistant(){const root=document.getElementById('erik-assistant');if(!root)return;root.classList.remove('open');root.querySelector('.assistant-panel')?.setAttribute('aria-hidden','true');root.querySelector('.assistant-launch')?.setAttribute('aria-expanded','false');}
  function closeContact(){const panel=document.getElementById('contact-panel');if(panel){panel.setAttribute('aria-hidden','true');panel.style.display='none';}}
  function portrait(){document.querySelectorAll('.profile-photo').forEach(img=>{img.src=HEADSHOT;img.setAttribute('src',HEADSHOT);img.loading='eager';img.fetchPriority='high';img.decoding='async';});}
  function controls(){const style=document.getElementById('final-fixes-style')||document.createElement('style');style.id='final-fixes-style';style.textContent=`
      #erik-assistant{position:fixed!important;right:22px!important;bottom:82px!important;left:auto!important;z-index:40!important}
      #contact-pill{position:fixed!important;right:22px!important;bottom:22px!important;left:auto!important;z-index:50!important}
      #contact-panel{position:fixed!important;right:22px!important;bottom:76px!important;left:auto!important;z-index:1000!important}
      #contact-panel[aria-hidden="false"]{z-index:1000!important}
      .signal-grid>div>strong.annotation-underline,.signal-grid>div>strong.annotation-circle,.signal-grid>div>strong.annotation-highlight{display:inline-block!important;width:max-content!important;inline-size:max-content!important;max-width:100%!important;min-width:0!important}
      .annotation-underline::after{left:0!important;right:0!important;width:100%!important}.annotation-highlight::after{left:0!important;right:0!important;width:100%!important}.annotation-circle::after{left:-.055em!important;right:-.055em!important}.annotation-circle::before{left:-.04em!important;right:-.07em!important}
      .assistant-disclaimer{display:block!important;margin:.8rem 0 0!important;padding-top:.55rem!important;border-top:1px solid rgba(186,142,111,.16)!important;font-size:.68rem!important;line-height:1.45!important;opacity:.62!important}
      :root.light #erik-assistant .assistant-launch{background:#fff!important;color:#211d19!important;-webkit-text-fill-color:#211d19!important;border-color:rgba(107,75,42,.45)!important}
      :root.light #erik-assistant .assistant-launch span{color:#2f6f6b!important}:root.light #erik-assistant .assistant-panel{background:#fff!important;color:#211d19!important;border-color:rgba(107,75,42,.28)!important}
      :root.light #erik-assistant .assistant-panel .assistant-intro,:root.light #erik-assistant .assistant-panel .assistant-answer,:root.light #erik-assistant .assistant-panel .assistant-ai-note,:root.light #erik-assistant .assistant-panel .assistant-disclaimer{color:#211d19!important}
      :root.light #erik-assistant .assistant-panel input{background:#fff!important;color:#211d19!important;border-color:rgba(107,75,42,.35)!important}:root.light #erik-assistant .assistant-panel input::placeholder{color:#6b625a!important;opacity:1!important}
      :root.light #erik-assistant .assistant-panel .assistant-suggestions button{color:#211d19!important;border-color:rgba(107,75,42,.3)!important}:root.light #erik-assistant .assistant-panel .assistant-close{color:#211d19!important}
      #erik-assistant .assistant-launch span{display:inline-block!important;transform:rotate(0deg);transform-origin:center;transition:transform .28s ease}#erik-assistant.open .assistant-launch span{transform:rotate(45deg)!important}
      .project-header .page-title{white-space:normal!important;overflow:visible!important;display:block!important;line-height:1.08!important}
      .project-header .page-title .type-text{display:inline!important;white-space:normal!important}
      .project-header .page-title .type-text.typewriter-active::after{content:"";display:inline-block;width:2px;height:.9em;margin-left:.08em;background:#7a4b2f;vertical-align:-.08em;animation:type-caret-blink .8s step-end infinite}
      @keyframes type-caret-blink{50%{opacity:0}}
      .gis-backpacking-map{position:relative;margin-top:1rem}.gis-backpacking-map .gis-map-main{height:520px;border:1px solid rgba(92,75,58,.25);box-shadow:0 10px 28px rgba(92,75,58,.09);background:#e7eee9}.gis-backpacking-map .gis-map-inset{height:230px;margin-top:12px;border:1px solid rgba(92,75,58,.25);box-shadow:0 8px 22px rgba(92,75,58,.08);background:#e7eee9}.gis-backpacking-map .leaflet-container{font-family:Arial,sans-serif}.gis-backpacking-map .leaflet-control-attribution{font-size:9px}.gis-backpacking-map .leaflet-popup-content-wrapper,.gis-backpacking-map .leaflet-popup-tip{background:#f7f3ec;color:#211d19}.gis-backpacking-map .leaflet-popup-content{font-family:Arial,sans-serif;font-size:12px;line-height:1.35}.gis-backpacking-map .trip-marker{width:16px!important;height:16px!important;margin-left:-8px!important;margin-top:-8px!important;border-radius:50%;background:#477f7d;border:2px solid #f7f3ec;box-shadow:0 2px 8px rgba(0,0,0,.28)}.gis-backpacking-map .trip-marker.brown{background:#8b5e3c}.gis-backpacking-map .trip-route{stroke:#8b5e3c;stroke-width:3;stroke-dasharray:7 7;opacity:.85}.gis-backpacking-map .map-heading{font-family:Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;font-size:.72rem;color:#5c4b3a;margin:.75rem 0 .35rem;font-weight:700}.gis-backpacking-map .map-note{font-size:.8rem;color:#5c4b3a;margin:.55rem 0 0}.gis-backpacking-map .leaflet-control-zoom a{color:#5c4b3a}
      @media(max-width:600px){#erik-assistant{right:12px!important;bottom:76px!important;left:auto!important;width:auto!important}#erik-assistant .assistant-panel{position:fixed!important;top:84px!important;right:12px!important;bottom:132px!important;left:12px!important;width:auto!important;max-width:none!important;max-height:none!important;height:auto!important;overflow-x:hidden!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch!important}#contact-pill{right:12px!important;bottom:12px!important}#contact-panel{right:12px!important;bottom:68px!important}.gis-backpacking-map .gis-map-main{height:430px}.gis-backpacking-map .gis-map-inset{height:200px}}
    `;if(!style.parentNode)document.head.appendChild(style);}
  function disclaimer(){const panel=document.querySelector('#erik-assistant .assistant-panel');if(panel&&!panel.querySelector('.assistant-disclaimer')){const p=document.createElement('p');p.className='assistant-disclaimer';p.textContent=DISCLAIMER;panel.appendChild(p);}}
  function typeDelay(text){return Math.max(25,Math.min(70,1800/Math.max(text.length,1)));}
  function slowTitles(){
    if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
    document.querySelectorAll('.page-title').forEach(el=>{
      if(el.dataset.finalTyped==='true')return;
      const existing=el.querySelector('.type-text');
      const text=(el.getAttribute('aria-label')||existing?.textContent||el.textContent||'').trim();if(!text)return;
      el.dataset.finalTyped='true';el.setAttribute('aria-label',text);el.innerHTML='';
      const out=document.createElement('span');out.className='type-text typewriter-active';el.appendChild(out);
      let i=0;const timer=setInterval(()=>{if(i<text.length){out.textContent+=text[i++];}else{clearInterval(timer);setTimeout(()=>out.classList.remove('typewriter-active'),1000);}},typeDelay(text));
    });
  }
  function loadLeaflet(){return new Promise((resolve,reject)=>{if(window.L)return resolve();if(!document.querySelector('link[data-backpacking-leaflet]')){const link=document.createElement('link');link.rel='stylesheet';link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';link.dataset.backpackingLeaflet='true';document.head.appendChild(link);}const script=document.createElement('script');script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';script.onload=resolve;script.onerror=reject;document.head.appendChild(script);});}
  function backpackingMap(){
    const frame=document.querySelector('.backpacking-map-frame');if(!frame||frame.dataset.gisReady==='true')return;
    frame.dataset.gisReady='loading';
    loadLeaflet().then(()=>{
      if(!frame.isConnected)return;
      frame.innerHTML='<div class="gis-backpacking-map"><div class="map-heading">United States · topographic trips</div><div class="gis-map-main"></div><div class="map-heading">Jablanovec, Croatia · regional inset</div><div class="gis-map-inset"></div><p class="map-note">Interactive GIS basemap: USGS The National Map for U.S. locations; Esri World Topographic Map for the Croatia inset. The dotted line follows the trips chronologically.</p></div>';
      const trips=[
        {name:'Deception Pass State Park',date:'JUL 2023',lat:48.39733,lon:-122.64602},
        {name:'Tunnel Creek · Olympic National Forest',date:'JUL 2024',lat:47.7814,lon:-123.0524},
        {name:'Kincaid Lake Trail · Gifford Pinchot National Forest',date:'JUN 2025',lat:46.7276,lon:-121.4609},
        {name:'Alafia River Corridor Nature Preserve South',date:'JUN 2025',lat:27.821145,lon:-82.145210},
        {name:'Central Park · New York',date:'SEP 2025',lat:40.7829,lon:-73.9654},
        {name:'Battery Park · New York',date:'SEP 2025',lat:40.7031582,lon:-74.0156954},
        {name:'Hudson Highlands State Park',date:'SEP 2025',lat:41.4586,lon:-73.9597},
        {name:'Chito Branch Reserve',date:'DEC 2025',lat:27.838,lon:-82.1715},
        {name:'Cascade Pass · North Cascades National Park',date:'JUN 2026',lat:48.4754,lon:-121.0751},
        {name:'Hanging Rock State Park · North Carolina',date:'JUL 2026',lat:36.4119,lon:-80.2541}
      ];
      const map=L.map(frame.querySelector('.gis-map-main'),{scrollWheelZoom:false,worldCopyJump:true,zoomControl:true}).setView([40,-96],4);
      L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',{maxZoom:16,attribution:'USGS The National Map'}).addTo(map);
      const points=trips.map((t,i)=>[t.lat,t.lon]);
      L.polyline(points,{className:'trip-route',color:'#8b5e3c',weight:3,dashArray:'7 7',opacity:.85}).addTo(map);
      trips.forEach((t,i)=>{const icon=L.divIcon({className:'',html:'<span class="trip-marker'+(i===trips.length-1?' brown':'')+'"></span>',iconSize:[16,16],iconAnchor:[8,8]});L.marker([t.lat,t.lon],{icon}).addTo(map).bindPopup('<strong>'+t.name+'</strong><br>'+t.date);});
      map.fitBounds(L.latLngBounds(points),{padding:[28,28]});
      const croatia=L.map(frame.querySelector('.gis-map-inset'),{scrollWheelZoom:false,zoomControl:false,attributionControl:true}).setView([45.87999,15.855],12);
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',{maxZoom:18,attribution:'Esri, HERE, Garmin, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), swisstopo, © OpenStreetMap contributors'}).addTo(croatia);
      const cicon=L.divIcon({className:'',html:'<span class="trip-marker brown"></span>',iconSize:[16,16],iconAnchor:[8,8]});
      L.marker([45.88,15.855],{icon:cicon}).addTo(croatia).bindPopup('<strong>Jablanovec, Croatia</strong><br>AUG 2026').openPopup();
      frame.dataset.gisReady='true';
    }).catch(()=>{frame.dataset.gisReady='false';});
  }
  function bind(){portrait();controls();disclaimer();slowTitles();backpackingMap();if(document.documentElement.dataset.finalFixesBound==='true')return;document.documentElement.dataset.finalFixesBound='true';document.addEventListener('click',e=>{if(e.target.closest?.('#contact-pill'))closeAssistant();if(e.target.closest?.('.assistant-launch'))closeContact();},true);}
  function start(){bind();new MutationObserver(bind).observe(document.body,{childList:true,subtree:true});window.addEventListener('site:data-ready',bind,{once:false});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();