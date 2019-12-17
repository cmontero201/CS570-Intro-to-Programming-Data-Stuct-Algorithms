/*
Construct a queue class built around a linked list. You may put the nodes for the linked
list right inside the queue class instead of building a separate linked list if you would like.
*/
class CircLinkedList {
    constructor(value) {
        this.head = {value, next: value}
        this.length = 0;
    }

    enqueue(value) {
        if (this.head.value === undefined) {
            this.head.value = value;
            this.head.next = this.head;
            this.length++;
            return this;
        }
        else {
            var Node = {value}
            var current = this.head
            var count = 0;
            while (ci) {
               current = current.next
            }
            console.log(current.value)
            
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            console.log('noting to dequeue')
        }
        else {
            var current = this.head;
            this.head = current.next;
        }
        this.length--;
        console.log('\n\nAFTER DEQ', x)
        return current
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
        }
        return count;
    }

    size() {
        return this.length;
    }

    isEmpty() {
        return (this.length === 0);
    }

    toString() {
        var current = this.head;
        var string = '';
        while (current) {
            string += current.value + (current.next ? 'n' : '')
            current = current.next;
        }
        return string;
    }

    print() {
        var holder = [];
        var current = this.head
        for (var i = 0; i < x.size(); i++) {
            holder.push(current.value)
            current = current.next 
        }
        console.log(holder);
    }
    
    getHead(){
        return this.head;
    }
}
var x = new CircLinkedList()
x.enqueue(1)
x.enqueue(2)
x.enqueue(3)
// x.enqueue(4)
// x.enqueue(5)
// x.enqueue(6)
// x.enqueue(7)
// x.enqueue(8)
// x.enqueue(9)
// x.enqueue(10)
// x.enqueue(11)
// x.enqueue(12)
console.log(x.print())

// x.insert(3, 50);
//x.print()
// x.append(100)
// x.size();
// x.toString();




/*
Make a stack class that contains an internal array for its backing. Make standard push/peek/pop 
functions. Use the array to store the stack, but if the array would grow to more than 10 items, 
instead delete the oldest item in the stack to make room for the new item. i.e. the array should 
never become more than 10 items.
*/


/*
Write a simple program that helps guide a person through a maze. Prompt the user for the location 
they are in. Then prompt for the locations they can go to from that location. Then, tell the user 
which way to go. Repeat until the user indicates that there are no exits from the location they have 
reached. Use a stack or queue (you choose) to store the traveled path and backtrack until you reach 
a location that has another viable exit for them to try. Tell them to take that path, and repeat 
until the user has exited the maze.
*/





// removeAt(index) {
    //     if (index >= 0 && index < this.length) {
    //         var current = this.head;
    //         var previous;
    //         var count = 1;

    //         if (index === 0) {
    //             this.head = current.next;
    //         }
    //         else {
    //             while (count < index) {
    //                 count++;
    //                 console.log(count)
    //                 previous = current;
    //                 current = current.next;
    //             }
    //             previous.next = current.next;
    //         }
    //         this.length --;
    //         return current.value;
    //     }
    //     else {
    //         return this.head;
    //     }
    // }

    // remove(value) {
    //     var index = this.indexOf(value);
    //     return this.removeAt(index);
    // }

    // addToHead(value) {
    //     const Node = { value };
    //     Node.next = this.head;
    //     this.head = Node;
    //     this.length++;
    //     return this;
    // }

    // removeFromHead() {
    //     if (this.length === 0) {
    //         return undefined;
    //     }
        
    //     value = this.head.value;
    //     this.head = this.head.next;
    //     this.length--;
        
    //     return value;
    // }

    // insert(index, value) {
        //     if (index >= 0 && index <= this.length) {
        //         var Node = {value}
        //         var current = this.head;
        //         var previous;
        //         var count = 0;
    
        //         if (index === 0) {
        //             Node.next = current;
        //             this.head = Node;
        //         }
        //         else {
        //             while (count++ < index) {
        //                 previous = current;
        //                 current = current.next;
        //             }
        //             Node.next = current;
        //             previous.next = Node;
        //         }
        //         this.length ++;
        //         return true;
        //     }
        //     else {
        //         return false;
        //     }
        // }