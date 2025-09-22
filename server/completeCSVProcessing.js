const readCSV = require('./readCSV');
const findCSVFiles = require('./findCSVFiles');
//Sorting
const sortObject = require('./sortObject')

async function completeCSVProcessing(path) {
    try {
        const data = await findCSVFiles(path);
        const readData = {};
        const promises = data.map(async (file) => {
            const csvData = await readCSV(file.path);
            for (let k of Object.keys(csvData)) {
                if (!readData[k]) {
                    readData[k] = [];
                }
                readData[k].push(csvData[k]);
            }
        });
        await Promise.all(promises);
        const formattedData = {};
        for (let k of Object.keys(readData)) {
            formattedData[k] = readData[k].flat();
        }
        const sortedData = sortObject(formattedData);
        return sortedData;
    } catch (err) {
        console.error('Errore nel search di file CSV nella cartella');
        throw err;
    }
}

module.exports = completeCSVProcessing;