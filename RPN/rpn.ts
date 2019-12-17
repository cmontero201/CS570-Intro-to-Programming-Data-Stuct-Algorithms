/*
Created by Christian Montero
October 8, 2018
Last Edited:  October 10, 2018
Assignment 2: Reverse Polish Notation Calculator
This script takes in a infix expression (string), converts it to postfix expression, outputs
the converted postfix expression, and calcultes then displays the result.
*/

import * as readline from 'readline';

// Implements Stack Class From Lecture Notes
class Stack <T> {
    private arr: T[];

    constructor(arr?: T[]) {
        this.arr = arr || [];
    }

    public push(value: T) {
        this.arr.push(value);
    }

    public pop(): T {
        return this.arr.pop();
    }

    public isEmpty() {
        return this.arr.length === 0;
    }

    public top() {
        return this.arr[this.arr.length - 1]
    }

    public peek(): T {
        return this.arr[this.arr.length - 1];
    }

    public get length() {
        return this.arr.length;
    }

    public clear() {
        this.arr = [];
    }
}
// Implements Queue Class From Lecture Notes
class Queue <T> {
    private arr: T[];

    constructor(arr?: T[]) {
        this.arr = arr || [];
    }

    public enqueue(value: T) {
        this.arr.push(value);
    }

    public dequeue(): T {
        return this.arr.shift();
    }

    public front(): T {
        return this.arr[0];
    }

    public isEmpty() {
        return this.arr.length === 0;
    }

    public peek(): T {
        return this.arr[this.arr.length - 1];
    }

    public get length() {
        return this.arr.length;
    }

    public clear() {
        this.arr = [];
    }
}

var postQ = new Queue(); //contains the converted postfix expression to be evaluated
var postQ2 = new Queue(); // contains the converted postfix expression
var infixQ = new Queue(); // contains the infix expression to be converted
var opStack = new Stack(); // contains operators 
var evalStack = new Stack(); // contains numbers that will be evaulated

initCalc();

// Ask user to input an infix expression
function initCalc() {
    var rl = readline.createInterface(process.stdin, process.stdout);

    rl.question('Please enter an infix expression\n>>> ', (input) => {
        rl.close();
        
        input.replace(/ /g,'') //makes lowercase & removes all white spaces in expression
        
        if (input === '') {
            initCalc();
        }
        else if (input === 'q' || input === 'quit') {
            console.log('\nOkay ... closing the Reverse Polish Notation Calculator.\n\nGoodbye!\n\n')
            process.exit(1);
        }
        else {
            console.log(input);
            var bool = check(input);
            if (bool === false) {
                initCalc();
            }
            else {
                console.log('Infix Expression: ', input, '\n');
                moveToQueue(input); 

                var postfix = convertToPost(infixQ);
                console.log('\nPostfix expression: ', postfix, '\n')

                var output = calcExpr(postQ2, evalStack)
                if (output === NaN) {
                    output = '\nThis is an invalid math expression.\n';
                    console.log(output);
                }
                else if (output === Infinity) {
                    output = '\nThis is an invalid math expression.\n';
                    console.log(output);
                    
                }
                else if (output === undefined) {
                    output = '\nThis is an invalid math expression.\n';
                    console.log(output);
                }
                else {
                    console.log('\nThe result of the expression is: ', output, '\n');
                }
            
                rl.close();

                initCalc();
            }
        } 
    });
}

function moveToQueue(input) {
    var count = [0];
    for (var i = 0; i < input.length; i++) {
        if (symbCheck(input[i])){
            count.push(i);
        }
    }
    for (var i = 1; i < count.length; i++) {
        if (i == 1) {
            var hold = input.slice(0, count[i]);
        }
        else {
            var hold = input.slice(count[i - 1] + 1, count[i]); 
        }
        infixQ.enqueue(hold)
        infixQ.enqueue(input[count[i]])
    }
    for (var i = 0; i < input.length; i++) {
        if (input[i] == '/' && input[i + 1] == '0')
        console.log('This is an invlaid expression')
        break;
    }
    var last = input.slice(count[count.length - 1] + 1)
    infixQ.enqueue(last);
}

