class Operator {

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

    static add(a, b, memory) {
        a = memory.getVariable(a).value;
        b = this.castType(b, memory);
        return (a + b).toString();
    }

    static sub(a, b, memory) {
        a = memory.getVariable(a).value;
        b = this.castType(b, memory);
        return (a - b).toString();
    }

    static mul(a, b, memory) {
        a = memory.getVariable(a).value;
        b = this.castType(b, memory);
        return (a * b).toString();
    }

    static div(a, b, memory) {
        a = memory.getVariable(a).value;
        b = this.castType(b, memory);
        return (a / b).toString();
    }

    static mod(a, b, memory) {
        a = memory.getVariable(a).value;
        b = this.castType(b, memory);
        return (a % b).toString();
    }
}

export default Operator;