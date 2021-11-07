const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, { withFileTypes: true }, (err, files) => {
  files.forEach(file => {
    const items = path.join(__dirname, 'secret-folder', file);
    fs.stat(items, (err, it) => {
      if (it.isFile()) {
        const name = path.parse(items).name;
        const expansion = path.parse(items).ext.slice(1);
        const size =(it.size / 1024).toFixed(3);
        console.log(`${name} - ${expansion} - ${size}kb`);
      }
    });
  });
});