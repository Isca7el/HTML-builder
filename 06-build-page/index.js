const fs = require('fs');
const path = require('path');
const projectDir = path.join(__dirname, 'project-dist');

fs.mkdir(projectDir, { recursive: true }, (err) => {
  if (err) throw err;
});

//create Html file
fs.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, data) => {
  let result = data;

  fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
      if (path.extname(path.join(__dirname, 'components', file.name)) == '.html') {
        fs.readFile(path.join(__dirname, 'components', file.name), 'utf-8', (err, data) => {

          result = result.split(`{{${file.name.split('.')[0]}}}`).join(data);
          fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), result, (err) => {
            if (err) throw err;
          });
        });
      }
    });
  });
});


fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(path.join(__dirname, 'assets'), { withFileTypes: true }, (err, dirs) => {
  dirs.forEach(dir => {

    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', dir.name), { recursive: true }, (err) => {
      if (err) throw err;

      fs.readdir(path.join(__dirname, 'project-dist', 'assets', dir.name), { withFileTypes: true }, (err, files) => {
        files.forEach(file => {
          fs.unlink(path.join(__dirname, 'project-dist', 'assets', dir.name, file.name), (err) => {
            if (err) throw err;
          });
        });

        fs.readdir(path.join(__dirname, 'assets', dir.name), { withFileTypes: true }, (err, files) => {
          files.forEach(file => {
            fs.copyFile(path.join(__dirname, 'assets', dir.name, file.name), path.join(__dirname, 'project-dist', 'assets', dir.name, file.name), (err) => {
              if (err) throw err;
            });
          });
        });
      });
    });
  });
});


//Create styles
const stylesDir = path.join(__dirname, 'styles');
const copyStyles = path.join(__dirname, 'project-dist', 'style.css');
const writeStyle = fs.createWriteStream(copyStyles);
fs.readdir(stylesDir, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      if (file.isFile()) {
        const fileName = file.name.toString();
        const ext = file.name.toString().split('.')[1];
        if (ext == 'css') {
          fs.readFile(path.join(__dirname, 'styles', fileName), 'utf-8', (err, data) => {
            if (err) throw err;
            const bundleArr = [];
            const datasStyle = data.toString();
            bundleArr.push(datasStyle);

            for (let i = 0; i < bundleArr.length; i++) {
              writeStyle.write(bundleArr[i]);
            }
          });
        }
      }
    });
  }
});