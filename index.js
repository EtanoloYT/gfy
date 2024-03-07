let fs = require('fs');
let officeParser = require('officeparser');

const memory = {};

const args = process.argv.slice(2);
const filename = args[0];

if (!filename) {
    console.error('Filename is required');
    process.exit(1);
}

const extensions = [
    'docx',
    'gfy'
]

const extension = filename.split('.').pop();

if (!extensions.includes(extension)) {
    console.error('Unknown extension: ' + extension);
    console.error('Supported extensions: ' + extensions.join(', '));
    process.exit(1);
}

let file;
let program;

// Parsing a docx file
if(extension === 'docx') {
    officeParser.parseOffice(filename, function(data, err) {
        if (err) {
            console.log(err);
            return;
        }
        file = data;
        console.log(file);
        program = file.split('\n');

        execProgram();

        // Renaming the file extension from docx to gfy
        fs.rename(filename, filename.replace('docx', 'gfy'), (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    })
}

// Parsing a gfy file
else if(extension === 'gfy') {
    file = fs.readFileSync(filename, 'utf8');
    program = file.split('\n');
    execProgram();
}

// Function to set a variable in memory
function setVar(name, value) {
    if(value.startsWith('"') && value.endsWith('"') || value.startsWith('\'') && value.endsWith('\'')) {
        memory[name] = value.slice(1, -1);
    } else {
        if(isNaN(value)) {
            memory[name] = memory[value];
        } else {
            memory[name] = parseInt(value);
        }
    }
}

// Function to print the values of variables
function printVars(names) {
    for (let i = 0; i < names.length; i++) {
        if(memory[names[i]] === undefined) {
            console.error('Undefined variable: ' + names[i]);
            process.exit(1);
        } else {
            console.log(memory[names[i]] + ' ');
        }
    }
}

// Function to add a value to a variable
function addVar(name, value) {
    if(isNaN(value)) {
        memory[name] += memory[value];
    } else {
        memory[name] += parseInt(value);
    }
}

// Function to subtract a value from a variable
function subVar(name, value) {
    if(isNaN(value)) {
        memory[name] -= memory[value];
    } else {
        memory[name] -= parseInt(value);
    }
}

// Function to multiply a variable by a value
function mulVar(name, value) {
    if(isNaN(value)) {
        memory[name] *= memory[value];
    } else {
        memory[name] *= parseInt(value);
    }
}

// Function to divide a variable by a value
function divVar(name, value) {
    if(isNaN(value)) {
        memory[name] /= memory[value];
    } else {
        memory[name] /= parseInt(value);
    }
}

// Function to calculate the modulus of a variable by a value
function modVar(name, value) {
    if(isNaN(value)) {
        memory[name] %= memory[value];
    } else {
        memory[name] %= parseInt(value);
    }
}

// Function to jump to a specific line in the program
function gotoLine(marker) {
    for (let i = 0; i < program.length; i++) {
        let section = program[i].split(' ')[0];
        if(section === 'section' && program[i].split(' ')[1] === marker + ':') {
            return i + 1;
        }
    }
    console.error('Unknown marker: ' + marker);
    process.exit(1);
}

// Function to compare if two values are equal and perform a jump based on the result
function equalsTo(name, value, gotoTrue, gotoFalse, index) {
    if(isNaN(value)) {
        if(memory[name] === memory[value]) {
            return gotoLine(gotoTrue);
        } else {
            if(gotoFalse != undefined) {
                return gotoLine(gotoFalse);
            } else {
                return index + 1;
            }
        }
    } else {
        if(memory[name] === parseInt(value)) {
            return gotoLine(gotoTrue);
        } else {
            if(gotoFalse != undefined) {
                return gotoLine(gotoFalse);
            } else {
                return index + 1;
            }
        }
    }
}

// Function to compare if a value is greater than another value and perform a jump based on the result
function greaterThan(name, value, gotoTrue, gotoFalse, index) {
    if(isNaN(value)) {
        if(memory[name] > memory[value]) {
            return gotoLine(gotoTrue);
        } else {
            if(gotoFalse != undefined) {
                return gotoLine(gotoFalse);
            }
            return index + 1;
        }
    } else {
        if(memory[name] > parseInt(value)) {
            return gotoLine(gotoTrue);
        } else {
            if(gotoFalse != undefined) {
                return gotoLine(gotoFalse);
            }
            return index + 1;
        }
    }
}

// Function to change a line in the program
function changeLine(newline, index) {
    program[index] = newline;
    fs.writeFile(filename, program.join('\n'), (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
}

// Function to dump the contents of memory
function memoryDump() {
    console.log(memory);
}

// Function to execute a single line of the program
function execLine(line, index) {
    let command = line.split(' ')[0];
    let args = line.split(' ').slice(1).map(arg => arg.trim());

    if(command === '' || command.startsWith('//')) return index + 1;

    switch (command) {
        case 'set':
            setVar(args[0], args[1]);
            break;
        case 'print':
            printVars(args);
            break;
        case 'add':
            addVar(args[0], args[1]);
            break;
        case 'sub':
            subVar(args[0], args[1]);
            break;
        case 'mul':
            mulVar(args[0], args[1]);
            break;
        case 'div':
            divVar(args[0], args[1]);
            break;
        case 'mod':
            modVar(args[0], args[1]);
            break;
        case 'goto':
            return gotoLine(args[0]);
        case 'equals':
            return equalsTo(args[0], args[1], args[2], args[3], index);
        case 'greater':
            return greaterThan(args[0], args[1], args[2], args[3], index);
        case 'section':
            break;
        case 'change':
            let newline = args.slice(1).join(' ');
            if(isNaN(args[0])) {
                changeLine(newline, memory[args[0]] - 1);
                return index + 1;
            } else {
                changeLine(newline, parseInt(args[0]) - 1);
                return index + 1;
            }
        case 'dump':
            memoryDump();
            break;
        default:
            console.error('Unknown command: ' + command);
            process.exit(1);
    }
    return index + 1;
}

// Function to execute the entire program
function execProgram() {
    let index = 0;
    while (index < program.length) {
        index = execLine(program[index], index);
    }
}