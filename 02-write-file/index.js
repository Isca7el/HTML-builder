const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { stdin, exit } = process;

console.log('Write something, that to write in file text.txt: \b');

let writeableStream;

const rl = readline.createInterface({
  input: stdin,
  output: writeableStream
});

rl.on('line', line => {
  if (line === 'exit') {
    exit();
  }
  if (!writeableStream) writeableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

  writeableStream.write(`${line} \n`);
});

process.on('exit', () => console.log('\b See you later'));
process.on('SIGINT', () => exit());