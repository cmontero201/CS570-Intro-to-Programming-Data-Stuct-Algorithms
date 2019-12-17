/*
Created by Christian Montero 
October 19, 2018
Lab 7 : Sorted Set
This script creates binary tree from an input file and then prompts the user 
for a value. The user propmted value is searched in the tree and displays yes 
(along with the node) if the value is present, or no if the value is not in the
file.
*/

const fs = require('fs');
const path = require('path');
const readline = require('readline');

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class SortedSet { 
    constructor() {
        this.root = null;
    }

    isEmpty() {
        if (this.root === null) {
            return true;
        }
        else {
            return false;
        }
    };

    add(value) {
        var current = this.root;
        var newNode = new Node(value);

        if (this.root === null || this.root === undefined) {
            this.root = newNode;
        }
        else {
            while (current) {
                if (this.contains(value) !== false) {
                    var x = this.contains(value)
                    console.log('This value has already been added:\n', x)
                    break;
                }
                else if (value < current.value) { //add to left 
                    if (current.left === null) {
                        current.left = newNode;
                        break;
                    }
                    else {
                        current = current.left; //continue down left trail
                    }
                }
                else if (value > current.value) { //add to right 
                    if (current.right === null) {
                        current.right = newNode;
                        break;
                    }
                    else {
                        current = current.right //continue down right trail
                    }
                }
            }
        }
    };

    remove(value) {
        var current = this.root;
        
        if (this.root === null) {
            console.log('New Root Created')
            return null;
        }
        else {
            while (current) {
                console.log(current)
                if (value < current.value) {
                    current = current.left;
                }
                else if (value > current.value) {
                    current = current.right
                }
                else {
                    //case 1 - leaf ndoe
                    if (current.left === null && current.right === null) {
                        current.value = null;
                        delete current.right;
                        delete current.left;
                        return current;
                    }
                    //case 2 - 1 child node
                    else if (current.left === null) {
                        current.value = current.right.value;
                        current.right = null
                        console.log(current)
                        break;
                    }
                    else if (current.right === null) {
                        current.value = current.left.value;
                        current.left = null;
                        break;
                    }
                    else {
                        //case 3 - 2 children
                        var lowestRightTree = minRightTree(current.right);
                        console.log('THIS IS IT: ' ,lowestRightTree)
                        current.value = lowestRightTree;
                        console.log(current);
                    } 
                }
            }
        }
        return this
    };

    contains(value) {
        var current = this.root;
        if (current.right === null && current.left === null) {
            return false
        }
        while (current) {
            if (value < current.value) {
                current = current.left;
            }
            else if (value > current.value) {
                current = current.right;
            }
            else if (value === current.value) {
                //var val = current;
                return current;
            }
        }
        return false;  
    };
};

function minRightTree(current) {
    //finds the smalledt value (last value in tree) on the right side of node removed
    while (current && current.left !== null) {
        current = current.left;
    }
    var lowest = current.value;
    console.log('REMOVE THIS: ', current)
    return lowest
}

fs.readFile(path.join(__dirname, 'infile.dat'), (err, data) => {
    if (err) {
        console.log('An error occured while opening the file', err);
    }
    else {
        num = data.toString().replace(/\s/g, '');
        numList = num.split(','); 
        var bst = new SortedSet();
        
        for (var i = 0; i < numList.length; i++) {
            bst.add(Number(numList[i]));
        }

        checkTree(); //starts program 

        function checkTree() {
            var rl = readline.createInterface(process.stdin, process.stdout)
            rl.question('Enter a value to search, enter quit or q to exit:\n>>> ', (input) => {
                input = input.replace(/\s/g, ''); //Utilized WeSchools documentation
                var check = Number(input)
                if (input === 'q' || input === 'quit') {
                    rl.close()
                    console.log('\nGoodbye!\n')
                }
                else if (isNaN(check) === true) {
                    rl.close()
                    console.log('\nPlease enter an integer number\n')
                    checkTree();
                }
                else {
                    rl.close();
                    if (bst.contains(check) === false) {
                        console.log('\nNO\n')
                    }
                    else {
                        console.log('\nYES\n')
                        // console.log(bst.contains(check))
                        // console.log('\n')
                    }
                    checkTree();
                }
            });
        }
    }
})





// x = new SortedSet();
// // x.add(51)
// // x.add(39)
// // x.add(23)
// // x.add(68)
// // x.add(17)
// // x.add(29)
// // x.add(64)
// // x.add(78)
// x.add(2)
// x.add(3)
// x.add(4)
// x.add(68)
// x.add(17)
// x.add(29)
// x.add(64)
// x.add(70)
// console.log(x)


// console.log('\nREMOVE 7-: ')
// x.remove(68)
// console.log('\n\n')
// console.log('\nCONTAINS: ')
// console.log(x.contains(68))
// console.log(x.contains(70))







