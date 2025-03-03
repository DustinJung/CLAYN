import { initAnimations2 } from "./indexAnimation.js";


function vanila() {
    function theSection() {
        let h2_list = document.querySelectorAll('.h2_wrapper > h2');

        h2_list.forEach((h2, i) => {
            h2.addEventListener('click', () => {
                this.classList.add('on');
                h2_list.forEach(h => {h.classList.remove('on');});
            })
        })
    }
    theSection();
}
vanila();

window.addEventListener('load', () => {
    initAnimations2();
})      