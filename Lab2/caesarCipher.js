/*
that increases by 2 after every 3 characters (including symbol characters,
which are not encoded), starting at key = 5. You should save this message to a
file using a text editor. Then, your program will prompt the user for the name
of the file, decrypt the message stored in the file, and then write the
decrypted message to a new file called solution.txt.

A sample message talking about getting 5 points of extra credit appears below:

Htsnyhcdjwlevbah! Pfl zxo afsb dwusb srnsyz!
*/


var fs = require('fs');
var readline = require('readline');
var path = require('path');

//Prompt user to enter file name  Save file to contents to string
var rl = readline.createInterface(process.stdin, process.stdout);

rl.question('\nEnter the text filename (include .txt)\n>>> ', (fname) => {
  console.log('Opening', fname);
  rl.close()
  fs.readFile(path.join(__dirname, fname), (err, data) => {
    if (err) {
      console.log('An error occured. The file could not be opened.', err)
    }
    else {
      var text = data.toString();
      var decrypted = cipher(text);
      console.log(data.toString());
      console.log(decrypted)
      fs.writeFileSync('solution.txt', decrypted)
    }
  })
  
});


// Decrypt
function cipher(string) {
  var key = 5;
  var inText = string.split('');
  var alph = 'abcdefghijklmnopqrstuvwxyz';
  var alphUp = alph.toUpperCase();
  var aChar = alph[0].charCodeAt(0);
  var zChar = alph[25].charCodeAt(0);
  var AChar = alphUp[0].charCodeAt(0);
  var ZChar = alphUp[25].charCodeAt(0)
  var output = '';
 
  for (var i = 0; i <= inText.length - 1; i++) {
    if ((i % 3 == 0) && i != 0) {
      key += 2;
      if (key > 26) {
        key = key % 26;
      }
    }

    currChar = inText[i].charCodeAt(0);

    if ((currChar >= AChar) && (currChar <= ZChar) || (currChar >= aChar) && (currChar <= zChar)) {
      if ((currChar >= AChar) && (currChar <= ZChar) && ((currChar - key) < AChar)) {
        currChar = 90 - Math.abs(((currChar - 64) - key));
      }
      else if ((currChar >= aChar) && (currChar - key < aChar)) {
        currChar = 122 - Math.abs((currChar - 96) - key);
      }
      else {
        currChar = currChar - key;
      }
      output += String.fromCharCode(currChar);
    }
    else {
      output += String.fromCharCode(currChar);
    }
  }

  return output
}
