//// Lenis 초기화
//const lenis = new Lenis({
//  duration: 1.2,
//  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//  smoothWheel: true,
//  smoothTouch: false,
//});
//
//// 모바일 감지 함수 다시 추가
//function isMobile() {
//  return window.matchMedia("(max-width: 1279px)").matches;
//}
//
//// 미디어쿼리 설정
//const mediaQuery = window.matchMedia("(max-width: 1279px)");
//
//function handleScreenChange(event) {
//  if (event.matches) {
//    lenis.stop();
//  } else {
//    lenis.start();
//  }
//}
//
//// ✅ 개선된 초기 상태 설정 (isMobile()을 직접 호출)
//if (isMobile()) {
//  lenis.stop();
//} else {
//  lenis.start();
//}
//
//// 초기 실행 (현재 화면 크기에 맞춰 설정)
//handleScreenChange(mediaQuery);
//
//// 화면 크기 변경 감지 (resize 이벤트 없이 자동 적용됨)
//mediaQuery.addEventListener("change", handleScreenChange);
//
//// requestAnimationFrame 활용한 스크롤 처리
//function raf(time) {
//  lenis.raf(time);
//  requestAnimationFrame(raf);
//}
//requestAnimationFrame(raf);
//
//// 외부에서 사용 가능하도록 내보내기
//export { lenis, isMobile }; // ✅ isMobile 추가 export