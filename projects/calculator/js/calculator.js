// Author: Swopnil N. Shrestha
// Class: CS330
// Instructor: Dr. Roman Yasinovskyy
// Date: 24/02/

"use strict";
var screen;
var calcStream = "";
var streamHasDecimal = false; // check if there is a decimal point '.' in the stream

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
    screen.innerHTML = "Welcome to Calculator!"
    calcStream = "";
    updateScreen();
}

function updateScreen(){
    screen.innerHTML = calcStream;
}

function backSpace(){
    updateScreen();
}

function evalExpr(){
    
    let new_expr;
    let i;
    for (i = 0; i < calcStream.length; i++) {
        c = calcStream.charAt(i);
        if (c == "÷"){new_expr += "/";}
        else if (c == "×"){new_expr += "*";}
        else {new_expr += c;}
    } 

    calcStream = eval(new_expr);
    updateScreen;  
      
}

function addDecimalPoint(){
    
    console.log("press decimal point")
    let lastEnteredChar = calcStream.slice(-1);
    if (!streamHasDecimal){
        
        if (lastEnteredChar == 0 || ALL_OPERATORS.includes(lastEnteredChar)){
            calcStream += "0."
        } 
        else {calcStream += "."}
        streamHasDecimal = true;
    }

    updateScreen();
}

// Attach screens
$(document).ready(function () {
    screen = document.querySelector("#res");
    clearScreen();
});
