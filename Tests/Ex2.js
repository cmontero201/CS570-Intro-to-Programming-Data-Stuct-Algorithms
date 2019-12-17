"use strict";
exports.__esModule = true;
var fs = require("fs");
var readlineSync = require("readline-Sync");
var path = require("path");


// prompt for file name from user
var fname = readlineSync.question('Enter the file you would like to display: ');
var text = '';
fs.readFile(path.join(__dirname, fname), function (err, data) {
    if (err) {
        console.log('The file could not be opened...Try Again...', err);
    }
    else {
        console.log('The file ' + fname + ' contains...', data.toString());
        var text = data.toString();
        var backWords = [];
        var wordArr = text.split(' ');
        for (var i = 0; i <= wordArr.length - 1; i++) {
            var holder = wordArr[i];
            var back = holder.split('').reverse().join('');
            backWords.push(back);
        }
        var backText = backWords.join(' ');
        console.log("\n\n\nBacktext: \n" + backText);
    }
});
