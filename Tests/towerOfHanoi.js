const readline = require('readline');

function moveHanoi(n, source, dest, inter) {
    if (n == 1) // terminating case
    console.log("Move disk from ", source, " to ", dest);
    else {
        moveHanoi(n-1, source, inter, dest);
        // REFERENCE POINT 1// At this point implementation of Step 1 is complete.
        console.log("Move disk from ", source, " to ", dest);
        // REFERENCE POINT 2// At this point implementation of Step 2 is complete.
        moveHanoi(n-1, inter, dest, source);
        // REFERENCE POINT 3// At this point implementation of Step 3 is complete.
    }
}

console.log("This program solves the Towers of Hanoi problem");
let rl = readline.createInterface(process.stdin, process.stdout);
rl.question("Enter the number of disks: ", numberOfRings => {
    moveHanoi(parseInt(numberOfRings), 'A', 'C', 'B');rl.close();
});
