/**
 * Q6: Event Tracker Implementation
 * Student ID: 2025201050
 * 
 * This script captures all click events and page views performed by a user
 * across HTML tags and CSS Objects, printing output to the browser console.
 */

// ============================================================================
// EVENT TRACKING SYSTEM
// ============================================================================

class EventTracker {
    constructor() {
        this.eventCount = 0;
        this.eventHistory = [];
        this.maxHistorySize = 100; // Keep last 100 events
        this.init();
    }

    /**
     * Initialize the event tracker
     */
    init() {
        console.log('%c🎯 Event Tracker Initialized', 'color: #4CAF50; font-size: 16px; font-weight: bold;');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #4CAF50;');
        
        // Track page view on load
        this.trackPageView();
        
        // Set up click event listeners
        this.setupClickTracking();
        
        // Track page visibility changes
        this.setupVisibilityTracking();
        
        // Track history/navigation changes
        this.setupNavigationTracking();
        
        console.log('%c✅ All event listeners attached successfully!', 'color: #2196F3; font-weight: bold;');
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'color: #4CAF50;');
    }

    /**
     * Track page view
     */
    trackPageView() {
        const pageViewData = {
            type: 'page_view',
            url: window.location.href,
            pathname: window.location.pathname,
            search: window.location.search,
            hash: window.location.hash,
            title: document.title,
            referrer: document.referrer || 'Direct',
            timestamp: new Date().toISOString(),
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            userAgent: navigator.userAgent
        };

        this.logEvent('PAGE_VIEW', pageViewData);
    }

    /**
     * Setup comprehensive click event tracking
     */
    setupClickTracking() {
        // Use event delegation on document for all clicks
        document.addEventListener('click', (event) => {
            this.handleClickEvent(event);
        }, true); // Use capture phase to catch all events

        console.log('🖱️  Click tracking enabled for all elements');
    }

    /**
     * Handle click events
     */
    handleClickEvent(event) {
        const target = event.target;
        
        // Get element information
        const elementInfo = this.getElementInfo(target);
        
        // Determine event object type
        const eventObjectType = this.getEventObjectType(target);
        
        // Create event data
        const clickData = {
            type: 'click',
            event_object: eventObjectType,
            element: {
                tag: target.tagName.toLowerCase(),
                id: target.id || null,
                className: target.className || null,
                text: this.getElementText(target),
                attributes: this.getElementAttributes(target)
            },
            position: {
                x: event.clientX,
                y: event.clientY,
                pageX: event.pageX,
                pageY: event.pageY
            },
            modifiers: {
                ctrlKey: event.ctrlKey,
                altKey: event.altKey,
                shiftKey: event.shiftKey,
                metaKey: event.metaKey
            },
            timestamp: new Date().toISOString(),
            path: this.getEventPath(event)
        };

        this.logEvent('CLICK', clickData);
        this.updateUILog(clickData);
    }

    /**
     * Get event object type (button, link, image, text, dropdown, etc.)
     */
    getEventObjectType(element) {
        const tag = element.tagName.toLowerCase();
        const type = element.type?.toLowerCase();

        // Determine the type of object clicked
        if (tag === 'button') return 'button';
        if (tag === 'a') return 'link';
        if (tag === 'img') return 'image';
        if (tag === 'input') {
            if (type === 'text' || type === 'email' || type === 'password') return 'text_input';
            if (type === 'checkbox') return 'checkbox';
            if (type === 'radio') return 'radio_button';
            if (type === 'submit') return 'submit_button';
            return `input_${type}`;
        }
        if (tag === 'select') return 'dropdown';
        if (tag === 'textarea') return 'textarea';
        if (tag === 'label') return 'label';
        if (tag === 'div') return 'div';
        if (tag === 'span') return 'span';
        if (tag === 'p') return 'paragraph';
        if (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6') return 'heading';
        
        return tag;
    }

    /**
     * Get element information
     */
    getElementInfo(element) {
        return {
            tag: element.tagName,
            id: element.id,
            classes: Array.from(element.classList),
            text: this.getElementText(element)
        };
    }

    /**
     * Get element text content (truncated)
     */
    getElementText(element) {
        let text = element.textContent || element.innerText || element.value || '';
        text = text.trim();
        return text.length > 50 ? text.substring(0, 50) + '...' : text;
    }

    /**
     * Get element attributes
     */
    getElementAttributes(element) {
        const attributes = {};
        Array.from(element.attributes).forEach(attr => {
            // Include important attributes
            if (['href', 'src', 'alt', 'title', 'data-action', 'data-info', 'name', 'value'].includes(attr.name)) {
                attributes[attr.name] = attr.value;
            }
        });
        return attributes;
    }

    /**
     * Get event propagation path
     */
    getEventPath(event) {
        const path = event.composedPath ? event.composedPath() : [];
        return path.slice(0, 5).map(el => {
            if (el === window) return 'window';
            if (el === document) return 'document';
            if (el.tagName) {
                let selector = el.tagName.toLowerCase();
                if (el.id) selector += `#${el.id}`;
                if (el.className) selector += `.${Array.from(el.classList).join('.')}`;
                return selector;
            }
            return 'unknown';
        });
    }

    /**
     * Setup page visibility tracking
     */
    setupVisibilityTracking() {
        document.addEventListener('visibilitychange', () => {
            const visibilityData = {
                type: 'visibility_change',
                state: document.hidden ? 'hidden' : 'visible',
                timestamp: new Date().toISOString()
            };
            this.logEvent('VISIBILITY', visibilityData);
        });

        console.log('👁️  Page visibility tracking enabled');
    }

    /**
     * Setup navigation tracking (hash changes, back/forward)
     */
    setupNavigationTracking() {
        // Track hash changes
        window.addEventListener('hashchange', (event) => {
            const navData = {
                type: 'navigation',
                event: 'hashchange',
                oldURL: event.oldURL,
                newURL: event.newURL,
                hash: window.location.hash,
                timestamp: new Date().toISOString()
            };
            this.logEvent('NAVIGATION', navData);
        });

        // Track popstate (back/forward buttons)
        window.addEventListener('popstate', (event) => {
            const navData = {
                type: 'navigation',
                event: 'popstate',
                state: event.state,
                url: window.location.href,
                timestamp: new Date().toISOString()
            };
            this.logEvent('NAVIGATION', navData);
        });

        console.log('🧭 Navigation tracking enabled');
    }

    /**
     * Log event to console
     */
    logEvent(eventType, eventData) {
        this.eventCount++;
        
        // Add to history
        const eventRecord = {
            count: this.eventCount,
            type: eventType,
            data: eventData
        };
        
        this.eventHistory.unshift(eventRecord);
        if (this.eventHistory.length > this.maxHistorySize) {
            this.eventHistory.pop();
        }

        // Color coding for different event types
        const colors = {
            'PAGE_VIEW': '#9C27B0',
            'CLICK': '#2196F3',
            'VISIBILITY': '#FF9800',
            'NAVIGATION': '#4CAF50'
        };

        const color = colors[eventType] || '#607D8B';

        // Log to console with formatting
        console.group(`%c[${this.eventCount}] ${eventType}`, `color: ${color}; font-weight: bold;`);
        
        if (eventType === 'PAGE_VIEW') {
            console.log('%cURL:', 'font-weight: bold;', eventData.url);
            console.log('%cTitle:', 'font-weight: bold;', eventData.title);
            console.log('%cReferrer:', 'font-weight: bold;', eventData.referrer);
            console.log('%cViewport:', 'font-weight: bold;', `${eventData.viewport.width}x${eventData.viewport.height}`);
        } else if (eventType === 'CLICK') {
            console.log('%cEvent Object:', 'font-weight: bold;', eventData.event_object);
            console.log('%cElement:', 'font-weight: bold;', `<${eventData.element.tag}>`);
            if (eventData.element.id) console.log('%cID:', 'font-weight: bold;', eventData.element.id);
            if (eventData.element.className) console.log('%cClass:', 'font-weight: bold;', eventData.element.className);
            if (eventData.element.text) console.log('%cText:', 'font-weight: bold;', eventData.element.text);
            console.log('%cPosition:', 'font-weight: bold;', `(${eventData.position.x}, ${eventData.position.y})`);
            if (Object.keys(eventData.element.attributes).length > 0) {
                console.log('%cAttributes:', 'font-weight: bold;', eventData.element.attributes);
            }
        }
        
        console.log('%cTimestamp:', 'font-weight: bold;', eventData.timestamp);
        console.log('%cFull Data:', 'font-weight: bold;', eventData);
        console.groupEnd();
    }

    /**
     * Update UI log (visual feedback on page)
     */
    updateUILog(eventData) {
        const logContainer = document.getElementById('eventLog');
        if (!logContainer) return;

        // Remove placeholder if exists
        const placeholder = logContainer.querySelector('.log-placeholder');
        if (placeholder) placeholder.remove();

        // Create log entry
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        
        const eventType = eventData.event_object;
        const elementTag = eventData.element.tag;
        const elementText = eventData.element.text || '';
        const timestamp = new Date(eventData.timestamp).toLocaleTimeString();

        logEntry.innerHTML = `
            <span class="log-count">#${this.eventCount}</span>
            <span class="log-type">${eventType}</span>
            <span class="log-element">&lt;${elementTag}&gt;</span>
            <span class="log-text">${elementText}</span>
            <span class="log-time">${timestamp}</span>
        `;

        logContainer.insertBefore(logEntry, logContainer.firstChild);

        // Keep only last 10 entries in UI
        while (logContainer.children.length > 10) {
            logContainer.removeChild(logContainer.lastChild);
        }
    }

    /**
     * Get event statistics
     */
    getStats() {
        return {
            totalEvents: this.eventCount,
            historySize: this.eventHistory.length,
            eventTypes: this.getEventTypeBreakdown()
        };
    }

    /**
     * Get breakdown of event types
     */
    getEventTypeBreakdown() {
        const breakdown = {};
        this.eventHistory.forEach(event => {
            const type = event.type;
            breakdown[type] = (breakdown[type] || 0) + 1;
        });
        return breakdown;
    }

    /**
     * Clear event history
     */
    clearHistory() {
        this.eventHistory = [];
        console.clear();
        console.log('%c🗑️ Event history cleared', 'color: #FF5722; font-weight: bold;');
    }
}

// ============================================================================
// INITIALIZE EVENT TRACKER
// ============================================================================

// Create global instance
const eventTracker = new EventTracker();

// Expose to window for debugging
window.eventTracker = eventTracker;

// Add clear log button functionality
document.addEventListener('DOMContentLoaded', () => {
    const clearBtn = document.getElementById('clearLog');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            const logContainer = document.getElementById('eventLog');
            logContainer.innerHTML = '<p class="log-placeholder">Events will appear here...</p>';
            eventTracker.clearHistory();
        });
    }
});

// Log instructions
console.log('%c📖 Event Tracker Commands:', 'color: #FFC107; font-size: 14px; font-weight: bold;');
console.log('%ceventTracker.getStats()', 'color: #03A9F4;', '- Get event statistics');
console.log('%ceventTracker.eventHistory', 'color: #03A9F4;', '- View all tracked events');
console.log('%ceventTracker.clearHistory()', 'color: #03A9F4;', '- Clear event history');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'color: #4CAF50;');
