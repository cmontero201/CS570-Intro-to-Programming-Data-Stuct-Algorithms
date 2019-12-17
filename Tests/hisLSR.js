
const fs = require('fs');
const path = require('path');
const readlineSync = require("readline-sync");


class router {
    constructor() {
        this.id = undefined;
        this.status = "start";
        this.network = null;
        this.network_cost = null;
        this.tick = 0;
        this.connected_routers_list = {};
        this.packets_copy = null;
        this.ori_packet = null;
        this.sequence = 0;
        this.recieved_list = {};
        this.ohsr_list = {};
        this.adjacent_list = {};
        this.router_network_mapping = {};
        this.routing_table = {};
    }

    receivePacket(packet) {
        if (this.status === "start") {
            packet.TTL = packet.TTL - 1;
            
            if (! this.checkDiscard(packet)) {
                this.piecePuzzleTogether(packet);
                spf.init(this.id,this.adjacent_list);
                spf.computeSPF();
                this.updateRoutingTable();
                //console.log(this.id,this.routing_table);
                //flooding
                
                for (var prop in this.connected_routers_list) {
                    var new_packet = this.copyPacket(packet);
                    //if(prop != packet.send_from && prop != packet.router_id){
                    new_packet.send_from = this.id;
                    if (x.routers[prop].receivePacket(new_packet) == true) {
                        if( this.recieved_list[this.tick] == undefined){
                                this.recieved_list[this.tick] = {};
                        }
                        this.recieved_list[this.tick][prop] = 1;
                    }
            
                }
                //console.log(this.adjacent_list);
            }

            else {
                //console.log("discard:",packet.id);
            }

            return true;
        }
        else {
            return false;
        }

        // MINE RECIEVEPACKET()
        // if (this.stat) {
        //     packet.time2Live -= 1;

        //     if (this.toDiscard() === false) {
        //         this.figure(packet);
        //         ShortestPath.start(this.ID, this.adj);
        //         ShortestPath.calcShort();
        //         this.refreshTable();

        //         // console.log(this.ID, this.table);

        //         for (var el in this.connectedRouters) {
        //             var newPack = this.duplicate(packet);
        //             newPack.from = this.ID;
        //             if (Main.routers[el].receivePacket(newPack) === true) {
        //                 if (this.received[this.tick] === undefined) {
        //                     this.received[this.tick] = {};
        //                 }
                        
        //                 this.received[this.tick][el] = 1;
        //             }
        //         }
        //         console.log(this.adj);
        //     }
        //     return true
        // }
        // else {
        //     return false;
        // }
    }

    originatePacket() {
        if (this.status === "start"){
            this.generateLSP();
            this.tick = this.tick+1;
            this.recieved_list[this.tick] = {};

            for (var prop in this.connected_routers_list) {
                var new_packet = this.copyPacket(this.ori_packet);
                new_packet.send_from = this.id;
                // console.log(x.routers[prop])

                if (x.routers[prop].receivePacket(new_packet) == true){
                    this.recieved_list[this.tick][prop] = 1;
                }
            }

            if(this.tick >= this.TICK_CHECK) {
                this.checkTicks();
            }      
        }
        //console.log(app.routers[3].connected_routers_list);
    }

    // generate a link state packet
    generateLSP() { // CREATELSP
        this.sequence = this.sequence+1;
        this.ori_packet = new LSP();
        this.ori_packet.router_id = this.id;
        this.ori_packet.sequence = this.sequence;
        this.ori_packet.list = {};
        this.ori_packet.TTL = 10;

        // console.log('/THIS', x.routers)

        for (var prop in this.connected_routers_list) {
            // console.log(prop)
            // console.log('HERE',this.connected_routers_list[prop])
            this.ori_packet.list[prop] = {};
            this.ori_packet.list[prop].cost = this.connected_routers_list[prop];
            this.ori_packet.list[prop].network = x.routers[prop].network;
        }
    } 

