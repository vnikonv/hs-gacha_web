/**
 * @file Analytics Scripts
 * @author Nikon Veremeichik <thesecondnikon@gmail.com>
 * @version 1.0
 * @description Google analytics-related functions
 *
 * Changelog:
 * v1.0
 * - Added the gtag.js script insertion. Tested tag installation.
 */

const GA_MEASUREMENT_ID = "G-M8ZXG2JDHS";

/**
 * Initializes Google Analytics by inserting a script element.
 */

export function initializeAnalytics() {
    if (!GA_MEASUREMENT_ID) { return; }
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID);
}

/**
 * Sends an event to Google Analytics if already initialized.
 * @param {string} name - Name of the event
 * @param {Object} parameters - Additional event parameters
 */

export function trackEvent(name, parameters = {}) {
    if (typeof window.gtag !== "function") { return; }
    window.gtag("event", name, parameters); }
