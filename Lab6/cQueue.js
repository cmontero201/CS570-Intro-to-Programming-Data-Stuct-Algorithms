/*
Created by Christian Montero
October 12, 2018
Lab 6: Circular Queue
This script continuously prompts the usert to enter a string that will be 
enqueued to circular queue based on a single linked list. When the user 
inputs q or quit, the program stops prompting the user, dequeues from the 
circular queue and displays the string entered.
*/

const readline = require('readline');

class CircLinkedList {
    constructor(value) {
        this.head = {value, next: value}
        this.length = 0;
        this.count = 0
    }

    enqueue(value) {
        var current = this.head;
        var Node = {value}
        this.count++

        if (current.value === undefined) {
            current.value = value;
            current.next = this.head;
            this.length++;
            return this;
        }
        else if (this.length > 11) {
            var element = (this.count % 12) ;
            for (var j = 1; j <= element; j++) {
                if (element === 1) {
                    current.value = value;
                    current.next = current.next;
                }
                else if (element === j) {
                    current.value = value;
                    current.next = current.next
                }
                else {
                    current = current.next;
                }
            }
        }
        else if (this.length < 12) {
            while (current.next != this.head) {
                current = current.next
            }
            current.next = Node;
            Node.next = this.head;
            this.length++;
        }      
    }

    dequeue() {
        if (this.isEmpty()) {
            console.log('Nothing to dequeue')
        }
        else {
            var current = this.head;
            this.head = current.next;
        }
        this.length--;
        return current.value
    }
    
    indexOf(value) {
        let thisNode = this.head;
        var count = 0;
        
        while(thisNode) {
            count++;
            if(thisNode.value === value) {
                return count;
            }
            thisNode = thisNode.next;
            if (count > this.length) {
                console.log('The value is not in the circular queue')
                break;
            }
        }
        return count;
    }

    size() {
        return this.length
    }

    isEmpty() {
        return (this.length === 0);
    }
}

var cQ = new CircLinkedList();

stringQ();

function stringQ() {
    var rl = readline.createInterface(process.stdin, process.stdout);

    rl.question('\nPlease enter a string to add to the queue. Type quit to end queueing\n>>> ', (resp) => {
        resp = resp.toString().toLowerCase();
        if (resp === 'quit' || resp === 'q') {
            rl.close()
            var current = cQ.head;
            var output = '';
            console.log('\nPrinting your queue...\n')
            while (cQ.length > 0) {
                holder = cQ.dequeue();
                output += holder + '\n'
                current = current.next
            }
            console.log(output)
        }
        else {
            rl.close()
            cQ.enqueue(resp)
            stringQ();
        }
    });
}
