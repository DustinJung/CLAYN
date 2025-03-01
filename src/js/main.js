// main.js (메인 실행 파일)
import { initPreloader, initAnimations } from "./animations.js";
import { initUIComponents } from "./components.js";

console.log("🗿 main.js 실행(총괄 js파일)");

// `startApp()` 실행하여 UI 및 애니메이션 초기화 후 Preloader 제거
function startApp() {
  try {
    console.log("🗿 startApp()실행 try, 스크립트 동기화 실행");

    // UI 기능 초기화 (슬라이더, 모달 등)
    initUIComponents();

    // 애니메이션 초기화 (GSAP 활용)
    initAnimations();

    console.log("🗿 컴포넌트, 애니메이션 관련 스크립트 동기화 완료");

    // 모든 초기화가 끝난 후 Preloader 제거
    setTimeout(() => {
      console.log("🗿 Preloader 장막 올라가기 시작");
      const preloader = document.querySelector(".pre-loader");
      gsap.to(preloader, {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
          console.log("🗿 GSAP onComplete 실행, is-ready 추가시도");
          preloader.classList.add("hide");
          document.body.classList.add("is-ready");
          console.log("🗿 is-ready가 추가 ->:", document.body.classList.contains("is-ready"));
        },
      });
    }, 500); // 0.5초 딜레이 후 Preloader 제거
  } catch (error) {
    console.error("🗿? 초기화 중 오류 발생 :", error);
  }
}

// Preloader가 끝난 후 `startApp()` 실행
initPreloader(startApp);



window.onload = function () {
  //  Resize 이벤트 뭉치
  function windowResizeEvent() {
        //  화면 크기(너비) 변경 감지 및 최적화된 리사이징 처리
    let delay = 400;
    let timer = null;
    let lastWidth = window.innerWidth;

    window.addEventListener("resize", function () {
      let newWidth = window.innerWidth;

      if (newWidth !== lastWidth) { //  너비 변경 시에만 실행 (세로 변경 무시)
        clearTimeout(timer);
        timer = setTimeout(() => {
          location.reload();
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

  // 장바구니 버튼
  function bucketBtn() {
    let black_bg = document.querySelector('.bucket-black-bg');
    let white_bg = document.querySelector('.bucket-white-overlay');
    let bucket_btn = document.querySelector('.header_bucket');
    let html = document.querySelector('html');  
    let menuBg = document.getElementById('menu_bg');
    let mainNav_ul = document.querySelector('#clayn_nav ul');
    let sns = document.querySelector('.sns_wrapper');

    function bucket_btn_fn() {
      bucket_btn.addEventListener('click', () => {
        bucket_btn.classList.toggle('fill-on');

        if(html.classList.contains('has-menu-bg')){
          html.classList.toggle('has-menu-bg');
          menuBg.classList.toggle('hide');
          mainNav_ul.classList.toggle('on');
          if(mainNav_ul.classList.contains('on')){
            sns.classList.add('on');
          } else {
            sns.classList.remove('on');
          }
        };
        html.classList.toggle('has-bucket-clicked');
      });
    }

    function black_bg_fn() {
      black_bg.addEventListener('click', () => {
        bucket_btn.classList.toggle('fill-on');
        if(html.classList.contains('has-bucket-clicked')){
          html.classList.toggle('has-bucket-clicked');
        }
      });
    }

    // ESC 키를 누르면 장바구니 닫힘
    function escCloseBucket(event) {
      if (event.key === "Escape" && html.classList.contains("has-bucket-clicked")) {
        html.classList.remove("has-bucket-clicked");
        bucket_btn.classList.remove("fill-on");
      }
    }

    document.addEventListener("keydown", escCloseBucket); // ESC 이벤트 리스너 추가

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

    //anytime section button 3개 누르면 404로 href 이동 시키기
    function getTo404Page() {
      let theBtns = document.querySelectorAll('.getTo404');

      theBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          window.location.href = '404.html';
        })
      })
    }

    function MenuBtnTabCycle() {
      document.addEventListener("keydown", function(event) {
        let html = document.querySelector('html');
        let menuBtn = document.querySelector('.header_menu'); // ✅ 메뉴 버튼 추가
      
        if (html.classList.contains("has-menu-bg") && event.key === "Tab") {
          let focusableElements = Array.from(document.querySelectorAll("#clayn_nav .item a, .sns_wrapper a"));
          focusableElements.unshift(menuBtn); // ✅ menuBtn을 리스트의 첫 번째 요소로 추가
          let firstElement = focusableElements[0];
          let lastElement = focusableElements[focusableElements.length - 1];
      
          if (event.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      });
      
    }

    formPD();
    bucketBtn();
    marquee_prevent();
    swiper_a_prevent();
    getTo404Page();
    MenuBtnTabCycle();              
  }

  //바닐라 자바스크립트 함수
  VanilaJavaScript();
};




