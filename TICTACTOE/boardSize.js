const fs = require('fs');
const path = require('path');
const readline = require('readline');
const readlineSync = require("readline-sync");
var count = 0;

boardSize();

function boardSize() {
  var size = readlineSync.question('\nHow many rows and columns will the baord have? (3-26)\n>>> ');
  if (size < 3) {
    count ++;
    console.log('\nThe minimum board size is 3!\n');
    if (count < 3) boardSize(); 
    else {
      console.log('\nToo many invalid inputs ... the game is being termninated \n...\nGoodbye!');
    }
  }
  else {
      console.log('The board size is', size)
  }
 
  return Number(size);
  
}