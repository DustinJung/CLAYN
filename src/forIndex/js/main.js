import { initAnimations2 } from "./indexAnimation.js";


function vanila() {
    function theSection() {
        let h2_list = document.querySelectorAll('.h2_wrapper li');
        let curtain = document.querySelector('.theCurtain');
        let sections = document.querySelectorAll('.section-wrapper2 section')

        let curtainTimeout, sectionTimeout;

        h2_list.forEach((h2, i) => {
            h2.addEventListener('click', function() {
                clearTimeout(curtainTimeout);
                clearTimeout(sectionTimeout);
                h2_list.forEach(h => {h.classList.remove('on');});
                this.classList.add('on');
                curtain.classList.add('on');
                sectionTimeout = setTimeout(() => {
                    sections.forEach(sec => {sec.classList.remove('on');});
                    if(curtain.classList.contains('on')){
                        sections[i].classList.add('on');
                    }
                }, 1000);
                curtainTimeout = setTimeout(() => {
                    curtain.classList.remove('on');
                }, 1500);
            });
        });
    }
    theSection();
}
vanila();

window.addEventListener('load', () => {
    initAnimations2();
})      