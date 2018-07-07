require('es6-promise').polyfill();
require('isomorphic-fetch');

const library = require('./lib/brailleLibrary') 
const fs = require('fs');


function readFromFile(filename) {
    return fs.readFileSync(`./${filename}`, 'utf8');
}

var text = readFromFile('message.txt');

var top = [];
var middle = [];
var bottom = [];

function convertMessage(message) {
    var chars = message.split('');
    chars.forEach(e => {
        processChar(e);
    });
}


function processChar(char) {
    var brailles = library[char];
    top.push(brailles[0])
    top.push(" ")

    middle.push(brailles[1])
    middle.push(" ")

    bottom.push(brailles[2])
    bottom.push(" ")
}

convertMessage("this is a test");

top = top.join('')
middle = middle.join('')
bottom = bottom.join('')

console.log(top);
console.log(middle);
console.log(bottom);

var brailleTop, brailleMiddle, brailleBottom;


function readBraille(line1, line2, line3) {
    brailleTop = line1.split(' ');
    brailleMiddle = line2.split(' ');
    brailleBottom = line3.split(' ');

    var letters = []
    for(var i = 0; i < brailleTop.length; i++) {
        var arr = [];
        arr.push(brailleTop[i]); 
        arr.push(brailleMiddle[i]); 
        arr.push(brailleBottom[i]); 
        for (var letter in library) {
            if (library[letter][0] === arr[0]) {
                //check the second one.
                if(library[letter][1] === arr[1]) {
                    if(library[letter][2] === arr[2]) {
                        letters.push(letter)
                    }
                }
            }
        } 
    }
    return letters.join('');
}

translatedWord = readBraille('.0 0. .0 .0 .. .0 .0 .. 0. .. .0 0. .0 .0', '00 00 0. 0. .. 0. 0. .. .. .. 00 .0 0. 00', '0. .. .. 0. .. .. 0. .. .. .. 0. .. 0. 0.');
console.log(translatedWord);