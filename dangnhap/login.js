document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const rememberMeCheckbox = document.getElementById("rememberMe");

    // Kiểm tra nếu đã lưu username/mật khẩu trước đó
    if (localStorage.getItem("rememberMe") === "true") {
        usernameInput.value = localStorage.getItem("username") || "";
        passwordInput.value = localStorage.getItem("password") || "";
        rememberMeCheckbox.checked = true;
    }

    // Xử lý khi người dùng đăng nhập
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Ngăn chặn reload trang
        
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Kiểm tra đăng nhập (thay bằng API thực tế nếu có)
        if (username === "Nguyenthituyetvy" && password === "02112006") {
            alert("Đăng nhập thành công!");

            // Nếu người dùng chọn "Nhớ đăng nhập"
            if (rememberMeCheckbox.checked) {
                localStorage.setItem("username", username);
                localStorage.setItem("password", password);
                localStorage.setItem("rememberMe", "true");
            } else {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
                localStorage.setItem("rememberMe", "false");
            }

            // Chuyển hướng sau khi đăng nhập
            window.location.href = "../Love/love.html";
        } else {
            alert("Sai tên đăng nhập hoặc mật khẩu!");
        }
    });
});

// 💖 Hiệu ứng trái tim rơi
function createHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.classList.add("heart");
    document.body.appendChild(heart);

    // Đặt vị trí ngẫu nhiên
    const startX = Math.random() * window.innerWidth;
    heart.style.left = `${startX}px`;

    // Tốc độ rơi ngẫu nhiên
    const duration = Math.random() * 3 + 2;
    heart.style.animationDuration = `${duration}s`;

    // Xóa trái tim khi nó rơi xong
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Tạo trái tim liên tục mỗi 300ms
setInterval(createHeart, 300);
