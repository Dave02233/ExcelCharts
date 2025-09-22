const csv = require('csv-parser');
const fs = require('fs');

function readCSV(path) {
    return new Promise((resolve, reject) => {
        const outputData = {};
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', (row) => {
                if (row.Col1 === undefined) {
                    reject(new Error('No Data on CSV'));
                } else {
                    for (let i of Object.keys(row)) {
                        if (!outputData[i]) {
                            outputData[i] = [];
                        }
                        outputData[i].push(row[i]);
                    }
                }
            })
            .on('end', () => {
                resolve(outputData);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

module.exports = readCSV;

