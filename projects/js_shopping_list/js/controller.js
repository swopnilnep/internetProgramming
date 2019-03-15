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
    shoppingModel.clearlist()
    myDB.clear_data();
    // clear local storage
}


function save_list() {
    // TODO: Save the list to local storage
    myDB.saveList(shoppingModel);
}


function populate_list() {
    shoppingModel.update(); // add the table in the beginnign
    // TODO: Read list from the local storage and add items to the model
    let oldItems = myDB.retrieveList();
    for (let item of oldItems){
        let name = item["_name"];
        let quantity = item["_quantity"];
        let price = item["_price"];
        let section = item["_section"];
        let store = item["_store"];
        let newItem = new Item(name, quantity, price, store, section);
        shoppingModel.add(newItem);
    }
}


function add_item() {
    // TODO: Collect values from HTML input fields, create a new Item, and add it to the model
    if (!document.querySelector("#newItemForm").checkValidity()) {
        return;
    } // do nothing if all the items are not added

    let name = document.querySelector("#inputName").value;
    let quantity = document.querySelector("#selectQuantity").selectedOptions[0].value;
    let price = document.querySelector("#inputPrice").value;
    let store = document.querySelector("#selectStore").selectedOptions[0].value;
    let section = document.querySelector("#selectSection").selectedOptions[0].value;
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
    console.log("window loaded");
    populateSelect("selectQuantity", quantities);
    populateSelect("selectStore", stores);
    populateSelect("selectSection", sections);
    populate_list();
};
