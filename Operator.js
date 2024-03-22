class Operator {

    static checkType(name, value, memory) {
        if(!isNaN(name)) {
            console.error('Variable name cannot be a number');
            return false;
        } else {
            if(!isNaN(value)) {
                return true;
            } else {
                if(memory.memory[name].type == 'string' || memory.memory[value].type == 'string') {
                    console.error('Cannot perform operations on strings');
                    return false;
                }
                if(memory.memory[name].type == memory.memory[value].type || memory.memory[name].type == 'variable' || memory.memory[value].type == 'variable') {
                    return true;
                } else {
                    console.error('Type mismatch: ' + memory.memory[name].type + ' and ' + memory.memory[value].type);
                    return false;
                }
            }
        }
    }

    static addVar(name, value, memory) {
        if(this.checkType(name, value, memory)) {
            if(isNaN(value)) {
                memory.setMemory(name, memory.memory[name].value + memory.memory[value].value);
            } else {
                memory.setMemory(name, memory.memory[name].value + parseFloat(value));
            }
        }
    }

    static subVar(name, value, memory) {
        if(this.checkType(name, value, memory)) {
            if(isNaN(value)) {
                memory.setMemory(name, memory.memory[name].value - memory.memory[value].value);
            } else {
                memory.setMemory(name, memory.memory[name].value - parseFloat(value));
            }
        }
    }

    static mulVar(name, value, memory) {
        if(this.checkType(name, value, memory)) {
            if(isNaN(value)) {
                memory.setMemory(name, memory.memory[name].value * memory.memory[value].value);
            } else {
                memory.setMemory(name, memory.memory[name].value * parseFloat(value));
            }
        }
    }

    static divVar(name, value, memory) {
        if(this.checkType(name, value, memory)) {
            if(isNaN(value)) {
                memory.setMemory(name, memory.memory[name].value / memory.memory[value].value);
            } else {
                memory.setMemory(name, memory.memory[name].value / parseFloat(value));
            }
        }
    }

    static modVar(name, value, memory) {
        if(this.checkType(name, value, memory)) {
            if(isNaN(value)) {
                memory.setMemory(name, memory.memory[name].value % memory.memory[value].value);
            } else {
                memory.setMemory(name, memory.memory[name].value % parseFloat(value));
            }
        }
    }

}

export default Operator;