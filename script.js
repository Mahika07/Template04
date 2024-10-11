document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.skill-box b').forEach(function (el) {
        let percent = el.parentElement.getAttribute('data-percent');
        let counter = { count: 0 };

        let animateCounter = function () {
            let start = null;
            let duration = 1000;
            let step = function (timestamp) {
                if (!start) start = timestamp;
                let progress = timestamp - start;
                let newCount = Math.min(Math.ceil(progress / duration * percent), percent);
                el.innerText = newCount + '%';
                if (progress < duration) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        };
        animateCounter();
    });

    document.querySelectorAll('.skill-box .skills-circle li').forEach(function (el) {
        let _right = el.querySelector('.bar-circle-right');
        let _left = el.querySelector('.bar-circle-left');
        let _percent = parseInt(el.getAttribute('data-percent'));
        let deg = 3.6 * _percent;

        let rotateElement = function (element, toDeg, duration, callback) {
            let start = null;
            let fromDeg = parseFloat(element.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;

            let step = function (timestamp) {
                if (!start) start = timestamp;
                let progress = timestamp - start;
                let currentDeg = fromDeg + (toDeg - fromDeg) * (progress / duration);
                element.style.transform = 'rotate(' + currentDeg + 'deg)';
                if (progress < duration) {
                    requestAnimationFrame(step);
                } else {
                    if (callback) callback();
                }
            };
            requestAnimationFrame(step);
        };

        if (_percent <= 50) {
            rotateElement(_right, deg, 1000);
        } else {
            let full_deg = 180;
            let remaining_deg = deg - full_deg;
            let run_duration = 1000 * (50 / _percent);

            rotateElement(_right, full_deg, run_duration, function () {
                _left.style.clip = 'rect(0, 150px, 150px, 75px)';
                _left.style.background = '#f70';
                rotateElement(_left, remaining_deg, 1000 - run_duration);
            });
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
        item.addEventListener("click", function () {
            navItems.forEach((navItem) => navItem.classList.remove("active"));
            this.classList.add("active");
        });
    });
});
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('#navbar li a')

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    })
    current = "#" + current
    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute("href") === current) {
            a.classList.add('active')
        }
    })
})

