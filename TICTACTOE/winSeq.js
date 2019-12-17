const fs = require('fs');
const path = require('path');
const readline = require('readline');
const readlineSync = require("readline-sync");
var count = 0;

winSeq();

function winSeq() {
  var winCond = readlineSync.question('\nChoose the winning conditon. Remember, for a standard game a sequence of 3 wins (3-999)\n>>> ');
  count = 0;
  if (winCond < 3) {
    count ++
    console.log('\nThe minimum win sequence is 3!\n');
    if (count < 3) winSeq(); 
    else {
      console.log('\nToo many invalid inputs ... game termninated \n...\nGoodbye!');
    }
  }
  else {
    console.log('\nOkay! To win this game, the player needs to get', winCond, 'symbols in a row...')
  }
  winCond = Number(winCond);
  return winCond;
  
}