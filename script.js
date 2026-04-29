document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const mainContent = document.getElementById("main-content");
    const playBtn = document.getElementById("play-btn");
    const bgMusic = document.getElementById("bg-music");

    playBtn.addEventListener("click", () => {
        // Play the music
        bgMusic.play();

        // Fade out the start screen
        startScreen.style.opacity = "0";
        
        setTimeout(() => {
            startScreen.classList.add("hidden");
            mainContent.classList.remove("hidden");
            
            // Start the falling/floating effects
            startFloatingEffect();
        }, 1000); // Waits for the 1s fade-out CSS transition
    });

    function startFloatingEffect() {
        // Create a new flower/heart every 300 milliseconds
        setInterval(createFloatingItem, 300);
    }

    function createFloatingItem() {
        const item = document.createElement("div");
        item.classList.add("floating-item");
        
        // Randomly choose between a flower and a heart
        const isHeart = Math.random() > 0.5;
        item.innerText = isHeart ? "💖" : "🌸";

        // Randomize the starting left position
        item.style.left = Math.random() * 100 + "vw";
        
        // Randomize the duration (speed) of the float
        const duration = Math.random() * 3 + 4; // Between 4 and 7 seconds
        item.style.animationDuration = duration + "s";
        
        // Randomize the size slightly
        item.style.fontSize = (Math.random() * 15 + 20) + "px";

        document.body.appendChild(item);

        // Remove the item from the DOM after it finishes floating to prevent lag
        setTimeout(() => {
            item.remove();
        }, duration * 1000);
    }
});