import fs from "fs";
import Memory from "./Memory.js";
import Tokenizer from "./Tokenizer.js";
import Executor from "./Executor.js";
import ErrorHandler from "./ErrorHandler.js";

const memory = new Memory();
const tokenizer = new Tokenizer();
const executor = new Executor();

const args = process.argv.slice(2);
const fileName = args[0];

if(!fileName) {
    ErrorHandler.handleError("No file provided");
}

let file = fs.readFileSync(fileName, "utf8");
tokenizer.tokenize(file);
tokenizer.findImports();
tokenizer.sanitize();

executor.addFunctionNames(tokenizer.getTokens());
executor.addTasks(tokenizer.getTokens());
executor.runTasks(memory);
//console.log(tokenizer.getTokens());
//console.log(executor.getTasks());