/*
Created by Christian Montero September 27, 2018
Lab 4: Wrapper Iterator
This script creates a class that wraps an array and creates an iterator class
*/

interface Vector<T> extends Iterable<T> {
    get(index: number);
    set(index: number, value: T);
    length: number;
    push(value: T);
    pop(): T;
    insert(index: number, value: T);

    iterator(): T
}

class Iterable<T> {
    public memory: T[];
    public numEl: number;

    constructor(length: number = 0) {
        this.memory = new Array(length);
        this.numEl = length;
    };

    public *iterator() {
        var start = 0;
        var step = 1;
        var stop = this.numEl;
        for (var i = start; i < stop; i+= step) {
            var val = this.memory[i]
            yield val
        }
    }

}


class Vector<T> extends Iterable<T> {
    public memory: T[];
    public numEl: number;

    constructor(length: number = 0) {
        super();
        this.memory = new Array(length);
        this.numEl = length;
    };

    public get capacity(): number { 
        return this.memory.length;
    }

    public get(index: number) {
        return this.memory[index];
    };

    public set(index: number, value){ 
        this.memory[index] = value;
    };

    public get length(): number {
        return this.numEl;
    };

    public insert(index: number, value) {
        //make sure theres space
        if (this.length == this.capacity) {
            this.reserve(this.numEl + 1)
        }
        else if (index > this.length) {
            console.log('The index does not exist')
        }
        //move everyhting one place to right of index
        for (var i = this.length; i >= index; i--) {
            this.memory[i] = this.memory[i - 1];
        }
        //create logical space
        this.numEl++;
        //save value in memory
        this.memory[index] = value;
        
    };

    public reserve(capacity: number) {
        var moreMem = new Array(this.numEl + 1);
        for (var i = 0; i < this.memory.length; i++) {
            moreMem[i] = this.memory[i];
        }            
        delete this.memory;
        this.memory = moreMem
    }

    public push(value) {
        if (this.length == this.capacity) {
            this.reserve(this.length + 1);
        }
        this.memory[this.length] = value;    
        this.numEl++;
    }

    public pop() {
        var old = this.memory;
        var poppedEl = this.numEl;
        var popped = old[poppedEl]
        this.numEl--; 
        this.memory = new Array(this.numEl);
        for (var i = 0; i < this.numEl; i++) {
            this.memory[i] = old[i];
        }
        return popped
    }; 
};


//Test Functionality
var arr = new Vector(0);

console.log('Insert 10 at el 0: ');
arr.insert(0,10)
console.log(arr)

console.log('Push 12: ');
arr.push(12);
console.log(arr)

console.log('Push 22: ')
arr.push(22);
console.log(arr)

console.log('Pop: ')
var p = arr.pop();
console.log(p)
console.log(arr)

console.log('Get Length: ');
var l = arr.length
console.log(l);

console.log('Set el 0 to 39: ');
arr.set(0,39);
console.log(arr);

console.log('Get el 1: ')
var g = arr.get(1);
console.log(g)


arr.push(78);
arr.push(77777);
console.log('Arr.mem: ',arr.memory);
console.log('Arr.NumEl: ',arr.numEl);
console.log('Arr: ', arr);
console.log('Arr.Length: ', arr.length);

var symArr = arr.iterator();

for (let value of symArr) { 
    console.log(value); 
}

