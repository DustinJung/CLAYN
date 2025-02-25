function getLenisDuration() {
    return window.innerWidth < 1280 ? 1 : 1.5; // ✅ 1280px 미만이면 1, 이상이면 1.5
  }
  
  const lenis = new Lenis({
    duration: getLenisDuration(),
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });
  
  // ✅ Lenis 스크롤 애니메이션 유지
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  
  export { lenis, getLenisDuration };