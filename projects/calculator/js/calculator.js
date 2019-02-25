// Author: Swopnil N. Shrestha
// Class: CS330
// Instructor: Dr. Roman Yasinovskyy
// Date: 24/02/

"use strict";

// Screen objects
var screen;
var operatorScreen;

// Calculator logic
var digits = ""; // The value on which to be operated on. Will be parsed as float in 'evalExpr()'
var operator = ""; // Current operator for doing calculations
var currentValue = 0.0; // Tracks the value for multiple calculations

function enterDigit(newDigit) {
    console.log("press " + newDigit);
    digits = digits + newDigit;
    screen.innerHTML = digits;
}

function clearScreen(){
    console.log("clear the screen")

    // reset variables
    currentValue = 0.0;
    digits = "";
    operator = "";

    // need to reset screens
}

function evalExpr(){
    let digitExists = digits !== ""; // parseFloat returns null value if digit does not exist
    let operatorExists = operator !== "";

    if (digitExists && !operatorExists){ // reset digits if no operator exists
        let number;
        number = parseFloat(digits);

        if (currentValue === 0){
            currentValue = number;
            digits = "";
        }

        // Operator does not exist but digit exists
        else {currentValue = 0.0;}
    } 

    else if (digitExists && operatorExists) {  // do calculations if operator also exsits
        // 0 + 2 = 0
        let number;
        number = parseFloat(digits);

        if (operator === "add"){currentValue += number;}
        else if (operator === "substract"){currentValue -= number;}
        else if (operator === "divide"){currentValue /= number;}
        else if (operator === "multiply"){currentValue *= number;}
        else if (operator === "modulus"){currentValue = currentValue % number;}

        // TODO
        // - show currentValue on the screen

        digits = "";
        operator = "";
    }

    else {
        console.log("either digit or operator does not exist");
    }
}