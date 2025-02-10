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
  const navMenu = document.querySelectorAll('.header_nav_btn span'); // header_nav_btn span 전부 선택 // 쿼리셀렉터올은 nodeList를 반환하고, 이 객체는 배열처럼 반복 가능하기 때문에 각 span에 반복문을 돌려서 클래스를 추가하거나 제거해야 함.

  ScrollTrigger.create({
    trigger: "#intro_video_wrapper",
    start: "-40px top",
    end: "+=6000",
    markers: false,
    scrub: true,
    onEnter: () => { 
      logoSvg.classList.add('on');
      navMenu.forEach(span => span.classList.add('on')); // 그래서 forEach를 쓴 것. 각 span에 'on' 클래스 추가, 
    },
    onLeave: () => {
      gsap.delayedCall(1.5, () => { 
        logoSvg.classList.remove('on');
        navMenu.forEach(span => span.classList.remove('on')); // 각 span에서 'on' 클래스 제거
      }); // 1.5초 딜레이 후 클래스 제거
    },
    onEnterBack: () => { 
      logoSvg.classList.add('on');
      navMenu.forEach(span => span.classList.add('on')); // 다시 진입 시 'on' 클래스 추가
    },
    onLeaveBack: () => { 
      logoSvg.classList.remove('on');
      navMenu.forEach(span => span.classList.remove('on')); // 다시 벗어나면 'on' 클래스 제거
    },
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

// brand_introduce_section 애니메이션
function brand_introduce_section() {
  const intro_section = document.querySelector('#brand_introduce_section');


  // GSAP 타임라인 설정
  const animation = gsap.timeline();
  
  //number 애니메이션 추가
  const number = gsap.utils.toArray('#brand_introduce_section .number');
  number.forEach((number, i) => {
    // Number 애니메이션
    animation.fromTo(
      number,
      { x: '2000px', opacity: 0, },  // 처음에는 오른쪽 바깥에 위치
      { x: 0, duration: 1, ease: "power3.out", opacity: 1, },
      i * 3  // 각 애니메이션 시작 시간 설정
    ).to(
      number,
      { x: '-2000px', duration: 1, opacity: 0, ease: 'power.in' },  // 이동 애니메이션
      i * 3 + 1.5
    );
  
    // Person 애니메이션 추가
    const person = gsap.utils.toArray('#brand_introduce_section .person');
    animation.fromTo(
      person[i],  // i번째 person에 대해서
      { x: '-2000px', opacity: 0, },  // 처음에는 오른쪽 바깥에 위치
      { x: 0, duration: 1, ease: "power3.out", opacity: 1, },
      i * 3  // 각 애니메이션 시작 시간 설정
    ).to(
      person[i],  // i번째 person에 대해서
      { x: '2000px', duration: 1, opacity: 0, ease: 'power.in' },  // 이동 애니메이션
      i * 3 + 1.5
    );

    // text 애니메이션 추가
    const text = gsap.utils.toArray('#brand_introduce_section .text');
    animation.fromTo(
      text[i],  // i번째 person에 대해서
      { x: '-2000px', opacity: 0, },  // 처음에는 오른쪽 바깥에 위치
      { x: 0, duration: 1, ease: "power3.out", opacity: 1, },
      i * 3  // 각 애니메이션 시작 시간 설정
    ).to(
      text[i],  // i번째 person에 대해서
      { x: '-2000px', duration: 1, opacity: 0, ease: 'power.in' },  // 이동 애니메이션
      i * 3 + 1.5
    );
  });

  // ScrollTrigger 애니메이션 설정
  ScrollTrigger.create({
    animation: animation,
    trigger: intro_section,
    start: "36px top",
    end: '+=8000',
    scrub: .5,
    pin: true,
    anticipatePin: 1,
    markers: false,  // 마커는 보기 편하게 설정
  });
}



function article1_animate() {
  const firstSec = document.querySelector('#featured_products_section .article1 .element_gutter');
  const vdWrapper = document.querySelector('#featured_products_section .article1');

  let scrollEndValue = "+=1000px"; // 🔥 이 값을 조정하면 자동으로 parallax에도 반영됨

  gsap.fromTo(firstSec, { 
      autoAlpha: 0, // 시작 상태
      y: 50 
    }, 
    { 
      autoAlpha: 1, // opacity 1로 서서히 전환
      y: 0, // y 위치 이동
      duration: 1.5, 
      ease: "power2.out", 
      scrollTrigger: {
        trigger: vdWrapper,
        start: "top top",
        end: scrollEndValue, // 동적으로 설정
        scrub: true,
        markers: false,
        id: "first_sec_markers",
        onUpdate: (self) => {
          updateParallaxScroll(self.end); // 🔥 패럴랙스 애니메이션에도 반영
        }
      }
    }
  );
}

function featured_article_parallax() {
  const articles = gsap.utils.toArray('#featured_products_section article');

  articles.forEach((article, i) => {
    if (i === articles.length - 1) return; // 마지막 article은 제외

    let nextArticle = articles[i + 1];

    let parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: article,
        start: "top top",
        end: "+=1000px", // 기본값, 이후 업데이트 가능
        scrub: true,
        pin: true,
        pinSpacing: true,
      }
    })
    .to(nextArticle, {
      yPercent: -100, 
      ease: "none",
    });

    article.parallaxTimeline = parallaxTimeline; // 타임라인 저장
  });
}

// 🔥 article1의 스크롤 길이에 맞춰 parallax의 길이 업데이트
function updateParallaxScroll(newEndValue) {
  const articles = gsap.utils.toArray('#featured_products_section article');

  articles.forEach((article, i) => {
    if (i === articles.length - 1) return; 

    let scrollTrigger = article.parallaxTimeline.scrollTrigger;
    if (scrollTrigger) {
      scrollTrigger.end = newEndValue; // end 값을 업데이트
      scrollTrigger.refresh(); // 변경 사항 적용
    }
  });
}

// 여기에 애니메이션 정의 함수 추가
function initAnimations() {
  // 여기다가 애니메이션 코드 추가하면 됨

  initPreloader(); // Preloader 실행
  logoTranslate(); // logoTranslate 실행
  introBgVdTxt(); // logo intro 진입시 색바뀌기 실행
  letLogoFillCg(); // intro video section scroll trigger 실행
  brand_introduce_section();
  featured_article_parallax();
  article1_animate();
}

// 외부에서 사용할 수 있도록 내보내기
export { initAnimations, lenis };