    // update connected_routers_list by checking ticks
    checkTicks() { // CHECK
         for(var prop in this.connected_routers_list) {
            //update when shutdown
            if (this.recieved_list[this.tick][prop] == undefined && this.recieved_list[this.tick-1][prop] == undefined) {
                this.setCostInfinite(prop);
            }

            //update when a router from shut-down to start
            if (this.recieved_list[this.tick][prop] != undefined) {
                this.connected_routers_list[prop] = 1;
                if (this.connected_routers_list[prop] == Number.MAX_VALUE) {
                    this.connected_routers_list[prop] = x.routers[prop].connected_routers_list[this.id];
                }
            }
        } 
    }

    setCostInfinite(router_id) {  //TOINFINITY
        this.connected_routers_list[router_id] = Number.MAX_VALUE;
    }

    // update routing table(network, cost, outgoing link)
    updateRoutingTable() { //REFRESHTABLE
        for (var i in spf.D) {
            // console.log(this)
            if (this.routing_table[x.routers[i].network] == undefined) {
                this.routing_table[x.routers[i].network] = {};
            }

            if (typeof spf.D[i] != "number") {
                spf.D[i] = parseInt(spf.D[i]);
            }

            if (typeof x.routers[i].network_cost != "number") {
                x.routers[i].network_cost = parseInt(x.routers[i].network_cost);
            }

            this.routing_table[x.routers[i].network].network_cost = spf.D[i] + x.routers[i].network_cost;
            this.routing_table[x.routers[i].network].outgoing_link = spf.outgoing_link[i][1];
            this.routing_table[this.network] = {};

            if (typeof this.network_cost == "number") {
                this.routing_table[this.network].network_cost = this.network_cost;
            }
            else {
                this.routing_table[this.network].network_cost = parseInt(this.network_cost);
            }
            
            this.routing_table[this.network].outgoing_link = null;
        }
        
    }

    checkDiscard(packet) {  // TO DSICARD
        if (packet.TTL <= 0) {
            return true;
        }

        // console.log('THISISISISISIS', this.ohsr_list)

        if (this.ohsr_list[packet.router_id] == null) {
            this.ohsr_list[packet.router_id]=packet.sequence;
        }
        else {
            if (this.ohsr_list[packet.router_id] >= packet.sequence){
                return true;
            }
        }
        return false;

        // MINE toDiscard()
        // if (this.time2Live <= 0) {
        //     return true;
        // }

        // if (this.OHSRList[packet.ID] === undefined) {
        //     this.OHSRList[packet.ID] = packet.seq;
        // }
        // else {
        //     if (this.OHSRList[packet.ID] >= packet.seq) {
        //         return true;
        //     }
        // }
        // return false;
    }
    // construct a graph for all nodes base on new lsp
    piecePuzzleTogether(packet) { // FIGURE
        for (var i in packet.list) {
            if (this.adjacent_list[packet.router_id] == null) {
                this.adjacent_list[packet.router_id] = {};
            }

            if (this.adjacent_list[i] == null) {
                this.adjacent_list[i] = {};
            }

            this.adjacent_list[packet.router_id][i] = packet.list[i].cost;

            this.adjacent_list[i][packet.router_id] = packet.list[i].cost;
            
            this.router_network_mapping[i] = packet.list[i].network;

            
        }

        // MINE figure()
        // for (var i in packet.netList) {
        //     if (this.adj[packet.ID] === undefined) {
        //         this.adj[packet.ID] = {};
        //     }

        //     if (this.adj[i] === undefined) {
        //         this.adj[i] = {};
        //     }

        //     this.adj[packet.ID][i] = packet.netList[i].cost;
        //     this.adj[i][packet.ID] = packet.netList[i].cost;
        //     this.netMap[i] = packet[i].network
        // }
    }
    copyPacket(packet) { // DUPLICATE
        var new_packet = new LSP();
        for (var i in packet) {
            new_packet[i] = packet[i];
        }
        return new_packet;

        // MINE DUPLICATE()
        // var newPack = new LSP();
        // for (var i in packet) {
        //     newPack[i] = packet[i];
        // }

        // return newPack;

    }
}
class LSP {
    constructor() {
    this.router_id = null;
    this.sequence = null;
    this.TTL = 10;
    this.list = null;
    this.send_from = null;
    }
}

