
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Initialize 3D LIQUID WAVES (Black terrain reflecting mouse glow)
    VANTA.WAVES({
        el: "#vanta-bg",
        mouseControls: true, // Disabling to let the mouse glow do the illuminating work
        touchControls: true,
        gyroControls: true,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x010101, // Near pitch black
        shininess: 65.00, // Highly reflective
        waveHeight: 18.00,
        waveSpeed: 0.65,
        zoom: 0.85
    });

    // 2. Custom Cursor & Glow Light Animation
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");
    const mouseGlow = document.querySelector(".mouse-glow");

    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        // Standard Custom Cursor Update
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });

        // Light Source Update (Illuminates the black waves underneath)
        mouseGlow.style.left = `${posX}px`;
        mouseGlow.style.top = `${posY}px`;
    });

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .nav-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(0, 243, 255, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // 3. Hacker Decode Scramble Effect for Subtitle
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
    const scrambleElement = document.getElementById("scramble-text");
    const finalValue = scrambleElement.dataset.value;
    let interval = null;

    function triggerScramble() {
        let iteration = 0;
        clearInterval(interval);
        
        interval = setInterval(() => {
            scrambleElement.innerText = finalValue
                .split("")
                .map((letter, index) => {
                    if(index < iteration) {
                        return finalValue[index];
                    }
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");
            
            if(iteration >= finalValue.length){ 
                clearInterval(interval);
            }
            
            iteration += 1 / 2;
        }, 30);
    }

    scrambleElement.addEventListener("mouseover", triggerScramble);

    // 4. AI Boot Screen Logic
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    const bootSequence = ["Loading Developer Profile...", "Connecting Projects...", "System Ready."];
    
    let seqIndex = 0;
    const bootInterval = setInterval(() => {
        if(seqIndex < bootSequence.length) {
            bootText.innerText = bootSequence[seqIndex];
            seqIndex++;
        } else {
            clearInterval(bootInterval);
            bootScreen.style.opacity = '0';
            setTimeout(() => { 
                bootScreen.style.display = 'none'; 
                setTimeout(triggerScramble, 200); 
            }, 600);
        }
    }, 700);

    // 5. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 6. Active Navbar State logic
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
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