/* jshint esversion: 6 */
/* jshint node: true */
/* jshint browser: true */

// Object Model of the JavaScript TodoList App

"use strict";
class TaskList {
    constructor(){
        this.myTasks = []; // listItems is a map of 'Task' objects
    }

    add(new_task){
        this.myTasks.push(new_task);
    }
    
}
class Task {
    constructor(name, assignedTo, priority, dueDate){
        this.myName = name;
        this.myAssignee = assignedTo;
        this.myPriority = priority;
        this.myDueDate = dueDate;
    }

    // Name Functions
    get name(){
        return this.myName;
    }
    set name(new_name){
        this.myName = new_name;
    }

    // Assignee Functions
    get assignee(){
        return this.myAssignee;
    }
    set assignee(new_assignee){
        this.myAssignee = new_assignee;
    }

    // Priority Functions
    get priority(){
        return this.priority;
    }
    set priority(new_priority){
        this.myPriority = new_priority;
    }

    // Due Date Functions
    get dueDate(){
        return this.myDueDate;
    }
    set dueDate(new_dueDate){
        this.myDueDate = new_dueDate;
    }
   
}