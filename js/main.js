/**
 * @file Main Script
 * @author Nikon Veremeichik <thesecondnikon@gmail.com>
 * @version 1.0
 * @description Loads other scripts and declares event listeners
 *
 * Changelog:
 * v1.0
 * - Loads functions from analytics.js to track events.
 * v1.1
 * - Added a click event listener to the Jaspers image that plays a meow sound
 *   and tracks the click event.
 * v1.2
 * - Added a click event listener to the play button that plays The Baby is You.
 *   The player can now be disabled.
 * v1.3
 * - Removed The Baby is You to make the website more appealing. Made the buttons
 *   transparent and borderless, added a timeline and volume slider to the player.
 *   Organized the code, added new trackers for page links.
 */

/**
 * Listeners activating trackers
*/
import { initializeAnalytics, trackEvent } from "./analytics.js";


/**
 * Constants
 */
const jaspersButton = document.querySelector("#please img");
const surveyLink = document.querySelector("#survey");
const githubLink = document.querySelector("#git")
const playButton = document.querySelector("#playB");
const pauseButton = document.querySelector("#pauseB")
const track = new Audio("music/requited.mp3");
const unstickB = document.querySelector("#unstickB");
const stickB = document.querySelector("#stickB")
const displayButton = document.querySelector("#displayB");
const timeline = document.getElementById('timeline');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');


/**
 * Analytics, Jaspers, and Link Trackers
 */

initializeAnalytics();

function playSound(path) {
  const audio = new Audio(path);
  audio.play();
}

if (jaspersButton) {
    jaspersButton.addEventListener("click", () => {
        trackEvent("jaspers_click");
        playSound("music/meow.ogg");
    });
}

if (surveyLink) {
    surveyLink.addEventListener("click", () => {
        trackEvent("survey_click");
    });
}

if (githubLink) {
    surveyLink.addEventListener("click", () => {
        trackEvent("github_click");
    });
}

/**
 * Audio playback controls button
 */

if (playButton) {
    playButton.addEventListener("click", () => {
        track.play();
    });
}

if (pauseButton) {
    pauseButton.addEventListener("click", () => {
        track.pause();
    });
}

// Helper function to format seconds into MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

track.addEventListener('loadedmetadata', () => {
  timeline.max = track.duration;
  durationDisplay.textContent = formatTime(track.duration);
});

track.addEventListener('timeupdate', () => {
  // Prevent slider jumping while the user is actively dragging it
  if (!timeline.classList.contains('seeking')) {
    timeline.value = track.currentTime;
  }
  currentTimeDisplay.textContent = formatTime(track.currentTime);
});

// Preview the selected time while dragging; no audio stutter
timeline.addEventListener('input', () => {
    timeline.classList.add('seeking');
    currentTimeDisplay.textContent = formatTime(Number(timeline.value));
});

timeline.addEventListener('change', () => {
    track.currentTime = Number(timeline.value);
    timeline.classList.remove('seeking');
});

volumeSlider.addEventListener('input', () => {
  track.volume = volumeSlider.value;
});

/**
 * Buttons for sticking, unsticking, and closing the audio player
 */

const musicPlayer = document.querySelector("#music-player");

if (unstickB) {
    unstickB.addEventListener("click", () => {
        if (musicPlayer) {
            musicPlayer.classList.toggle("unsticky");
        }
    });
}

if (stickB) {
    stickB.addEventListener("click", () => {
        if (musicPlayer) {
            musicPlayer.classList.toggle("unsticky");
        }
    })
}

if (displayButton) {
    displayButton.addEventListener("click", () => {
        if (musicPlayer) {
            musicPlayer.classList.toggle("invisible");
            track.pause();
        }
    });
}