function convertToPost(infixQ) {
    while (!infixQ.isEmpty()) {
        var holder = infixQ.front();
        infixQ.dequeue();

        if (holder === '') {
            continue;
        }
        else if (symbCheck(holder) === false) { //is number
            postQ.enqueue(holder);
            postQ2.enqueue(holder);
        }
        else if (opStack.isEmpty()) {
            opStack.push(holder);
        }
        else if (holder === '(') {
            opStack.push(holder);
        }
        else if (holder === ')') {
            while (opStack.top() !== '(') {
                postQ.enqueue(opStack.top());
                postQ2.enqueue(opStack.top());
                opStack.pop();
            }
            opStack.pop();
        }
        else {
            while ( !(opStack.isEmpty()) && (opStack.top() !== '(') && (precedence(holder) <= precedence(opStack.top()))) {
                postQ.enqueue(opStack.top());
                postQ2.enqueue(opStack.top());
                opStack.pop();
            }
            opStack.push(holder);
        }
    }
    while (!opStack.isEmpty()) {
        postQ.enqueue(opStack.top());
        postQ2.enqueue(opStack.top());
        opStack.pop();
    }
    
    var postfix = '';
    while (!postQ.isEmpty()) {
        var curr = postQ.front();
        postQ.dequeue();
        if (symbCheck(curr)) {
            postfix += curr 
        }
        else {
            postfix += (curr + ' ')
        }
    }
    return postfix;
}

function calcExpr(postQ2, evalStack) {
    while (!postQ2.isEmpty()) {
        var holder = postQ2.front();
        postQ2.dequeue();
        var result;

        if(operatorCheck(holder)) {
            var num = evalStack.pop();
            var next = evalStack.pop();
            
            switch (holder) {
                case '+':
                    result = Number(next) + Number(num);
                    break;
                case '-':
                    result = Number(next) - Number(num);
                    break;
                case '*':
                    result = Number(next) * Number(num);
                    break;
                case '/':
                    result = Number(next) / Number(num);
                    break;
                case '%':
                    result = Number(next) % Number(num);
                    break;
            }
            evalStack.push(result.toString());
        }
        else {
            evalStack.push(holder);
        }
    }

    return result;
}

function symbCheck(value) {
    if (value === '+' || value === '-' || value === '/' || value === '%' ||value === '*' || value === '(' || value === ')') {
        return true;
    }
    else {
        return false;
    }
}

function operatorCheck(value) {
    if (value === '+' || value === '-' || value === '/' || value === '%' ||value === '*') {
        return true;
    }
    else {
        return false;
    }
}

function isAccept(input) {
    for (var i = 0; i < input.length; i++) {
        if (input[i] !== '0' && input[i] !== '1' && 
        input[i] !== '2' && input[i] !== '3' && 
        input[i] !== '4' && input[i] !== '5' && 
        input[i] !== '6' && input[i] !== '7' &&         
        input[i] !== '8' && input[i] !== '9' && 
        input[i] !== '+' && input[i] !== '-' && 
        input[i] !== '*' && input[i] !== '/' && 
        input[i] !== '%' && input[i] !== '(' && 
        input[i] !== ')' && input[i] !== '.') {
            return false;
    }
    else {
        return true
    }
}
}

function precedence(opSymb) {
    if (opSymb === '-') {
        return 1;
    }
    if (opSymb === '+') {
        return 2;
    }
    if (opSymb === '/' || opSymb === '%') {
        return 4;
    }
    if (opSymb === '*') {
        return 3;
    }
}

function check (input) {
   var lpar = '';
   var rpar = '';
   var bool;

   for (var i = 0; i < input.length; i++) {
       if (i === 0 && input[i] === '-') {
           console.log('\nThis is an invalid math expression. Make sure there are no negative numbers and that an operator does not follow another (i.e. -3, 2*+1)\n');
           bool = false;
           continue
       }
       else if (input[i] === '-' && input[i - 1] === '(') {
           console.log('\nThis is an invalid math expression. Make sure there are no negative numbers and that an operator does not follow another (i.e. -3, 2*+1)\n');
           bool = false;
           continue
       }
       else if (operatorCheck(input[i]) && operatorCheck(input[i + 1])) {    
           console.log('\nThis is an invalid math expression. Make sure there are no negative numbers and that an operator does not follow another (i.e. -3, 2*+1)\n');
           bool = false;
           continue;
        }
       else if (isAccept(input) !== true) {
           console.log('\nYou entered an invalid character. Please only enter numbers 0-9 and the following operators/symbols (= - * / % ( ) ^)\n');
           bool = false;
           continue;
       }
       else if(input[i] === '(') {
           lpar += input[i]
           continue;
       }
       else if (input[i] === ')') {
           rpar += input[i]
           continue;
       }
   }
   if (lpar.length != rpar.length) {
       console.log('\nYou entered an invalid expression. Please make sure all open parentheses are closed\n');
       bool = false;               
       initCalc();
    }

   return bool;
}
