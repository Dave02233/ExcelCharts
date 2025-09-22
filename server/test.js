const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3001');

ws.on('open', () => {
    console.log('Connesso al server WebSocket');
    
    console.log('\nInvio messaggio iniziale');
    ws.send('Ciao server!');
    

    setTimeout(() => {
        console.log('\nChiusura connessione...');
        ws.close();
    }, 60000);
});

let chunks = [];
let expectedChunks = null;

ws.on('message', (msg) => {
    const data = JSON.parse(msg);
    console.log('Risposta dal server:', data);

    chunks[data.index] = data.data;
    expectedChunks = data.total;

    if (chunks.filter(Boolean).length === expectedChunks) { //Filter bool elimina gli undefined
        const fullDataString = chunks.join('');
        const fullData = JSON.parse(fullDataString);
        console.log('Dati riformattati:', fullData);
    }
});

ws.on('close', () => {
    console.log('Connessione chiusa');
});

ws.on('error', (error) => {
    console.error('Errore WebSocket:');
});

console.log('Connessione a ws://localhost:3001');