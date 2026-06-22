document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Statistics Counters
    const counters = document.querySelectorAll('.stat-value');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / 50;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };
    
    // Trigger progress bars
    const triggerProgress = () => {
        const pbs = document.querySelectorAll('.progress-bar');
        pbs.forEach(pb => {
            const width = pb.style.width;
            pb.style.width = '0';
            setTimeout(() => {
                pb.style.width = width;
            }, 500);
        });
    };

    setTimeout(() => {
        animateCounters();
        triggerProgress();
    }, 1000);

    // 2. Real-Time Date and Time
    const updateTime = () => {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const timeString = now.toLocaleDateString('en-US', options);
        document.getElementById('live-clock').innerText = timeString;
    };
    setInterval(updateTime, 1000);
    updateTime();

    // 3. Theme Switcher (Light/Dark Mode)
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.innerHTML = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
    });

    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '🌙 Dark Mode';
    }

    // 4. Image Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    const showSlide = (n) => {
        slides.forEach(s => s.style.display = 'none');
        slides[n].style.display = 'block';
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    if(slides.length > 0) {
        showSlide(0);
        setInterval(nextSlide, 5000); // Change every 5 seconds
    }

    // 5. Notification Panel
    const notifyBtn = document.getElementById('notify-btn');
    const notifyPanel = document.getElementById('notify-panel');
    const closeNotify = document.getElementById('close-notify');

    notifyBtn.addEventListener('click', () => {
        notifyPanel.classList.toggle('active');
    });

    closeNotify.addEventListener('click', () => {
        notifyPanel.classList.remove('active');
    });

    // 6. Form Validation
    const regForm = document.getElementById('registration-form');
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const inputs = regForm.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
                showError(input, 'This field is required');
            } else {
                input.style.borderColor = '#ddd';
                removeError(input);
            }
        });

        if (isValid) {
            alert('Registration Successful!');
            regForm.reset();
        }
    });

    const showError = (input, msg) => {
        let parent = input.parentElement;
        let error = parent.querySelector('.error-msg');
        if (!error) {
            error = document.createElement('span');
            error.className = 'error-msg';
            error.style.color = 'red';
            error.style.fontSize = '0.75rem';
            parent.appendChild(error);
        }
        error.innerText = msg;
    };

    const removeError = (input) => {
        let parent = input.parentElement;
        let error = parent.querySelector('.error-msg');
        if (error) error.remove();
    };

    // 7. Scroll to Top
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Active Nav Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
