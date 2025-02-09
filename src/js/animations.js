// animations.js (GSAP 애니메이션 관리)

//import { lenis } from "./lenis.js"; // Lenis 모듈 가져오기

gsap.registerPlugin(ScrollTrigger);

// GSAP ScrollTrigger와 Lenis 연결
//crollTrigger.scrollerProxy(document.body, {
// scrollTop(value) {
//   if (arguments.length) {
//     lenis.scrollTo(value); // scrollTo 메서드를 사용해 스크롤 값 설정
//   }
//   return lenis.scroll; // 여전히 스크롤 값을 읽을 때는 getter 사용
// },
// getBoundingClientRect() {
//   return {
//     top: 0,
//     left: 0,
//     width: window.innerWidth,
//     height: window.innerHeight,
//   };
// },
//);

// Lenis와 ScrollTrigger 동기화
//lenis.on("scroll", ScrollTrigger.update);

// ScrollTrigger 새로고침
//ScrollTrigger.addEventListener("refresh", () => lenis.raf());
//ScrollTrigger.refresh();

const lenis = new Lenis({
  // 추가된 부분
  duration: 2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

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

// logo translate 애니메이션 추가
function logoTranslate() {
  const logo = document.querySelector('.logo-transform'); // 로고를 감싼 i태그

  gsap.from(logo, {
    yPercent: 200,  
    scale: 3,       
    duration: 1,
    scrollTrigger: {
      trigger: logo,
      start: 'top top',
      end: '+=80',
      markers: false,
      id: 'logo',
      scrub: 0.5,  // 0.5로 수정 (숫자 값이므로 괄호 없이 사용)
    },
  })
}

// logo intro section 진입 시 가독성 문제로 fill 값 바꾸게 하는 함수, 스크롤 기준은 밑 introBgVdTxt() 함수와 맞춤.
function letLogoFillCg() {
  const logoSvg = document.querySelector(".logo_g"); // SVG 선택

  ScrollTrigger.create({
    trigger: "#intro_video_wrapper",
    start: "-40px top",
    end: "+=6000",
    markers: false,
    scrub: true,
    onEnter: () => {logoSvg.classList.add('on')}, // 스크롤 진입 시 포인트 컬러
    onLeave: () => {
      gsap.delayedCall(1.5, () => logoSvg.classList.remove('on')); // 1.5초 딜레이 후 클래스 제거
    },
    onEnterBack: () => {logoSvg.classList.add('on')}, // 다시 진입 시 포인트 컬러
    onLeaveBack: () => {logoSvg.classList.remove('on')},
  });
}

// intro video section 위에서 도예 quote가 떠오르는 script.
function introBgVdTxt() {
  const vdWrapper = document.querySelector('#intro_video_wrapper');
  const introText = gsap.utils.toArray('.intro_text');

  const textFloat = gsap.timeline();

  introText.forEach((text, index) => {
    textFloat.fromTo(
      text,
      { opacity: 0, y: 30 }, // 처음에는 보이지 않음 + 아래쪽 위치
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, // 등장 부드럽게
      index * 3 // 등장 간격을 3초로 조절
    ).to(
      text,
      { opacity: 0, y: -30, duration: 1.5, ease: "power3.in" }, // 사라짐 부드럽게
      index * 3 + 1.5 // 등장 후 1.5초 후에 사라짐
    );
  });

  ScrollTrigger.create({
    animation: textFloat,
    trigger: vdWrapper,
    start: 'top top',
    end: '+=6000',
    scrub: true,
    pin: true,
    markers: false,
    anticipatePin: 1,
  });
}
// 여기에 애니메이션 정의 함수 추가
function initAnimations() {
  // 여기다가 애니메이션 코드 추가하면 됨

  initPreloader(); // Preloader 실행
  logoTranslate(); // logoTranslate 실행
  introBgVdTxt(); // logo intro 진입시 색바뀌기 실행
  letLogoFillCg() // intro video section scroll trigger 실행
}

// 외부에서 사용할 수 있도록 내보내기
export { initAnimations, lenis };