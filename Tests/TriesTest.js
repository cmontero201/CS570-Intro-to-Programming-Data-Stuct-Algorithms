/*
Created by Christian Montero
November 12, 2018
Assignment 4: Trie Articles
*/

const fs = require('fs');
const path = require('path');
var readline = require("readline");

class Node {
    constructor() {
        this.value = null;
        this.word = '';
        this.child = {};
        this.count = 0;
    }

}

class Trie {
    constructor() {
        this.root = new Node(null)
        this.stats = {};
    }

    insert(string) {
        if (string.length === 0) {
            return;
        }

        var curr = this.root;
        var currWord = '';


        for (var i = 0; i < string.length; i++) {
            var char = string[i];
            currWord += char;

            if(curr.child[char] === undefined) {
                curr.child[char] = new Node();
                curr.child[char].value = char;
                curr.child[char].word = currWord;
            }

            if (i === string.length - 1) {
                curr.child[char].child = ''
            }


            curr = curr.child[char];
        }
    }

    freqResult(fullText) {
        var freqInfo = [];
        for(var i = 0; i < fullText.length; i++) {
            freqInfo[i] = [];
            freqInfo[i].push(this.root)
        }



        for(var j = 0; j < fullText.length; j++){
            for(var k = 0; k < freqInfo[j].length; k++) { 
                // console.log('THISSSS',freqInfo[j][k])
                if(freqInfo[j][k].child[fullText[j]] != undefined){
                    freqInfo[j][k].child[fullText[j]].count++;

                    if(j < fullText.length - 1) {
                        freqInfo[j + 1].push(freqInfo[j][k].child[fullText[j]]);
                    }
                }
            }
        }

        this.getStats(this.root)
    }

    getStats(node) {
        if(node.child === '') {
            this.stats[node.word] = node.count;
        }

        for(var char in node.child) {
            if(node.child[char] != undefined) {
                this.getStats(node.child[char])
            }
        }
    }
}

fs.readFile(path.join(__dirname, 'companies.dat'), (err, text) => {
    if (err) {
        // If file does not open diplay err
        console.log('The file could not be opened!')
    }
    else {
        // Copy company names and psuedonames to table
        companyNames = text.toString().split('\n')
        var table = {};

        for (var i = 0; i < companyNames.length; i++) {
            var otherNames = companyNames[i].replace(',','').replace('.','').trim()
            otherNames = otherNames.split('\t')
            for (var j = 0; j < otherNames.length; j++) {
                if (otherNames[j].indexOf(otherNames[0]) != -1 && otherNames[j] != otherNames[0]) {
                    continue;
                }
                else if (otherNames[j] === '') {
                    table[otherNames[j]] = 'end';
                }
                else {
                    name = otherNames[j];
                    table[otherNames[j]] = otherNames[0];
                }
            }
        }

        // Create Trie and add company table
        trieArt = new Trie();
        for(co in table){
            trieArt.insert(co);
        }

        // Check for end of input (look for period)
        function EOA(word) {
            for(var el in article) {
                if(article[el] === '.') {
                    return true;
                }
                else {
                    return false;
                }
            }
        }

        // Prompt user to enter article as standard input
        var rl = readline.createInterface(process.stdin, process.stdout);
        rl.question('Please enter the article\n ', (input) => {
            rl.close();

            var textArr = input.split(' ')
    
            // Remove an, a, and, the, or, but from standard input
            for (var word in textArr) {
                if(textArr[word] === 'an' || textArr[word] === 'a' || textArr[word] === 'and' || textArr[word] === 'the' || textArr[word] === 'or' || textArr[word] === 'but') {
                    textArr.splice(word, 1)
                }
            }

            if(textArr[textArr.length - 1] === '.') {
                var wordCount = textArr.length - 1;
            }
            else {
                wordCount = textArr.length;
            }
        
            //Get Frequency Results
            trieArt.freqResult(input)
            var out = {};
            for(each in trieArt.stats) {
                if(trieArt.stats[each] != 0) {
                    if(out[table[each]] === undefined) {
                        out[table[each]] = trieArt.stats[each];
                    }
                    else {
                        out[table[each]] += trieArt.stats[each];
                    }
                }
            }

            // Build and Dsiplay Table
            console.log('\n\n   COMPANY   |   HIT COUNT   |   RELEVANCE   ');
            console.log('---------------------------------------------');

            var nameCount = 0;
            for (var name in out) {
                nameCount += out[name]
                if(name.length > 5) {
                    console.log(' ' + name + '          ' + out[name] + '              ' + Math.round(out[name] / wordCount * 10000) / 100.00 + '%');
                }
                else {
                    console.log(' ' + name + '              ' + out[name] + '             ' + Math.round(out[name] / wordCount * 10000) / 100.00 + '%');
                }
                
            }

            console.log('\n---------------------------------------------');
            console.log(' TOTAL:             ' + nameCount + '             ' + Math.round(nameCount / wordCount * 10000) / 100.00 + '%');
            console.log('---------------------------------------------');
            console.log('          WORD COUNT:     ' + wordCount);
            console.log('---------------------------------------------');
        });
            
    }
});

