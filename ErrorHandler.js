class ErrorHandler {

    static handleError(err) {
        // Throw error in red text
        console.error("\x1b[31mError: " + err + "\x1b[0m");
        process.exit(1);
    }

    static handleWarning(warn) {
        // Throw warning in yellow text
        console.warn("\x1b[33mWarning: " + warn + "\x1b[0m");
    }

    static handleInfo(info) {
        // Throw info in blue text
        console.info("\x1b[34mInfo: " + info + "\x1b[0m");
    }

    static handleLog(log) {
        // Throw log in green text
        console.log("\x1b[32mLog: " + log + "\x1b[0m");
    }

    static handleDebug(debug) {
        // Throw debug in cyan text
        console.debug("\x1b[36mDebug: " + debug + "\x1b[0m");
    }

    static handleTrace(trace) {
        // Throw trace in magenta text
        console.trace("\x1b[35mTrace: " + trace + "\x1b[0m");
    }

}

export default ErrorHandler;