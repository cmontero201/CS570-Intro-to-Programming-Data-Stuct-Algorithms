/*
Created by Christian Montero
Assignment 5: Link State Routing
December 12, 2018

This script creates a virtual network of routers that sends routing data to one another
using a link state routing algortihm
*/

const fs = require('fs');
const path = require('path');
const readlineSync = require("readline-sync");


class Router {
    constructor() {
        this.ID = null;
        this.stat = true;
        this.network = undefined;
        this.cost = undefined;
        this.tick = 0;
        this.connectedRouters = {};
        this.origPack = undefined;
        this.seq = 0;
        this.received = {};
        this.highest = {}; //CHANGE THIS?? WHAT IS IT FOR
        this.adj = {};
        this.netMap = {};
        this.table = {};
    }

    originatePacket() { 
        if (this.stat === true) {
            this.createLSP();
            this.tick += 1;
            this.received[this.tick] = {};

            for (var el in this.connectedRouters) {
                var newPack = this.duplicate(this.origPack);
                newPack.from = this.ID;

                if (main.routerList[el].receivePacket(newPack, this.ID) === true) {
                    this.received[this.tick][el] = 1;
                }
            }
            this.check();            
        }
    }

    createLSP() {
        this.seq += 1;
        this.origPack = new LSP();
        this.origPack.routerID = this.ID;
        this.origPack.seq = this.seq;
        this.origPack.netList = {};
        this.origPack.time2Live = 10;

        for (var key in this.connectedRouters) {
            this.origPack.netList[key] = {};
            this.origPack.netList[key].cost = this.connectedRouters[key];
            this.origPack.netList[key].network = main.routerList[key].network;
        }
    }

    receivePacket(packet, ID) {
        if (this.stat === true) {
            // console.log(this)
            packet.time2Live -= 1;
            packet.from = ID;

            if (this.toDiscard(packet) === false) {
                this.figure(packet);
                spf.start(this.ID, this.adj);
                spf.calcShort();
                this.refreshTable();

                // console.log(this.ID, this.table);

                for (var el in this.connectedRouters) {
                    var newPack = this.duplicate(packet);
                    newPack.from = this.ID;
                    if (main.routerList[el].receivePacket(newPack) === true) {
                        if (this.received[this.tick] === undefined) {
                            this.received[this.tick] = {};
                        }
                        
                        this.received[this.tick][el] = 1;
                    }
                }
                // console.log(this.adj);
            }
            return true
        }
        else {
            return false;
        }
    }

    refreshTable() {
        for (var key in spf.del) {
            if (this.table[main.routerList[key].network] === undefined) {
                this.table[main.routerList[key].network] = {};
            }

            if (Number(spf.del)[key] != NaN) {
                spf.del[key] = Number(spf.del[key]);
            }
            else {
                console.log('Not a Number!');
            }

            if(Number(main.routerList[key].cost) != NaN) {
                main.routerList[key].cost = Number(main.routerList[key].cost);
            }
            else {
                console.log('Not a Number!');
            }

            this.table[main.routerList[key].network].cost = spf.del[key] + main.routerList[key].cost;
            this.table[main.routerList[key].network].outgoing = spf.outgoing[key][1];
            this.table[this.network] = {};

            if (Number(this.cost) != NaN) {
                this.table[this.network].cost = Number(this.cost);
            }
            else {
                console.log('Not a Number!');
            }

            this.table[this.network].outgoing = undefined;
        }
    }

    figure(packet) {
        for (var i in packet.netList) {
            if (this.adj[packet.routerID] === undefined) {
                this.adj[packet.routerID] = {};
            }

            if (this.adj[i] === undefined) {
                this.adj[i] = {};
            }

            this.adj[packet.routerID][i] = packet.netList[i].cost;
            this.adj[i][packet.routerID] = packet.netList[i].cost;
            this.netMap[i] = packet.netList[i].network
        }
    }

    toDiscard(packet) {
        if (packet.time2Live <= 0) {
            return true;
        }

        if (this.highest[packet.routerID] === undefined) {
            this.highest[packet.routerID] = packet.seq;
        }
        else {
            if (this.highest[packet.routerID] >= packet.seq) {
                return true;
            }
        }
        return false;
    }

    duplicate(packet) {
        var newPack = new LSP();
        for (var i in packet) {
            newPack[i] = packet[i];
        }

        return newPack;
    }

    check() {
        for (var key in this.connectedRouters) {
            if (this.received[this.tick][key] === undefined && this.received[this.tick - 1][key] === undefined) {
                this.connectedRouters[key] = Infinity;
            }
            if (this.received[this.tick][key] != undefined) {
                this.connectedRouters[key] = 1;
                if (this.connectedRouters[key] === Infinity) {
                    this.connectedRouters[key] = main.routers[key].connectedRouters[this.ID];
                }
            }
        }
    }

}

class LSP {
    constructor() {
        this.routerID = undefined;
        this.seq = undefined;
        this.time2Live = 10;
        this.netList = undefined;
        this.from = undefined;
    }
}

// Additional References Used
//https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/
//https://www.cise.ufl.edu/~sahni/cop3530/slides/lec402.pdf
class ShortestPath {
    start(routID, adj) {
        this.routID = routID;
        this.adj = adj;
        this.id = {};
        this.vid = {};
        this.del = {}; 
        this.outgoing = {};

        for (var netName in this.adj) {
            if (netName === routID) {
                this.id[netName] = 1;
            }
            else {
                this.vid[netName] = 1;
                if (this.adj[routID] != undefined) {

                    if (this.adj[routID][netName] === undefined) {
                        this.del[netName] = Infinity
                    }
                    else {
                        
                        if (Number(this.adj[routID][netName] != NaN)) {
                            this.del[netName] = Number(this.adj[routID][netName]);
                        }
                        else {
                            console.log('Not a Number!');
                        }
                    }
                    this.outgoing[netName] = [routID, netName]
                }
            }
        }
        // console.log(this.routID, this.D)
    }

