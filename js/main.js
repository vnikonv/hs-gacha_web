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
 * v1.4
 * - Updated the audio player behavior, simplified.
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
const previousButton = document.querySelector("#prevB");
const stopButton = document.querySelector("#stopB");
const nextButton = document.querySelector("#nextB");
const tracks = [
    { src: "music/requited.mp3", title: "Requited - Clark Powell", cover: "images/cover.png" },
    { src: "music/the_baby.mp3", title: "The Baby Is You", cover: "images/cover_baby.png" },
    { src: "music/moonsetter.opus", title: "Moonsetter", cover: "images/cover_moonsetter.png" },
];
let currentTrackIndex = 0;
const track = new Audio(tracks[currentTrackIndex].src);
const coverImage = document.getElementById("cover");
const unstickB = document.querySelector("#unstickB");
const stickB = document.querySelector("#stickB")
const displayButton = document.querySelector("#displayB");
const timeline = document.getElementById('timeline');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const titleDisplay = document.getElementById('title');


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
        track.volume = volumeSlider.value
        track.play();
    });
}

if (pauseButton) {
    pauseButton.addEventListener("click", () => {
        track.pause();
    });
}

function selectTrack(index) {
    currentTrackIndex = (index + tracks.length) % tracks.length;
    track.pause();
    track.src = tracks[currentTrackIndex].src;
    track.load();
    timeline.value = 0;
    timeline.max = 0;
    currentTimeDisplay.textContent = formatTime(0);
    durationDisplay.textContent = formatTime(0);
    titleDisplay.textContent = tracks[currentTrackIndex].title;
    coverImage.src = tracks[currentTrackIndex].cover;
    track.volume = volumeSlider.value
    track.play();
}

if (previousButton) {
    previousButton.addEventListener("click", () => {
        selectTrack(currentTrackIndex - 1);
    });
}

if (stopButton) {
    stopButton.addEventListener("click", () => {
        track.pause();
        track.currentTime = 0;
        timeline.value = 0;
        currentTimeDisplay.textContent = formatTime(0);
    });
}

if (nextButton) {
    nextButton.addEventListener("click", () => {
        selectTrack(currentTrackIndex + 1);
    });
}

// Helper function to format seconds into MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Needed to get the max track duration
track.addEventListener('loadedmetadata', () => {
    timeline.max = track.duration;
    durationDisplay.textContent = formatTime(track.duration);
});

// Updates displayed timeline slider and current time during normal playback,
// unless seeking
track.addEventListener('timeupdate', () => {
    if (!timeline.matches(':active') && !track.seeking) {
        timeline.value = track.currentTime;
        currentTimeDisplay.textContent = formatTime(track.currentTime);
    }
});

// Preview the selected time while dragging; no audio stutter
timeline.addEventListener('input', () => {
    currentTimeDisplay.textContent = formatTime(Number(timeline.value));
});

// After user finishes dragging the timeline
timeline.addEventListener('change', () => {
    track.currentTime = Number(timeline.value);
    currentTimeDisplay.textContent = formatTime(track.currentTime);
});

/**
 * Volume
 */

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
