/* jshint esversion: 8 */
/* jshint node: true */
'use strict';

var numberModel = new NumberList;
var numberView = new NumberView(numberModel);

async function clickAddNumber(){
    // Do nothing if there is no input
    if (!document.querySelector("#inputNumber").checkValidity()) {
        console.log("No Input");
    }

    // Do nothing if not a number
    let initNumber = document.querySelector("#inputNumber").value;
    
    if (isNaN(initNumber)) {
        console.log("Not a number");
    } else {

        --initNumber;
        numberModel.clear();

        for (let i=0; i<3; ++i){
            let divNumber = initNumber + i;
            let divText = await getTextForNumber(divNumber);
            let numClass = new Number(divNumber, divText);
            numberModel.append(numClass);
        }

        numberView.updateView();
    }

}

async function getData(url){
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}

async function getTextForNumber(number){
    console.log("Loading...");
    let text = await Promise.all([getData("http://numbersapi.com/"+number+"?json")]);
    return text[0]["text"];
}

window.onload = function () {
    console.log("window loaded");
};
