// reads input.txt and prints it in reverse order

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';


fs.readFile(path.join(__dirname, 'input.txt'), (err,data) => {
  if (err) console.log('The file could not be oppened', err);
  else {
    var words = data.toString();
  }

  console.log(words.trim())

  var final = ''
  for (var i = words.length - 1; i >= 0; i--) {
    final += words[i];
   }

  var wfinal = '';
  var finalArray = [];
  words = words.replace(/(\n)/gm," ");
  words = words.trim();
  var warray = words.split(' ');
  for (var i = warray.length - 1; i >= 0; i--) {

    finalArray.push(warray[i]);
    }
    wfinal = finalArray.join(' ');


  console.log(final + '\n');
  console.log(wfinal);
});