    calcShort() {
        var costV = undefined
        var count1 = 0;
        var count2 = 0;
        for (var keys in this.del) {
            count1++
        }
        for (var keys2 in this.vid) {
            count2++
        }

        if (count1 != 0) {
            while (count2 != 0) {
                var small = this.getMin();
                delete this.vid[small];
                count2 --;
                this.id[small] = 1;

                for (var i in this.vid) {
                    if (this.adj[small] == undefined) {
                        var costV = Infinity;
                    }
                    else {
                        if (this.adj[small][i] === undefined) {
                            costV = Infinity;
                        }
                        else {
                            if (Number(this.adj[small][i]) != NaN) {
                                costV = Number(this.adj[small][i]);
                            }
                            else {
                                console.log('Not a Number!')
                            }
                        }
                    }

                    if (Number(this.del[i]) != NaN) {
                        this.del[i] = Number(this.del[i]);
                    }
                    else {
                        console.log('Not a Number!')
                    }

                    if (Number(this.del[small]) != NaN) {
                        this.del[small] = Number(this.del[small])
                    }
                    else {
                        console.log('Not a Number!')
                    }

                    if ((this.del[small] + costV) < this.del[i]) {
                        this.outgoing[i] = [];

                        for (var j = 0; j < this.outgoing[small].length; j++) {
                            this.outgoing[i].push(this.outgoing[small][j]);
                        }
                        this.outgoing[i].push(i);
                    }
                    this.del[i] = Math.min(this.del[i], (this.del[small] + costV));
                }
            }
        }
    }

    getMin() {
        var min = undefined;

        for (var i in this.vid) {
            if (min == undefined) {
                min = i;
            }

            else {
                if(Number(this.del[i]) != NaN) {
                   this.del[i] = Number(this.del[i]);
                }
                else {
                    console.log('Not a Number!');
                }

                if(Number(this.del[min]) != NaN) {
                    this.del[min] = Number(this.del[min]);
                }
                else {
                    console.log('Not a Number!');
                }

                if (this.del[i] < this.del[min]) {
                    min = i;
                }
            }
        }
        return min;
    }
}

class Main {
    constructor() {
        this.routerList = {};
    }

    init() {
        fs.readFile(path.join(__dirname, 'infile.dat'), (err, input) => {
            if (err) {
                console.log('The file could not be opened');
            }
            else {
                input = input.toString().split('\n'); 

                for (var each in input) {
                    var arr = input[each].split(/\s+/); //WeSchools RegEx documentation

                    if (arr[0] !== '') {
                        var newRouter = new Router();
                        newRouter.ID = arr[0];
                        newRouter.network = arr[1];

                        if (arr[2] != undefined) {
                            newRouter.cost = arr[2];
                        }
                        else {
                            newRouter.cost = 1;
                        }

                        this.routerList[newRouter.ID] = newRouter;
                    }
                    else {
                        if (arr[2] != undefined) {
                            this.routerList[newRouter.ID].connectedRouters[arr[1]] = arr[2];
                        }
                        else {
                            this.routerList[newRouter.ID].connectedRouters[arr[1]] = 1;
                        }
                    }
                }
            }

            var routerCount = 0;

            for (var key in this.routerList) {
                routerCount++;
            }

            while (!false) {
                var userChoice = readlineSync.question('Please Choose one of the following:\n   C : Continue\n   Q : Quit\n   P (follwoed by router ID#) : Routing Table\n   S (followed by router ID#) : Shut Down Router\n   T (followed by router ID#) : Start Up Router\n\n >>> ');
                userChoice = userChoice.toLowerCase().replace(' ', '');

                if (userChoice === 'c') {
                    for (var i = 0; i < routerCount; i++) {
                        for (var each in this.routerList) {
                            this.routerList[each].originatePacket();
                        }
                    }
                }

                else if (userChoice === 'q') {
                    process.exit(1);
                }
                
                else if (userChoice[0] === 'p') {
                    if (this.routerList[userChoice[1]].stat === undefined) {
                        console.log('The router you entered does not exist')
                    }
                    else if (this.routerList[userChoice[1]].stat === true) {
                        console.log('Routing Table for Router ' + userChoice[1] + ':\n');
                        // console.log(this.routerList[userChoice[1]].table);

                        for (key in this.routerList[userChoice[1]].table) {
                            console.log('Network: ' + key + '  Outgoing Link: ' + this.routerList[userChoice[1]].table[key].outgoing)
                        }
                        console.log('\n\n')
                    }
                    else {
                        console.log('Router ' + userChoice, ' is currently shut down. To view table, power on\n\n');
                    }
                }
                else if (userChoice[0] === 's') {
                    if (this.routerList[userChoice[1]].stat === undefined) {
                        console.log('The router you entered does not exist')
                    }
                    this.routerList[userChoice[1]].stat = false;
                    console.log('Router ' + userChoice[1] + ' is now shut down')
                }
                else if (userChoice[0] === 't') {
                    if (this.routerList[userChoice[1]].stat === undefined) {
                        console.log('The router you entered does not exist')
                    }
                    this.routerList[userChoice[1]].stat = true;
                    console.log('Router ' + userChoice[1] + ' is now available')
                }
            }    
        });
    }
}

var main = new Main();
var spf = new ShortestPath();
main.init();



