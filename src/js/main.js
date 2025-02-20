// main.js (메인 실행 파일)

import { lenis } from "./animations.js"; // ✅ Lenis 가져오기
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
      console.log("Lenis 시작됨");
    }, 3350); // Preloader 종료 되면서, marquee 내려올 수 있도록 준비
  } catch (error) {
    console.error("초기화 중 오류 발생:", error);
  }


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



    formPD();
  }

  //바닐라 자바스크립트 함수
  VanilaJavaScript();
};




