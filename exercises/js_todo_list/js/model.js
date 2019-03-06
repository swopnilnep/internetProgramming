/* jshint esversion: 6 */
/* jshint node: true */
/* jshint browser: true */
'use strict';
class Item {
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

    set purchased(nv) {
        this._done = nv;
    }



}

class Subject {

    constructor() {
        this.handlers = []
    }

    subscribe(fn) {
        this.handlers.push(fn);
    }

    unsubscribe(fn) {
        this.handlers = this.handlers.filter(
            function (task) {
                if (task !== fn) {
                    return task;
                }
            }
        );
    }

    publish(msg, someobj) {
        var scope = someobj || window;
        for (let fn of this.handlers) {
            fn(scope, msg)
        }
    }
}


class ShoppingList extends Subject {
    constructor() {
        super()
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