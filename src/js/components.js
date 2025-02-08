// 슬라이더, 모달 등 UI 기능

// Swiper.js 초기화 함수
function initSwiper() {
  // ✅ Swiper 설정 추가 가능
  console.log("Swiper 초기화");
}

// 모달 초기화 함수
function initModal() {
  // ✅ 모달 기능 추가 가능
  console.log("모달 기능 초기화");
}

// UI 컴포넌트 초기화 함수
export function initUIComponents() {
  console.log("UI 컴포넌트 초기화 시작");

  // ⭐ 슬라이더 (Swiper.js 활용)
  initSwiper();

  // ⭐ 모달 기능 (추후 구현 가능)
  initModal();

  console.log("UI 컴포넌트 초기화 완료");
}