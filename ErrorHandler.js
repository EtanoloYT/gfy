class ErrorHandler {
    /**
     * Handles an error in red text and exits the process
     * 
     * @param {string} err
     * @returns {void} 
     */
    static handleError(err) {
        console.error("\x1b[31mError: " + err + "\x1b[0m");
        process.exit(1);
    }

    /**
     * Handles a warning in yellow text
     * 
     * @param {string} warn 
     * @returns {void}
     */
    static handleWarning(warn) {
        console.warn("\x1b[33mWarning: " + warn + "\x1b[0m");
    }

    /**
     * Handles an info message in blue text
     * 
     * @param {string} info 
     * @returns {void}
     */
    static handleInfo(info) {
        console.info("\x1b[34mInfo: " + info + "\x1b[0m");
    }

    /**
     * Handles a log message in green text
     * 
     * @param {string} log 
     * @returns {void}
     */
    static handleLog(log) {
        console.log("\x1b[32mLog: " + log + "\x1b[0m");
    }

    /**
     * Handles a debug message in cyan text
     * 
     * @param {string} debug 
     * @returns {void}
     */
    static handleDebug(debug) {
        console.debug("\x1b[36mDebug: " + debug + "\x1b[0m");
    }

    /**
     * Handles a trace message in magenta text
     * 
     * @param {string} trace 
     * @returns {void}
     */
    static handleTrace(trace) {
        console.trace("\x1b[35mTrace: " + trace + "\x1b[0m");
    }

}

export default ErrorHandler;