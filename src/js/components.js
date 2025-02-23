// 슬라이더, 모달 등 UI 기능

//import { letActiveHorny } from "./animations.js";

// Swiper.js 초기화 함수
function initSwiper() {
  // ✅ Swiper 설정 추가
  function sec3Swiper() {
    var swiper = new Swiper(".sec3-swiper", {
      navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      },
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
      on: {
        transitionEnd: function() { //slideChange는 실행 중에 함수발생, transitionEnd는 완전히 종료 후.
            //letACtiveHorny안에 조건문으로 false값을 만들어 놓고, 여기서 재실행 return false 이용
            //function updateImageOnSlideChange() {
            //  let active_swiper = document.querySelector('.sec3-swiper .swiper-slide-active');
            //  let active_img = active_swiper ? active_swiper.querySelector('img') : null;
            //  let img_float = document.querySelector('.img_float img');
          //
            //  //if (active_img && img_float) {
            //  //  // active_img의 src를 img_float의 src에 복사
            //  //  img_float.src = active_img.src;
            //  //} 다른 방법으로 가자.
            //};
//
            //updateImageOnSlideChange();
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