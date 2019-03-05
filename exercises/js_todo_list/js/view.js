/* jshint esversion: 6 */
/* jshint node: true */
/* jshint browser: true */

"use strict";

var fieldAssignTo;
var fieldPriority;
var fieldDueDate;


var assigneeMembers = ["Charles Dickens","Nikolai Gogol","Jhumpa Lahiri",
                "Alduous Huxley","Carl Jung","Steven Pinker","Mihaly Csikszentmihalyi"];
var priorityMembers = ["Top","High","Medium","Low"];


function populateSelectOption(elementId, optionsArray) {
    let menu = document.querySelector(elementId);
    for (let artist of optionsArray) {
        let newOption = document.createElement("option");
        newOption.setAttribute("value", artist);
        newOption.innerHTML = artist;
        menu.appendChild(newOption);
    }
}


window.onload = function() {
    populateSelectOption("#inlineFormSelectAssignee", assigneeMembers);
    populateSelectOption("#inlineFormSelectPriority", priorityMembers);
};