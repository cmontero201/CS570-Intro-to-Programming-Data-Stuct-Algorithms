/*
Created by Christian Montero
November 28, 2018
Lab 10: BFS
*/

const fs = require('fs');
const path = require('path');

class Queue {
    constructor() {
        this.arr = [];
    }

    enqueue(value) {
        this.arr.push(value);
    }

    dequeue() {
        return this.arr.shift();
    }

    front() {
        return this.arr[0];
    }

    isEmpty() {
        return this.arr.length === 0;
    }

    peek() {
        return this.arr[this.arr.length - 1];
    }

    get length() {
        return this.arr.length;
    }

    clear() {
        this.arr = [];
    }
    
    find(node) {
  
       for (var i = 0; i < this.arr.length; i++) {
           if (this.arr[i] === node) {
               return true;
           }
       }
       return false;
    }
}

class Graph {
    constructor() {
        this.vector = [];
        this.adj = [];
    }

    draw(nodes, coor) {
        for (var i = 0; i < nodes; i++) {
            this.vector[i] = i;
            this.adj[i] = [];
            for (var j = 0; j < nodes; j++) {
                this.adj[i][j] = -1;
            }
        }

        for (var val in coor) {
            var end1 = coor[val].split(' ')[0];
            var end2 = coor[val].split(' ')[1];

            this.adj[end1][end2] = 1;
            this.adj[end2][end1] = 1;
        }
    }

    search(node) {
        var sI = new Queue();
        var breadth = {};
        sI.enqueue(node);

        for (var vect in this.vector) {
            breadth[vect] = 0;
        }

        var count = 0;
        vect = node;
        while (sI.length !== 0) {
            vect = sI.dequeue();
            count++
            breadth[vect] = count;

            var unused = this.getUnused(vect);
            for(var i =0; i < unused.length; i++) {
                if (breadth[unused[i]] === 0) {
                    if (sI.find(unused[i]) === false) {
                        sI.enqueue(unused[i]);
                    }
                }
            }
        }
        return breadth
    }

    getUnused(vect) {
        var unusedE = [];
        for (var i = 0; i < this.vector.length; i++) {
            if (this.adj[vect][i] === 1) {
                unusedE.push(i);
                this.adj[i][vect] = 0;
                this.adj[vect][i] = 0;
            }
        }
        return unusedE
    }

    isEmpty(graph) {
        var count = 0; 
        for (var each in graph) {
            count++;
        }
        
        if (count === 0) {
            return true;
        }
        else {
            return false;
        }
    }
}


fs.readFile(path.join(__dirname, 'infile.dat'), (err, input) => {
    if (err) {
        console.log('An error occured while opening the file', err);
    }
    else {
        input = input.toString().split('\n');
        var info = input.splice(0,1);
        info = info[0].split(' ');
        nodes = info[0];
        edges = info[1];
        coor = input;

        var graph = new Graph();
        graph.draw(nodes,coor);

        // console.log(graph)

        var bfn = graph.search(0);
        for (var each in bfn) {
            console.log(each, bfn[each])
        }
    }
});