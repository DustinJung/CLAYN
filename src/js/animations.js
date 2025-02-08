// animations.js (GSAP 애니메이션 관리)

import { lenis } from "./lenis.js"; // Lenis 모듈 가져오기

gsap.registerPlugin(ScrollTrigger);

// GSAP ScrollTrigger와 Lenis 연결
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      lenis.scroll = value; // ✅ 즉시 스크롤 값 설정
    }
    return lenis.scroll;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

// Lenis와 ScrollTrigger 동기화
lenis.on("scroll", ScrollTrigger.update);

// ScrollTrigger 새로고침
ScrollTrigger.addEventListener("refresh", () => lenis.raf());
ScrollTrigger.refresh();

// 여기에 애니메이션 정의 함수 추가
function initAnimations() {
  // 애니메이션 코드 추가 예정
}

// 외부에서 사용할 수 있도록 내보내기
export { initAnimations };