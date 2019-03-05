/* jshint esversion: 6 */
/* jshint node: true */
/* jshint browser: true */

"use strict";

var todoList = new TaskList;

function submit(){
    let name = document.querySelector("#taskNameValidation").value;
    let assignee = document.querySelector("#inlineFormSelectAssignee").selectedOptions[0].value;
    let priority = document.querySelector("#inlineFormSelectPriority").selectedOptions[0].value;
    let date = document.querySelector("#inlineFormSelectDueDate").value;

    let newTask = new Task(name, assignee, priority, date);

    todoList.add(newTask);
}