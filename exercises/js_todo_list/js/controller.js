/* jshint esversion: 6 */
/* jshint browser:true */
/* jshint node:true */
"use strict";

var ourColumnIds = ['inputTaskName', 'selectAssignedTo', 'selectPriority', 'inputDueDate'];
var ongoingTodoList = new TodoList();
var completedTodoList = new TodoList();

// when 'add Task' button is clicked
function clickAddTask(){
    if (document.getElementById('inputTaskName').value !== "" && document.getElementById('inputDueDate').value !== ""){
        addTaskToList();
        // Update table to include new task
        updateDocumentTableBody("ongoingTasksTableBody", ongoingTodoList);
    } else {
        console.log("Validation error");
    }
}

// Grabs each task from form input and adds a new task in the TaskList
function addTaskToList() {
    let currentTask = {};
    for (let columndId of ourColumnIds) currentTask[columndId] = document.getElementById(columndId).value;
    let myTask = new Task(currentTask.inputTaskName, currentTask.selectAssignedTo, 
    currentTask.selectPriority, currentTask.inputDueDate);
    ongoingTodoList.addTask(myTask); // adding to todoList after parsing Task
}