/*
Created by Christian Montero and Disha
September 5, 2018
Last Edited September 18, 2018
Assignment 1: TicTacToe
This script creates a customizeable game of tictactoe in the command line
*/

const fs = require('fs');
const readline = require('readline');
const readlineSync = require("readline-sync");
initGame();

// Holds game parameters .. global variables
// Disha
var gameObject = {
  players: 0,
  size: 0,
  winCond: 0,
  count: 0,
  moves: 0,
  playSymbols: {}
}

// Initializes the game and determines script path MOSTLY DONE
// Christian
function initGame() {
  console.log('Hello! Welcome to the game of\n       Tic Tac Toe!\n');
  console.log('\n      ___|___|___\n      ___|___|___\n         |   |   \n\nGame Menu:');
  
  var options = ['New Game', 'Load Game']
  
  index = readlineSync.keyInSelect(options, 'Select a game option ...') //from npm doc readline-sync
  console.log('\nOkay', options[index], 'selected!\n')
  
  // NewGame
  if (index === 0){
    playerCount();
  }

  // Load Game
  else if (index === 1) {    
    console.log('\nLoading previous games ...')
    loadGame();
  }

  // Quit Game
  else {
    process.exit(1);
  }
}

// Gets player number .. output players and player letter 
// Christian & Disha equal parts
function playerCount() {
  var rl = readline.createInterface(process.stdin, process.stdout);

  // Get Player Count .. allow 3 tries before quitting game
  rl.question('\nHow many players are in this game? (2-26)\n>>> ', (players) => {
    if (players < 2) {
      count ++
      console.log('\nUh-oh! This game requires 2 or more players!\n')
      if (count < 3) playerCount();       
      else {
        console.log('\nToo many invalid inputs ... game termninated\n...\nGoodbye!')
      }
    }
    else if( players == '') {
      playerCount();  
    }
    else {
      console.log('\nOkay', players, 'players!')
      var playList = {};
      for (var i = 0; i <= players - 1; i++){
        label = 'XOABCDEFGHIJKLMNPQRSTUVWYZ'.split('');
        playList[i + 1] = label[i]
      }
    gameObject.playSymbols = playList;
    gameObject.players = Number(players);

    // Get Board Size .. allow 3 tries before quitting game
    rl.question('\nHow many rows and columns will the board have? (3-26)\n>>> ', (size) => {
      if (size < 3) {
        count ++;
        console.log('\nThe minimum board size is 3!\n');
        if (count < 3) playerCount();  
        else if( size == '') {
          playerCount();  
        }
        else {
          console.log('\nToo many invalid inputs ... the game is being termninated \n...\nGoodbye!');
        }
      }
      else {
        gameObject.size = Number(size);

        // Get Winning condition .. allpw 3 tries before quitting game
        rl.question('\nChoose the winning conditon. Remember, for a standard game a sequence of 3 wins (3-999)\n>>> ', winCond => {
          if (winCond < 3) {
            count ++
            console.log('\nThe minimum win sequence is 3!\n');
            if (count < 3) playerCount();  
            else if( winCond == '') {
              playerCount();  
            }
            else {
            console.log('\nToo many invalid inputs ... game termninated \n...\nGoodbye!');
            }
          }
          else if( winCond > gameObject.size) {
            console.log('\nThis condition is not possible. Try again ...\n');
            playerCount(); 
          }
          else {
            console.log('\nOkay! To win this game, the player needs to get', winCond, 'places in a row...\n')
            gameObject.winCond = Number(winCond);
            rl.close()
  
            newGame();
          }
        });
      }
    });
  }
});
};

