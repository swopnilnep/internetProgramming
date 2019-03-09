/* jshint esversion: 6 */
/* jshint browser:true */
/* jshint node:true */
"use strict";

class TodoList {
    constructor(typeOfTable){
        this.type = typeOfTable;
        this.taskMap = {};  // Contains taskId as a key and the Task object as its value
        this.nextTaskId = 0;
    }
    addTask(newTask){
        console.log("add task");
        this.taskMap[this.nextTaskId] = newTask;
        ++this.nextTaskId;
    }
    removeTask(oldTaskId){
        console.log("remove task");
        delete this.taskMap[oldTaskId];  // Remove the task from the dictionary by taskId
    }
    getTaskById(taskId){
        console.log("get task from id");
        return this.taskMap[taskId];
    }
    getAllTaskIds(){
        return Object.keys(this.taskMap);
    }
}

class Task {
    constructor(myName, myAssignedTo, myPriority, myDueDate){
        this.name = myName;
        this.assigned = myAssignedTo;
        this.priority = myPriority;
        this.dueDate = myDueDate;
    }
}