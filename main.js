/* ═══════════════════════════════════
   ALMA RACHEL IPE — SHARED JS
   ═══════════════════════════════════ */

/* ── MOBILE MENU ── */
function openMobileMenu(){
  document.getElementById('mobileMenu').classList.add('open');
}
function closeMobileMenu(){
  document.getElementById('mobileMenu').classList.remove('open');
}

/* ── NAV: always dark after scrolling past hero ── */
function initNavScroll(){
  const nav = document.getElementById('site-nav');
  if(!nav) return;
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 60){
      nav.className = 'dark-ui';
    }
  }, {passive:true});
}

/* ── HOME: video carousel ── */
function initVideoCarousel(){
  const slides = document.querySelectorAll('.video-slide');
  const nav    = document.getElementById('site-nav');
  const label  = document.getElementById('homeCollectionName');
  if(!slides.length) return;
  let cur = 0;
  let curAnc = slides[0].dataset.anchor;

  function showSlide(i){
    slides[cur].classList.remove('active');
    cur = i % slides.length;
    const s = slides[cur];
    s.classList.add('active');
    const tone = s.dataset.tone;
    document.body.className = tone === 'dark' ? 'dark-ui' : 'light-ui';
    nav.className            = tone === 'dark' ? 'light-ui' : 'dark-ui';
    document.getElementById('homeOverlay').style.color = tone === 'dark' ? '#fff' : '#1a1a1a';
    if(label) label.textContent = s.dataset.label;
    curAnc = s.dataset.anchor;
  }

  setInterval(()=> showSlide(cur + 1), 3500);

  /* nav colour after home */
  const homeEl = document.getElementById('home');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > homeEl.offsetHeight - 60){
      nav.className = 'dark-ui';
    } else {
      const tone = slides[cur].dataset.tone;
      nav.className = tone === 'dark' ? 'light-ui' : 'dark-ui';
    }
  }, {passive:true});

  /* see work → scroll to specific project row */
  window.scrollToCurrentProject = function(){
    const el = document.getElementById(curAnc);
    if(el) el.scrollIntoView({behavior:'smooth', block:'center'});
    else document.getElementById('work').scrollIntoView({behavior:'smooth'});
  };
}

/* ── WORK: sticky tab highlight on scroll ── */
function initWorkTabs(){
  const groups = ['woven','print','surface','apparel','narrative'];
  window.addEventListener('scroll', ()=>{
    let active = null;
    groups.forEach(id =>{
      const el = document.getElementById(id);
      if(el && el.getBoundingClientRect().top <= 120) active = id;
    });
    if(active){
      document.querySelectorAll('.work-tab').forEach(t =>{
        const txt = t.textContent.trim().toLowerCase();
        t.classList.toggle('active',
          txt === active || (active === 'surface' && txt.includes('surface'))
        );
      });
    }
  }, {passive:true});
}

window.scrollToGroup = function(id, tab){
  document.getElementById(id).scrollIntoView({behavior:'smooth'});
  document.querySelectorAll('.work-tab').forEach(t => t.classList.remove('active'));
  if(tab) tab.classList.add('active');
};

window.scrollToTop = function(){
  window.scrollTo({top:0, behavior:'smooth'});
};