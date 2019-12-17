/*
Created by Christian Montero
October 29, 2018
Assignment 3: Huffman Codes
This script 
*/
const fs = require('fs');
const path = require('path');


class PriorityQueue {
    constructor() {
        //zero element left empty for parent/child calculations
        this.arr = [null];
    }

    insert(value) {
        // Inserts value and sorts until lowest value at root
        this.arr.push(value);
        
        var index = this.arr.length - 1;
        var parent = Math.floor(index / 2)
        while(parent >= 1) {
            if(this.arr[index].symbol.freq < this.arr[parent].symbol.freq) {
                this.swap(index, parent);
                index = Math.floor(index / 2)
                parent = Math.floor(index / 2)
            }
            else {
                break;
            }
        }
    
    }

    deleteMin() {
        var len = this.arr.length - 1
        var smallest = this.arr[1]
        this.arr[1] = this.arr[len];
        this.arr.splice(len, 1)

        var index = 1;

        while(index * 2 <= len) {
            var left = (2 * index);
            var right = (2 * index) + 1;
            var len = this.arr.length - 1

            if (left > len || right > len) {
                break;
            }
            else if (this.arr.length === 3) {
                if(this.compare(this.arr[index], this.arr[left])) {
                    this.swap(index, left);
                    index = (2 * index)
                    left = (2 * index)
                    right = (2 * index) + 1;
                }
                else {
                    break;
                }
            }

            if (right > len && left < len) {
                if(this.compare(this.arr[index], this.arr[left])) {
                    this.swap(index, left);
                    index = (2 * index)
                }
                else {
                    break;
                }
            }
            else {
                if (this.compare(this.arr[left], this.arr[right])) {
                    if (this.compare(this.arr[index], this.arr[right])) {
                        this.swap(index, right);
                        index = (2 * index) + 1;
                    }
                    else {
                        break;
                    }
                }
                else {
                    if (this.compare(this.arr[index], this.arr[left])) {
                        this.swap(index, left);
                        index = (2 * index)
                    }
                    else {
                        break;
                    }
                }
            }
        }

        // console.log(smallest)
        // console.log(this.arr)
        // console.log('\n')
        return smallest;
    }

    isEmpty() {
        return this.arr.length === 1;
    }

    size() {
        return this.arr.length - 1
    }

    swap(index, largest) {
        var hold = this.arr[index];
        this.arr[index] = this.arr[largest];
        this.arr[largest] = hold;
    }
    compare(val1,val2) {
        return val1.symbol.freq > val2.symbol.freq
    }
}

class TreeNode {
    constructor(parent, left, right, symbol) {
        this.parent = parent;
        this.left = left;
        this.right = right;
        this.symbol = symbol;
    }
}

class SymbolInfo {
    constructor(symbol, freq, leaf) {
        this.symbol = symbol;
        this.freq = freq;
        this.leaf = leaf;
    }
}

fs.readFile(path.join(__dirname, 'infile.dat'), (err, text) => {
    if (err) {
        console.log('The file could not be opened');
    }
    else {
        // Ignore all blanks, all punctuation marks, all special symbols.
        text = text.toString().replace(/\W/g,"") //From Eloquent JavaScript Text
        var charCount = text.length;
        var priority = new PriorityQueue();

        // Collect letter Frequency 
        var letterFreq = {}
        for (var ind in text) {
            var letter = text[ind];
            if(letterFreq[letter] === undefined) {
                letterFreq[letter] = 1;
            }
            else {
                letterFreq[letter]++;
            }
        }

        var table = [];
        var count = 0
        for(key in letterFreq) {
            count++
            var symbol_info = new SymbolInfo(key, letterFreq[key], count);
            var tree = new TreeNode(null,null,null,symbol_info);
            // console.log(tree)
            priority.insert(tree);
            table.push(symbol_info);
        }
  
        // console.log(table)

        // Sort the table using JavaScript native function
        // https://www.w3schools.com/js/js_array_sort.asp
        table.sort( (val1, val2) => {
            if(val1.freq > val2.freq) {
                return -1
            }
            else if(val1.freq < val2.freq) {
                return 1;
            }
            else {
                return 0;
            }
        });

        counter = priority.arr.length - 1
        smallTrees = counter / 2
        var priorityN = new PriorityQueue()

        while (priority.size() >= 1) {
            counter ++
            var smallest = priority.deleteMin();
            var next = priority.deleteMin();
        

            if(next == undefined) {
                var symbol = new SymbolInfo(null, (smallest.symbol.freq), counter)
                var newTree = new TreeNode(null, smallest.symbol, null, symbol)

            }
            else {
                var symbol = new SymbolInfo(null, (smallest.symbol.freq + next.symbol.freq), counter)
                var newTree = new TreeNode(null, smallest.symbol, next.symbol, symbol)

            }

            priorityN.insert(newTree)

            while (priorityN.size() > 1) {
                l = priorityN.deleteMin()
                r = priorityN.deleteMin();

                if (r == undefined) {
                   var symbol = new SymbolInfo(null, (smallest.symbol.freq), counter)
                   var newTree = new TreeNode(null, l, null, symbol)
                }
                else {
                    var symbol = new SymbolInfo(null, (l.symbol.freq + r.symbol.freq), counter)
                    var newTree = new TreeNode(null, l, r, symbol)
    
                }     
                priorityN.insert(newTree)   
                   
            }
         
        } 
       
        var root = priorityN.arr[1]
        var codeTable = {}
        encode(root,'')
        
        function encode(root, code) {
            if(root.left === undefined && root.right === undefined) {
                codeTable[root.symbol] = code
            }
            else if(root.left !== null && root.right === null) {
                encode(root.left, code + '1')
            }
            else if(root.left === null && root.right !== null) {
                encode(root.right, code + '0')
            }
            else {
                encode(root.left, code + '1')
                encode(root.right, code + '0')
            }
        } 

     
        
        // Create and Print Tables
        var bitCount = 0;
        var out = '   Symbol   |   Frequency %   \n'

        // Display Symbol Freq Percent
        for (var i = 0; i < table.length; i++) {
            var sym = table[i].symbol
            var fre = table[i].freq
            var perc = fre / charCount

            out += '     ' + sym + '      |      ' + perc + '   \n'
        }
        console.log(out)


        // Display Huffman Code 
        var out2 = '   Symbol   |   Huffman Code   \n'
        for (var i = 0; i < table.length; i++) {
            var sym = table[i].symbol
            var huffCode = codeTable[sym]

            out2 += '     ' + sym + '      |       ' + huffCode + '   \n'
        }
        console.log(out2)

        // Calculate Total Bits
        for (var i = 0; i < table.length; i++) {
            var sym = table[i].symbol
            var huffCode = codeTable[sym]
            var fre = table[i].freq

            var bits = huffCode.split('').length

            bitCount += (bits * fre)
        }
        console.log('TOTAL BITS:', bitCount)

    }
       

});













