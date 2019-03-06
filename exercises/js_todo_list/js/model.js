/* jshint esversion: 6 */
/* jshint node: true */
/* jshint browser: true */
'use strict';
class Task {
    constructor(task, assignee, priority, date) {
        this.task = task;
        this.assignee = assignee;
        this.priority = priority;
        this.date = date;
        this._done = false;
    }

    get purchased() {
        return this._done;
    }

    set purchased(newValue) {
        this._done = newValue;
    }
}

// AbstractList class contains basic list functionality implements as a list datatype
// Add or remove items from the list
class AbstractList {
    constructor() {
        this.listItems = [];
    }

    addToList(newItem) {
        this.listItems.push(newItem);
    }

    removeFromList(oldItem) {
        // Filter is like using lambda functions in Python
        // 'Unsubscribes' to the item specified
        this.listItems = this.listItems.filter(
            function (task) {
                if (task !== oldItem) {
                    return task;
                }
            }
        );
    }

    publish(msg, someobj) {
        var scope = someobj || window;
        for (let fn of this.listItems) {
            fn(scope, msg)
        }
    }
}
class TaskList extends AbstractList {
    // gets the basic List structure implementation from the AbstractList
    constructor() {
        super();
        this.newItems = [];
        this.oldItems = [];
    }

    addTask(task) {
        this.newItems.push(task);
        this.publish('newtask', this);
    }

    update() {
        this.publish('', this);
    }

    emptyList() {
        this.newItems = [];
        this.oldItems = [];
    }

    cleanList() {

    }
}