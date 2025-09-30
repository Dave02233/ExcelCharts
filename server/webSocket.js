const WebSocket = require('ws');
//CSV 
const completeCSVProcessing = require('./completeCSVProcessing')

function createWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Cliente connesso');
        
        const fs = require('fs');
        const path = require('path');

        // Stato temporaneo per i chunk ricevuti
        const uploadState = {};

        ws.on('message', async (message) => {
            try {
                const msg = JSON.parse(message);
                // Ricezione chunk
                if (msg.type === 'csvChunk') {
                    /* msg: {
                        type: 'csvChunk',
                        fileName: '...',
                        chunkIndex: 0,
                        totalChunks: 5,
                        data: 'base64...'
                    } */
                    if (!uploadState[msg.fileName]) {
                        uploadState[msg.fileName] = { chunks: [], total: msg.totalChunks };
                    }
                    uploadState[msg.fileName].chunks[msg.chunkIndex] = msg.data;

                    // Se tutti i chunk sono arrivati
                    const received = uploadState[msg.fileName].chunks.filter(Boolean).length;
                    if (received === uploadState[msg.fileName].total) {
                        // Ricostruisci file
                        const tempDir = path.join(__dirname, 'tempCSV_' + Date.now());
                        fs.mkdirSync(tempDir);
                        const filePath = path.join(tempDir, msg.fileName);
                        const fileData = uploadState[msg.fileName].chunks.map(b64 => Buffer.from(b64, 'base64'));
                        fs.writeFileSync(filePath, Buffer.concat(fileData));

                        // Elabora la cartella
                        const result = await completeCSVProcessing(tempDir);
                        const jsonString = JSON.stringify(result);
                        wss.clients.forEach(client => {
                            if (client.readyState === WebSocket.OPEN) {
                                client.send(jsonString);
                            }
                        });

                        // Pulisci
                        fs.unlinkSync(filePath);
                        fs.rmdirSync(tempDir);
                        delete uploadState[msg.fileName];
                    }
                }
            } catch (err) {
                console.error('Errore upload CSV:', err);
            }
        });
        
        ws.on('close', () => {
            console.log('Cliente disconnesso');
        });
    });

    console.log('WebSocket server inizializzato');
    return wss;
}

module.exports = createWebSocket;