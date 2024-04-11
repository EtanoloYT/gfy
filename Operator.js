class Operator {

    /**
     * Casts the value to the correct type
     * 
     * @param {any} value 
     * @param {Array} memory 
     * @returns {any}
     */
    static castType(value, memory) {
        if(isNaN(value)) {
            value = memory.getVariable(value).value;
        } else {
            if(value.includes(".")) {
                value = parseFloat(value);
            } else {
                value = parseInt(value);
            }
        }
        return value;
    }

    /**
     * 
     * @param {number} a 
     * @param {number} b 
     * @param {Array} memory 
     * @returns {string}
     */
    static add(a, b, memory) {
        a = memory.getVariable(a).value;
        b = this.castType(b, memory);
        return (a + b).toString();
    }

    /**
     * 
     * @param {number} a 
     * @param {number} b 
     * @param {Array} memory 
     * @returns {string}
     */
    static sub(a, b, memory) {
        a = memory.getVariable(a).value;
        b = this.castType(b, memory);
        return (a - b).toString();
    }

    /**
     * 
     * @param {number} a 
     * @param {number} b 
     * @param {Array} memory 
     * @returns {string}
     */
    static mul(a, b, memory) {
        a = memory.getVariable(a).value;
        b = this.castType(b, memory);
        return (a * b).toString();
    }

    /**
     * 
     * @param {number} a 
     * @param {number} b 
     * @param {Array} memory 
     * @returns {string}
     */
    static div(a, b, memory) {
        a = memory.getVariable(a).value;
        b = this.castType(b, memory);
        return (a / b).toString();
    }

    /**
     * 
     * @param {number} a 
     * @param {number} b 
     * @param {Array} memory 
     * @returns {string}
     */
    static mod(a, b, memory) {
        a = memory.getVariable(a).value;
        b = this.castType(b, memory);
        return (a % b).toString();
    }
}

export default Operator;