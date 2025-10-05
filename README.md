# Q6: Event Tracking System

**Student ID:** 2025201050  
**Question:** Create a JavaScript function that can capture all click events and page views performed by a user across HTML tags and CSS Objects. Print the output on console on your local browser.

# Q6: Event Tracking System for Q1-Q5

## Overview

This implementation provides a comprehensive event tracking system that integrates with **Q1-Q5** assignments to capture all user interactions. It tracks click events, page views, and classifies event objects into different types (buttons, dropdowns, images, text inputs, etc.) with detailed console output.

**✅ Integrated Into:**
- ✅ Q1: Portfolio Page (index.html)
- ✅ Q2: News Site (newssd.html)  
- ✅ Q3: Jigsaw Puzzle (jigsaw.html)
- ✅ Q4: Stoplight Game (stoplight.html)
- ✅ Q5: Data Dictionary Tool (index.html)

## Integration Status

The event tracker (`eventTracker.js`) has been integrated into all Q1-Q5 HTML files. Simply open any of those pages and check the browser console to see event tracking in action!

## How to Test

### Testing Q1 (Portfolio)
```bash
cd Q1
python3 -m http.server 8080
# Open http://localhost:8080
# Press F12 → Console tab
# Click on links, images, sections
```

### Testing Q2 (News Site)
```bash
cd Q2
python3 -m http.server 8080
# Open http://localhost:8080/newssd.html
# Press F12 → Console tab
# Click navigation links, anchors, tables
```

### Testing Q3 (Jigsaw Puzzle)
```bash
cd Q3
python3 -m http.server 8080
# Open http://localhost:8080/jigsaw.html
# Press F12 → Console tab
# Click buttons, dropdowns, file input, puzzle pieces
```

### Testing Q4 (Stoplight Game)
```bash
cd Q4
python3 -m http.server 8080
# Open http://localhost:8080/stoplight.html
# Press F12 → Console tab
# Click game buttons, strategy selections
```

### Testing Q5 (Data Dictionary Tool)
```bash
cd Q5
python3 -m http.server 8080
# Open http://localhost:8080
# Press F12 → Console tab
# Click tabs, buttons, textareas, form inputs
```

### What You'll See in Console

For every interaction, you'll see formatted output like:

```
🎯 Event Tracker Initialized
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🖱️  Click tracking enabled for all elements
✅ All event listeners attached successfully!

[#1] PAGE_VIEW
  URL: http://localhost:8080/index.html
  Title: Portfolio - Diganta Sen
  Timestamp: 2025-10-04T...

[#2] CLICK
  Event Object: link
  Element: <a>
  Text: LinkedIn
  href: https://www.linkedin.com/in/...
  Position: (234, 456)
  Timestamp: 2025-10-04T...

[#3] CLICK
  Event Object: button
  Element: <button>
  Class: btn btn-primary
  Text: Start Game
  Position: (345, 567)
  Timestamp: 2025-10-04T...
```

## 📁 File Structure

```
Q6/
├── index.html          - Main HTML file with interactive elements
├── eventTracker.js     - Core event tracking implementation
├── styles.css          - Styling for the demo page
└── README.md           - This file
```

## 🎯 Features Implemented

### 1. **Comprehensive Click Tracking**
- Captures clicks on ALL HTML elements
- Uses event delegation for efficiency
- Identifies event object types:
  - Buttons (submit, cancel, etc.)
  - Links (internal and external)
  - Images
  - Text inputs, email inputs
  - Checkboxes and radio buttons
  - Dropdowns/selects
  - Textareas
  - Divs, spans, paragraphs
  - Headings

### 2. **Event Information Captured**
For each click event, the system logs:
```javascript
{
    type: 'click',
    event_object: 'button' | 'link' | 'image' | 'dropdown' | etc.,
    element: {
        tag: 'button',
        id: 'submitBtn',
        className: 'btn btn-primary',
        text: 'Submit Button',
        attributes: { href, src, data-action, etc. }
    },
    position: {
        x: 150,          // Client X coordinate
        y: 200,          // Client Y coordinate
        pageX: 150,      // Page X coordinate
        pageY: 450       // Page Y coordinate
    },
    modifiers: {
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false
    },
    timestamp: '2025-10-04T12:34:56.789Z',
    path: ['button.btn', 'div.demo-card', 'div.demo-grid', ...]
}
```

### 3. **Page View Tracking**
Automatically tracks page loads with:
- URL (full, pathname, search, hash)
- Page title
- Referrer
- Viewport dimensions
- User agent
- Timestamp

### 4. **Console Output**
All events are logged to the browser console with:
- ✅ Color-coded output
- ✅ Grouped information
- ✅ Event counter
- ✅ Formatted details
- ✅ Full event data object

