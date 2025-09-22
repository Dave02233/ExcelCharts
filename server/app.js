const express = require('express');
//Web Socket
const createWebSocket = require('./webSocket')
const http = require('http');

const app = express();
const port = 3001;

//Web Socket
const server = http.createServer(app);
const wss = createWebSocket(server);
//

//CSV Processing
//Gestito in WebSocket

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});