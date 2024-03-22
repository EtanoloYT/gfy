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

- `equals <variable> <variable>:`: Checks if two variables are equal.
- `greater <variable> <variable>`: Checks if the first variable is greater than the second.
- `less <variable> <variable>`: Checks if the first variable is less than the second.
- `Example:`
  ```plaintext
  set x 10
  set y 5
  equals x y:
    print "x is equal to y"
  end
  ```

#### Function Definitions

- `define <name>(<parameters>):`: Defines a function with the given name and parameters.
- `end`: Ends the function definition.
- `<name> <arguments>`: Calls a function with the given name and arguments.
- `Callables: special functions that can be called as if they were variables. They can be defined using square brackets.`
- `Example:`
  ```plaintext
  define square(x):
    mul x x
  end

  set y 5
  square y
  print y
  ```

#### Modules

- `£import <folder>/<module>`: Imports a module.
- `Example:`
  ```plaintext
  £import Modules/std

  set i 0
  set stop 10

  for i stop [print i]
  ```



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

- `.gfy`: GFY script files
