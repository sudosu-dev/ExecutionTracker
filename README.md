# ExecutionTracker

A JavaScript utility class for enhanced console logging with automatic caller location tracking, message numbering, and log history management.

## Features

- **Automatic caller location detection** - Shows which file and line number called the log
- **Message numbering** - Each log gets a unique sequential ID
- **Colored console output** - Enhanced readability with styled formatting
- **Log history** - Maintains an array of all logged messages with metadata
- **Multiple log types** - Support for regular logs, errors, and grouped logs
- **Easy integration** - Simple import and use with the exported `msg` instance

## Installation

Simply import the class or use the pre-instantiated `msg` export:

```javascript
import { msg } from "./path/to/execution-tracker.js";
// or
import { ExecutionTracker } from "./path/to/execution-tracker.js";
const tracker = new ExecutionTracker();
```

## Usage

### Basic Logging

```javascript
import { msg } from "./execution-tracker.js";

msg.log("Hello world!");
// Output: #1 : File: app.js Line: 5:1 : Hello world!

msg.log("User data:", { name: "John", age: 30 });
// Output: #2 : File: app.js Line: 7:1 : User data: { name: 'John', age: 30 }
```

### Error Logging

```javascript
msg.err("Something went wrong!", error);
// Output: #3 : File: app.js Line: 10:1 : Something went wrong! [Error object]
```

### Grouped Logs

```javascript
msg.group("API Calls");
msg.log("Fetching user data...");
msg.log("Processing response...");
msg.groupEnd();
```

### Utility Methods

```javascript
// Get current caller location
msg.showLocation();

// Get all logged messages
const logs = msg.getLogs();
console.log(logs);
// Returns array of log objects with id, type, message, location, timestamp

// Clear log history
msg.clearLogs();

// Reset counter
msg.reset();
```

## API Reference

### Methods

#### `log(...args)`

Logs messages with automatic numbering and location tracking.

- **Parameters**: Any number of arguments to log
- **Returns**: void

#### `err(...args)`

Logs error messages with red styling and automatic numbering.

- **Parameters**: Any number of arguments to log as errors
- **Returns**: void

#### `group(label, ...args)`

Creates a collapsible group in the console with a label.

- **Parameters**:
  - `label` (string): Group label
  - `...args`: Additional arguments
- **Returns**: void

#### `groupEnd()`

Ends the current console group.

- **Returns**: void

#### `showLocation()`

Displays the current caller location for debugging purposes.

- **Returns**: void

#### `getLogs()`

Returns a copy of all logged messages with metadata.

- **Returns**: Array of log objects containing:
  - `id`: Sequential number
  - `type`: 'log' or 'error'
  - `message`: Array of logged arguments
  - `location`: Caller file and line information
  - `timestamp`: Date object of when log was created

#### `clearLogs()`

Clears the internal log history array.

- **Returns**: void

#### `reset()`

Resets the message counter to 0.

- **Returns**: void

## Log Object Structure

Each log entry contains:

```javascript
{
  id: 1,
  type: "log", // or "error"
  message: ["Hello", "world"],
  location: "File: app.js Line: 10:5",
  timestamp: Date object
}
```

## Browser Compatibility

Works in all modern browsers that support:

- ES6 Classes
- Template literals
- Destructuring
- Error.stack property

## Example Output

```
#1 : File: app.js Line: 15:3 : Starting application...
#2 : File: utils.js Line: 42:8 : Processing data: [Object]
#3 : File: api.js Line: 28:12 : Error: Failed to fetch
```

## React Debug Panel Component

For React applications, you can use the included `DebugPanel` component to display logs directly in your UI:

```jsx
import DebugPanel from "./DebugPanel";

function App() {
  return (
    <div>
      {/* Your app content */}
      <DebugPanel />
    </div>
  );
}
```

### DebugPanel Features

- **Real-time updates** - Automatically refreshes every 500ms to show new logs
- **Visual log display** - Shows all logged messages with styling based on log type
- **Persistent history** - Displays all logs from the current session
- **Responsive design** - Styled with CSS classes for easy customization

### DebugPanel Structure

The component displays each log entry with:

- **Log ID number** (`#1`, `#2`, etc.)
- **Log type** (`[log]`, `[error]`)
- **Message content**
- **Caller location** (file and line number)

### CSS Classes

The DebugPanel uses these CSS classes for styling:

- `.debug-panel` - Main container
- `.log` - Individual log entry
- `.log.log` - Regular log entries
- `.log.error` - Error log entries

You can customize the appearance by styling these classes in your CSS.

### Example DebugPanel Output

```
#1 [log] — Hello world!
File: app.js Line: 15:3

#2 [error] — Something went wrong!
File: utils.js Line: 42:8
```

## Notes

- The location tracker automatically filters out internal ExecutionTracker calls and React DOM calls
- Colors and styling only appear in browser developer consoles that support CSS styling
- The `msg` export provides a ready-to-use singleton instance
- All console methods maintain their original functionality while adding enhanced features
- The DebugPanel component requires React and updates automatically via polling
