import fs from "fs";
import ErrorHandler from "./ErrorHandler.js";

class Tokenizer {

    constructor() {
        this.tokens = [];
    }

    getTokens() {
        return this.tokens;
    }

    tokenize(code) {
        // Split code by newlines, tabs, and spaces
        this.tokens = code.split(/\s+/);
    }

    findImports() {
        // Find all import statements
        this.tokens.forEach((token, index) => {
            if(token === "£import") {
                this.importModule(index, this.tokens[index + 1]);
            }
        });
    }

    importModule(index, module) {
        if(!module) {
            ErrorHandler.handleError("No module provided for import statement");
        }
        // Replace import statement with module code
        this.tokens[index] = "";
        this.tokens[index + 1] = "";
        // Read module code from file
        let moduleCode;
        try {
            moduleCode = fs.readFileSync(module + ".gfy", "utf8");
        } catch(err) {
            ErrorHandler.handleError("Module " + module + " not found");
        }
        // Tokenize module code
        let moduleTokens = moduleCode.split(/\s+/);
        // Insert module code into tokens
        this.tokens.splice(index, 0, ...moduleTokens);
        // Run findImports again
        this.findImports();
    }

    sanitize() {
        // Remove all empty tokens
        this.tokens = this.tokens.filter(token => token !== "");
    }

}

export default Tokenizer;