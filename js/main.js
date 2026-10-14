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
 */

/**
 * Listeners activating trackers
*/

import { initializeAnalytics, trackEvent } from "./analytics.js";

initializeAnalytics();

function playSound(path) {
  const audio = new Audio(path);
  audio.play();
}

const jaspersButton = document.querySelector("#please img");
const playButton = document.querySelector("#playB");
const tbiy = new Audio("music/the_baby.mp3");
const unstickB = document.querySelector("#unstickB");
const stickB = document.querySelector("#stickB")
const displayButton = document.querySelector("#displayB");

if (jaspersButton) {
    jaspersButton.addEventListener("click", () => {
        trackEvent("jaspers_click");
        playSound("music/meow.ogg");
    });
}

if (playButton) {
    playButton.addEventListener("click", () => {
        tbiy.play();
    });
}

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
            tbiy.pause();
        }
    });
}
