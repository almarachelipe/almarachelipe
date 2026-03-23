function openMobileMenu(){document.getElementById('mobileMenu').classList.add('open');}
function closeMobileMenu(){document.getElementById('mobileMenu').classList.remove('open');}
function scrollToTop(){window.scrollTo({top:0,behavior:'smooth'});}
function scrollToGroup(id,tab){
  document.getElementById(id).scrollIntoView({behavior:'smooth'});
  document.querySelectorAll('.work-tab').forEach(t=>t.classList.remove('active'));
  if(tab)tab.classList.add('active');
}
const slides=document.querySelectorAll('.video-slide');
const nav=document.getElementById('site-nav');
const overlay=document.getElementById('homeOverlay');
let cur=0,curAnc=slides[0].dataset.anchor;
function showSlide(i){
  slides[cur].classList.remove('active');
  cur=i%slides.length;
  const s=slides[cur];
  s.classList.add('active');
  const tone=s.dataset.tone;
  document.body.className=tone==='dark'?'dark-ui':'light-ui';
  nav.className=tone==='dark'?'light-ui':'dark-ui';
  overlay.style.color=tone==='dark'?'#fff':'#1a1a1a';
  document.getElementById('homeCollectionName').textContent=s.dataset.label;
  curAnc=s.dataset.anchor;
}
setInterval(()=>showSlide(cur+1),3500);
const homeEl=document.getElementById('home');
window.addEventListener('scroll',()=>{
  if(window.scrollY>homeEl.offsetHeight-60){
    if(window.scrollY>homeEl.offsetHeight-60){
  nav.style.background='var(--white)';
  nav.style.color='var(--black)';
  nav.className='dark-ui';
} else {
  nav.style.background='transparent';
  nav.style.color='#ffffff';
  nav.className='light-ui';
}
    nav.className='dark-ui';
  } else {
    nav.style.background='transparent';
    const tone=slides[cur].dataset.tone;
    nav.className=tone==='dark'?'light-ui':'dark-ui';
  }
},{passive:true});
function scrollToCurrentProject(){
  const el=document.getElementById(curAnc);
  if(el)el.scrollIntoView({behavior:'smooth',block:'center'});
  else document.getElementById('work').scrollIntoView({behavior:'smooth'});
}
const groups=['woven','print','surface','apparel','narrative'];
window.addEventListener('scroll',()=>{
  let active=null;
  groups.forEach(id=>{
    const el=document.getElementById(id);
    if(el&&el.getBoundingClientRect().top<=120)active=id;
  });
  if(active){
    document.querySelectorAll('.work-tab').forEach(t=>{
      const txt=t.textContent.trim().toLowerCase();
      t.classList.toggle('active',txt===active||(active==='surface'&&txt.includes('surface')));
    });
  }
},{passive:true});