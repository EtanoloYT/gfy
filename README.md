# GFY

GFY (can't say what the acronym means) is a simple interpreted language designed for basic scripting tasks. It provides basic functionality for variable manipulation, conditional statements, and control flow.

## Installation

To use GFY, you need to have Node.js installed on your system. You can install GFY by cloning this repository:

```bash
git clone https://github.com/EtanoloYT/gfy.git
cd gfy
```

Then, install the required npm packages:

```bash
npm install
```

## Usage

Once installed, you can use GFY to interpret and execute scripts written in its syntax. To execute a GFY script, use the following command:

```bash
node . <filename>
```

Replace `<filename>` with the path to your GFY script.

### Syntax

GFY supports the following syntax:

#### Variables

- `set <variable> <value>`: Assigns a value to a variable.
- `print <variable>`: Prints the value of a variable.

#### Arithmetic Operations

- `add <variable> <value>`: Adds a value to a variable.
- `sub <variable> <value>`: Subtracts a value from a variable.
- `mul <variable> <value>`: Multiplies a variable by a value.
- `div <variable> <value>`: Divides a variable by a value.
- `mod <variable> <value>`: Computes the modulus of a variable with a value.

#### Control Flow

- `goto <marker>`: Jumps to a specified marker in the script.
- `equals <variable> <value> <gotoTrue> <gotoFalse>`: Checks if a variable equals a value and jumps accordingly.
- `greater <variable> <value> <gotoTrue> <gotoFalse>`: Checks if a variable is greater than a value and jumps accordingly.
- `section <marker>:`: Defines a marker in the script.

#### Other

- `change <line_number> <new_line>`: Changes a line of the script.
- `dump`: Prints the current state of variables.

### Example

Here's an example of a simple GFY script:

```plaintext
set x 10
set y 5
add x y
print x

// x is now 15
```

This script sets variables `x` and `y` to 10 and 5 respectively, adds them together and prints the new value of `x`.

## Supported Extensions

GFY supports the following file extensions:

- `.docx`: Microsoft Word documents (parses and executes)
- `.gfy`: GFY script files
