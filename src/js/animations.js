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

//** featured section의 article1과 article2의 pin을 통한 배경 parallax
function article_animate() {
  const articles = document.querySelectorAll('#featured_products_section article');
  const article1 = document.querySelector('#featured_products_section .article1');

  gsap.utils.toArray(articles).forEach((article, i) => {
    ScrollTrigger.create({
        trigger: article,
        start: "top top",
        pin: true, 
        pinSpacing: false,
        markers: false,
    });
});
}

//**featured section의 article1 관련 함수
function letFeaturedVisible() {
  const section = document.querySelector("#featured_products_section");
  const element_gutter = document.querySelector("#featured_products_section .article1 .element_gutter");

  // 처음에는 숨겨진 상태로 설정
  gsap.set(element_gutter, { autoAlpha: 0, y: 50 });

  ScrollTrigger.create({
    trigger: section,
    start: "top 40%", // 섹션이 화면에 들어오면 시작
    end: "+=10% 10%", // 섹션이 화면에서 완전히 사라질 때 끝
    markers: false,
    onEnter: () => animateIn(element_gutter), // 등장 애니메이션
    onLeave: () => animateOut(element_gutter), // 퇴장 애니메이션
    onEnterBack: () => animateIn(element_gutter), // 다시 올라올 때 등장
    onLeaveBack: () => animateOut(element_gutter), // 다시 내려갈 때 퇴장
  });

  // 등장 애니메이션 (아래에서 올라오면서 나타남)
  function animateIn(element) {
    gsap.to(element, {
      autoAlpha: 1,
      y: 0,
      duration: 0.75,
      ease: "expo.out",
    });
  }

  // 퇴장 애니메이션 (다시 아래로 사라짐)
  function animateOut(element) {
    gsap.to(element, {
      autoAlpha: 0,
      y: 50,
      duration: 1.75,
      ease: "expo.inOut",
    });
  }
}

// featured section의 article2 관련 함수
function article2_animate() {
  const black_wall = document.querySelector('#featured_products_section .black-wall');
  const article1 = document.querySelector('#featured_products_section .article1')
  const article2 = document.querySelector('#featured_products_section .article2');
  const section = document.querySelector('#featured_products_section')
  const liElements = gsap.utils.toArray('#featured_products_section ul li');
  
  function animate1() {
      //타임라인 생성
  const art2ani = gsap.timeline();

  // article2에 대한 애니메이션 정의
  art2ani.fromTo([article2], {
   opacity: 0,
 }, {
   opacity: 1,
   duration: 1,
 }),
 

   ScrollTrigger.create({
     animation: art2ani,
     trigger: article2,
     start: 'top bottom',
     end: 'bottom top',
     scrub: true,
     markers: false,
   });
  };

  function animate2() {
      //article1에 대한 애니메이션 정의

      const art2ani = gsap.timeline();

     art2ani.fromTo(article1, {
      opacity: 1,
    }, {
      opacity: 0,
      duration: 1,
    });
 
   ScrollTrigger.create({
    animation: art2ani,
    trigger: article2,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    markers: false,
  });
  };

  animate1();
  animate2();


}

// article2의 ul의 li들을 순차적으로 보이게 하는 함수
function artticle2_ul() {

const liElements = gsap.utils.toArray('#featured_products_section ul li');

liElements.forEach((li, index) => {
  gsap.fromTo(
    li,
    { autoAlpha: 0, y: 50 }, // 처음에는 투명하고 아래에 위치
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: li,
        start: 'top 80%', // li 요소가 화면의 80% 위치에 도달하면 실행
        //toggleActions: 'play none none reverse', // 처음엔 이거로 하려 했는데 scrub이 좋다 걍.. reverse는 완전히 돌아와야지만 되는 문제가 있음
        scrub: .5,
        markers: false,
      },
    }
  );
});

}