// Christian
function newGame() {
  // Creates local variables of game parameters
  var players= gameObject.players;
  var playSymbols = gameObject.playSymbols;
  var size = gameObject.size;
  var winCond = gameObject.winCond;

  // Creates empty game board for display
  // Christian
  function createBoard(size) {
    var board = '';
    var totRows = (size * 2) - 1;
    var initColHead = '    '; //includes 3sp for header (col #0) and 3sp col #1
    var colHead = '   '; //includes 3sp for col header
    var colStart = '     '; // includes 5sp for col start
    var midCol = '|   '; //middle col divider 4sp
    var colEnd = '\n   '; // ends col 4sp
    var midRow = '---' // includes 3sp for header (col#0) and 3sp for col # 1
    var cornerRow = '+' // middle row divider 4sp
  
    // Loop to create string for column headers (top)
    for (var headerCount = 0; headerCount <= size - 1; headerCount++) {
      if (headerCount == 0) {
        board += (initColHead + (headerCount + 1));
      }
      else {
        board += (colHead + (headerCount + 1));
      }
    }
  
    // Loops to concatenate string for entire board incl row headers (side)
    for (var row = 0; row < size; row++) {
      if (row < 9) {
        board += '\n' + (row + 1) + colStart;
      }
      else if (row > 99) {
        board += '\n' + (row + 1) + '   ';
      }
      else {
        board += '\n' + (row + 1) + '    ';
      }
      
      for (var col = 0; col < size - 1; col++) {
        board += midCol;
      }
      board += colEnd;
  
      if (row < size - 1) {
        for (var div = 0; div < (totRows); div++) {
         if (div % 2 != 0) {
           board += cornerRow;
          }
          else {
           board += midRow;
          }
        }
     }
    }
    return board
  }

  // Creates matrix that will be used for symbol placement in game background
  // Disha
  function createMatrix(size) {
    let matrix=[];
    for(let i=0;i<size;i++){
      let row=[];
      for(var j=0;j<size;j++){
        row.push(' ');
      }
      matrix.push(row);
    }
    return matrix;
  }
  
  currentBoard = createMatrix(size);
  board = createBoard(size);
  console.log(board);
  
  readTurns();
}
 
//Disha and Christian
function readTurns() {

  rl1 = readline.createInterface(process.stdin, process.stdout);
 

  if (gameObject.count > gameObject.players - 1) {
    gameObject.count = 0;
  }

  var check = false 
  if (check == false) { 
    rl1.question ('\nEnter the row & column to place your symbol using the follwoing format: row col\nTo save the game type save or S\nTo quit the game type quit or Q\n>>> ', (playMove) => {
      playMove = playMove.toLowerCase();
      if (playMove == 'q' || playMove == 'quit') {
        rl1.close();
        console.log('\nGoodbye!\n')
        process.exit(1)
      }
      else if (playMove == 'save' || playMove == 's') {
        rl1.close();
        saveGame(currentBoard, gameObject);
      }
      else {
        rl1.close();
        gameObject.count ++ //count init at 0, determines current player should go 1 .. 2 .. reset
      var movePosition = playMove.split(' ');
      var row = Number(movePosition[0]) - 1;
      var col = Number(movePosition[1]) - 1;
      var symb = gameObject.playSymbols[gameObject.count]
      playerMove(row, col, symb)
      gameObject.moves++
      readTurns();
      }
    });
  }
  else {
    console.log('We have a winner!')
  }
  
};

//Disha edited by Christian
function playerMove(row, col, symb){
  if(currentBoard[row][col]===' '){
    console.log('\nPlayer', gameObject.count, "has moved");
    currentBoard[row][col]=symb;
  }
  else{
    console.log('\nThis spot is unavailable. Invalid Move...\nTry Again!');
    gameObject.count --;
    readTurns();
  }
  checkBoard(currentBoard, row, col);
}

//Disha edited by Christian
function checkBoard(currentBoard, row, col){
  if (winningCombos(currentBoard, row, col) == true) {
    printBoard();
    console.log('\nGAME OVER!\n\nPLAYER', gameObject.count, 'WINS!!');
    process.exit(1);
  }
  else if (tieGame(currentBoard) == true) {
    printBoard();
    console.log('\nGAME TIED.\nNO WINNERS ...\nGOODBYE');
    process.exit(1);
  }
  else {
    var nextPlayer = gameObject.count + 1
    if (nextPlayer > gameObject.players) {
      nextPlayer = 1
    }
    console.log('\nPlayer', nextPlayer, 'turn ...\n\n')
    printBoard()
  }
};

