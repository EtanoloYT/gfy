import Operator from "./Operator.js";

class Executor {
    constructor() {
        this.tasks = [];
        this.commands = [
            "set",
            "print",
            "add",
            "sub",
            "mul",
            "div",
            "mod",
            "define",
            "goto",
            "equals",
            "less",
            "greater",
            "end",
        ];
        this.functionNames = [];
    }

    
    addFunctionName(token) {
        let name = token.split('(')[0];
        this.functionNames.push(name);
    }

    setFunctionNames(names) {
        this.functionNames = names;
    }
    
    addTasks(tokens) {
        let tasks = [];
        let task = {
            task: 'define',
            args: []
        };
        for(let i = 0; i < tokens.length; i++) {
            //console.log(tokens[i]);
            if(this.commands.includes(tokens[i]) || this.functionNames.includes(tokens[i])) {
                task.task = tokens[i];
            } else {
                task.args.push(tokens[i]);
            }
            if(this.commands.includes(tokens[i + 1]) || this.functionNames.includes(tokens[i + 1]) || i === tokens.length - 1) {
                tasks.push(task);
                task = {
                    task: 'define',
                    args: []
                };
            }
        }

        this.tasks = tasks;
    }

    checkArgsNumber(task, minArgs, maxArgs) {
        let args = task.args;
        if(args.length < minArgs || args.length > maxArgs) {
            console.log('Invalid number of arguments for ' + task.task + ': ' + args.length);
            console.log('Expected: ' + (minArgs === maxArgs ? minArgs : minArgs + ' to ' + maxArgs));
            console.log('Arguments: ' + args.join(' '));
            return false;
        }
    }
    
    executeTask(task, memory, index) {
        let taskName = task.task;
        let args = task.args;

        switch(taskName) {
            case 'set':
                this.checkArgsNumber(task, 2, 2);
                memory.setMemory(args[0], args.slice(1).join(' '));
                break;
            case 'print':
                this.checkArgsNumber(task, 1, 1);
                memory.printVars(args);
                break;
            case 'add':
                this.checkArgsNumber(task, 2, 2);
                Operator.addVar(args[0], args[1], memory);
                break;
            case 'sub':
                this.checkArgsNumber(task, 2, 2);
                Operator.subVar(args[0], args[1], memory);
                break;
            case 'mul':
                this.checkArgsNumber(task, 2, 2);
                Operator.mulVar(args[0], args[1], memory);
                break;
            case 'div':
                this.checkArgsNumber(task, 2, 2);
                Operator.divVar(args[0], args[1], memory);
                break;
            case 'mod':
                this.checkArgsNumber(task, 2, 2);
                Operator.modVar(args[0], args[1], memory);
                break;
            case 'equals':
                // Check if the the two values are equal, if not execute a function, else execute the next line
                this.checkArgsNumber(task, 2, 2);
                // remove the last character of the second argument
                if(memory.getVar(args[0]).value === memory.getVar(args[1].slice(0, -1)).value) {
                    return index + 1;
                } else {
                    // Go to the nearest 'end' command in the same level (main if not in a function or function if in a function)
                    let level = 0;
                    for(let i = index + 1; i < this.tasks.length; i++) {
                        if(this.tasks[i].task === 'section') {
                            level++;
                        } else if(this.tasks[i].task === 'end') {
                            if(level === 0) {
                                return i + 1;
                            } else {
                                level--;
                            }
                        }
                    }
                    return this.tasks.length;
                }
            case 'greater':
                // Check if the first value is greater than the second value, if not execute a function, else execute the next line
                this.checkArgsNumber(task, 2, 2);
                if(memory.getVar(args[0]).value > memory.getVar(args[1].slice(0, -1)).value) {
                    return index + 1;
                } else {
                    // Go to the nearest 'end' command in the same level (main if not in a function or function if in a function)
                    let level = 0;
                    for(let i = index + 1; i < this.tasks.length; i++) {
                        if(this.tasks[i].task === 'section') {
                            level++;
                        } else if(this.tasks[i].task === 'end') {
                            if(level === 0) {
                                return i + 1;
                            } else {
                                level--;
                            }
                        }
                    }
                    return this.tasks.length;
                }
                case 'less':
                // Check if the first value is less than the second value, if not execute a function, else execute the next line
                this.checkArgsNumber(task, 2, 2);
                if(memory.getVar(args[0]).value < memory.getVar(args[1].slice(0, -1)).value) {
                    return index + 1;
                }
                else {
                    // Go to the nearest 'end' command in the same level (main if not in a function or function if in a function)
                    let level = 0;
                    for(let i = index + 1; i < this.tasks.length; i++) {
                        if(this.tasks[i].task === 'section') {
                            level++;
                        } else if(this.tasks[i].task === 'end') {
                            if(level === 0) {
                                return i + 1;
                            } else {
                                level--;
                            }
                        }
                    }
                    return this.tasks.length;
                }
            case 'end':
                break;
            case 'define':
                //get the function name before the parenthesis
                for(let i = 0; i < task.args.length; i++) {
                    let name = args[i][0].split('(')[0];
                    let functionArgs = args[i][0] ? args[i][0].split('(')[1].split(')')[0].split(',') : [];
                    let body = args[i].slice(1);
                    memory.setMemory(name, null, "function");
                    memory.defineFunction(name, functionArgs, body);
                }
                break;
            default:
                if(this.functionNames.includes(taskName)) {
                    this.execFunction(memory, taskName, task);
                } else {
                    console.error('Invalid task: ' + taskName);
                    process.exit(1);
                }
                break;
        }

        return index + 1;
    }

    execFunction(memory, taskName, task) {
        let functionExecutor = new Executor();
        functionExecutor.setFunctionNames(this.functionNames);
        let functionArgs = memory.getFunctionList()[taskName].args || [];
        let functionBody = memory.getFunctionList()[taskName].body || [];
        let currentArgs = task.args || [];

        // Change the function body to use the current arguments
        if (functionArgs.length != 0 && functionArgs[0] != '') {
            functionBody.forEach((line, index) => {
                functionBody[index] = line.replace(new RegExp(`\\b(${functionArgs.join('|')})\\b`, 'g'), function(match) {
                    return currentArgs[functionArgs.indexOf(match)];
                });
            });
        }
        // if a task is separated by a space, it is split into an array
        functionBody = functionBody.join(' ').split(' ');
        functionExecutor.addTasks(functionBody, this.functionNames);
        functionExecutor.executeTasks(memory);
    }

    executeTasks(memory) {
        let i = 0;
        while(i < this.tasks.length) {
            i = this.executeTask(this.tasks[i], memory, i);
        }
    }

    getTasks() {
        return this.tasks;
    }
}

export default Executor;