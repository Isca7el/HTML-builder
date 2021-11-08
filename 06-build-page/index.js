const fs = require('fs');
const path = require('path');
const fsAsync = require('fs').promises;

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
});

const stylesDir = path.join(__dirname, 'styles');
const copyStyles = path.join(__dirname, 'project-dist', 'style.css');
const componentsHTML = path.join(__dirname, 'components');
const templateHTML = path.join(__dirname, 'template.html');
const writeStyle = fs.createWriteStream(copyStyles);
const projectDir = path.join(__dirname, 'project-dist');
const assets = path.join(__dirname, 'assets');
const creaAssets = path.join(projectDir, 'assets');

async function createHTML() {
  const reg = new RegExp(/\{\{\w+\}\}/g);
  const template = fsAsync.readFile(templateHTML, 'utf-8');
  const components = (await template).match(reg);
  let tempStr = await template;
  components.forEach(async (el) => {
    const replacer = await fsAsync.readFile(path.join(componentsHTML, `${el.replace('{{', '').replace('}}', '')}.html`), 'utf-8');
    tempStr = tempStr.replace(el, replacer);
    await fsAsync.writeFile(path.join(projectDir, 'index.html'), tempStr, 'utf-8');
  });
}

async function copyFile() {
  await fsAsync.rmdir(creaAssets, { maxRetries: 10, recursive: true });

  await fsAsync.mkdir(creaAssets, { recursive: true });

  fs.readdir(assets, (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach((el) => {
      const deepDirPath = path.join(path.join(assets, el));

      fs.mkdir(path.join(creaAssets, el), { recursive: true }, (err) => {
        if (err) {
          throw err;
        }
      });

      fs.readdir(deepDirPath, (err, deepFiles) => {
        deepFiles.forEach((file) => {
          if (err) {
            throw err;
          }
          const input = fs.createReadStream(path.join(deepDirPath, file));
          const output = fs.createWriteStream(path.join(creaAssets, el, file), { autoClose: true });
          input.pipe(output);
        });
      });
    });
  });
}

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


createHTML();
copyFile();
