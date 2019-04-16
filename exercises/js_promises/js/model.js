/* jshint esversion: 6 */
/* jshint node: true */
'use strict';

class Number{
    constructor(value, text){
        this._value = value;
        this._text = text;
    }

    get value(){
        return this._value;
    }

    get text(){
        return this._text;
    }
}

class NumberList{
    constructor(){
        this._numbers = [];
    }

    get numbers(){
        return this._numbers;
    }

    append(newNumber){
        this._numbers.push(newNumber);
    }

    clear(){
        this._numbers = [];
    }

}