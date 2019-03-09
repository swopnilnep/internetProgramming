/* jshint esversion: 6 */
/* jshint browser:true */
/* jshint node:true */
"use strict";

var assignedToOptions = ["Charles Dickens", "Nikolai Gogol", "Jhumpa Lahiri",
"Alduous Huxley", "Carl Jung", "Steven Pinker", "Mihaly Csikszentmihalyi"];
var priorityOptions = ["Top","High","Medium","Low"];

// Populate a form select option based on an input array
function populateSelectOption(elementId, optionsArray) {
    let menu = document.querySelector(elementId);
    for (let artist of optionsArray) {
        let newOption = document.createElement("option");
        newOption.setAttribute("value", artist);
        newOption.innerHTML = artist;
        menu.appendChild(newOption);
    }
}

// When the window finishes loading..
window.onload = function() {
    populateSelectOption("#selectAssignedTo", assignedToOptions);
    populateSelectOption("#selectPriority", priorityOptions);
    updateTaskContainerHead("ongoingTasksContainerHead");
    updateTaskContainerHead("completedTasksContainerHead");
};

// Updates the table everytime a change is made (okay for smaller todolist data)
function updateDocumentContainerBody(tableId, tdl){
    // What happens if either type of list is pressed
    if (tdl.type === "ongoing") {
        var interactiveCharacter = "✓";
        var onclickFunctionCall = "sendToComplete";
    }
    else if (tdl.type === "complete") {
        var interactiveCharacter = "X";
        var onclickFunctionCall = "removeFromList";
    }
    // Adding the table body elements
    let tblBody = document.getElementById(tableId);
    tblBody.innerHTML = "";
    let tblBodyRow = document.createElement("div");
    tblBodyRow.className="row table-row";
    let allTaskIds = tdl.getAllTaskIds();
    for (let taskId of allTaskIds){
        // Add elements into task one by one
        let task=tdl.getTaskById(taskId);
        // Task name
        let taskName = document.createElement("div");
        taskName.className="col-4 table-cell";
        taskName.appendChild(document.createTextNode(task.name));
        tblBodyRow.appendChild(taskName);
        // Assigned To
        let assignedTo = document.createElement("div");
        assignedTo.className="col-3 table-cell";
        assignedTo.appendChild(document.createTextNode(task.assigned));
        tblBodyRow.appendChild(assignedTo);
        // Priority
        let priority = document.createElement("div");
        priority.className="col-2 table-cell";
        priority.appendChild(document.createTextNode(task.priority));
        tblBodyRow.appendChild(priority);
        // Due Date
        let dueDate = document.createElement("div");
        dueDate.className="col-2 table-cell";
        dueDate.appendChild(document.createTextNode(task.dueDate));
        tblBodyRow.appendChild(dueDate);
        // Remove or Add Function
        let done = document.createElement("div");
        done.className="col-1 table-cell";
        let btn = document.createElement("button");
        btn.className = onclickFunctionCall == "sendToComplete"?  "btn btn-light" : "btn btn-danger";
        btn.appendChild(document.createTextNode(interactiveCharacter));
        btn.onclick = function(){toggleTask(onclickFunctionCall, taskId);}
        done.appendChild(btn);
        tblBodyRow.appendChild(done);
    }
    tblBody.appendChild(tblBodyRow);
}

// Update the bootstrap grid once the tasks are added
function updateTaskContainerHead(containerId){
    let containerHead = document.getElementById(containerId);
    containerHead.innerHTML="";
    // Take the row headings and make an HTML container out of them
    let tblRowHeadings = {'Task Name':4,'Assigned To':3,'Priority':2,'Due Date':2,'':1};
    let tblHeadRow = document.createElement("div");
    // Make a new row
    tblHeadRow.className="row";
    for (let heading of Object.keys(tblRowHeadings)){
        let tblHeadCell = document.createElement("div");
        tblHeadCell.className=`col-${tblRowHeadings[heading]} table-cell-heading`;
        let cellText = document.createTextNode(heading);
        tblHeadCell.appendChild(cellText);
        tblHeadRow.appendChild(tblHeadCell);
    }
    containerHead.appendChild(tblHeadRow);
}