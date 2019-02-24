// Author: Swopnil N. Shrestha
// Class: CS330
// Instructor: Dr. Roman Yasinovskyy
// Date: 24/02/2019

"use strict";

var screen;
var buttons;
var document;

function enterDigit(digit) {
}

function clearScreen() {
}

function evalExpr() {
}

function enterOp(operation) {
}

$(document).ready(function () {
    screen = document.querySelector("#res");
    screen.innerHTML = "All Working!";

    var buttons = document.querySelector("#btns");
    buttons.innerHTML = "Here are the buttons!";

    // Clear the screen
    let bClear = document.createElement("button");
    bClear.innerHTML = "C";
    bClear.onclick = clearScreen;
    buttons.appendChild(bClear);

    // Numbers
    let b0 = document.createElement("button");
    bClear.innerHTML = "0";
    bClear.onclick = enterDigit(0);
    buttons.appendChild(b0);

    let b1 = document.createElement("button");
    bClear.innerHTML = "1";
    bClear.onclick = enterDigit(1);
    buttons.appendChild(b1);

    let b2 = document.createElement("button");
    bClear.innerHTML = "2";
    bClear.onclick = enterDigit(2);
    buttons.appendChild(b2);

    let b3 = document.createElement("button");
    bClear.innerHTML = "3";
    bClear.onclick = enterDigit(3);
    buttons.appendChild(b3);

    let b4 = document.createElement("button");
    bClear.innerHTML = "4";
    bClear.onclick = enterDigit(4);
    buttons.appendChild(b4);

    let b5 = document.createElement("button");
    bClear.innerHTML = "5";
    bClear.onclick = enterDigit(5);
    buttons.appendChild(b5);

    let b6 = document.createElement("button");
    bClear.innerHTML = "6";
    bClear.onclick = enterDigit(6);
    buttons.appendChild(b6);

    let b7 = document.createElement("button");
    bClear.innerHTML = "7";
    bClear.onclick = enterDigit(7);
    buttons.appendChild(b7);

    let b8 = document.createElement("button");
    bClear.innerHTML = "8";
    bClear.onclick = enterDigit(8);
    buttons.appendChild(b8);

    let b9 = document.createElement("button");
    bClear.innerHTML = "9";
    bClear.onclick = enterDigit(9);
    buttons.appendChild(b9);


    // Operators


});