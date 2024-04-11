import ErrorHandler from "./ErrorHandler.js";
import Memory from "./Memory.js";
import Operator from "./Operator.js";
/**
 * Class that executes a list of tasks
 */
class Executor {

    constructor() {
        this.tasks = [];
        // This is a list of tasks that the executor is allowed to run
        // each task has a name and a number of arguments it takes
        this.allowedTasks = {
            "set" : 2,
            "add" : 2,
            "sub" : 2,
            "mul" : 2,
            "div" : 2,
            "mod" : 2,
            "print" : 1,
            "equals" : 2,
            "greater" : 2,
            "less" : 2,
            "define" : Infinity,
            "call" : Infinity,
            "end" : 0,
            "dump" : 0,
        };
        this.functionNames = [];
    }

    /**
     * Sets the tasks to be executed
     * 
     * @param {Array} functionNames 
     */
    setFunctionNames(functionNames) {
        this.functionNames = functionNames;
    }

    /**
     * Returns the tasks to be executed
     * 
     * @returns {Array} tasks
     */
    getTasks() {
        return this.tasks;
    }

    /**
     * Adds tasks to the list of tasks to be executed from a list of tokens
     * 
     * @param {Array} tokens 
     */
    addTasks(tokens) {
        let tasks = [];
        let task = {
            task: "",
            args: []
        }
        for(let i = 0; i < tokens.length; i++) {
            task.task = tokens[i];
            let argCount = 0;
            if(this.allowedTasks[tokens[i]]) {
                argCount = this.allowedTasks[tokens[i]];
            }
            if(this.functionNames.find((element) => element.name == tokens[i])) {
                argCount = this.functionNames.find((element) => element.name == tokens[i]).paramCount;
            }
            if(argCount == Infinity) {
                // Count how many tokens until the next end
                let end = tokens.indexOf("end", i);
                if(end == -1) {
                    let err = "No end found for function: " + tokens[i];
                    ErrorHandler.handleError(err);
                }
                argCount = end - i;
            }
            for(let j = 1; j <= argCount; j++) {
                task.args.push(tokens[i+j]);
            }
            tasks.push(task);
            task = {
                task: "",
                args: []
            }
            i += argCount;
        }
        this.tasks = tasks;
    }

