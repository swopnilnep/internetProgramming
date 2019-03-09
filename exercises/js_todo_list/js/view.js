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
    updateTaskContainerHead("ongoingTasksContainer");
    updateTaskContainerHead("completedTasksContainer");
};

// function updateDocumentTableBody(tableId, tdl){
//     let tblBody = document.getElementById(tableId);
//     tblBody.innerHTML="";
//     let allTaskIds = tdl.getAllTaskIds();
//     for (let taskId of allTaskIds){
//         let tblBodyRow = document.createElement('tr');
//         let task = tdl.getTaskById(taskId);
//         // Add task elements
//         tblBodyRow.appendChild(document.createElement("td").appendChild(document.createTextNode(task.name)));
//         tblBodyRow.appendChild(document.createElement("td").appendChild(document.createTextNode(task.assigned)));
//         tblBodyRow.appendChild(document.createElement("td").appendChild(document.createTextNode(task.priority)));
//         tblBodyRow.appendChild(document.createElement("td").appendChild(document.createTextNode(task.dueDate)));
//         tblBodyRow.appendChild(document.createElement("td").appendChild(document.createTextNode(taskId)));
//         // add the row to the table body
//         tblBody.appendChild(tblBodyRow);
//     }
// }

// Update the table once the task(s) are added
function updateDocumentTableHead(tableId) {
    let tblHead = document.getElementById(tableId);
    // Take the row headings and make an HTML table out of them
    let tblRowHeadings = ['Task Name','Assigned To','Priority','Due Date',''];
    let tblHeadRow = document.createElement("tr");
    for (let heading of tblRowHeadings){
        let tblHeadCell = document.createElement("th");
        let cellText = document.createTextNode(heading);
        tblHeadCell.appendChild(cellText);
        tblHeadRow.appendChild(tblHeadCell);
    }
    tblHead.appendChild(tblHeadRow);
}

// Update the bootstrap grid once the tasks are added
function updateTaskContainerHead(containerId){
    let containerHead = document.getElementById(containerId);
    containerHead.innerHTML="";
    // Take the row headings and make an HTML container out of them
    let tblRowHeadings = ['Task Name','Assigned To','Priority','Due Date'];
    let tblHeadRow = document.createElement("div");
    tblHeadRow.className="row";
    for (let heading of tblRowHeadings){
        let tblHeadCell = document.createElement("div");
        tblHeadCell.className="col";
        let cellText = document.createTextNode(heading);
        tblHeadCell.appendChild(cellText);
        tblHeadRow.appendChild(tblHeadCell);
    }
    containerHead.appendChild(tblHeadRow);
}