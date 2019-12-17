const fs = require('fs');
const path = require('path');
const readline = require('readline');
const readlineSync = require("readline-sync");
var count = 0;

playerCount();

function playerCount() {
 
  if (players < 2) {
    count ++
    console.log('\nUh-oh! This game requires 2 or more players!\n')
    if (count < 3) playerCount()       
    else {
      console.log('\nToo many invalid inputs ... game termninated\n...\nGoodbye!')
    }
  }
  else {
    console.log('\nOkay', players, 'players!')
     var playList = {};
     for (var i = 0; i <= players - 1; i++){
       label = 'XOABCDEFGHIJKLMNPQRSTUVWYZ'.split('');
       playList[i + 1] = label[i]
       console.log('Player',[i+1],'Symbol:', label[i])
    }

  }
  players = Number(players)
  return { players, playList};
 
};