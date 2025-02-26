document.addEventListener("DOMContentLoaded", function () {
    let shards = document.querySelectorAll(".fragile");
    let pottery = document.querySelector('#broken-pottery');
    let body = document.querySelector('body');
    let theP = document.querySelector('.error-container > p');


    const animate404 = gsap.timeline();

    animate404.to(pottery, {
        delay: 2,
        scale: 1.05,
        rotation: 2, // 시계방향으로 2도 회전
        repeat: 4,
        yoyo: true, // yoyo는 animation의 왕복 효과. '초기값으로' 돌아가서 다시 실행한다는 뜻.
        duration: 0.15,
        ease: 'power1.inout'
    })
    animate404.to(pottery, {
        delay: .3,
        scale: 1.05,
        rotation: -2, // 시계방향으로 2도 회전
        repeat: 4,
        yoyo: true, // yoyo는 animation의 왕복 효과. '초기값으로' 돌아가서 다시 실행한다는 뜻.
        duration: 0.15,
        ease: 'power1.inout'
    })
    animate404.to(pottery, {
        delay: .3,
        scaleX: 1.15,
        scaleY: 1.05,
        rotation: 0, 
        repeat: 4,
        yoyo: true, // yoyo는 animation의 왕복 효과. '초기값으로' 돌아가서 다시 실행한다는 뜻.
        duration: 0.15,
        ease: 'power1.inout'
    })
    animate404.to(pottery, {
        delay: .3,
        scaleX: .15,
        scaleY: .15,
        rotation: -10, 
        duration: 0.5,
        ease: 'expo.in'
    })
    animate404.to(pottery, {
        delay: .3,
        scaleX: 1,
        scaleY: 1,
        rotation: 10, 
        duration: 0.6,
        ease: 'expo.out'
    })
    animate404.to(shards, {
        delay: .2,
        opacity: 0,
        x: (i) => {
            switch (i) {
                case 0: return -200;
                case 1: return 150;
                case 2: return -100;
                case 3: return 200;
                case 4: return -50;
                case 5: return 50;
                case 6: return -100;
                case 7: return 150;
                case 8: return 200;
                default: return 0;
            }
        },
        y: (i) => {
            switch (i) {
                case 0: return -100;
                case 1: return 200;
                case 2: return 150;
                case 3: return -150;
                case 4: return 50;
                case 5: return -50;
                case 6: return 150;
                case 7: return -150;
                case 8: return 100;
                default: return 0;
            }
        },
        rotation: (i) => {
            switch (i) {
                case 0: return -45;
                case 1: return 60;
                case 2: return -30;
                case 3: return 90;
                case 4: return -20;
                case 5: return 30;
                case 6: return -90;
                case 7: return 25;
                case 8: return 45;
                default: return 0;
            }
        },
        duration: 2,
        ease: "power4.out",
        stagger: 0.03,
        onComplete: function () {
            pottery.style.display = 'none'; 
            body.style.justifyContent = 'center';
            theP.style.opacity = '1';
        }
    });
});

window.addEventListener('load', () => {
    let countdown = 25;
    const countdownElement = document.getElementById('countdown');

    const timer = setInterval(() => {
        countdown--;  // 1초씩 감소
        if (countdown <= 0) {
            clearInterval(timer); 
            window.location.href = 'mainPage.html';
        } else {
            countdownElement.textContent = countdown;
        }
    }, 1000); // 1초마다 갱신
})