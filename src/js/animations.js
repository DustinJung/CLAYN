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

//프로그레스 바 애니메이션
function progressBar() {
  gsap.to("progress", {
    value: 100,
    ease: 'none',
    scrollTrigger: {
        scrub: .3,
    }
})
}

// 메뉴버튼관련
function menuBtn() {
  let clearShit;
  let menuBtn = document.querySelector('.header_menu');
  let html = document.querySelector('html');
  let menuBg = document.getElementById('menu_bg');
  let logo = document.querySelector('.logo-transform');
  let mainNav_ul = document.querySelector('#clayn_nav ul');
  let mainNav_li = document.querySelectorAll('#clayn_nav ul .item');
  let sns = document.querySelector('.sns_wrapper');

  menuBtn.addEventListener('click', () => {
    menuBg.classList.toggle('hide');
    html.classList.toggle('has-menu-bg');
    if(html.classList.contains('has-menu-bg')){
      lenis.stop();
      if(logo.classList.contains('not-entered')){
        gsap.to(logo, {
          yPercent: 0,
          scale: 1,
          duration: .6,
          ease: 'power2.out',
        })
        logo.classList.add('onActive');
      }
    }else{
      lenis.start();
      if(logo.classList.contains('onActive')){
        gsap.to(logo, {
          yPercent: 200,
          scale: 3,
          duration: 0.6,
          ease: 'power2.out',
        });
        logo.classList.remove('onActive');
      }

    }
    mainNav_ul.classList.toggle('on');
    clearTimeout(clearShit);
    setTimeout(function() {
      if(mainNav_ul.classList.contains('on')){
        sns.classList.add('on');
      }else{
        sns.classList.remove('on');
      }
    }, 150);

    
  })
}

//바로 보러가기 버튼
function letsSee() {
  let section = document.getElementById('featured_products_section');
  let btn = section.querySelector('.clayn_btn');
  let article = document.querySelector('.big_products_swiper_wrapper');

  btn.addEventListener('click', () => {
    gsap.to(window, {
        scrollTo: article,
        duration: 1, // 스크롤 속도 (1초)
        ease: "power2.inOut" // 부드러운 스크롤 이펙트
    });
});
}

// nav의 a들 skew하는 기능
function skewTheNav() {
  document.querySelectorAll('.menu_bg li span a').forEach((a) => {
    let lastX = 0;
    let skewValue = 0;
    
    a.addEventListener('mousemove', (e) => {
      let currentX = e.clientX;
      let speedX = currentX - lastX; // 마우스 이동 속도 계산

      // 마우스 이동 방향에 따라 skew 값 설정 (반대 방향으로 기울이기)
      let targetSkew = Math.max(-10, Math.min(10, -speedX * 6)); // 반대로 설정

      // 부드러운 보간 적용
      gsap.to(a, { skewX: targetSkew, duration: 0.3, ease: "power2.out" });
  
      lastX = currentX;
    });
  
    // 마우스가 떠나면 원래 위치로 자연스럽게 복귀
    a.addEventListener('mouseleave', () => {
      gsap.to(a, { skewX: 0, duration: 0.6, ease: "power2.out" });
    });
  });
}

// logo translate 애니메이션 추가
function logoTranslate() {
  const logo = document.querySelector('.logo-transform'); // 로고를 감싼 i태그

  logo.classList.add('not-entered');

  const logoAnimate = gsap.from(logo, {
    yPercent: 200,  
    scale: 3,       
    duration: 1,
    scrollTrigger: {
      trigger: logo,
      start: 'top top',
      end: '+=80',
      markers: false,
      id: 'logo',
      scrub: 0.5,  // 스크럽 효과 적용
      onUpdate: (self) => {
        // scrub이 적용되었을 때 scale 값에 따라 클래스를 추가하거나 제거
        if (self.progress === 0) {
          logo.classList.add('not-entered');
        } else if (self.progress === 1) {
          logo.classList.remove('not-entered');
        }
      },
    },
  });

  return logoAnimate;
}