class SPF {
    init(s, adjacent_list){
        //console.log(s,adjacent_list);
        this.s = s;
        this.adjacent_list = adjacent_list;
        this.S = {};
        this.VS = {};
        this.D = {};
        this.outgoing_link = {};

        for (var i in this.adjacent_list) {
            if (i == s) {
                this.S[i] = 1;
            }
            else {
                this.VS[i] = 1;
                if (this.adjacent_list[s] != undefined) {
                    
                    if (this.adjacent_list[s][i] == undefined) {
                        this.D[i] = Number.MAX_VALUE;
                    }
                    else {

                        if (typeof this.adjacent_list[s][i] == "number") {
                            this.D[i] = this.adjacent_list[s][i];
                        }
                        else {
                            this.D[i] = parseInt(this.adjacent_list[s][i]);
                        }
                    }
                    this.outgoing_link[i] = [s,i];
                }
            }
        }
        //console.log(this.s,this.D);

        // MINE START()
        // this.routID = routID;
        // this.adjList = adjList;
        // this.id = {};
        // this.vid = {};
        // this.D = {}; //CHANGE
        // this.outgoing = {};
        // for (var netName in this.adjList) {
        //     if (netName === routID) {
        //         this.id[netName] = 1;
        //     }
        //     else {
        //         this.vid[netName] = 1;
        //         if (this.adjList[routID] != undefined) {

        //             if (this.adjList[routID][netName] === undefined) {
        //                 this.D[netName] = Infinity
        //             }
        //             else {
                        
        //                 if (Number(this.adjList[routID][netName] != NaN)) {
        //                     this.D[netName] = this.adjList[routID][netName];
        //                 }
        //                 else {
        //                     this.D[netName] =  Number(this.adjList[routID][netName]);
        //                 }
        //             }
        //             this.outgoing[netName] = [routID, netName]
        //         }
        //     }
        // }
        // console.log(this.routID, this.D)
    }

    computeSPF() {
        if (Object.getOwnPropertyNames(this.D).length != 0) {

            while (Object.getOwnPropertyNames(this.VS).length != 0) {
                var v = this.selectMinDFromVS();
                delete this.VS[v];
                this.S[v] = 1;

                for (var w in this.VS) {
                    var cost_v_w;

                    if (this.adjacent_list[v] == undefined){
                        cost_v_w = Number.MAX_VALUE;
                    }
                    else {

                        if (this.adjacent_list[v][w] == undefined) {
                            cost_v_w = Number.MAX_VALUE;
                        }
                        else {

                            if (typeof this.adjacent_list[v][w] == "number"){
                                cost_v_w = this.adjacent_list[v][w];
                            }
                            else {
                                cost_v_w = parseInt(this.adjacent_list[v][w]);
                            }  
                        }
                    }

                    if (typeof this.D[w] != "number"){
                        this.D[w] = parseInt(this.D[w]);
                    }

                    if (typeof this.D[v] != "number") {
                        this.D[v] = parseInt(this.D[v]);
                    }
                    
                    if(this.D[v] + cost_v_w < this.D[w]){
                        //console.log("change:",w,this.outgoing_link[w],this.outgoing_link[v],this.D[v],cost_v_w,this.D[w]);
                        this.outgoing_link[w] = [];

                        for (var j=0; j<this.outgoing_link[v].length; j++){
                            this.outgoing_link[w].push(this.outgoing_link[v][j]);
                        }
                        this.outgoing_link[w].push(w);
                        
                    }
                    this.D[w] = Math.min(this.D[w], this.D[v] + cost_v_w);
                }
            }
        }
        //console.log(this.s,this.D);
        //console.log(this.s,this.outgoing_link);

        //MINE CALCSHORT()
        // var costV = undefined
        // var count1 = 0;
        // var count2 = 0;
        // for (keys in this.D) {
        //     count1++
        // }
        // for (keys2 in this.vid) {
        //     count2++
        // }

        // if (count != 0) {
        //     while (count2 != 0) {
        //         var small = this.getMin();
        //         delete this.VS[small];
        //         this.id[small] = 1;

        //         for (var i in this.vid) {
        //             if (this.adjList[small] == undefined) {
        //                 costV = Infinity;
        //             }
        //             else {
        //                 if (this.adjList[small][i] === undefined) {
        //                     costV = Infinity;
        //                 }
        //                 else {
        //                     if (Number(this.adjList[small][i]) != NaN) {
        //                         costV = this.adjList[small][i];
        //                     }
        //                     else {
        //                         costV = Number(this.adjList[small][i]);
        //                     }
        //                 }
        //             }

        //             if (Number(this.D[i]) != NaN) {
        //                 this.D[i] = Number(this.D[i]);
        //             }

        //             if (Number(this.D[small]) != NaN) {
        //                 this.D[small] = Number(this.D[small])
        //             }

        //             if ((this.D[small] + costV) < this.D[i]) {
        //                 this.outgoing[i] = [];

        //                 for (var j = 0; j < this.outgoing[small].length; j++) {
        //                     this,outerHeight[small].push(this.outgoing[small][j]);
        //                 }

        //                 this.outgoing[i].push(i);
        //             }
        //             this.D[i] = Math.min(this.D[i], (this.D[small] + costV));

        //         }
        //     }
        // }
        // // console.log(this.routID, this.D);
        // // console.log(this.routID, this.outgoing);

    }

