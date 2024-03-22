class Memory {
    constructor() {
        this.memory = {};
        this.functionList = [];
    }

    getMemory() {
        return this.memory;
    }

    getFunctionList() {
        return this.functionList;
    }

    getFunctionNames() {
        return this.functionNames;
    }

    setMemory(name, value, type) {
        if(type != undefined) {
            this.memory[name] = {
                type: type,
                value: value
            };
            return;
        }
        // Cast value to its proper type "string" => type
        switch(typeof value) {
            case 'string':
                if(isNaN(value)) {
                    if(value.startsWith('"') && value.endsWith('"')) {
                        type = 'string';
                        value = value.slice(1, -1);
                    } else {
                        type = this.memory[value].type;
                        value = this.memory[value].value;
                    }
                } else {
                    type = 'number';
                    value = parseFloat(value);
                }
                break;
            case 'number':
                type = 'number';
                break;
            case 'boolean':
                type = 'boolean';
                break;
            case 'object':
                type = 'function';
                break;
            default:
                console.error('Unknown type: ' + typeof value);
                process.exit(1);
        }

        this.memory[name] = {
            type: type,
            value: value
        };
    }

    defineFunction(name, args, body) {
        this.functionList[name] = {
            args: args,
            body: body
        };
    }

    getVar(name) {
        return this.memory[name];
    }

    printVars(names) {
        for (let i = 0; i < names.length; i++) {
            if(this.memory[names[i]] === undefined) {
                console.error('Undefined variable: ' + names[i]);
                process.exit(1);
            } else {
                console.log(this.memory[names[i]].value + ' ');
            }
        }
    }
}

export default Memory;