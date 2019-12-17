/*
Created by Christian Montero September 27, 2018
Lab 4: Wrapper Iterator
This script creates a class that wraps an array and creates an iterator class
*/
class Iterable {
    constructor(length = 0) {
        this.mem = new Array(length);
        this.numEl = length;
    }
    ;
    *iterator() {
        var start = 0;
        var step = 1;
        var stop = this.numEl;
        for (var i = start; i < stop; i += step) {
            var val = this.mem[i];
            yield val;
        }
    }
}
class Vector extends Iterable {
    constructor(length = 0) {
        super();
        this.mem = new Array(length);
        this.numEl = length;
    }
    ;
    get capacity() {
        return this.mem.length;
    }
    get(index) {
        return this.mem[index];
    }
    ;
    set(index, value) {
        this.mem[index] = value;
    }
    ;
    get length() {
        return this.numEl;
    }
    ;
    insert(index, value) {
        //make sure theres space
        if (this.length == this.capacity) {
            this.reserve(this.numEl + 1);
        }
        else if (index > this.length) {
            console.log('The index does not exist');
        }
        //move everyhting one place to right of index
        for (var i = this.length; i >= index; i--) {
            this.mem[i] = this.mem[i - 1];
        }
        //create logical space
        this.numEl++;
        //save value in memory
        this.mem[index] = value;
    }
    ;
    reserve(capacity) {
        var moreMem = new Array(this.numEl + 1);
        for (var i = 0; i < this.mem.length; i++) {
            moreMem[i] = this.mem[i];
        }
        delete this.mem;
        this.mem = moreMem;
    }
    push(value) {
        if (this.length == this.capacity) {
            this.reserve(this.length + 1);
        }
        this.mem[this.length] = value;
        this.numEl++;
    }
    pop() {
        var old = this.mem;
        var poppedEl = this.numEl;
        var popped = old[poppedEl];
        this.numEl--;
        this.mem = new Array(this.numEl);
        for (var i = 0; i < this.numEl; i++) {
            this.mem[i] = old[i];
        }
        return popped;
    }
    ;
}
;
//Test Functionality
var arr = new Vector(0);
console.log('Insert 10 at el 0: ');
arr.insert(0, 10);
console.log(arr);
console.log('Push 12: ');
arr.push(12);
console.log(arr);
console.log('Push 22: ');
arr.push(22);
console.log(arr);
console.log('Pop: ');
var p = arr.pop();
console.log(p);
console.log(arr);
console.log('Get Length: ');
var l = arr.length;
console.log(l);
console.log('Set el 0 to 39: ');
arr.set(0, 39);
console.log(arr);
console.log('Get el 1: ');
var g = arr.get(1);
console.log(g);
arr.push(78);
arr.push(77777);
console.log('Arr.mem: ', arr.mem);
console.log('Arr.NumEl: ', arr.numEl);
console.log('Arr: ', arr);
console.log('Arr.Length: ', arr.length);
var symArr = arr.iterator();
for (let value of symArr) {
    console.log(value);
}
