
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

LoadGame();

// var gameObj = JSON.parse(dataString);


function LoadGame(){
  var r1=readline.createInterface(process.stdin, process.stdout);

  r1.question("\nPlease enter the saved file name or simply press ENTER key to show a list of saved games or press 0 to return to main menu: ", (choice)=>{
    if(choice === "0"){
      console.log("You have chosen MAIN MENU!\n");
      r1.close();
      initGame();
    }
    else if(choice==""){
      console.log("You have chosen to open File List!\n");
      r1.close();
      ListSavedGames("savedGames.txt", selectFromSavedGame);   
    }
    else {
      r1.close();
      fileName = choice + '.json'
      console.log('Opening ' + choice + '.json');
      
      var rawData = fs.readFileSync(fileName)

      gameObject = JSON.parse(rawData);
      currentBoard = gameObject.board;

      readTurns();
    }
  });
}