document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const mainContent = document.getElementById("main-content");
    const playBtn = document.getElementById("play-btn");
    const bgMusic = document.getElementById("bg-music");
    const slides = document.querySelectorAll('.gallery img');

    // --- PHOTO SLIDER LOGIC ---
    let currentSlide = 0;
    let isAnimating = false;

    // Prep the first slide so it's ready when the curtain drops
    if(slides.length > 0) {
        slides[0].style.opacity = '1';
        slides[0].style.transform = 'translateY(0)';
    }

    function goToSlide(index, direction) {
        if (isAnimating) return;
        isAnimating = true;

        const current = slides[currentSlide];
        const next = slides[index];

        // Prepare the 'next' slide to start either above or below the screen
        next.style.transition = 'none'; // Turn off animation instantly
        if (direction === 'next') {
            next.style.transform = 'translateY(150px)'; // Start below
        } else {
            next.style.transform = 'translateY(-150px)'; // Start above
        }
        next.style.opacity = '0';

        // Force browser to register the starting position
        void next.offsetWidth;

        // Turn animation on for the slide movement
        const transitionStyle = 'transform 0.8s ease, opacity 0.8s ease';
        next.style.transition = transitionStyle;
        current.style.transition = transitionStyle;

        // Move the current slide out
        if (direction === 'next') {
            current.style.transform = 'translateY(-150px)'; // Slide up
        } else {
            current.style.transform = 'translateY(150px)'; // Slide down
        }
        current.style.opacity = '0';

        // Move the next slide into the center
        next.style.transform = 'translateY(0)';
        next.style.opacity = '1';

        currentSlide = index;

        // Unlock after animation finishes
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length; // Loops back to 0
        goToSlide(nextIndex, 'next');
    }

    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length; // Loops back to 13
        goToSlide(prevIndex, 'prev');
    }

    // -- SWIPE (MOBILE) DETECTION --
    let startY = 0;
    let endY = 0;

    mainContent.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });

    mainContent.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevents native screen bouncing while swiping
    }, { passive: false });

    mainContent.addEventListener('touchend', (e) => {
        endY = e.changedTouches[0].clientY;
        const swipeDistance = startY - endY;

        if (swipeDistance > 50) {
            nextSlide(); // Swiped Up -> Next Photo
        } else if (swipeDistance < -50) {
            prevSlide(); // Swiped Down -> Prev Photo
        }
    });

    // -- MOUSE WHEEL (PC) DETECTION --
    mainContent.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) nextSlide();
        else if (e.deltaY < 0) prevSlide();
    });


    // --- INTRO & MUSIC LOGIC ---
    playBtn.addEventListener("click", () => {
        bgMusic.volume = 0.05; 
        bgMusic.play();
        fadeInMusic(bgMusic);

        triggerPopEffect(playBtn);
        startRainEffect();

        setTimeout(() => {
            startScreen.style.opacity = "0";
            setTimeout(() => {
                startScreen.classList.add("hidden");
                mainContent.classList.remove("hidden");
            }, 1000); 
        }, 2500); 
    });

    function fadeInMusic(audio) {
        let curVol = audio.volume;
        let fade = setInterval(() => {
            if (curVol < 1.0) {
                curVol += 0.05; 
                audio.volume = Math.min(1.0, parseFloat(curVol.toFixed(2))); 
            } else {
                clearInterval(fade);
            }
        }, 300); 
    }

    function triggerPopEffect(sourceElement) {
        for (let i = 0; i < 40; i++) createBurstItem(sourceElement);
    }

    function createBurstItem(sourceElement) {
        const item = document.createElement("div");
        item.classList.add("floating-item", "pop-out"); 
        item.innerText = Math.random() > 0.5 ? "💖" : "🌸";
        
        const rect = sourceElement.getBoundingClientRect();
        item.style.left = (rect.left + rect.width / 2) + 'px';
        item.style.top = (rect.top + rect.height / 2) + 'px';
        
        const spreadX = (Math.random() - 0.5) * 600; 
        const spreadY = (Math.random() - 0.5) * 600; 
        item.style.setProperty('--spread-x', spreadX + 'px');
        item.style.setProperty('--spread-y', spreadY + 'px');
        item.style.fontSize = (Math.random() * 15 + 20) + "px";

        document.body.appendChild(item);
        setTimeout(() => item.remove(), 1500);
    }

    function startRainEffect() {
        setInterval(createRainItem, 200);
    }

    function createRainItem() {
        const item = document.createElement("div");
        item.classList.add("floating-item", "falling-rain"); 
        item.innerText = Math.random() > 0.5 ? "💖" : "🌸";

        item.style.left = (Math.random() * 100) + 'vw';
        const duration = Math.random() * 4 + 5; 
        item.style.setProperty('--duration', duration + 's');
        item.style.fontSize = (Math.random() * 15 + 15) + "px";

        document.body.appendChild(item);
        setTimeout(() => item.remove(), duration * 1000);
    }
});