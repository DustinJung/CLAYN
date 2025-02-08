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

// preloader 애니메이션 추가
function initPreloader() {
  const preloader = document.querySelector(".pre-loader");
  const progressText = document.querySelector(".pre-loader-counter"); // 퍼센트 텍스트
  const preloader_img = document.querySelector('.pre-loader-img'); // 프리 로더 img

  if (!preloader || !progressText) return; // 요소가 없으면 종료

  let progress = { value: 0 };

  preloader_img.classList.add('on')
  progressText.classList.add('on')

  gsap.to(progress, {
    value: 100,
    delay: .5,
    duration: 2,
    ease: "power2.out",
    onUpdate: () => {
      progressText.textContent = `${Math.round(progress.value)}%`; // 퍼센트 업데이트
    },
  });

  gsap.to(preloader, {
    y: "-100%", // 위로 사라지게
    duration: 1,
    delay: 2.5, // 로딩 후 3초 뒤 사라지게
    ease: "power4.inOut",
    onComplete: () => {
      preloader.classList.add('hide'); // 완전히 숨기기
    },
  });
}

// 여기에 애니메이션 정의 함수 추가
function initAnimations() {
  // 여기다가 애니메이션 코드 추가하면 됨

  initPreloader(); // Preloader 실행

}

// 외부에서 사용할 수 있도록 내보내기
export { initAnimations };