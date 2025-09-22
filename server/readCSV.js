const csv = require('csv-parser');
const fs = require('fs');

function readCSV(path) {
    return new Promise((resolve, reject) => {
        const outputData = {};
        let readLine = 0;
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', (row) => {
                readLine++;
                for (let i of Object.keys(row)) {
                    if (!outputData[i]) {
                        outputData[i] = [];
                    }
                    outputData[i].push(row[i]);
                }
            })
            .on('end', () => {
                if (readLine === 0) {
                    reject(new Error('No data in CSV'));
                } else {
                    resolve(outputData);
                }
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

module.exports = readCSV;

