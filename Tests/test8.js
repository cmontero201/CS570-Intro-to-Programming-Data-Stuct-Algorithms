/*
Created by Christian Montero 
October 26, 2018
Lab 8: Heaps Used for Sorting
This script creates Max heap class based on the heap sort implementation in 
textbook Learning Javascript Data Structures and Algorithms. A fucntion is created 
prompt the user to enter 10 numbers which are then output in max heap sort order
*/

const readlineSync = require('readline-Sync'); //Utilized npm documentation 
//https://www.npmjs.com/package/readline-sync

class MaxHeap {
    constructor() {
        this.array = [];
    }

    insert(value) {
        this.array.push(value);
		this.createHeap();
    }

    remove() {
        var last = this.array.length - 1;
        this.swap(0, last);
        var holder = this.array.pop();
        this.createHeap();
        // console.log(this)
        return holder;
    }

    //Prints the largest value
    output() {
        var len = this.array.length
        for(var i = 0; i < len; i++) {
            console.log(this.remove());
        }
    }

    createHeap() {
        var len = this.array.length
        var finalNode = Math.floor((len - 2) / 2);
		
        for (let i = finalNode; i >= 0; i--) {
            this.heapifySort(i);
        }
    }

    heapifySort(i) {
        var len = this.array.length
        var left = 2 * i + 1; //2L accounting for shift (first arr value = element 0)
        var right = 2 * i + 2; //2R+1 accounting for shift (first arr value = element 0)
        var largest = i;

        if (i > Math.floor((len - 2) / 2)) {
            return;
        }
		
        if (left < len && this.array[left] > this.array[largest]){
			largest = left;
		}
        if (right < len && this.array[right] > this.array[largest]){
			largest = right;
		}
		
        this.swap(i, largest);
        this.heapifySort(left);
        this.heapifySort(right);
    }

    // Swaps two values in array ... adapted from Learning Javascript Text
    swap(i, largest) {
        var hold = this.array[i];
        this.array[i] = this.array[largest];
        this.array[largest] = hold;
    }
}


var heap = new MaxHeap;
var count = 10;
console.log('\nPlease enter 10 numbers as prompted:')

function startSort() {
    if (count > 0) {
        input = readlineSync.question('>>> ')
        input = Number(input);
        if (isNaN(input)) {
            console.log('\nPlease enter only numberic values\n')
            startSort();
        }            
        else {
            heap.insert(input);
            count--;
            startSort();
        }
    }
    else {
        console.log('\nMax Heap Sort:\n')
        heap.output();
    }
}

// Init program
startSort();