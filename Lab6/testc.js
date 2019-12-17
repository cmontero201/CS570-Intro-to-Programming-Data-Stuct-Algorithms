

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

    print() {
        var current = this.head;
        for (var i = 1; i < this.count; i++) {
            console.log(current)
            current = current.next
        }
    }

    makeArr() {
        var holder = [];
        var current = this.head
        for (var i = 0; i < this.length; i++) {
            holder.push(current.value)
            current = current.next 
        }
        console.log(holder);
    }
    
    getHead(){
        return this.head;
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


// var x = new CircLinkedList()
// x.enqueue('the')
// x.enqueue('world')
// x.enqueue('rc')
// x.enqueue('xd')
// x.enqueue('cdr')
// x.enqueue('frhjf')
// x.enqueue('denrjfh')
// x.enqueue('efinv')
// x.enqueue('derv')
// x.enqueue('ferfd')
// x.enqueue('dfvg')
// x.enqueue('efgfq')
// x.enqueue('ewf');
// x.enqueue('fredq');
// x.enqueue('efrv');
// // x.dequeue();


// console.log('1. Circular Queue: ', x)
// console.log('\n\n')
// console.log('2. PRINT: ')
// x.print()
// console.log('\n\n')
// console.log("4. ISEMPTY: ", x.isEmpty())
// console.log('\n\n')
// console.log('5. SIZE: ', x.size())
// console.log('\n\n')
// console.log('6. MAKEARR: ', x.makeArr());

