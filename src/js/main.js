// main.js (메인 실행 파일)

import { lenis, getLenisDuration } from "./lenis.js"; // ✅ Lenis 가져오기
import { initAnimations } from "./animations.js";
import { initUIComponents } from "./components.js"; // ✅ UI 기능 모듈 가져오기


window.onload = function () {
  try {
    lenis.stop();

    // UI 기능 초기화 (슬라이더, 모달 등)
    initUIComponents();

    // 애니메이션 초기화 (gsap를 이용한)
    initAnimations();

    console.log("웹페이지가 로드되었습니다."); // 페이지 로딩 후 로그 출력

    // ✅ Preloader 종료 후 Lenis 실행 (3.5초 후)
    setTimeout(() => {
      lenis.start();
      document.querySelector('body').classList.add('is-ready');
      console.log(`Lenis 시작됨, lenis duration 값 : ${lenis.options.duration}`);
    }, 3350); // Preloader 종료 되면서, marquee 내려올 수 있도록 준비
  } catch (error) {
    console.error("초기화 중 오류 발생:", error);
  }

  // ✅ Lenis duration 업데이트 함수 (main.js에서 관리)
function updateLenisDuration() {
  lenis.options.duration = getLenisDuration();
  console.log(`🔄 Lenis duration 업데이트됨: ${lenis.options.duration}`);
}

  // ✅ Resize 이벤트 뭉치
  function windowResizeEvent() {
        // ✅ 화면 크기(너비) 변경 감지 및 최적화된 리사이징 처리
    let delay = 400;
    let timer = null;
    let lastWidth = window.innerWidth;

    window.addEventListener("resize", function () {
      let newWidth = window.innerWidth;

      if (newWidth !== lastWidth) { // ✅ 너비 변경 시에만 실행 (세로 변경 무시)
        clearTimeout(timer);
        timer = setTimeout(() => {
          updateLenisDuration(); // ✅ Lenis duration 업데이트
        }, delay);

        lastWidth = newWidth; // 현재 너비 업데이트
      }
    });
  }
  windowResizeEvent();

  //여기서부터 애니메이션 외 순수 자바스크립트 모음
  function VanilaJavaScript() {
    //이메일 구독 섹션
    function formPD() {
      let emailInput = document.getElementById('newsletter-email');
      let submitBtn = document.querySelector('.footer-submit-btn');
      let form = document.getElementById('footer-form');

      document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault(); // 페이지 새로고침 방지
        //폼데이터 관련
        
        //submit과 input 비활성화
        emailInput.disabled = true;
        submitBtn.disabled = true;

        // 그 후 액션
        setTimeout(function() {
          form.classList.add('is-submitted');
          setTimeout(function() {
            emailInput.value = '';
            emailInput.placeholder = emailInput.getAttribute('placeholder');
            emailInput.disabled = false;
            submitBtn.disabled = false;
            form.classList.remove('is-submitted');
          }, 5000)
        }, 3000)
      });
    }

    //장바구니 버튼
    function bucketBtn() {
      let black_bg = document.querySelector('.bucket-black-bg');
      let white_bg = document.querySelector('.bucket-white-overlay');
      let bucket_btn = document.querySelector('.header_bucket');
      let html = document.querySelector('html');
      let menuBg = document.getElementById('menu_bg');
      let mainNav_ul = document.querySelector('#clayn_nav ul');
      let sns = document.querySelector('.sns_wrapper');
    
      //장바구니 버튼
      function bucket_btn_fn() {
        bucket_btn.addEventListener('click', () => {
          if(html.classList.contains('has-menu-bg')){
            html.classList.toggle('has-menu-bg');
            menuBg.classList.toggle('hide');
            mainNav_ul.classList.toggle('on');
            if(mainNav_ul.classList.contains('on')){
              sns.classList.add('on');
            }else{
              sns.classList.remove('on');
            }
          };
          html.classList.toggle('has-bucket-clicked');
          if(html.classList.contains('has-bucket-clicked')){
            lenis.stop();
          }else{
            lenis.start();
          }
        })
      }

      //장바구니 버튼 켜져 있는 상태에서 검은 화면
      function black_bg_fn() {
        black_bg.addEventListener('click', () => {
          if(html.classList.contains('has-bucket-clicked')){
            lenis.start();
            html.classList.toggle('has-bucket-clicked');
          }
        })
      }


      bucket_btn_fn();
      black_bg_fn();
    }

    //프로덕트 마키 프리벤스탑
    function marquee_prevent() {
      let marquee = document.querySelectorAll('.sec3_products_marquee');
      marquee.forEach((marquee) => {
        let a_lists = marquee.querySelectorAll('ul li a');
        a_lists.forEach((a) => {
          a.addEventListener('click', (e) => {
            e.preventDefault();
          });
        });
      });
    }

    //스와이퍼 a태그 프리벤디폴
    function swiper_a_prevent() {
      let a = document.querySelectorAll('#swiper_products_section .swiper-slide a');
      a.forEach((a) => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
        })
      })
    }

    formPD();
    bucketBtn();
    marquee_prevent();
    swiper_a_prevent();

  }

  //바닐라 자바스크립트 함수
  VanilaJavaScript();
};




