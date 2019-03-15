/* jshint esversion: 6 */
/* jshint node: true */
'use strict';


class ShoppingView {
    constructor(model) {
        // The bind() method creates a new function that, when called, has its this keyword set to the provided value.
        model.subscribe(this.redrawList.bind(this));
    }

    redrawList(shoppingList, msg) {
        // TODO: Redraw the table, include all the items from the model
        console.log(msg);
        let viewDiv = document.querySelector("#viewDiv");
        let tbl = viewDiv.querySelector("table");
        if (!tbl) {
            tbl = document.createElement("table");
            tbl.setAttribute("id", "viewTable");
            viewDiv.appendChild(tbl);
        }

        tbl.innerHTML="";
        for (let shopItem of shoppingList){
            this.addRow(shopItem, tbl);
        }
    }

    addRow(item, parent) {
        // TODO: Add a row with item description to the table
        let row = document.createElement("tr");
        let cb = document.createElement("input");
        cb.type="checkbox";

        cb.onclick = function(){
            item.removed = !item.removed;
        };

        let cbCell = document.createElement("td");
        cbCell.appendChild(cb);
        row.appendChild(cbCell);

        for (let val of ["name", "quantity", "price", "store", "section"]) {
            let td = document.createElement("td");
            td.innerText = item[val];
            row.appendChild(td);
        }

        parent.appendChild(row);
    }
}
