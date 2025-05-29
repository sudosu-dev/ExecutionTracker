class ExecutionTracker {
  constructor() {
    this.counter = 0;
    this.logs = [];
  }

  //----- PRIVATE METHODS -----
  #getCallerLocation = () => {
    const stack = new Error().stack.split("\n");
    const callerLine = stack
      .slice(1)
      .find(
        (line) =>
          line.includes("at ") &&
          !line.includes("ExecutionTracker") &&
          !line.includes("react-dom")
      );
    const trimmedLocation = callerLine?.trim() || "unknown location";

    if (trimmedLocation === "unknown location") {
      return trimmedLocation;
    }

    const regex = /(?:.*\/)?([^/?#:]+)(?:[^:]*)?:(\d+):(\d+)/;
    const match = trimmedLocation.match(regex);

    if (match) {
      const fileName = match[1];
      const lineNumber = match[2];
      const columnNumber = match[3];
      return `File: ${fileName} Line: ${lineNumber}:${columnNumber} `;
    }

    return trimmedLocation;
  };

  // --- PUBLIC METHODS -----

  log(...args) {
    this.counter++;
    const location = this.#getCallerLocation();
    const logEntry = {
      id: this.counter,
      type: "log",
      message: args,
      location,
      timestamp: new Date(),
    };
    this.logs.push(logEntry);
    console.log(
      `%c#${logEntry.id}%c : %c${location}%c:`,
      "color: #00BCD4; font-weight: bold;",
      "color: inherit;",
      "color: #FFB300; font-style: italic;",
      "color: inherit;",
      ...args
    );
  }

  err(...args) {
    this.counter++;
    const location = this.#getCallerLocation();
    const logEntry = {
      id: this.counter,
      type: "error",
      message: args,
      location,
      timestamp: new Date(),
    };
    this.logs.push(logEntry);
    console.error(
      `%c#${logEntry.id}%c : %c${location}%c:`,
      "color: #00BCD4; font-weight: bold;",
      "color: inherit;",
      "color:  #D32F2F; font-weight: italic;",
      "color: inherit;",
      ...args
    );
  }

  group(label, ...args) {
    this.counter++;
    console.group(
      `%c#${this.counter}%c : %c${location}%c: Group: %c${label}`,
      "color: #00BCD4; font-weight: bold;",
      "color: inherit;",
      "color: #7E57C2; font-weight: italic;",
      "color: inherit;",
      "color: inherit; font-weight: bold; text-decoration: underline;",
      ...args
    );
  }

  groupEnd() {
    console.groupEnd();
  }

  reset() {
    this.counter = 0;
  }

  showLocation() {
    const location = this.#getCallerLocation();
    console.log(`msg.location is being called from: ${location}`);
  }

  getLogs() {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }
}

export const msg = new ExecutionTracker();
//  #getCallerLocation = () => {
//     const stack = new Error().stack.split("\n");
//     const callerLine = stack
//       .slice(1)
//       .find(
//         (line) =>
//           line.includes("at ") &&
//           !line.includes("ExecutionTracker") &&
//           !line.includes("react-dom")
//       );
//     return callerLine?.trim() || "unknown location";
//   };
