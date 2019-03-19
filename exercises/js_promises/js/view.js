/* jshint esversion: 6 */
/* jshint browser:true */
/* jshint node:true */
'use strict';

class NumberView {
    constructor(myNumberList){
        this.numberList = myNumberList;
    }

    updateView(){

        let myContainer = document.querySelector("#number-container");
        myContainer.innerHTML = "";

        let tblBodyRow = document.createElement("div");
        tblBodyRow.className = "row";

        for (let currentNumber of this.numberList.numbers){

            let numberDiv = document.createElement("div");
            numberDiv.className = "col-4";

            console.log(`Add ${currentNumber.value} to display`);

            let numberValue = document.createElement("h3");
            numberValue.className = "number-value-display";
            numberValue.appendChild(document.createTextNode(currentNumber.value));

            let numberText = document.createElement("div");
            numberText.className = "number-text-display";
            numberText.appendChild(document.createTextNode(currentNumber.text));

            numberDiv.appendChild(numberValue);
            numberDiv.appendChild(numberText);
            tblBodyRow.appendChild(numberDiv);
        }

        myContainer.appendChild(tblBodyRow);
    }

}