### 5. **Visual Event Log**
The page displays a real-time log of the last 10 events showing:
- Event number
- Event type (button, link, image, etc.)
- Element tag
- Element text/content
- Timestamp

### 6. **Additional Tracking**
- Page visibility changes (tab switching)
- Navigation events (hash changes, back/forward buttons)
- Event propagation path

## 🧪 Testing the Implementation

### Open Developer Console
1. Press **F12** or **Ctrl+Shift+I** (Windows/Linux) or **Cmd+Option+I** (Mac)
2. Navigate to the **Console** tab

### Interact with Elements
Try clicking on:
- ✅ Buttons (Submit, Cancel, Confirm)
- ✅ Links (internal navigation, external links)
- ✅ Images (colored squares)
- ✅ Form inputs (text fields, email, textarea)
- ✅ Checkboxes
- ✅ Dropdown menu
- ✅ Clickable div cards
- ✅ Any text on the page

### View Console Output
Each interaction will log detailed information like:

```
[1] CLICK
  Event Object: button
  Element: <button>
  ID: null
  Class: btn btn-primary
  Text: Submit Button
  Position: (234, 456)
  Timestamp: 2025-10-04T12:34:56.789Z
  Full Data: {type: 'click', event_object: 'button', ...}
```

### Check Event Statistics
In the console, run:
```javascript
eventTracker.getStats()
```

View all tracked events:
```javascript
eventTracker.eventHistory
```

Clear event history:
```javascript
eventTracker.clearHistory()
```

## 📊 Implementation Details

### Event Tracker Class
The `EventTracker` class provides:
- **Initialization**: Sets up all event listeners
- **Click Tracking**: Comprehensive click event handling
- **Event Classification**: Identifies event object types
- **Console Logging**: Formatted output with color coding
- **Event History**: Maintains last 100 events
- **Statistics**: Event counting and breakdown

### Key Methods

#### `trackPageView()`
Captures initial page load and navigation events.

#### `handleClickEvent(event)`
Processes all click events with full context.

#### `getEventObjectType(element)`
Determines the type of clicked object (button, link, dropdown, etc.)

#### `logEvent(type, data)`
Formats and outputs events to console with color coding.

#### `updateUILog(data)`
Updates the visual event log on the page.

## 🎨 Design Highlights

- **Gradient Background**: Purple gradient (matching theme)
- **Glass Morphism Cards**: Modern card designs
- **Interactive Elements**: Hover effects and transitions
- **Responsive Layout**: Works on all screen sizes
- **Accessible**: Proper focus indicators and semantic HTML

## ✅ Requirements Met

### As per Q6 Specification:
- ✅ **Captures all click events**: Every clickable element tracked
- ✅ **Tracks page views**: Initial load and navigation changes
- ✅ **Identifies event objects**: Buttons, dropdowns, images, text inputs, etc.
- ✅ **Console output**: Detailed formatted logs
- ✅ **Works locally**: No external dependencies required

### Additional Features:
- ✅ Visual event log on page
- ✅ Event history management
- ✅ Statistics and analytics
- ✅ Multiple event types tracked
- ✅ Professional UI/UX

## 🔧 Browser Compatibility

Tested and working on:
- ✅ Google Chrome (latest)
- ✅ Mozilla Firefox (latest)
- ✅ Microsoft Edge (latest)
- ✅ Safari (latest)

## 📝 Code Quality

- **Modular Design**: Clean class-based architecture
- **Comprehensive Comments**: Every function documented
- **Event Delegation**: Efficient event handling
- **Error Handling**: Robust implementation
- **ES6+ Features**: Modern JavaScript syntax

## 🎓 Educational Value

This implementation demonstrates:
1. Event handling in JavaScript
2. Event delegation and bubbling
3. DOM manipulation
4. Object-oriented programming
5. Console API usage
6. Browser APIs (Visibility, History)

## 📖 Usage Examples

### Example 1: Track Button Clicks
Click any button → See console output with button details

### Example 2: Track Link Navigation
Click links → See navigation events with URL changes

### Example 3: Track Form Interactions
Type in inputs, select dropdown options → See input events

### Example 4: View Statistics
```javascript
eventTracker.getStats()
// Output: { totalEvents: 15, historySize: 15, eventTypes: {...} }
```

## 🏆 Submission Checklist

- ✅ All required functionality implemented
- ✅ Console output working correctly
- ✅ Multiple event types captured
- ✅ Clean, documented code
- ✅ Professional UI
- ✅ README documentation
- ✅ No external dependencies
- ✅ Cross-browser compatible

---

**Developed by:** Student 2025201050  
**Date:** October 4, 2025  
**Question:** Q6 - Event Tracking System
