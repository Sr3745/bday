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

        // 2. Trigger the "pop and glide" effect from the button
        triggerPopEffect(playBtn);

        // 3. Fade out the start screen and show the photos
        setTimeout(() => {
            startScreen.style.opacity = "0";
            
            setTimeout(() => {
                startScreen.classList.add("hidden");
                mainContent.classList.remove("hidden");
            }, 1000); // Waits for the CSS fade out to finish
            
        }, 2500); // 2.5 seconds of just watching the pop effect before fading out
    });

    function fadeInMusic(audio) {
        let curVol = audio.volume;
        let fade = setInterval(() => {
            if (curVol < 1.0) {
                curVol += 0.05; // Increase volume by 5%
                // Ensure we don't go over 1.0
                audio.volume = Math.min(1.0, parseFloat(curVol.toFixed(2))); 
            } else {
                clearInterval(fade);
            }
        }, 300); // Increases volume every 300ms until full
    }

    function triggerPopEffect(sourceElement) {
        // Create an initial burst of 40 items
        for (let i = 0; i < 40; i++) {
            createBurstItem(sourceElement);
        }
        
        // Follow with a continuous flow falling down the screen
        setInterval(() => createGlideItem(sourceElement), 250);
    }

    function createBurstItem(sourceElement) {
        const item = document.createElement("div");
        item.classList.add("floating-item", "pop-out"); 
        item.innerText = Math.random() > 0.5 ? "💖" : "🌸";
        
        // Start exactly at the button's center
        const rect = sourceElement.getBoundingClientRect();
        item.style.left = (rect.left + rect.width / 2) + 'px';
        item.style.top = (rect.top + rect.height / 2) + 'px';
        
        // Randomize the spread for the CSS animation
        const spreadX = (Math.random() - 0.5) * 500; // spread left/right
        const spreadY = (Math.random() - 0.5) * 500; // spread up/down
        item.style.setProperty('--spread-x', spreadX + 'px');
        item.style.setProperty('--spread-y', spreadY + 'px');
        
        // Randomize size
        item.style.fontSize = (Math.random() * 15 + 20) + "px";

        document.body.appendChild(item);
        
        // Clean up memory after animation finishes
        setTimeout(() => item.remove(), 1500);
    }

    function createGlideItem(sourceElement) {
        const item = document.createElement("div");
        item.classList.add("floating-item", "glide-down"); 
        item.innerText = Math.random() > 0.5 ? "💖" : "🌸";

        // Start exactly at the button's center
        const rect = sourceElement.getBoundingClientRect();
        item.style.left = (rect.left + rect.width / 2) + 'px';
        item.style.top = (rect.top + rect.height / 2) + 'px';
        
        // Randomize duration and destination for CSS
        const duration = Math.random() * 3 + 4; // 4 to 7 seconds
        const endX = (Math.random() - 0.5) * 1000; // Drift left or right as it falls
        
        item.style.setProperty('--duration', duration + 's');
        item.style.setProperty('--end-x', endX + 'px');
        item.style.fontSize = (Math.random() * 15 + 20) + "px";

        document.body.appendChild(item);
        
        // Clean up memory
        setTimeout(() => item.remove(), duration * 1000);
    }
});