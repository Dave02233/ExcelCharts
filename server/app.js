const express = require('express');
//Web Socket Require
const createWebSocket = require('./webSocket')
const http = require('http');
//CSV 
const readCSV = require('./readCSV');
const findCSVFiles = require('./findCSVFiles.js');


const app = express();
const port = 3001;

//Web Socket
const server = http.createServer(app);
createWebSocket(server);
//

//Find file CSV
findCSVFiles('../client/data/generated')
    .then(data => {
        
        const fullData = {};
        for (let i = 0; i < data.length; i++) {          

            readCSV(data[i].path).then(data => {
                //console.log(data)

                for (let k of Object.keys(data)) {
                    if (!fullData[k]) {
                        fullData[k] = [];
                    };
                    fullData[k].push(data[k]);
                }

                console.log(fullData)
           
            })
        }
    })
    .catch(err => {
        console.error('Errore nel search di file CSV nella cartella')
    });
//

/*Lettura CSV
readCSV('../client/data/generated/2025_W1.csv')
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error('Errore nella lettura del CSV:', err);
    });
*/




server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});