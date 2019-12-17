
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const readlineSync = require("readline-sync");

var gameObject = {
  players: 2,
  size: 3,
  winCond: 3,
  count: 1,
  moves: 8,
  playSymbols: {1: 'X', 2: 'O'}
};

currentBoard = [ [ 'X', 'O', 'X' ], [ 'X', 'O', 'O' ], [ 'X', 'O', ' ' ] ];
saveGame(currentBoard, gameObject);


//let savedGameNumber=0;
function saveGame(currentBoard, gameObject){
  gameObject.board = [];
  gameObject.board = currentBoard;
  var data = gameObject;
  var rl = readline.createInterface(process.stdin, process.stdout);
  rl.question('\nEnter the filename to save...\n', (fname) => {
    if (fname == '') {
      console.log('NO')
      rl.close();
    }
    else {
      rl.close();
      console.log('Saving as ' + fname + '.json')
      
      fileName = (fname +'.json');
      dataString = JSON.stringify(gameObject);

      //REFERENCE: https://stackabuse.com/reading-and-writing-json-files-with-node-js/
      fs.writeFileSync(fileName, dataString);

    }
    
  });
}

