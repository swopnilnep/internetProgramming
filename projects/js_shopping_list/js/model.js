/* jshint esversion: 6 */
/* jshint node: true */
'use strict';

class Item {
    // This class includes everything that need to go on each row of the list.
    constructor(name, store, section, quantity) {
        this._name = name;
        this._store = store;
        this._section = section;
        this._quantity = quantity;
        this._removed = false;
    }

    get name() {
        return this._name;
    }

    get store() {
        return this._store;
    }

    get section() {
        return this._section;
    }

    get quantity() {
        return this._quantity;
    }

    get removed() {
        return this._removed;
    }

    set removed(newBoolean) {
        this._removed = newBoolean;
    }
}


class Subject {
    constructor() {
        this.handlers = [];
    }

    subscribe(fn) {
        this.handlers.push(fn);
    }

    unsubscribe(fn) {
        this.handlers = this.handlers.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    }

    publish(msg, someObj) {
        var scope = someObj || window;  // equals someObj when it exists, otherwise window
        for (let fn of this.handlers) {
            fn(scope, msg);
        }
    }
}


class ShoppingList extends Subject {
    constructor() {
        super();
        this.allItems = [];
    }

    add(shopItem) {
        this.allItems.push(shopItem);
        this.publish("New item is added", this);
    }

    cleanlist() {
        // filters all items to only include items where removed is false
        this.allItems = this.allItems.filter(shopItem => !shopItem.removed);
        this.publish("The list is cleaned up", this);
    }

    get size() {
        return this.allItems.length;
    }

    // iterator
    [Symbol.iterator]() {
        var idx = -1;
        return {
            next: () => ({value: this.allItems[++idx], done: !(idx in this.allItems)})
        };
    }

}


class LocalStorageSaver {
    // TODO: Implement the class
}
