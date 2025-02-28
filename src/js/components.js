// 슬라이더, 모달 등 UI 기능
// import { letActiveHorny } from './animations.js';
// Swiper.js 초기화 함수
function initSwiper() {
  // ✅ Swiper 설정 추가
  function sec3Swiper() {
    var swiper = new Swiper(".sec3-swiper", {
      slidesPerView: '1.9', // 자동 크기 조정
      spaceBetween: 100,      // 슬라이드 간격
      loop: true,            // 무한 루프
      centeredSlides: true, // 센터모드
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 0, // 회전 없음
        stretch: 30, // 슬라이드 간 간격
        depth: 0, // 깊이감
        modifier: 2,
        slideShadows: true, // 그림자
        },

    // ✅ 반응형 Breakpoints (미디어쿼리 적용)
      breakpoints: {
        1280: {
          slidesPerView: 1.9, // 1280px 이상 (기본값)
        },
        769: {
          slidesPerView: 1.4, // 769px ~ 1279px (태블릿)
        },
        0: {
          slidesPerView: 1.2, // 768px 이하 (모바일)
        }
      },
      on: {
        transitionEnd: function() {
        }
      }
    });
  }
  
  // siwper 함수들 전부 실행
  sec3Swiper();
  console.log("Swiper 초기화");
}

// 모달 초기화 함수
function initModal() {
  // 모달 기능 추가 가능
  console.log("모달 기능 초기화");
}

// UI 컴포넌트 초기화 함수
export function initUIComponents() {
  console.log("UI 컴포넌트 초기화 시작");

  // 슬라이더 (Swiper.js 활용)
  initSwiper();

  // 모달 기능 (추후 구현 가능)
  initModal();

  console.log("UI 컴포넌트 초기화 완료");
}