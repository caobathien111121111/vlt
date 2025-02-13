function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💖";
    document.body.appendChild(heart);

    // Vị trí ngẫu nhiên
    heart.style.left = Math.random() * 100 + "vw";

    // Kích thước ngẫu nhiên
    const size = Math.random() * 20 + 10 + "px";
    heart.style.fontSize = size;

    // Thời gian rơi ngẫu nhiên
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";

    // Hiệu ứng trái tim rơi lắc lư
    heart.style.setProperty("--rotate", Math.random() * 30 - 15 + "deg");

    // Xóa trái tim sau khi rơi
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Tạo trái tim liên tục
setInterval(createHeart, 300);

// Chuyển trang khi bấm nút
document.querySelector("button").addEventListener("click", function () {
    window.location.href = "../thiep/index.html"; // Chuyển đến trang video.html
});
document.querySelector("button").addEventListener("click", function () {
    document.body.classList.add("fade-out"); // Kích hoạt hiệu ứng mờ
    setTimeout(() => {
        window.location.href = "video.html"; // Chuyển trang sau khi hiệu ứng kết thúc
    }, 500); // 0.5 giây (khớp với CSS transition)
});

