import fs from 'fs';

class Tokenizer {
    constructor() {
        this.tokens = [];
    }

    tokenize(input) {
        // Split the input into tokens using regex. Keep words between square brackets and double quotes together
        this.tokens = input.match(/"[^"]*"|\[[^\]]*\]|\S+/g);
    }

    getTokens() {
        return this.tokens;
    }

    sanitize() {
        let sanitized = [];
        for (let i = 0; i < this.tokens.length; i++) {
            if(this.tokens[i].startsWith('[') && this.tokens[i].endsWith(']')) {
                // Remove square brackets
                this.tokens[i] = this.tokens[i].slice(1, -1);
            }
            if (this.tokens[i] === '') {
                continue;
            } else {
                sanitized.push(this.tokens[i]);
            }
        }
        this.tokens = sanitized;
    }

    importModules() {
        this.tokens.forEach((token, index) => {
            if (token === '£import') {
                let module = this.tokens[index + 1];
                let file = fs.readFileSync(module + ".gfy", 'utf8');
                let moduleTokens = file.match(/"[^"]*"|\[[^\]]*\]|\S+/g);
                this.tokens.splice(index, 2);
                this.tokens = moduleTokens.concat(this.tokens);
                this.importModules();
            }
        });
    }

    groupFunctions(executor) {
        this.tokens.forEach((token, index) => {
            // if token is 'define' then group the next tokens until the next 'end'
            if (token === 'define') {
                let group = [];
                let i = index + 1;
                executor.addFunctionName(this.tokens[i]);
                while (this.tokens[i] !== 'end') {
                    group.push(this.tokens[i]);
                    i++;
                }
                this.tokens[index] = group;
                this.tokens.splice(index + 1, i - index);
            }
        });

        // Remove 'end' tokens
        //this.tokens = this.tokens.filter(token => token !== 'end');
    }

    
}

export default Tokenizer;