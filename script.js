document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const mainContent = document.getElementById("main-content");
    const playBtn = document.getElementById("play-btn");
    const bgMusic = document.getElementById("bg-music");

    playBtn.addEventListener("click", () => {
        // Step 1: Music starts low volume, fades in
        bgMusic.volume = 0.05; // Start volume low (5%)
        bgMusic.play();
        fadeInMusic(bgMusic);

        // Step 2: Trigger the "pop and glide" effect from the button
        triggerPopEffect(playBtn);

        // Step 3: Delay the content reveal (after the pop makes its visual impact)
        setTimeout(() => {
            startScreen.style.opacity = "0";
            setTimeout(() => {
                startScreen.classList.add("hidden");
                mainContent.classList.remove("hidden");
            }, 1000); // Fade-out time for start screen
        }, 2500); // Delay showing main images (e.g., 2.5s to show pop flow)
    });

    function fadeInMusic(audio) {
        let curVol = audio.volume;
        let fade = setInterval(() => {
            if (curVol < 1.0) {
                curVol += 0.1; // Increase volume by 10%
                audio.volume = parseFloat(curVol.toFixed(2));
            } else {
                clearInterval(fade);
            }
        }, 200); // check and increase volume every 200ms
    }

    function triggerPopEffect(sourceElement) {
        // Create an initial burst to fill quickly
        for (let i = 0; i < 40; i++) {
            createBurstItem(sourceElement);
        }
        // Follow with a continuous flow
        setInterval(() => createGlideItem(sourceElement), 250);
    }

    function createGlideItem(sourceElement) {
        const item = document.createElement("div");
        item.classList.add("floating-item", "glide-down"); // New classes for down glide
        item.innerText = Math.random() > 0.5 ? "💖" : "🌸";

        // Source position from button center
        const rect = sourceElement.getBoundingClientRect();
        item.style.left = (rect.left + rect.width / 2) + 'px';
        item.style.top = (rect.top + rect.height / 2) + 'px';
        
        // Randomize size and duration
        item.style.fontSize = (Math.random() * 15 + 20) + "px";
        const duration = Math.random() * 3 + 4; // Between 4 and 7 seconds
        item.style.animationDuration = duration + "s";

        document.body.appendChild(item);
        setTimeout(() => item.remove(), duration * 1000);
    }

    function createBurstItem(sourceElement) {
        const item = document.createElement("div");
        item.classList.add("floating-item", "pop-out"); // New class for pop out
        item.innerText = Math.random() > 0.5 ? "💖" : "🌸";
        const rect = sourceElement.getBoundingClientRect();
        item.style.left = (rect.left + rect.width / 2) + 'px';
        item.style.top = (rect.top + rect.height / 2) + 'px';
        
        document.body.appendChild(item);
        setTimeout(() => item.remove(), 2000);
    }
});document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const mainContent = document.getElementById("main-content");
    const playBtn = document.getElementById("play-btn");
    const bgMusic = document.getElementById("bg-music");

    playBtn.addEventListener("click", () => {
        // Step 1: Music starts low volume, fades in
        bgMusic.volume = 0.05; // Start volume low (5%)
        bgMusic.play();
        fadeInMusic(bgMusic);

        // Step 2: Trigger the "pop and glide" effect from the button
        triggerPopEffect(playBtn);

        // Step 3: Delay the content reveal (after the pop makes its visual impact)
        setTimeout(() => {
            startScreen.style.opacity = "0";
            setTimeout(() => {
                startScreen.classList.add("hidden");
                mainContent.classList.remove("hidden");
            }, 1000); // Fade-out time for start screen
        }, 2500); // Delay showing main images (e.g., 2.5s to show pop flow)
    });

    function fadeInMusic(audio) {
        let curVol = audio.volume;
        let fade = setInterval(() => {
            if (curVol < 1.0) {
                curVol += 0.1; // Increase volume by 10%
                audio.volume = parseFloat(curVol.toFixed(2));
            } else {
                clearInterval(fade);
            }
        }, 200); // check and increase volume every 200ms
    }

    function triggerPopEffect(sourceElement) {
        // Create an initial burst to fill quickly
        for (let i = 0; i < 40; i++) {
            createBurstItem(sourceElement);
        }
        // Follow with a continuous flow
        setInterval(() => createGlideItem(sourceElement), 250);
    }

    function createGlideItem(sourceElement) {
        const item = document.createElement("div");
        item.classList.add("floating-item", "glide-down"); // New classes for down glide
        item.innerText = Math.random() > 0.5 ? "💖" : "🌸";

        // Source position from button center
        const rect = sourceElement.getBoundingClientRect();
        item.style.left = (rect.left + rect.width / 2) + 'px';
        item.style.top = (rect.top + rect.height / 2) + 'px';
        
        // Randomize size and duration
        item.style.fontSize = (Math.random() * 15 + 20) + "px";
        const duration = Math.random() * 3 + 4; // Between 4 and 7 seconds
        item.style.animationDuration = duration + "s";

        document.body.appendChild(item);
        setTimeout(() => item.remove(), duration * 1000);
    }

    function createBurstItem(sourceElement) {
        const item = document.createElement("div");
        item.classList.add("floating-item", "pop-out"); // New class for pop out
        item.innerText = Math.random() > 0.5 ? "💖" : "🌸";
        const rect = sourceElement.getBoundingClientRect();
        item.style.left = (rect.left + rect.width / 2) + 'px';
        item.style.top = (rect.top + rect.height / 2) + 'px';
        
        document.body.appendChild(item);
        setTimeout(() => item.remove(), 2000);
    }
});