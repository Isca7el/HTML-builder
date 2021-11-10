const path = require('path');
const fs = require('fs');

fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, (err) => {
  if (err) throw err;

  fs.readdir(path.join(__dirname, 'files-copy'), {withFileTypes: true}, (err, files) => {
    files.forEach(file => {
      fs.unlink(path.join(__dirname, 'files-copy', file.name), (err) => {
        if (err) throw err;
      })
    })

    fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, files) => {
      files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), (err) => {
          if (err) throw err;
        })
      })
    })
  })
});