   //select a node v in V-S such that D[v] is a minimum;
    selectMinDFromVS(){
        var minVex = null;

        for (var i in this.VS){
            if (minVex == null){
                minVex = i;
            }
            
            else{
                if (typeof this.D[i] != "number") {
                    this.D[i] = parseInt(this.D[i]);
                }
                if (typeof this.D[minVex] != "number") {
                    this.D[minVex] = parseInt(this.D[minVex]);
                }
                if (this.D[i] < this.D[minVex]) {
                    minVex = i;
                }
            }
        }
        return minVex;

        // MINE GETMIN() 
        // var min = undefined;

        // for (var i in this.vid) {
        //     if (min == undefined) {
        //         min = i;
        //     }
        //     else {
        //         if(Number(this.D[i]) != NaN) {
        //            this.D[i] = Number(this.D[i])
        //         }
        //         if(Number(this.D[min]) != NaN) {
        //             this.D[min] = Number(this.D[min])
        //         }
        //         if (this.D[i] < this.D[min]) {
        //             min = i;
        //         }
        //     }
        // }
        // // console.log(min)
        // return min;
    }

}

class app {
    constructor() {
        this.routers = {};
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
                    // console.log(arr);

                    if (arr[0] !== '') {
                        var new_router = new router();
                        new_router.id = arr[0];
                        new_router.network = arr[1];

                        if (arr[2] != undefined) {
                            new_router.network_cost = arr[2];
                        }
                        else {
                            new_router.network_cost = 1;
                        }

                        this.routers[new_router.id] = new_router;
                    }
                    else {
                        if (arr[2] != undefined) {
                            this.routers[new_router.id].connected_routers_list[arr[1]] = arr[2];
                        }
                        else {
                            this.routers[new_router.id].connected_routers_list[arr[1]] = 1;
                        }
                    }
                }
            }
            // console.log("ROUTERS", this.routers)
            
            var routerCount = 0;

            for (var keys in this.routers) {
                routerCount++
            }
            // console.log(routerCount)

            while (!false) {

                var userChoice = readlineSync.question('Please Choose one of the following:\n   C : Continue\n   Q : Quit\n   P (follwoed by router ID#) : Routing Table\n   S (followed by router ID#) : Shut Down Router\n   T (followed by router ID#) : Start Up Router\n\n >>> ');
                userChoice = userChoice.toLowerCase().replace(' ', '');
    
                if (userChoice === 'c') {
                    for (var i = 0; i < routerCount; i++) {
                         for (var each in this.routers) {
                            this.routers[each].originatePacket();
                        }
                    }
                }
                else if (userChoice === 'q') {
                    process.exit(1);
                }
                else if (userChoice[0] === 'p') {
                    if (this.routers[userChoice[1]].status === 'start') {
                        console.log(this.routers[userChoice[1]].routing_table);
                    }
                    else {
                        console.log(userChoice, ' shut down');
                    }
                }
                else if (userChoice[0] === 's') {
                    this.routers[userChoice[1]].status = 'stop';
                    console.log(this.routers[userChoice[1]].status)
                }
                else if (userChoice[0] === 't') {
                    this.routers[userChoice[1]].status = 'start';
                    console.log(this.routers[userChoice[1]].status = 'start')
                }
            }
        
        });  
    }  
}

var x = new app();
var spf = new SPF();
x.init();