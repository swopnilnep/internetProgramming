// Author: Swopnil N. Shrestha
// Class: CS330
// Instructor: Dr. Roman Yasinovskyy
// Date: 24/02/2019

"use strict";

// Screen objects
var screen;
var operatorScreen;

// Calculator logic
var operand = ""; // The value on which to be operated on. Will be parsed as float in 'evalExpr()'
var operator = ""; // Current operator for doing calculations
var currentValue = 0.0; // Tracks the value for multiple calculations

// Syntatic logic
var decimalPressed = false; // tracks if decimal is pressed

function enterDigit(digit) {
    console.log("press " + digit);
    operand = operand + digit;
    screen.innerHTML = operand;
}

function clearScreen() {
    console.log("clear the screen");
    
    // reset variables
    currentValue = 0.0;
    operand = "";
    operator = "";
    
    // reset screens
    screen.innerHTML = currentValue;
    operatorScreen.innerHTML = operator;
}

// TODO
function backSpace() {
    let len;
    console.log("delete last character");
    len = operand.length-1;
    operand = operand.length === 1 ? "0" : operand.substring(0,len);
    screen.innerHTML = operand;
    console.log(operand);
}

function evalExpr() {
    console.log("evaluate expression");
    
    if (operand != ""){ // only runs if the operand exists
        let number;
        number = parseFloat(operand);

        if (currentValue === 0.0){
            currentValue = number;
            console.log("reset current value");
        }
        
        else if (operator === ""){console.log("no operator eval");}
        else if (operator === "add"){currentValue += number;}
        else if (operator === "substract"){currentValue -= number;}
        else if (operator === "div`ide"){currentValue /= number;}
        else if (operator === "multiply"){currentValue *= number;}
        else if (operator === "modulus"){currentValue = currentValue % number;}

        operand = "";
        operator = "";

        screen.innerHTML = currentValue;
    }
}

function enterOp(newOperator) {
    evalExpr; 
    // If operator is already entered, program will automatically evaluate the operator
    // If no operator is entered, the program will not do anything (except print to the console)
    
    operator = newOperator;
    operatorScreen.innerHTML = operator;
    console.log("press " + operator);
}

// 0 already
// - 2
// + 3
// * 10


$(document).ready(function () {
    screen = document.querySelector("#res");
    screen.innerHTML = currentValue;

    operatorScreen = document.querySelector("#oper");

});
