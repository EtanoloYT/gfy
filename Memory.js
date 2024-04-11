import ErrorHandler from "./ErrorHandler.js";

class Memory {

    constructor() {
        this.variables = {};
        this.functions = {};
    }

    /**
     * Prints the value of a variable or a string
     * 
     * @param {string} name 
     */
    print(name) {
        try {
            console.log(this.variables[name].value);
        } catch(err) {
            if(name.startsWith('"') && name.endsWith('"')) {
                console.log(name.slice(1, name.length - 1));
            } else {
                ErrorHandler.handleError("Variable " + name + " not found");
            }
        }
    }

    /**
     * 
     * @param {string} name 
     * @returns 
     */
    getVariable(name) {
        return this.variables[name];
    }

    /**
     * 
     * @returns variables
     */
    getVariables() {
        return this.variables;
    }

    /**
     * 
     * @param {string} name 
     * @returns function definition
     */
    getFunction(name) {
        return this.functions[name];
    }

    /**
     * 
     * @returns functions
     */
    getFunctions() {
        return this.functions;
    }

    /**
     * 
     * @param {number} a 
     * @param {number} b 
     * @returns {boolean}
     */
    equals(a, b) {
        a = this.getVariable(a).value;
        b = this.castType(b);
        return a == b;
    }

    /**
     * 
     * @param {number} a 
     * @param {number} b 
     * @returns {boolean}
     */
    less(a, b) {
        a = this.getVariable(a).value;
        b = this.castType(b);
        return a < b;
    }

    /**
     * 
     * @param {number} a 
     * @param {number} b 
     * @returns {boolean}
     */
    greater(a, b) {
        a = this.getVariable(a).value;
        b = this.castType(b);
        return a > b;
    }

    /**
     * Adds a variable to the memory
     * 
     * @param {string} name 
     * @param {any} value 
     * @param {string} type 
     */
    addVariable(name, value, type) {
        switch(type) {
            case "int":
                this.variables[name] = {
                    value: parseInt(value),
                    type: "int"
                }
                break;
            case "float":
                this.variables[name] =  {
                    value: parseFloat(value),
                    type: "float"
                }
                break;
            case "string":
                this.variables[name] = {
                    value: value,
                    type: "string"
                }
                break;
            case "bool":
                this.variables[name] = {
                    value: value === "true",
                    type: "bool"
                }
                break;
            default:
                this.variables[name] = value;
        }
    }

    /**
     * Automatically types a variable and adds it to the memory
     * 
     * @param {string} name 
     * @param {any} value 
     */
    autoTypeVariable(name, value) {
        if(value === "true" || value === "false") {
            this.addVariable(name, value, "bool");
        } else if(!isNaN(value)){
            if(value.includes(".")) {
                this.addVariable(name, value, "float");
            } else {
                this.addVariable(name, value, "int");
            }
        } else {
            if(value.startsWith('"') && value.endsWith('"')) {
                this.addVariable(name, value, "string");
            }
        }
    }

    /**
     * Defines a function in the memory
     * 
     * @param {string} name 
     * @param {Array} args 
     * @param {Array} body 
     */
    defineFunction(name, args, body) {
        this.functions[name] = {
            args: args,
            body: body
        }
    }

    /**
     * 
     * @param {any} value 
     * @returns {any}
     */
    castType(value) {
        if(isNaN(value)) {
            try {
                value = this.getVariable(value).value
            } catch(err) {
                ErrorHandler.handleError("Cannot find variable " + value)
            }
        } else {
            if(value.includes(".")) {
                value = parseFloat(value);
            } else {
                value = parseInt(value);
            }
        }
        return value;
    }

}

export default Memory;