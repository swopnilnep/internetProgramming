// Author: Swopnil N. Shrestha
// Date: 12/02/2019
// Class: CS330

/* jshint esversion: 6 */
/* jshint node: true */

'use strict';

function isPrime(n){
    // best case: o(1)
    // average case: o(n)/2
    // worst case: o(n)

    let prime = true; // algorithm assumes it is a prime number, and tries to disprove it
    if (n == 0 | n == 1){
        prime = false;
    } 
    else {
        for (let i=2; i<n; i++){
            if (n % i === 0){
                prime = false;
                break; // use a break to stop the loop once a prime number is found
            }
        }
    }
    return prime;
}

function getNPrimes(n){
    // best case: o(n)
    // average case: o(n^2)/2
    // worst case: o(n^2)
    let primes = [];
    let currentNumber = 2;
    while (primes.length < n){
        currentNumber ++;
        if (isPrime(currentNumber)){
            primes.push(currentNumber);
        }
    }
    return primes;
}

function printNPrimes(n){
    document.writeln(`<div style="font-family:auto; font-size:20pt; color:blue;">${getNPrimes(n)}</div>`);
}

function greet(name){
    document.write(`<p style="color:red; font-size:50pt; font-family:auto;">Hello, ${name}!</p>`)
}

function main(){
    // url-example: http://localhost:8000/hello.html?name=Roman&n=4
    
    let params = new URLSearchParams(document.location.search.substring(1));
    let name = params.get("name"); // monty
    let number = params.get("n"); // 4

    greet(name);
    printNPrimes(number);
}

main();