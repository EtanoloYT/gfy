import fs from 'fs';
import Tokenizer from './Tokenizer.js';
import Memory from './Memory.js';
import Executor from './Executor.js';

let memory = new Memory();
let tokenizer = new Tokenizer();
let executor = new Executor();

const args = process.argv.slice(2);
const filename = args[0];

if (!filename) {
    console.error('Filename is required');
    process.exit(1);
}

let file = fs.readFileSync(filename, 'utf8');
tokenizer.tokenize(file);
tokenizer.sanitize();
tokenizer.importModules();
tokenizer.groupFunctions(executor);

executor.addTasks(tokenizer.getTokens());
executor.executeTasks(memory);