document.addEventListener("click", function () {
    let video = document.getElementById("myVideo");

    if (video.muted) {
        video.muted = false; // Bật âm thanh
        video.play(); // Đảm bảo video phát lại nếu bị dừng
    }
});
