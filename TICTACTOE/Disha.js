/*
Created by Christian Montero
September 5, 2018
Edited September 18, 2018
Assignment 1: TicTacToe
This script creates a customizeable game of tictactoe in the comand line
*/

var default_settings={
  playerSize:2,
  boardSize:3,
  winSequence:3,
  currentPlayer:0
};
var currentBoard=[];
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const readlineSync = require("readline-sync");
const playerNames = ['X','O','A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','Y','Z'];
var count = 0;

//CHRISTIAN
initGame();
function initGame() {
  console.log('Hello! Welcome to the game of Tic Tac Toe!\n\nGame Menu:');
  var options = ['New Game', 'Load Game']
  index = readlineSync.keyInSelect(options, 'Select a game option ...') //from npm doc readline-sync
  console.log('Okay', options[index], 'selected!')
  if (index === 0){
    NewGameQuestions();
  }
  else if (index === 1) {    
    LoadGame();
  }
  else {
    //exit game
  }
}
//CHRISTIAN
function createMatrix(size){
  let matrix=[];
  for(let i=0;i<size;i++){
    let row=[];
    for(var j=0;j<size;j++){
      row.push(' ');
    }
    matrix.push(row);
  }
  console.log("\n",matrix,"\n\n");
  return matrix;
}
function create_board(size) {
  var board = '';
  var totRows = (size * 2) - 1;
  var initColHead = '    '; //includes 3sp for header (col #0) and 3sp col #1
  var colHead = '   '; //includes 3sp for col header
  var colStart = '     '; // includes 5sp for col start
  var midCol = '|   '; //middle col divider 4sp
  var colEnd = '\n   '; // ends col 4sp
  var midRow = '---' // includes 3sp for header (col#0) and 3sp for col # 1
  var cornerRow = '+' // middle row divider 4sp

  //First row header
  for (var header = 0; header <= size - 1; header++) {
    if (header == 0) {
      board += (initColHead + (header + 1));
    }
    else {
      board += (colHead + (header + 1));
    }
  }

  //rest of board
  for (var row = 0; row < size; row++) {
    board += '\n' + (row + 1) + colStart;
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
  return board;
}
//DISHA
function NewGameQuestions(){
  let incorrect_message=("The values you entered for one or more of the variables are incorrect. Please try again");
let error_in_input=0;
  
  var r1=readline.createInterface(process.stdin, process.stdout);
r1.question("\nHow many players to play? (max=26)  \n",(playerSize)=>{
  if(playerSize>1&&playerSize<=26){
    default_settings.playerSize=parseInt(playerSize);
    console.log(default_settings.playerSize);
    r1.question("\nWhat is the size of the board? (max=999)\n",boardSize=>{
      //console.log("here");
      if(boardSize>2&&boardSize<=999){
      default_settings.boardSize=parseInt(boardSize);
      r1.question("What is the win sequence?\n",(winSequence)=>{
        if(winSequence>0&&winSequence<=boardSize){
          default_settings.winSequence=parseInt(winSequence);
          //if all is well
          r1.close();

          startNewGame(default_settings);

        }
        //else for win seq
        else{ //console.log("win seqerror ");error_in_input=1;
        console.log(incorrect_message);
        NewGameQuestions();

        }
      })
      }
      //else for board seq
      else{//console.log(" borad seqerr");
        error_in_input=1;
        console.log(incorrect_message);
        NewGameQuestions();
      }
    })
  }
  //else for players
  else{//console.log(" players err");
    error_in_input=1;
    console.log(incorrect_message);
        NewGameQuestions();
  }
  
});
}
//DISHA
function startNewGame(){
  currentBoard=createMatrix(default_settings.boardSize);
  board=create_board(default_settings.boardSize);
  console.log(board);
  readTurns();
}



//DISHA
function readTurns(){
  if(default_settings.currentPlayer>=default_settings.playerSize) {
    default_settings.currentPlayer=0;
  }
  var r1=readline.createInterface(process.stdin, process.stdout);
  r1.question("Enter row,column\n or\n type save to save the game: ", (answer)=>{
    if(answer==='save'||answer==="SAVE"){
      r1.close();
      console.log("Saving game...\n..\n.. \nGame Saved");
      return;
    }
    let position=answer.split(',');
    currentPlayerMove((parseInt(position[0])-1),parseInt((position[1])-1),playerNames[default_settings.currentPlayer]);
    r1.close();
    default_settings.currentPlayer++;
    readTurns()
  });
}

//DISHA
function currentPlayerMove(row,column,player){ // FUNCTION currPlay
  // console.log(row,column,player);
  if(currentBoard[row][column]===' '){
    console.log('Player', player,"has moved");
    currentBoard[row][column]=player;
    console.log(currentBoard);
  }
  else{
    console.log('This space is already taken.\n This move is invalid');
  }
  checkWinSeq(currentBoard,player);
}

//DISHA
function checkWinSeq(currentBoard,player){ // FUNCTION gameWon
  if(checkRowSeq(currentBoard,player)||checkColumnsSeq(currentBoard,player)||checkDiagonalsSeq(currentBoard,player)){
    Console.log("Congratulations!\nUser ", player,"has won!");
  }
  else{
    console.log("Keep Trying!");
  }
}

//DISHA
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
      ListSavedGames();
    }
    else {
      console.log("Still to do");
      r1.close();
      //LoadSavedGame();
    }
  });
}

