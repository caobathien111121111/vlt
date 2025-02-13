const Loadr = new (function Loadr(id) {
    // Cấu hình
    const max_size = 24;
    const max_particles = 1500;
    const min_vel = 20;
    const max_generation_per_frame = 10;

    // Lấy canvas
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext('2d');
    var width = canvas.width, height = canvas.height;
    var center_x = width / 2, center_y = height / 2;

    var particles = [];
    var last = Date.now(), now = 0, dt;

    // Kiểm tra điểm có nằm trong trái tim không
    function isInsideHeart(x, y) {
        x = ((x - center_x) / center_x) * 3;
        y = ((y - center_y) / center_y) * -3;
        return (Math.pow((x * x + y * y - 1), 3) - (x * x * y * y * y) < 0);
    }

    // Tạo giá trị ngẫu nhiên
    function random(size, freq) {
        var val = 0, iter = freq;
        do {
            size /= iter;
            iter += freq;
            val += size * Math.random();
        } while (size >= 1);
        return val;
    }

    // Định nghĩa Particle (hạt)
    function Particle() {
        var x = center_x, y = center_y;
        var size = ~~random(max_size, 2.4);
        var x_vel = ((max_size + min_vel) - size) / 2 - (Math.random() * ((max_size + min_vel) - size));
        var y_vel = ((max_size + min_vel) - size) / 2 - (Math.random() * ((max_size + min_vel) - size));
        var nx = x, ny = y;
        var r, g, b, a = 0.05 * size;

        this.draw = function () {
            r = ~~(255 * (x / width));
            g = ~~(255 * (1 - (y / height)));
            b = ~~(255 - r);
            ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        };

        this.move = function (dt) {
            nx += x_vel * dt;
            ny += y_vel * dt;

            if (!isInsideHeart(nx, ny)) {
                if (!isInsideHeart(nx, y)) {
                    x_vel *= -1;
                    return;
                }
                if (!isInsideHeart(x, ny)) {
                    y_vel *= -1;
                    return;
                }
                x_vel = -1 * y_vel;
                y_vel = -1 * x_vel;
                return;
            }
            x = nx;
            y = ny;
        };
    }

    // Cập nhật chuyển động
    function movementTick() {
        var len = particles.length;
        var dead = max_particles - len;

        for (var i = 0; i < dead && i < max_generation_per_frame; i++) {
            particles.push(new Particle());
        }

        now = Date.now();
        dt = (now - last) / 1000;
        last = now;

        particles.forEach(p => p.move(dt));

        // Cập nhật phần trăm hoàn thành
        var percentage = Math.min(100, Math.floor((len / max_particles) * 100));
        document.getElementById("percentage").textContent = percentage + "%";
        document.getElementById("progress-bar").style.width = percentage + "%";

        // Nếu đạt 100%, hiển thị phần quà
        if (percentage === 100) {
            document.getElementById("gift-btn").style.display = "block";
            document.getElementById("gift-text").style.display = "block";
        }
    }

    // Vẽ canvas
    function tick() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => p.draw());
        requestAnimationFrame(tick);
    }

    setInterval(movementTick, 16);
    tick();

})("loader");

// Chuyển trang khi nhấn phần quà
function goToNextPage() {
    window.location.href = "../anhvlt/index.html"; // Đổi thành trang quà bạn muốn
}
