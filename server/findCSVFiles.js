const fs = require('fs');
const path = require('path');

function findCSVFiles(directory) {

    return new Promise((resolve, reject) => {
        fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Errore nella lettura dei nomi: - ', err);
            return reject(err);
        }

        const csvFiles = files
        .filter(file => file.endsWith('.csv'))
        .map(file => ({
            name: file,
            path: path.join(directory, file)
        }));

        console.log(`${csvFiles.length} - file CSV da processare`);
        //console.log(csvFiles[0])

        resolve(csvFiles);
    });
    })

}

module.exports = findCSVFiles