// logo intro section 진입 시 가독성 문제로 fill 값 바꾸게 하는 함수, 스크롤 기준은 밑 introBgVdTxt() 함수와 맞춤.
function letLogoFillCg() {
  const logoSvg = document.querySelector(".logo_g"); // SVG 선택
  const navMenu = document.querySelectorAll('.header_nav_btn span'); // header_nav_btn span 전부 선택 // 쿼리셀렉터올은 nodeList를 반환하고, 이 객체는 배열처럼 반복 가능하기 때문에 각 span에 반복문을 돌려서 클래스를 추가하거나 제거해야 함.
  const logoBucket = document.querySelector('.bucket_path');

  ScrollTrigger.create({
    trigger: "#intro_video_wrapper",
    start: "-40px top",
    end: "+=6000",
    markers: false,
    scrub: true,
    onEnter: () => { 
      logoSvg.classList.add('on');
      navMenu.forEach(span => span.classList.add('on')); // 그래서 forEach를 쓴 것. 각 span에 'on' 클래스 추가, 
      logoBucket.classList.add('on');
    },
    onLeave: () => {
      gsap.delayedCall(1.5, () => { 
        logoSvg.classList.remove('on');
        navMenu.forEach(span => span.classList.remove('on')); // 각 span에서 'on' 클래스 제거
        logoBucket.classList.remove('on');
      }); // 1.5초 딜레이 후 클래스 제거
    },
    onEnterBack: () => { 
      logoSvg.classList.add('on');
      navMenu.forEach(span => span.classList.add('on')); // 다시 진입 시 'on' 클래스 추가
      logoBucket.classList.add('on');
    },
    onLeaveBack: () => { 
      logoSvg.classList.remove('on');
      navMenu.forEach(span => span.classList.remove('on')); // 다시 벗어나면 'on' 클래스 제거
      logoBucket.classList.remove('on');
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
    start: "0px top",
    end: '+=8000',
    scrub: .5,
    pin: true,
    anticipatePin: 1,
    markers: false,
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
    start: "top 60%",
    end: "+=15% top",
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

// se3의 gsap를 이용한 marquee 애니메이션
function startMarquee() {
  let article2 = document.querySelector('.sec3_products_marquee2');
  let article2_ul = article2.querySelectorAll('ul');
  let theSection = document.querySelector('#swiper_products_section');
  let tweenInstances = []; // 애니메이션을 저장할 배열

  function marquee() {
    article2_ul.forEach((ul) => {
      gsap.set(ul, { xPercent: -100 });
    });

    document.querySelectorAll(".sec3_products_marquee1, .sec3_products_marquee2").forEach((marquee) => {
      let lists = marquee.querySelectorAll("ul");

      lists.forEach((ul) => {
        let tween = gsap.to(ul, {
          xPercent: marquee.classList.contains("sec3_products_marquee1") ? -100 : 0,
          duration: 60,
          repeat: -1,
          ease: "linear",
          paused: true, // 처음에는 멈춘 상태
        });

        tweenInstances.push(tween); // 트윈 인스턴스를 저장

        marquee.addEventListener('mouseenter', () => {
          tween.timeScale(0.3);
        });

        marquee.addEventListener('mouseleave', () => {
          tween.timeScale(1);
        });
      });
    });
  }

  marquee(); // 마르quee 초기화

  // ScrollTrigger로 섹션이 보일 때만 실행
  ScrollTrigger.create({
    trigger: theSection,
    start: "top 90%", // 섹션이 화면의 90% 위치에서 보일 때 시작
    end: "bottom 10%", // 섹션이 화면에서 거의 사라질 때까지 유지
    onEnter: () => {
      tweenInstances.forEach(tween => tween.play()); // 애니메이션 재생
    },
    onLeave: () => {
      tweenInstances.forEach(tween => tween.pause()); // 애니메이션 일시정지
    },
    onEnterBack: () => {
      tweenInstances.forEach(tween => tween.play()); // 다시 화면에 들어오면 재생
    },
    onLeaveBack: () => {
      tweenInstances.forEach(tween => tween.pause()); // 화면에서 나가면 일시정지
    },
  });
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
export function letActiveHorny() {
  
  let myLack = document.querySelector('#forgiveMyLack');
  let float_div = document.querySelectorAll('.swiper-float-div');
  //let active_article = document.querySelector('.swiper-slide-active');
  //let notActiveSlide = document.querySelectorAll('.swiper-slide:not(.swiper-slide-active)');
  //let fill = document.querySelector('.swiper-slide.swiper-slide-active .fill');

  function makeFillBig(fill) {
    fill = document.querySelector('.swiper-slide.swiper-slide-active .fill');
    let bigFill = gsap.timeline();
  
    bigFill.fromTo(
      fill,
      { scaleX: 5, scaleY: 3 },
      { scaleX: 3, scaleY: 3 }
    );
  
    ScrollTrigger.create({
      animation: bigFill,
      trigger: myLack,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
      markers: false,
      id: 'sex'
    });
  }
  
  function makeFillSmall(fill) {
    fill = document.querySelector('.swiper-slide.swiper-slide-active .fill');
    let smallFill = gsap.timeline();
  
    smallFill.fromTo(
      fill,
      { scaleX: 3, scaleY: 3 },
      { scaleX: 1, scaleY: 1 }
    );
  
    ScrollTrigger.create({
      animation: smallFill,
      trigger: myLack,
      start: 'bottom top',
      end: '+=1500',
      scrub: 0.5,
      markers: false,
      id: 'sex2'
    });
  }
  
  function letSlideVisible(notActiveSlide) {
    notActiveSlide = document.querySelectorAll('.swiper-slide:not(.swiper-slide-active)');
    let slideVisible = gsap.timeline();
  
  
    notActiveSlide.forEach((slide) => {
      slideVisible.fromTo(slide,
        {opacity: 0,},
        {opacity: 1, duration: 4,}
      )
    })
  
  
    ScrollTrigger.create({
      animation: slideVisible,
      trigger: myLack,
      start: 'bottom+=800px top',
      end: '+=1200',
      scrub: 0.5,
      markers: false,
    })
  }
  
  function swiperFloatDivHide(active_article) {
    let swiperFloatDivHide = gsap.timeline();
  
    float_div.forEach((div) => {
      swiperFloatDivHide.fromTo(div,
        { opacity: 0 },
        { opacity: 1, duration: 0.1,}
      );
    });
  
    ScrollTrigger.create({
      animation: swiperFloatDivHide,
      trigger: myLack,
      start: 'bottom+=1250px top',
      markers: false,
      toggleActions: 'play none none reverse',
      onEnter: () => {
        active_article = document.querySelector('.swiper-slide-active');
        active_article.classList.add('hover-enabled'); // hover 효과를 활성화하는 클래스 추가
      },
      onLeaveBack: () => {
        active_article = document.querySelector('.swiper-slide-active');
        active_article.classList.remove('hover-enabled'); // 스크롤이 역방향일 때 클래스 제거
      }
    });
  }

  swiperFloatDivHide();
  letSlideVisible();
  makeFillSmall();
  makeFillBig();
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
        start: 'top 55%',
        toggleActions: 'play none none reset',
      },
      opacity: 0,
      duration: 1.1,
      stagger: 0.15, // 여러 아이콘을 순차적으로 애니메이션
    });
  }
  function bitchbitch() {
    const JSicons = document.querySelectorAll('.icon-wrapper');
    const iconsWrapper = document.querySelector('.sec4article');
  
    let iconsArray = gsap.utils.toArray(JSicons);


    const bitch = gsap.timeline({
      scrollTrigger: {
        trigger: iconsWrapper,
        markers: false,
        start: 'top 55%',
        toggleActions: 'play none none reset',
      },
      ease: "power4.out",
    })

    bitch.from(iconsArray[0], {
      opacity: 0,
      duration: 0.15,
    });
    bitch.from(iconsArray[1], {
      opacity: 0,
      duration: 0.15,
    }, "-=.01");
    bitch.from(iconsArray[2], {
      opacity: 0,
      duration: 0.15,
    }, "-=.02");
    bitch.from(iconsArray[3], {
      opacity: 0,
      duration: 0.15,
    }, '+=.04');
    bitch.from(iconsArray[4], {
      opacity: 0,
      duration: 0.15,
    }, '+=.08');
    bitch.from(iconsArray[5], {
      opacity: 0,
      duration: 0.15,
    }, '+=.13');
  }
  function gang2() {
    const h2El = document.querySelector('#anytime_section .sec4h2');

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
    const images = document.querySelectorAll('.CTA_wrapper > div');
    const img = gsap.utils.toArray(images);
  
    images.forEach(item => {
      let ani = gsap.timeline();
  
      ani.from(item, {
        autoAlpha: 0,
        duration: 0.8,
        ease: 'ease-in',
      });
  
      ScrollTrigger.create({
        animation: ani,
        trigger: item,  // 각 아이템에 대해 트리거를 독립적으로 설정
        start: 'top 80%', // 각 아이템의 시작 위치
        toggleActions: 'play none none reverse',
        markers: false,
      });
    });
  }

  //gang2();
  //gang1();
  bitchbitch();
  gang3();
}

// sec5의 애니메이션 ( thank you section 포함 )
function sec5() {
  const sec5_path = document.querySelector("#thank_you_path");
  const sec5_wrapper = document.querySelector("#thank_you_section");
  const sec5 = sec5_wrapper.querySelector(".lookup");
  const h2 = sec5_wrapper.querySelector('.sec4h2')

  //const pathLength = sec5_path.getTotalLength(); // path 길이 구하는 메서드. 실제 JS 메서드임.
  //console.log("Path 길이:", pathLength);



  function thank_you_path_and_see_you_later() {
    const ani = gsap.timeline({
      scrollTrigger: {
        trigger: sec5,
        start: "top 40%",
        toggleActions: "play none none reset", // 스크롤 올리면 다시 사라지게 설정
        markers: false,
      }
    });

    ani.fromTo(
      sec5_path,
      { strokeDasharray: "4739.13916015625", strokeDashoffset: "4739.13916015625" }, // 시작 상태
      {
        strokeDashoffset: "0", // 최종 상태 (선이 다 나타남)
        duration: 1.6,
        ease: "power2.out",
      }
    );

    ani.from(h2, {
      opacity: 0,
      duration: .5,
      ease: 'ease2.in',
    })
  };

  thank_you_path_and_see_you_later();
}

function sec6() {
  const mySignPath = document.querySelector('#my-sign-path');
  const mySign = document.querySelector('.my-sign');
  const about_section = document.querySelector('#about_section');
  const figure = about_section.querySelector('figure');
  //const pathLength = mySignPath.getTotalLength(); // path 길이 구하는 메서드. 실제 JS 메서드임.
  //console.log("Path 길이:", pathLength);

  gsap.fromTo(mySignPath, 
    {
      strokeDasharray: '1890.7489013671875',
      strokeDashoffset: '1890.7489013671875',
    },
      {
        strokeDashoffset: '0',
        duration: 1,
        ease: 'ease2.out',
        scrollTrigger: {
          trigger: figure,
          start: 'top 50%',
          markers: false,
          toggleActions: 'play none none reset',
        }
      })
}

function footerAnimate() {
  let main = document.querySelector('main');
  let footer = document.querySelector('#footer-section');
  let footerBg = document.querySelector("#footer-section");

  function goUpMain() {
    gsap.to(main, {
      y: '-100vh',
      ease: 'none',
      scrollTrigger: {
        trigger: main,
        start: 'bottom top',
        end: 'bottom top',
        scrub: true,
      }
    })
  }

  function footerVideoBlacked() {
    ScrollTrigger.create({
      trigger: footerBg,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      markers: false,
      onUpdate: (self) => {
        let progress = self.progress.toFixed(3);
        //console.log("Scroll Progress:", progress);
        footerBg.style.setProperty("--progress", progress);
      },
    });
  }

  //goUpMain();
  footerVideoBlacked();
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
  letSec4IconVisible();
  sec5();
  sec6();
  footerAnimate();
  progressBar();
  menuBtn();
  skewTheNav();
  letsSee();
  startMarquee();
  letActiveHorny();
}

// 외부에서 사용할 수 있도록 내보내기
export { initAnimations, lenis };