// DOM Elements
const setupScreen = document.getElementById("setupScreen");
const timerScreen = document.getElementById("timerScreen");
const hoursInput = document.getElementById("hoursInput");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const customMessageInput = document.getElementById("customMessageInput");
const startButton = document.getElementById("startButton");
const customMessageElement = document.getElementById("customMessage");
const timerDisplay = document.getElementById("timerDisplay");

let timerInterval;
let timeRemaining;

// Start Timer
startButton.addEventListener("click", () => {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    // Set default message if none is provided
    const customMessage = customMessageInput.value.trim() || "Time remaining:";

    // Calculate total time in seconds
    timeRemaining = hours * 3600 + minutes * 60 + seconds;

    if (timeRemaining <= 0) {
        alert("Please enter a valid time greater than 0.");
        return;
    }

    // Switch screens
    setupScreen.style.display = "none";
    timerScreen.style.display = "block";

    // Display custom message and start countdown
    customMessageElement.textContent = customMessage;
    updateDisplay(timeRemaining);

    timerInterval = setInterval(() => {
        timeRemaining--;
        updateDisplay(timeRemaining);

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Time's Up!"); // Update the pop-up message here
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