//Christian
//Error is displayed if winning is not possible 5pts
//Correct win lose tie scenarios 20pts
function winningCombos(currentBoard, row, col){
  winCount = 0;

  // check rows
  for (var i = 1; i <= gameObject.winCond; i++) {
    if (row == 0 && col == 0) {
      continue
    }
    else if (currentBoard[row][col] == currentBoard[row][gameObject.size - i]) {
      winCount ++

      if (winCount < gameObject.winCond) {
        continue
      }
      else if (winCount > gameObject.winCond) {
        return true
      }
    }
  }

  // check cols
  for (var i = 1; i <= gameObject.winCond; i++) {
    if (row == 0 && col == 0) {
      continue
    }
    else if (currentBoard[row][col] == currentBoard[gameObject.size - i][col]) {
      winCount ++

      if (winCount < gameObject.winCond) {
        continue
      }
      else if (winCount > gameObject.winCond) {
        return true
      }
    }
    
  }

  //check diags forward
  var iter = 0;
  for (var i = 1; i < gameObject.winCond; i++) {
    iter ++
    if (row == 0 && col == 0) {
      continue
    }
    if ((row - iter) >= 0  && (col - iter) >= 0 && (currentBoard[row][col] == currentBoard[row - iter][col - iter])) {
      winCount ++
      if (winCount < gameObject.winCond) {
        continue
      }
      else if (winCount > gameObject.winCond) {
        return true
      }
    }
  }
  
  var iter = 0;
  for (var i = 1; i < gameObject.winCond; i++) {
    iter ++
    if ((row + iter) < gameObject.size  && (col + iter) < gameObject.size && (currentBoard[row][col] == currentBoard[row + iter][col + iter])) {
      winCount ++
      if (winCount < gameObject.winCond) {
        continue
      }
      else if (winCount > gameObject.winCond) {
        return true
      }
    }
  }

  //get diags backwards
  var iter = 0;
  for (var i = 1; i < gameObject.winCond; i++) {
    iter ++
    if (row == 0 && col == 0) {
      continue
    }
    if ((row + iter) < gameObject.size  && (col - iter) >= 0 && (currentBoard[row][col] == currentBoard[row + iter][col - iter])) {
      winCount ++
      if (winCount < gameObject.winCond) {
        continue
      }
      else if (winCount > gameObject.winCond) {
        return true
      }
    }
  }
  
  var iter = 0;
  for (var i = 1; i < gameObject.winCond; i++) {
    iter ++
    if ((row - iter) >= 0  && (col + iter) < gameObject.size && (currentBoard[row][col] == currentBoard[row - iter][col + iter])) {
      winCount ++
      if (winCount < gameObject.winCond) {
        continue
      }
      else if (winCount > gameObject.winCond) {
        return true
      }
    }
  }

};

// Christian
function tieGame() {
  if (gameObject.moves >= (gameObject.size * gameObject.size)) {
    return true
  }
}

// Function taken from Eloquent JavaScript text chapter 6
// Christian
function repeat(string, times) {
  var result = "";
  for (var i = 0; i < times; i++)
    result += string;
  return result;
}

// Christian
function printBoard() {
  var seeBoard = '';
  var holder = {};
  var headerNum = [];
  for (var row = 1; row <= gameObject.size; row++) {
    headerNum.push(row)
  }
  headerNum = headerNum.toString().replace(/,/g, '   ') //Utilized WeSchools replace method documentation
  holder[0] = headerNum;
  for (var row = 0; row <= gameObject.size-1; row++) {
    holder[row+1] = currentBoard[row].toString().replace(/,/g, ' | ') //Utilized WeSchools replace method documentation
  }

  divRow = repeat('---+', gameObject.size)
  divRow = divRow.slice(0, divRow.length-1)

  for (row = 0; row <= gameObject.size; row++) {
      if (row == 0) {
          seeBoard += '    ' + holder[0] + ' \n'
      }
      else if (row == gameObject.size) {
          seeBoard += row + '   ' + holder[row] + ' \n' 
      }
      else {
          seeBoard += row + '   ' + holder[row] + ' \n' + '   ' + divRow + '\n'
      }
  }
  console.log(seeBoard);
}

// Disha edited by Christian
function loadGame(){
  var r1=readline.createInterface(process.stdin, process.stdout);

  r1.question("\nPlease enter the saved file name or press 0 to return to main menu:\n", (choice)=>{
    if(choice === "0"){
      console.log("You have chosen MAIN MENU!\n");
      r1.close();
      initGame();
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

// Disha edited by Christian
function saveGame(currentBoard, gameObject){
  gameObject.board = [];
  gameObject.board = currentBoard;
  var data = gameObject;
  var rl = readline.createInterface(process.stdin, process.stdout);
  rl.question('\nEnter the filename to save (do not include file type i.e. .txt)...\n', (fname) => {
    if (fname == '') {
      console.log('NO')
      rl.close();
    }
    else {
      
      console.log('Saving as ' + fname + '.json');
      fileName = (fname +'.json');
      dataString = JSON.stringify(gameObject);
      
      //REFERENCE: https://stackabuse.com/reading-and-writing-json-files-with-node-js/
      fs.writeFileSync(fileName, dataString);
      rl.close();
    }
  });
}
