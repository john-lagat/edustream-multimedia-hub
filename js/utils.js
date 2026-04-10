// Utility functions

/**
 * Formats time from seconds to a string format.
 * @param {number} seconds
 * @return {string}
 */
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Logs events to the console.
 * @param {string} event
 */
function logEvent(event) {
    console.log(event);
}

/**
 * Debounces a function.
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttles a function.
 * @param {Function} func
 * @param {number} limit
 * @return {Function}
 */
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

/**
 * Creates a new element.
 * @param {string} tagName
 * @param {Object} attributes
 * @return {HTMLElement}
 */
function createElement(tagName, attributes) {
    const element = document.createElement(tagName);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

/**
 * Helper for event delegation.
 * @param {string} parentSelector
 * @param {string} childSelector
 * @param {string} eventType
 * @param {Function} handler
 */
function delegateEvent(parentSelector, childSelector, eventType, handler) {
    const parent = document.querySelector(parentSelector);
    parent.addEventListener(eventType, function(e) {
        const target = e.target.closest(childSelector);
        if (target) {
            handler.call(target, e);
        }
    });
}

