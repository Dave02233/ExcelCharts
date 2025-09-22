const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const port = 3001;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Cliente connesso');
    
    ws.on('message', (data) => {
        console.log('Ricevuto:', data.toString());
        
        ws.send('Echo: ' + data.toString());
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});