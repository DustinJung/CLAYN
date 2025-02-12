// 슬라이더, 모달 등 UI 기능

import { letActiveHorny } from "./animations.js";

// Swiper.js 초기화 함수
function initSwiper() {
  // ✅ Swiper 설정 추가
  function sec3Swiper() {
    var swiper = new Swiper(".sec3-swiper", {
      navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      },
      slidesPerView: '3', // 자동 크기 조정
      spaceBetween: 50,      // 슬라이드 간격
      loop: true,            // 무한 루프
      centeredSlides: true, // 센터모드
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 0, // 회전 없음
        stretch: 30, // 슬라이드 간 간격
        depth: 75, // 깊이감
        modifier: 2,
        slideShadows: true, // 그림자
        },
      //on: {
      //  slideChange: function () {
      //      document.querySelectorAll('.swiper-slide').forEach(slide => {
      //      slide.style.opacity = '0.5'; // 모든 슬라이드를 반투명하게
      //      });
      //      document.querySelector('.swiper-slide-active').style.opacity = '1'; // 활성 슬라이드만 강조
      //  },
      //  },

      on: {
        transitionEnd: function() { //slideChange는 실행 중에 함수발생, transitionEnd는 완전히 종료 후.
            //letACtiveHorny안에 조건문으로 false값을 만들어 놓고, 여기서 재실행 return false 이용
            letActiveHorny();
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