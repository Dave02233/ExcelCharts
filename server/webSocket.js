const WebSocket = require('ws');

function createWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Cliente connesso');
        
        ws.on('message', (data) => {
            console.log('Ricevuto:', data.toString());
            
            ws.send('Echo: ' + data.toString());
        });
        
        ws.on('close', () => {
            console.log('Cliente disconnesso');
        });
    });

    console.log('WebSocket server inizializzato');
    return wss;
}

module.exports = createWebSocket;