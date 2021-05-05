const operation = require('./module.js');
const fs = require('fs');
var myArgs = process.argv.slice(2);
console.log(new operation.Operation(myArgs[0], myArgs[1]).sum());
const readline = require('readline-sync');

function check(path) {
    if (!fs.existsSync(path)) {
        return "It's nothing.";
    }
    if (fs.lstatSync(path).isDirectory()) {
        return "It is a directory.";
    } 
    if (fs.lstatSync(path).isFile()) {
        return "It is a file" + fs.readFileSync(path, 'utf8');
    }
}

// while(true) {
//     let path = readline.question("Podaj ściezke: ");
//     console.log(check(path));
// }

module.exports.check = check;