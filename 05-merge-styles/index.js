const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'styles');
const { stdout } = require('process');
const bundleArr = [];
const bundel = path.join(__dirname, 'project-dist', 'bundel.css');



fs.readdir(folder, (err, files) => {
  files.forEach(file => {
    const item = path.join(__dirname, 'styles', file);
		const ext = path.parse(item).ext.slice(1);
		if (ext == 'css'){
			fs.createReadStream(bundleArr, 'utf-8').pipe(item);
		}
		console.log(bundleArr);
	});
});