// section 3의 active slider의 scale을 크게 해버리기
function letActiveHorny() {
  let swiper_div = document.querySelector('.big_products_swiper_wrapper');
  let active_swiper = swiper_div.querySelector('.swiper-slide-active');
  let swiper_shit = swiper_div.querySelector('.swiper');
  let swiper_img = active_swiper.querySelector('img');
  let sec3_swiper = swiper_div.querySelector('.sec3-swiper');
  let black_left = sec3_swiper.querySelector('.swiper-slide-shadow-left')
  let black_right = sec3_swiper.querySelector('.swiper-slide-shadow-right')
  let img_float = document.querySelector('.img_float img');
  //let sibal = [swiper_shit, black_left, black_right, swiper_img];////
  // swiper_img와 .swiper, prev 그리고 next slideShadows의 forEach로 묶어서 한번에 scale값을 조정하는 함수
    //sibal.forEach((sibal, i) => {
      function gang4() {
        let letHorny2 = gsap.timeline();
  
        //letHorny2.fromTo(sibal, {
        //  scale: 5,
        //}, {
        //  scale: 1,
        //  transformOrigin: "center center",
        //})
        
        letHorny2.fromTo(sec3_swiper, {
          opacity: 0,
        }, {
          opacity: 1,
          duration: 1,
          transformOrigin: "center center",
        })//
        ScrollTrigger.create({
          animation: letHorny2,
          trigger: swiper_div,
          start: '10% 70%',
          end: '-20% 5%',
          scrub: true,
          markers: false,
        })
      //})
      };

      function gang3() {
        let letHorny2 = gsap.timeline();

        letHorny2.fromTo(img_float, {
          scale: 1,
          yPercent: -80,
          zIndex: 80,
        }, {
          scale: 0,
          yPercent: 0,
          opacity: 0, // yPercent가 0으로 내려오면 opacity를 0으로 변경
          zIndex: 0,
        })


        ScrollTrigger.create({
          animation: letHorny2,
          trigger: swiper_div,
          start: '-40% 50%',
          end: 'bottom+=25% 5%',
          scrub: true,
          markers: false,
        })
      //})
      };
      


      gang4();
      gang3();
  
  
}

// sec4의 요소들 순서대로 보이게 하기
function letSec4IconVisible() {
  //sec4의 icon article 순서대로 보이게 하기
  function gang1() {
    const JSicons = document.querySelectorAll('.icon-wrapper');
    const iconsWrapper = document.querySelector('.sec4article');
  
    let iconsArray = gsap.utils.toArray(JSicons);
  
    gsap.from(iconsArray, {
      scrollTrigger: {
        trigger: iconsWrapper,
        markers: false,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      duration: 1.2,
      stagger: 0.2, // 여러 아이콘을 순차적으로 애니메이션
    });
  }

  function gang2() {
    const h2El = document.querySelector('.sec4h2');

    gsap.from(h2El, {
      scrollTrigger: {
        trigger: h2El,
        start: 'top-=30px 50%',
        toggleActions: 'play none none reverse',
      },
      autoAlpha: 0,
      duration: 0.6,
    })
  }

  function gang3() {
    const images = document.querySelectorAll('.CTA_wrapper');
    const img = gsap.utils.toArray(images);
  
    images.forEach(item => {
      let ani = gsap.timeline();
  
      ani.from(item, {
        autoAlpha: 0,
        duration: 0.4,
      });
  
      ScrollTrigger.create({
        animation: ani,
        trigger: item,  // 각 아이템에 대해 트리거를 독립적으로 설정
        start: 'top 35%', // 각 아이템의 시작 위치
        toggleActions: 'play none none reverse',
      });
    });
  }

  gang2();
  gang1();
  gang3();
}


// 여기에 애니메이션 정의 함수 추가
function initAnimations() {
  // 여기다가 애니메이션 코드 추가하면 됨

  initPreloader(); // Preloader 실행
  logoTranslate(); // logoTranslate 실행
  introBgVdTxt(); // logo intro 진입시 색바뀌기 실행
  letLogoFillCg(); // intro video section scroll trigger 실행
  brand_introduce_section();
  article_animate();
  letFeaturedVisible();
  article2_animate();
  artticle2_ul();
  letActiveHorny();
  letSec4IconVisible();
}

// 외부에서 사용할 수 있도록 내보내기
export { initAnimations, lenis };