const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'files');
const newFolder = path.join(__dirname, 'files-copy');


fs.mkdir(newFolder, { recursive: true }, () => {});

fs.readdir(newFolder, (err, file) => {
  fs.readdir(folder, (err, file) => {
    file.forEach(item => {
      fs.copyFile(path.join(__dirname, 'files', item), path.join(__dirname, 'files-copy', item), () => {});
      const name = path.parse(item).name;
      console.log(`copied file ${name}`);
    });
  });
});