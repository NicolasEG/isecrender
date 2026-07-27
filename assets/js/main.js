document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons({ strokeWidth: 1.8 });
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress');
  const onScroll = () => {
    header?.classList.toggle('scrolled', scrollY > 30);
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${max ? scrollY / max : 0})`;
    const bg = document.querySelector('.parallax-bg');
    if (bg && innerWidth > 768) { const rect = bg.parentElement.getBoundingClientRect(); bg.style.transform = `translate3d(0,${rect.top * .18}px,0) scale(1.12)`; }
  };
  addEventListener('scroll', onScroll, { passive:true }); onScroll();
  const menu = document.querySelector('.menu-btn');
  menu?.addEventListener('click', () => { const open = header.classList.toggle('menu-open'); menu.setAttribute('aria-expanded', open); menu.innerHTML = `<i data-lucide="${open ? 'x' : 'menu'}"></i>`; lucide.createIcons(); });
  const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.13});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  const counterObserver = new IntersectionObserver(entries => entries.forEach(e => { if(!e.isIntersecting)return; const el=e.target,target=+el.dataset.target,start=performance.now(),duration=1300; const tick=now=>{const p=Math.min((now-start)/duration,1);el.textContent=Math.floor(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);counterObserver.unobserve(el)}),{threshold:.6});
  document.querySelectorAll('.counter').forEach(el=>counterObserver.observe(el));
  const slides=[...document.querySelectorAll('.testimonial')]; let current=0;
  const show=n=>{if(!slides.length)return;slides[current].classList.remove('active');current=(n+slides.length)%slides.length;slides[current].classList.add('active')};
  document.querySelector('[data-next]')?.addEventListener('click',()=>show(current+1)); document.querySelector('[data-prev]')?.addEventListener('click',()=>show(current-1));
  document.querySelectorAll('.faq details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('.faq details').forEach(x=>{if(x!==d)x.open=false})}));
  document.querySelector('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);const msg=`Hola ISEC, soy ${d.get('nombre')}. Quiero proteger: ${d.get('espacio')}. Teléfono: ${d.get('telefono')}. Email: ${d.get('email')||'-'}. Consulta: ${d.get('mensaje')||'Quisiera recibir asesoramiento.'}`;window.open(`https://wa.me/542615400047?text=${encodeURIComponent(msg)}`,'_blank','noopener')});
});
