/*IOS 폰에서 비디오 강제 실행*/
document.addEventListener("DOMContentLoaded", function () {
    let videos = document.querySelectorAll("video");

    videos.forEach(video => {
        video.setAttribute("playsinline", "");
        video.setAttribute("webkit-playsinline", "");

        video.play().catch(error => {
            console.log("Autoplay blocked. User interaction required.", error);
        });
    });
});