/* jshint esversion: 6 */
/* jshint node: true */
'use strict';

var stores = ["Ace Hardware", "Caseys", "Fareway", "Hatchery", "Walmart"];
var sections = ["Canned Goods", "Cereal", "Clothing", "Dairy", "Frozen Foods", "Liquor", "Meats", "Produce", "Tools"];
var quantities = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 100];

var shoppingModel = new ShoppingList();
var shoppingView = new ShoppingView(shoppingModel);
var myDB = new LocalStorageSaver();



function clean_list() {
    // TODO: Remove all purchased items from the list and save it
    shoppingModel.cleanlist();
}


function empty_list() {
    // TODO: Remove all items from the list and local storage
    shoppingModel.cleanlist();
    // clear local storage
}


function save_list() {
    // TODO: Save the list to local storage
    return;
}


function populate_list() {
    // TODO: Read list from the local storage and add items to the model
    return;
}


function add_item() {
    // TODO: Collect values from HTML input fields, create a new Item, and add it to the model
    if (!document.querySelector("#newItemForm").checkValidity()) {
        return;
    } // do nothing if all the items are not added

    let name = document.querySelector("#inputName");
    let quantity = document.querySelector("#selectQuantity");
    let price = document.querySelector("#inputPrice")
    let store = document.querySelector("#selectStore");
    let section = document.querySelector("#selectSection");
    let newItem = new Item(name, quantity, price, store, section);

    shoppingModel.add(newItem);
}


function populateSelect(selectId, sList) {
    let sel = document.getElementById(selectId, sList);
    for (let s of sList) {
        let opt = document.createElement("option");
        opt.value = s;
        opt.innerHTML = s;
        sel.appendChild(opt);
    }
}


window.onload = function () {
    console.log("this is working");
    populateSelect("selectQuantity", quantities);
    populateSelect("selectStore", stores);
    populateSelect("selectSection", sections);
    // populate_list();
};
