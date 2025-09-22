const WebSocket = require('ws');
//CSV 
const completeCSVProcessing = require('./completeCSVProcessing')

function createWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Cliente connesso');
        
        ws.on('message', (data) => {
            completeCSVProcessing('../client/data/generated')
            .then((data) => {
                console.log(data);

                const jsonString = JSON.stringify(data);
                const maxSize = 10 * 1024 * 1024; //Ben 10MB massimo
                const total = Math.ceil(jsonString.length/maxSize);

                wss.clients.forEach(client => { //Da vedere come gestire le sessioni, per ora lancio i dati a chiunque
                    if(client.readyState === WebSocket.OPEN) {
                        for(let i = 0; i < total; i++) {
                            const sendObj = {
                                type: 'pieceOfData',
                                index: i + 1,
                                total: total,
                                data: jsonString.slice(i * maxSize, (i + 1) * maxSize)
                                // Fidati che ha senso 0 * maxSize prende 10MB 1 * maxSize prende i successivi 10MB
                            }
                            client.send(JSON.stringify(sendObj));
                        }
                    }
                })
            })
            .catch(err => console.error(err));
        });
        
        ws.on('close', () => {
            console.log('Cliente disconnesso');
        });
    });

    console.log('WebSocket server inizializzato');
    return wss;
}

module.exports = createWebSocket;