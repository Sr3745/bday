document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const mainContent = document.getElementById("main-content");
    const playBtn = document.getElementById("play-btn");
    const bgMusic = document.getElementById("bg-music");
    const slides = document.querySelectorAll('.gallery img');
    const finalMessage = document.getElementById('final-message');

    // --- PHOTO SLIDER & MESSAGE LOGIC ---
    let currentSlide = 0;
    let isAnimating = false;
    let isMessageVisible = false;

    if(slides.length > 0) {
        slides[0].style.opacity = '1';
        slides[0].style.transform = 'translateY(0)';
    }

    function goToSlide(index, direction) {
        if (isAnimating) return;
        isAnimating = true;

        const current = slides[currentSlide];
        const next = slides[index];

        next.style.transition = 'none'; 
        if (direction === 'next') {
            next.style.transform = 'translateY(150px)'; 
        } else {
            next.style.transform = 'translateY(-150px)'; 
        }
        next.style.opacity = '0';

        void next.offsetWidth;

        const transitionStyle = 'transform 0.8s ease, opacity 0.8s ease';
        next.style.transition = transitionStyle;
        current.style.transition = transitionStyle;

        if (direction === 'next') {
            current.style.transform = 'translateY(-150px)'; 
        } else {
            current.style.transform = 'translateY(150px)'; 
        }
        current.style.opacity = '0';

        next.style.transform = 'translateY(0)';
        next.style.opacity = '1';

        currentSlide = index;

        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    function nextAction() {
        if (isMessageVisible) return; // End of the line

        if (currentSlide < slides.length - 1) {
            // Go to next photo
            goToSlide(currentSlide + 1, 'next');
        } else {
            // Slide up the final message
            isMessageVisible = true;
            finalMessage.classList.add('visible');
        }
    }

    function prevAction() {
        if (isMessageVisible) {
            // Slide the final message back down
            isMessageVisible = false;
            finalMessage.classList.remove('visible');
            return;
        }

        if (currentSlide > 0) {
            // Go back to previous photo
            goToSlide(currentSlide - 1, 'prev');
        }
    }

    // -- SWIPE (MOBILE) DETECTION --
    let startY = 0;
    let endY = 0;

    // Attach to document.body so swipe works over the message too
    document.body.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });

    document.body.addEventListener('touchmove', (e) => {
        // Only prevent default if we aren't clicking a link/button
        if(e.target.tagName !== 'BUTTON') {
            e.preventDefault(); 
        }
    }, { passive: false });

    document.body.addEventListener('touchend', (e) => {
        endY = e.changedTouches[0].clientY;
        const swipeDistance = startY - endY;

        if (swipeDistance > 50) {
            nextAction(); 
        } else if (swipeDistance < -50) {
            prevAction(); 
        }
    });

    // -- MOUSE WHEEL (PC) DETECTION --
    document.body.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) nextAction();
        else if (e.deltaY < 0) prevAction();
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