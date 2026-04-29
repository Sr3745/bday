document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const mainContent = document.getElementById("main-content");
    const playBtn = document.getElementById("play-btn");
    const bgMusic = document.getElementById("bg-music");

    playBtn.addEventListener("click", () => {
        // 1. Start music at 5% volume and fade it up
        bgMusic.volume = 0.05; 
        bgMusic.play();
        fadeInMusic(bgMusic);

        // 2. Trigger the button pop effect and start the rain
        triggerPopEffect(playBtn);
        startRainEffect();

        // 3. Fade out the start screen and show the photos
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
        // Create an initial burst of 40 items from the button
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
        // Create a new falling item every 200 milliseconds
        setInterval(createRainItem, 200);
    }

    function createRainItem() {
        const item = document.createElement("div");
        item.classList.add("floating-item", "falling-rain"); 
        item.innerText = Math.random() > 0.5 ? "💖" : "🌸";

        // Randomize position across the entire width of the screen
        item.style.left = (Math.random() * 100) + 'vw';
        
        // Randomize fall duration (speed)
        const duration = Math.random() * 4 + 5; // 5 to 9 seconds
        item.style.setProperty('--duration', duration + 's');
        
        item.style.fontSize = (Math.random() * 15 + 15) + "px";

        document.body.appendChild(item);
        
        // Clean up memory
        setTimeout(() => item.remove(), duration * 1000);
    }
});