//DISHA
function ListSavedGames(){
  var txtFile=__dirname+"/savedGames.txt";
  var input=fs.createReadStream(txtFile);
  var r1=require('readline').createInterface({
    input:input,
    terminal:false
  });
  r1.on('line',function(line){
    console.log("Game =>",line );
  });
  /*console.log(txtFile);
  var file=new File(txtFile);
  file.open("r");
*/
}






function checkRowSeq(currentBoard,player){

}
function checkColumnsSeq(currentBoard,player){
  
}
function checkDiagonalsSeq(currentBoard,player){
 
}

function playerMove(row,col) {
  '...'
}

function gameWon(){
  '...'
};

function gameTie(){
  '...'
};

function saveGame(){
  '...'
}

function isMoveValid(board, row, col){
  '...'
}

function isFull(board) {
  '...'
}

function winningCombos(board){
  '...'
}




// Gets player number .. output players and player letter DONE
/*function playerCount() {
  var players = readlineSync.question('How many players are in this game? (2-26)\n>>> ');
  if (players < 2) {
    count ++
    console.log('Uh-oh! This game requires 2 or more players!\n')
    if (count < 3) playerCount()       
    else {
      console.log('Too many invalid inputs ... game termninated\n...\nGoodbye!')
      exit()
    }
  }
  else {
    console.log('\nOkay', players, 'players!')
     var playList = {};
     for (var i = 0; i <= players - 1; i++){
       label = 'XOABCDEFGHIJKLMNPQRSTUVWYZ'.split('');
       playList[i + 1] = label[i]
    }
  }
  players = Number(players)
  return { players, playList};
  //console.log(Number(players));
  //console.log(playList);
};*/
// Gets board size from suer .. output size DONE
/*function boardSize() {
  var size = readlineSync.question('How many rows and columns will the baord have? (3-26)\n>>> ');
  if (size < 3) {
    count ++;
    console.log('The minimum board size is 3!\n');
    if (count < 3) boardSize(); 
    else {
      console.log('Too many invalid inputs ... the game is being termninated \n...\nGoodbye!');
      //.exit()
    }
  }
  return Number(size);
  //console.log(Number(size));
}*/
// Gets win condition from user .. output winCond DONE
/*function winSeq() {
  var winCond = readlineSync.question('Choose the winning conditon. Remember, for a standard game a sequence of 3 wins (3-999)\n>>> ');
  count = 0;
  if (winCond < 3) {
    count ++
    console.log('The minimum win sequence is 3!\n');
    if (count < 3) winSeq(); 
    else {
      console.log('Too many invalid inputs ... game termninated \n...\nGoodbye!');
      //.exit();
    }
  }
  else {
    console.log('Okay! To win this game, the player needs to get', winCond, 'places in a row...')
  }
  winCond = Number(winCond);
  return winCond;
  //console.log(Number(windCond));
}*/
// Creates board 









/*
Repeat the following process over and over again until the user saves
and quits, the game is won, or a tie occurs:
  Ask the user for a row and column number separated by spaces, or Q to quit.
  Put the appropriate symbol for that player in the specified spot. Players
  should be given the following symbols, in order: XOABCDEFGHIJKLMNPQRSTUVWYZ
  If the user chooses instead to save and quit, ask them for a filename in a
  prompt on its own line. Then, save to that file and quit.
*/


