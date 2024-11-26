// DOM Elements
const setupScreen = document.getElementById("setupScreen");
const timerScreen = document.getElementById("timerScreen");
const timerMode = document.getElementById("timerMode");
const durationInputs = document.getElementById("durationInputs");
const endTimeInputs = document.getElementById("endTimeInputs");
const hoursInput = document.getElementById("hoursInput");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const endTimeInput = document.getElementById("endTime");
const customMessageInput = document.getElementById("customMessageInput");
const startButton = document.getElementById("startButton");
const customMessageElement = document.getElementById("customMessage");
const timerDisplay = document.getElementById("timerDisplay");
const fullscreenButton = document.getElementById("fullscreenToggle");

let timerInterval;
let timeRemaining;


timerMode.addEventListener("change", () => {
    if (timerMode.value === "duration") {
        // Show duration inputs and hide end-time inputs
        durationInputs.style.display = "flex"; // Ensure flex layout is retained
        endTimeInputs.style.display = "none";
    } else {
        // Show end-time inputs and hide duration inputs
        durationInputs.style.display = "none";
        endTimeInputs.style.display = "flex"; // Ensure flex layout is retained
    }
});

// Start Timer
startButton.addEventListener("click", () => {
    const customMessage = customMessageInput.value.trim() || "Time remaining:";
    if (timerMode.value === "duration") {
        // Duration Mode
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;

        timeRemaining = hours * 3600 + minutes * 60 + seconds;

        if (timeRemaining <= 0) {
            alert("Please enter a valid duration.");
            return;
        }
    } else {
        // End Time Mode
        const now = new Date();
        const [endHour, endMinute] = endTimeInput.value.split(":").map(Number);

        // Create a Date object for the target time
        let targetTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            endHour,
            endMinute,
            0
        );

        // If the end time is earlier than the current time, assume it's the next day
        if (targetTime <= now) {
            targetTime.setDate(targetTime.getDate() + 1);
        }

        timeRemaining = Math.floor((targetTime - now) / 1000); // Remaining time in seconds
    }

    // Switch to Timer Screen
    setupScreen.style.display = "none";
    timerScreen.style.display = "block";
    customMessageElement.textContent = customMessage;

    // Start Countdown
    updateDisplay(timeRemaining);
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateDisplay(timeRemaining);

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Time's Up!");
        }
    }, 1000);
});


// Update Timer Display
function updateDisplay(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    timerDisplay.textContent = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Fullscreen Toggle
fullscreenButton.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenButton.textContent = "X"; // Update to Exit Icon
    } else {
        document.exitFullscreen();
        fullscreenButton.textContent = "⛶"; // Update to Fullscreen Icon
    }
});
