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
                if (value < current.value) {
                    current = current.left;
                }
                else if (value > current.value) {
                    current = current.right
                }
                else {
                    //case 1 - leaf ndoe
                    if (current.left === null && current.right === null) {
                        current = null;
                        return current;
                    }
                    //case 2 - 1 child node
                    if (current.left === null) {
                        current = current.right;
                        return current;
                    }
                    else if (current.right === null) {
                        current = current.left;
                        return current;
                    }
                    else {
                        //case 3 - 2 children
                        var lowestRightTree = minRightTree(current.right);
                        console.log(lowestRightTree)
                        current.value = lowestRightTree.value;
                        return current
                    } 
                }
            }
        }
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
/*
Prompt for student names and insert them into a BST using alphabetical comparison. 
Then prompt the user for names of students to delete. Display the height of the 
tree after each deletion.
*/

var rl = readline.createInterface(process.stdin, process.stdout);


rl.question('\nEnter a list of student names seperated by commas\n>>> ', (names) => {
    if (isNaN(Number(names)) === false) {
        rl.close();
        console.log('\nPlease only enter names/characters')
    }
    else {
        rl.close();
        var nodeCount = 0;
        var bst = new SortedSet();
        var names = names.split(',')
       
        for (var i = 0; i < names.length; i++) {
            bst.add(names[i]);
            nodeCount++;
        }
        console.log(bst)
        maxHeight = nodeCount - 1;
        console.log('Height: ', maxHeight);

        rl.question('\nEnter a name to remove...\n>>> ', (rem) => {
            console.log(rem)
            if (bst.contains(rem) === false) {
                rl.close()
                console.log("That name isn't in the tree")
            }
            else {
                rl.close()
                bst.remove(rem);
                nodeCount--
                console.log('Height: ', maxHeight)
            }
        })
    }
})


/*
Construct a BST with the numbers 51,39,0,23,68,17,29,64,78. Construct the tree by 
inserting the numbers in that order. Output the height of the tree.
*/

/*
Extend your answer for question #2 to insert those numbers into 9 different trees;
in each one, insert the numbers in that order but shifted by one (i.e. into 
tree #1, insert 39,0,...,64,78,51; into tree #2, insert 0,23,...,64,78,51,39, 
and etc). Output which insertion order results in the most balanced tree 
(i.e. the tree with the shortest height) and also output the worst-case 
(most unbalanced tree)'s height.
*/