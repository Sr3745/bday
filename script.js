document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const mainContent = document.getElementById("main-content");
    const playBtn = document.getElementById("play-btn");
    const bgMusic = document.getElementById("bg-music");

    playBtn.addEventListener("click", () => {
        // Start music low and fade up
        bgMusic.volume = 0.05; 
        bgMusic.play();
        fadeInMusic(bgMusic);

        // Trigger button pop and start the rain
        triggerPopEffect(playBtn);
        startRainEffect();

        // Fade out the start screen
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
        for (let i = 0; i < 40; i++) {
            createBurstItem(sourceElement);
        }
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