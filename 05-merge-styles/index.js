const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'styles');
const bundel = path.join(__dirname, 'project-dist', 'bundle.css');
const writeStyle = fs.createWriteStream(bundel);

fs.readdir(folder, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach( file => {
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