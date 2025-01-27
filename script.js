let isPlaying = false;
let intervalId = null;
const startStopButton = document.getElementById('start-stop');
const bpmInput = document.getElementById('bpm');
const statusText = document.getElementById('status');

// Replace with a known working audio URL
const audio = new Audio("https://www.soundjay.com/button/sounds/beep-07.mp3");

// Function to log debug messages
function logDebug(message) {
  const debugLog = document.getElementById('debug-log');
  if (debugLog) {
    const log = document.createElement('p');
    log.textContent = message;
    debugLog.appendChild(log);

    // Keep only the last 10 logs
    if (debugLog.childElementCount > 10) {
      debugLog.removeChild(debugLog.firstChild);
    }
  }
}

// Function to play the click sound
function playClick() {
  audio.currentTime = 0; // Reset the audio to the beginning
  audio.play().then(() => {
    logDebug(`Click played at ${new Date().toLocaleTimeString()}`);
  }).catch(error => {
    logDebug(`Audio playback failed: ${error.message}`);
  });
}

// Start/Stop the metronome
function toggleMetronome() {
  const bpm = parseInt(bpmInput.value);
  if (isNaN(bpm) || bpm < 30 || bpm > 300) {
    alert("Please enter a BPM value between 30 and 300.");
    return;
  }

  if (!isPlaying) {
    const interval = 60000 / bpm; // Calculate interval in milliseconds
    intervalId = setInterval(playClick, interval);
    startStopButton.textContent = "Stop";
    statusText.textContent = `Status: Playing at ${bpm} BPM`;
    logDebug(`Metronome started at ${bpm} BPM`);
  } else {
    clearInterval(intervalId);
    startStopButton.textContent = "Start";
    statusText.textContent = "Status: Stopped";
    logDebug("Metronome stopped");
  }

  isPlaying = !isPlaying;
}

// Add debug log container
const debugLogContainer = document.createElement('div');
debugLogContainer.id = 'debug-log';
debugLogContainer.style.marginTop = '20px';
debugLogContainer.style.fontSize = '14px';
debugLogContainer.style.color = '#555';
document.body.appendChild(debugLogContainer);

// Attach event listener to the button
startStopButton.addEventListener('click', toggleMetronome);
