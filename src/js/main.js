// main.js (메인 실행 파일)

import { lenis } from "./animations.js"; // ✅ Lenis 가져오기
import { initAnimations } from "./animations.js";
import { initUIComponents } from "./components.js"; // ✅ UI 기능 모듈 가져오기


window.onload = function () {
  try {
    lenis.stop();
    // 애니메이션 초기화 (Preloader 포함)
    initAnimations();

    // UI 기능 초기화 (슬라이더, 모달 등)
    initUIComponents();

    console.log("웹페이지가 로드되었습니다."); // 페이지 로딩 후 로그 출력

    // ✅ Preloader 종료 후 Lenis 실행 (3.5초 후)
    setTimeout(() => {
      lenis.start();
      document.querySelector('body').classList.add('is-ready');
      console.log("Lenis 시작됨");
    }, 3350); // Preloader 종료 되면서, marquee 내려올 수 있도록 준비
  } catch (error) {
    console.error("초기화 중 오류 발생:", error);
  }
};