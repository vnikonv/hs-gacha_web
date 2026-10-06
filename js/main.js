/**
 * @file Main Script
 * @author Nikon Veremeichik <thesecondnikon@gmail.com>
 * @version 1.0
 * @description Loads other scripts and declares event listeners
 *
 * Changelog:
 * v1.0
 * - Loads functions from analytics.js to track events.
 */

/**
 * Listeners activating trackers
*/

import { initializeAnalytics, trackEvent } from "./analytics.js";

initializeAnalytics();

const headingButton = document.querySelector("h1");

headingButton.addEventListener("click", () => {
    trackEvent("header_click");
});
