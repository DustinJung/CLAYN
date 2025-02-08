// main.js (메인 실행 파일)

import { lenis } from "./lenis.js"; // ✅ isMobile 제거
import { initAnimations } from "./animations.js";
import { initUIComponents } from "./components.js"; // ✅ UI 기능 모듈 가져오기

// window.onload에서 Lenis 시작
window.onload = function () {
  try {
    lenis.start(); // ✅ 모바일 여부 체크 없이 바로 시작

    // 애니메이션 초기화 함수 호출
    initAnimations();

    // UI 기능 초기화 (슬라이더, 모달 등)
    initUIComponents();

    console.log("웹페이지가 로드되었습니다."); // 페이지 로딩 후 로그 출력
  } catch (error) {
    console.error("초기화 중 오류 발생:", error); // 오류 발생 시 콘솔에 에러 메시지 출력
  }
};