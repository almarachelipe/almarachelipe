(function(){
  var d=document;
  // reading thread along the top, in the project's colours
  var th=d.createElement('div');th.className='thread';d.body.appendChild(th);
  addEventListener('scroll',function(){var h=d.documentElement;th.style.width=(h.scrollTop/Math.max(1,h.scrollHeight-h.clientHeight)*100)+'%';},{passive:true});

  // title: stripe band under it, first paragraph becomes the lead
  var h1=d.querySelector('h1');
  if(h1){
    var after=h1;
    if(h1.nextElementSibling&&h1.nextElementSibling.classList.contains('det-sub'))after=h1.nextElementSibling;
    var band=d.createElement('div');band.className='band';after.insertAdjacentElement('afterend',band);
    var lead=band.nextElementSibling;
    if(!lead){var nb=h1.parentElement.nextElementSibling;lead=nb&&nb.firstElementChild;}
    if(lead&&lead.classList.contains('det-body'))lead.classList.add('lead');
  }

  // chapters: label beside text, or label above images
  function textOnly(els){return els.length&&els.every(function(e){return e.matches('.det-body,br');});}
  d.querySelectorAll('.det-section').forEach(function(l){
    var p=l.parentElement;
    if(p.parentElement!==d.body||p.children[0]!==l){l.classList.add('inline-label');return;}
    var rest=[].slice.call(p.children,1),w;
    if(textOnly(rest)){
      w=d.createElement('div');w.className='ch-body';rest.forEach(function(e){w.appendChild(e);});p.appendChild(w);
      p.classList.add('chapter','ch-text');return;
    }
    var n=p.nextElementSibling;
    if(!rest.length&&n&&!n.getAttribute('style')&&textOnly([].slice.call(n.children))){
      w=d.createElement('div');w.className='ch-body';[].slice.call(n.children).forEach(function(e){w.appendChild(e);});p.appendChild(w);n.remove();
      p.classList.add('chapter','ch-text');return;
    }
    p.classList.add('chapter','ch-media');
  });

  // reveal on scroll, staggered within a row
  var targets=[].slice.call(d.querySelectorAll('body>div:not(.proj-nav):not(.lightbox) img, body>img, .ch-body, .det-section, .lead, .credits, .next-nm'));
  targets.forEach(function(el){
    el.classList.add('reveal');
    if(el.tagName==='IMG'){var i=[].indexOf.call(el.parentElement.children,el);el.style.transitionDelay=Math.min(i,4)*90+'ms';}
  });
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
  targets.forEach(function(el){io.observe(el);});
  if(d.querySelector('.band'))io.observe(d.querySelector('.band'));

  // click an image to see it large
  var lb=d.createElement('div');lb.className='lightbox';var li=d.createElement('img');lb.appendChild(li);d.body.appendChild(lb);
  d.addEventListener('click',function(e){
    if(lb.classList.contains('open')){lb.classList.remove('open');return;}
    var t=e.target;
    if(t.tagName==='IMG'&&!t.closest('.proj-nav')){li.src=t.currentSrc||t.src;li.style.transform=t.style.transform||'';lb.classList.add('open');}
  });
  d.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('open');});
})();
