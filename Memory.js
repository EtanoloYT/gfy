class Memory {

    constructor() {
        this.variables = {};
        this.functions = {};
    }

    print(name) {
        console.log(this.variables[name].value);
    }

    getVariable(name) {
        return this.variables[name];
    }

    getVariables() {
        return this.variables;
    }

    getFunction(name) {
        return this.functions[name];
    }

    getFunctions() {
        return this.functions;
    }

    equals(a, b) {
        a = this.getVariable(a).value;
        b = this.castType(b);
        return a == b;
    }

    less(a, b) {
        a = this.getVariable(a).value;
        b = this.castType(b);
        return a < b;
    }

    greater(a, b) {
        a = this.getVariable(a).value;
        b = this.castType(b);
        return a > b;
    }

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
            this.addVariable(name, value, "string");
        }
    }

    defineFunction(name, args, body) {
        this.functions[name] = {
            args: args,
            body: body
        }
    }

    castType(value) {
        if(isNaN(value)) {
            value = this.getVariable(value).value;
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