    /**
     * Adds function names to the list of function names
     * 
     * @param {Array} tokens 
     */
    addFunctionNames(tokens) {
        let functionNames = [];
        for(let i = 0; i < tokens.length; i++) {
            if(tokens[i] == "define") {
                let paramCount = 0;
                let functionSignature = tokens[i+1];
                let functionName = functionSignature.split("(")[0];
                let functionParams = functionSignature.split("(")[1].split(")")[0].split(",");
                if(functionParams[0] == "") {
                    functionParams = [];
                }
                // If any param has a $ in it, then set it to infinity
                paramCount = functionParams.length;
                /*
                for(let j = 0; j < functionParams.length; j++) {
                    if(functionParams[j].includes("$")) {
                        paramCount = Infinity;
                    }
                }*/
                functionNames.push({
                    name: functionName,
                    paramCount: paramCount
                });
            }
        }
        this.functionNames = functionNames;
    }

    
    /**
     * Executes a task
     * 
     * @param {object} memory 
     * @param {object} task 
     */
    execTask(memory, task) {
        switch(task.task) {
            case "set":
                // Set the variable to the value or variable
                memory.autoTypeVariable(task.args[0], task.args[1]);
                break;
            case "add":
                // Add the two variables together and set the first variable to the result
                memory.autoTypeVariable(task.args[0], Operator.add(task.args[0], task.args[1], memory));
                break;
            case "sub":
                // Subtract the two variables and set the first variable to the result
                memory.autoTypeVariable(task.args[0], Operator.sub(task.args[0], task.args[1], memory));
                break;
            case "mul":
                // Multiply the two variables and set the first variable to the result
                memory.autoTypeVariable(task.args[0], Operator.mul(task.args[0], task.args[1], memory));
                break;
            case "div":
                // Divide the two variables and set the first variable to the result
                memory.autoTypeVariable(task.args[0], Operator.div(task.args[0], task.args[1], memory));
                break;
            case "mod":
                // Mod the two variables and set the first variable to the result
                memory.autoTypeVariable(task.args[0], Operator.mod(task.args[0], task.args[1], memory));
                break;
            case "print":
                // Print the variable
                memory.print(task.args[0]);
                break;
            case "equals":
                // Check if the two variables are equal
                if(!memory.equals(task.args[0], task.args[1])) {
                    // Remove all tasks until the next end, starting from the current task
                    let end = -1;
                    for(let i = this.tasks.findIndex((element) => element.task == "equals"); i < this.tasks.length; i++) {
                        if(this.tasks[i].task == "end") {
                            end = i;
                            break;
                        }
                    }
                    if(end == -1) {
                        // Throws an error if no end is found (end is mandatory for equals)
                        ErrorHandler.handleError("No end found for equals");
                    }
                    // Remove all tasks between the current task and the end
                    this.tasks.splice(this.tasks.findIndex((element) => element.task == "equals"), end);
                }
                break;
            case "greater":
                // Check if the first variable is greater than the second
                if(!memory.greater(task.args[0], task.args[1])) {
                    // Remove all tasks until the next end, starting from the current task
                    let end = -1;
                    for(let i = this.tasks.findIndex((element) => element.task == "greater"); i < this.tasks.length; i++) {
                        if(this.tasks[i].task == "end") {
                            end = i;
                            break;
                        }
                    }
                    if(end == -1) {
                        // Throws an error if no end is found (end is mandatory for greater)
                        ErrorHandler.handleError("No end found for greater");
                    }
                    // Remove all tasks between the current task and the end
                    this.tasks.splice(this.tasks.findIndex((element) => element.task == "greater"), end);
                }
                break;
            case "less":
                // Check if the first variable is less than the second
                if(!memory.less(task.args[0], task.args[1])) {
                    // Remove all tasks until the next end, starting from the current task
                    let end = -1;
                    for(let i = this.tasks.findIndex((element) => element.task == "less"); i < this.tasks.length; i++) {
                        if(this.tasks[i].task == "end") {
                            end = i;
                            break;
                        }
                    }
                    if(end == -1) {
                        // Throws an error if no end is found (end is mandatory for less)
                        ErrorHandler.handleError("No end found for less");
                    }
                    // Remove all tasks between the current task and the end
                    this.tasks.splice(this.tasks.findIndex((element) => element.task == "less"), end);
                }
                break;
            case "define":
                // Define a function with the given name, parameters, and body
                let functionSignature = task.args[0];
                let functionName = functionSignature.split("(")[0];
                let functionParams = functionSignature.split("(")[1].split(")")[0].split(",");
                task.args.shift();
                let functionBody = task.args;
                memory.defineFunction(functionName, functionParams, functionBody);
                break;
            case "end":
                // Do nothing
                break;
            case "dump":
                // Prints the memory variables to the console
                console.log(memory.getVariables());
                break;
            default:
                // Check if the task is a function
                if(this.functionNames.find((element) => element.name == task.task)) {
                    let functionParams = this.functionNames.find((element) => element.name == task.task).paramCount;
                    let args = task.args;
                    let functionName = task.task;
                    // let functionBody = memory.functions[functionName].body; -> This is not needed, will be removed in the future
                    if(functionParams == Infinity) {
                        functionParams = args.length;
                    }
                    let functionArgs = [];
                    for(let i = 0; i < functionParams; i++) {
                        functionArgs.push(args[i]);
                    }
                    this.runFunction(memory, functionName, functionArgs);
                } else {
                    // Throws an error if the task is not recognized as a function or a command in the allowedTasks
                    ErrorHandler.handleError("Unknown command: " + task.task);
                }
                break;
        }
    }

    /**
     * Runs all the tasks in the list of tasks
     * 
     * @param {Array} memory 
     */
    runTasks(memory) {
        for(let i = 0; i < this.tasks.length; i++) {
            this.execTask(memory, this.tasks[i]);
        }
    }

    /**
     * Runs a function with the given name and arguments
     * 
     * @param {Array} memory 
     * @param {string} functionName 
     * @param {Array} args 
     */
    runFunction(memory, functionName, args) {
        // Replace all instances of the parameters with the arguments
        let functionArgs = memory.getFunction(functionName).args;
        let functionBody = memory.getFunction(functionName).body;
        let currentArgs = args;
        if(functionArgs.length != 0 && functionArgs[0] != '') {
            functionBody.forEach((line, index) => {
                // Use regex to replace all instances of the parameters with the arguments in the function body
                functionBody[index] = line.replace(new RegExp(`\\b(${functionArgs.join('|')})\\b`, 'g'), function(match) {
                    return currentArgs[functionArgs.indexOf(match)];
                });
            });
        }
        // Sets the new function body to the modified function body
        functionBody = functionBody.join(' ').split(' ');
        // Must create a new executor to run the function
        let functionExecutor = new Executor();
        functionExecutor.setFunctionNames(this.functionNames);
        functionExecutor.addTasks(functionBody);
        functionExecutor.runTasks(memory);
        
    }

}

export default Executor;