/*
Created by Christian Montero 
November 16, 2018
Lab 9: Topological Sort Lab
This script creates a graph from the input file and provides a toplogical 
sorting algorithm based on the in degree of nodes in the graph. Two sort
possibilites are provided.

*/

const fs = require('fs');
const path = require('path');


fs.readFile(path.join(__dirname, 'infile.dat'), (err, data) => {
    if (err) {
        console.log('An error occured while opening the file', err);
    }
    else {
        data = data.toString().split('\n')
        info = data.splice(0,1) //remove the first row
        info = info[0].split(' ')
        nodes = info[0]
        edges = info[1]
        coor = data
        
        dirGraph = new Graph();
        // dirGraph.draw(nodes, coor)
        var sort1 = dirGraph.topSort();
        var sort2 = dirGraph.topSort2();
        console.log(sort1);
        console.log(sort2);
    }
});

class Graph { 
    constructor() {
        this.adjList = {};
    }

    draw(nodes, coor){
        var count = -1;
        while (count < nodes - 1) {
            count++
            this.adjList[count] = [];
        }

        // Fill in Adjacency List
        for (var i = 0; i < coor.length; i++) {
            var hold = coor[i].split(' ');
            var eeNode1 = hold[0];
            var eeNode2 = hold[1];
            this.adjList[eeNode1].push(eeNode2);
        }
        return this.adjList
    }

    emptyCheck(copy) {
        var count = 0;
        for (var key in copy) {
            count++
        }

        if (count == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    topSort() {
        var copy1 = {};
        for (var i = 0; i < coor.length - 1; i++) {
            copy1[i] = this.adjList[i];
        }

        var counter = 0;

        // Init degree count for all nodes
        var inDeg = {};
       
        var sortOrder = [];
        

        while(counter < 4) {
            var zeroNodes = [];
            for (var key in copy1) {
                inDeg[key] = 0;
            }
            // Count InDegree of each node
            for (var key in copy1) {
                for (var node in copy1[key]) {
                    var hold = copy1[key][node]
                    inDeg[hold]++
                } 
            } 
            // Get nodes with indegree = 0
            for (var key in inDeg) {
                if (inDeg[key] === 0) {
                    zeroNodes.push(Number(key)) 
                }
            }
            if (zeroNodes.length === 0) {
                console.log('The input graph is not acyclic')
            }

            counter++;

            // Get last node in arr
            var node = zeroNodes.pop();
            delete copy1[node]
            delete inDeg[node]

            sortOrder[counter - 1] = node
        }
        return sortOrder
    }

    topSort2() {
        var copy2 = {};
        for (var i = 0; i < coor.length - 1; i++) {
            copy2[i] = this.adjList[i];
        }

        var counter = 0;

        // Init degree count for all nodes
        var inDeg = {};
       
        var sortOrder = [];
        

        while(counter < 4) {
            var zeroNodes = [];
            for (var key in copy2) {
                inDeg[key] = 0;
            }
            // Count InDegree of each node
            for (var key in copy2) {
                for (var node in copy2[key]) {
                    var hold = copy2[key][node]
                    inDeg[hold]++
                } 
            } 
            // Get nodes with indegree = 0
            for (var key in inDeg) {
                if (inDeg[key] === 0) {
                    zeroNodes.push(Number(key)) 
                }
            }
            if (zeroNodes.length === 0) {
                console.log('The input graph is not acyclic')
            }

            counter++;

            // Get and delete first node in arr
            var node = zeroNodes[0];
            delete zeroNodes[0]
            delete copy2[node]
            delete inDeg[node]

            sortOrder[counter - 1] = node
        }
        return sortOrder
    }
}