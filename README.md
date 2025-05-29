ExecutionTracker & Debug Panel
Overview
ExecutionTracker is a client-side JavaScript utility designed to enhance console logging for debugging web applications. It provides styled and informative log messages, including automatic detection of the caller's location (file, line, and column number). It also maintains a history of logs.

The project includes a companion React component, DebugPanel, which can display these logs in a persistent panel overlaid on your application, offering an alternative or supplement to the browser's developer console.

This tool is primarily intended for use in browser environments due to its reliance on %c for console styling and browser-specific stack trace parsing.

Features
ExecutionTracker (msg instance)
Styled Console Output:

msg.log(): Standard log messages.

msg.err(): Error messages.

msg.group() / msg.groupEnd(): Grouped log messages.

Consistent prefix for logs: #ID : Location: Message.

Customizable color schemes for different parts of the log (ID, location, message type - see "Console Output Styling" below).

Caller Location Detection:

Automatically attempts to determine and log the File: Name Line: Number:Column where the log function was called.

Excludes calls from within ExecutionTracker itself and react-dom to provide more relevant locations.

Log History:

All logs are stored in an array.

Accessible via msg.getLogs().

Can be cleared using msg.clearLogs().

Flexible Argument Handling:

msg.log(...args) and msg.err(...args) accept multiple arguments. Objects passed will be interactively inspectable in the browser console.

Additional Utilities:

msg.showLocation(): Logs the current caller's location.

msg.reset(): Resets the log counter.

Singleton Instance: Exported as msg for easy import and consistent use across your application.

DebugPanel (React Component)
UI Log Display: Renders logs captured by ExecutionTracker in a fixed panel at the bottom of the screen.

Real-time Updates: Polls msg.getLogs() every 500ms to refresh the displayed logs.

Basic Log Styling: Differentiates between log types (e.g., errors in red) via CSS.

Scrollable: Allows scrolling through a large number of logs.

Installation / Setup
ExecutionTracker.js:

Place ExecutionTracker.js in your project (e.g., in a utils or lib folder).

It exports a singleton instance named msg.

DebugPanel.jsx & DebugPanel.css:

Place these files in your React project's components directory.

Ensure DebugPanel.jsx correctly imports msg from ExecutionTracker.js (adjust the path if necessary).

Import DebugPanel.css into DebugPanel.jsx or your main application styles.

Usage
ExecutionTracker (msg)
Import the msg instance into your JavaScript/React files:

import { msg } from './path/to/ExecutionTracker'; // Adjust path as needed

// Basic logging
msg.log('Application initialized.');
msg.log('User data:', { id: 1, name: 'Alice' });

// Error logging
try {
// some operation that might fail
throw new Error("Something went wrong!");
} catch (e) {
msg.err('Operation failed:', e.name, e.message, e);
}

// Grouping logs
msg.group('User Authentication Process');
msg.log('Step 1: Validating credentials...');
msg.log('Step 2: Fetching user profile...');
msg.groupEnd();

// Show current location
function someUtility() {
msg.showLocation();
}
someUtility();

// Accessing and clearing logs (e.g., for custom handling)
const allLogs = msg.getLogs();
console.log('All captured logs:', allLogs); // This will use browser's default console.log
// msg.clearLogs();
// msg.reset(); // Resets the counter

DebugPanel
Import and render the DebugPanel component in your main React application layout (e.g., App.jsx):

// App.jsx or your main layout component
import React from 'react';
import DebugPanel from './path/to/components/DebugPanel'; // Adjust path
import './path/to/components/DebugPanel.css'; // Ensure CSS is imported

function App() {
// ... your app logic ...

return (

<div>
{/_ Your application content _/}
<h1>My Application</h1>
<p>Welcome!</p>

      {/* Render DebugPanel, typically at the top level */}
      {/* Only render in development mode example: */}
      {process.env.NODE_ENV === 'development' && <DebugPanel />}
    </div>

);
}

export default App;

It's often good practice to only include the DebugPanel in development builds.

Console Output Styling (Browser %c)
The ExecutionTracker uses the browser's %c CSS styling for console output. Based on the latest code provided:

msg.log():

ID (#123): Bright Cyan (color: #00BCD4; font-weight: bold;)

Location (File: test.js Line: 10:5): Amber/Yellow, Italic (color: #FFB300; font-style: italic;)

Message parts: Default console color (color: inherit;)

msg.err():

ID (#123): Bright Cyan (color: #00BCD4; font-weight: bold;)

Location (File: test.js Line: 15:2): Red, Italic (color: #D32F2F; font-style: italic;)

Message parts: Handled by console.error (strings often appear red by default), objects are inspectable.

msg.group():

ID (#123): Bright Cyan (color: #00BCD4; font-weight: bold;)

Location (File: test.js Line: 20:3): Purple, Italic (color: #7E57C2; font-style: italic;)

Label text: Default console color, Bold, Underlined (color: inherit; font-weight: bold; text-decoration: underline;)

(Exact hex codes and styles are defined within ExecutionTracker.js)

DebugPanel UI Styling
The DebugPanel displays logs with the format: <strong>#{id}</strong> [{type}] — {message_parts} followed by the <small>{location}</small>.

Message Display: Since log.message (from msg.getLogs()) is an array of arguments passed to msg.log() or msg.err(), the DebugPanel.jsx currently renders this array using its default toString() method (e.g., arg1,arg2,[object Object]). For a more readable display of multiple arguments or objects in the panel, you might want to modify DebugPanel.jsx's rendering of log.message, for example:

// Example modification in DebugPanel.jsx for better message display
// {log.message.map((arg, index) => (
// <span key={index}>
// {typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)}
// {index < log.message.length - 1 ? ' ' : ''}
// </span>
// ))}

Basic CSS is provided in DebugPanel.css for the panel itself and for differentiating log types:

.log.error: Text color #f88 (light red)

.log.log: Text color #8f8 (light green)

These styles can be customized in DebugPanel.css.

Code Structure
ExecutionTracker.js: Contains the core ExecutionTracker class and the exported msg instance.

DebugPanel.jsx: The React component for displaying logs in the UI.

DebugPanel.css: Styles for the DebugPanel component.

Known Limitations / Considerations
#getCallerLocation() Accuracy: The accuracy of location detection can vary, especially in transpiled or minified production code if source maps are not perfectly configured or if the call stack is unusual.

Browser-Only Styling: The console coloring uses %c CSS and is only effective in browser developer consoles.

DebugPanel Polling: The DebugPanel updates by polling msg.getLogs() every 500ms. For applications with extremely high-frequency logging, this could be optimized (e.g., using an event-driven approach or allowing configurable intervals).

Potential Future Enhancements
Support for Node.js console styling (e.g., using a library like chalk).

More advanced filtering, searching, and sorting capabilities within the DebugPanel.

Option to configure the polling interval or use an event-based update for DebugPanel.

Log level support (e.g., msg.debug(), msg.info(), msg.warn()).

Option to persist logs (e.g., to localStorage or send to a server).

Configuration options for ExecutionTracker (e.g., default log format, disabling location).
