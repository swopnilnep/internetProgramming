// Author: Swopnil N. Shrestha
// Class: CS330
// Instructor: Dr. Roman Yasinovskyy
// Date: 24/02/

"use strict";
var screen;
var calcStream = "";

const ALL_OPERATORS = ["+","%","×","÷","-"];
const MINUS = "-";
const NON_REPEATING_OPERATORS = ["+","%","×","÷"];

function enterDigit(newDigit){
    console.log("press " + newDigit);
    calcStream += newDigit;
    updateScreen();
}

function enterOp(newOperator){
    console.log("press " + newOperator);
    let lastEnteredChar = calcStream.slice(-1);

    let lastCharacterMinus = lastEnteredChar === MINUS && ALL_OPERATORS.includes(newOperator); // do nothing - AND +
    let conflictingOperators = NON_REPEATING_OPERATORS.includes(lastEnteredChar) && NON_REPEATING_OPERATORS.includes(newOperator); // replace last operator with new + AND %
    let repeatingMinus = lastEnteredChar === MINUS && newOperator === MINUS; // do nothing
    let firstCharOperatorExceptMinus = lastEnteredChar === "" && newOperator !== MINUS;

    if (conflictingOperators){
        // this expression if true if
        // the newly entered operator AND the last entered character are in the list of non repeating operators
        // or, the newly entered operator is a minus and the last entered operator is character is also a minus
        // purpose: this prevents the repetition of operators in the stream so that the answer is not syntactically incorrect. 
        // function: this replaces the last entered character (if the condition match) with the new operator.
        calcStream = calcStream.substring(0,calcStream.length-1)+newOperator;
    } else if (repeatingMinus || lastCharacterMinus || firstCharOperatorExceptMinus) {
        // do nothing
        return;
    }
    else{
        // add the new operator at the end of calcstream
        calcStream += newOperator;
    }
    updateScreen();
}

function clearScreen(){
    screen.innerHTML
}

function updateScreen(){
    screen.innerHTML = calcStream;
}

function backSpace(){
    calcStream = calcStream.substring(0,calcStream.length-1);
    updateScreen();
}

// Attach screens
$(document).ready(function () {
    screen = document.querySelector("#res");
    screen.innerHTML = "Welcome to Calculator!";
});
