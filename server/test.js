const WebSocket = require('ws');

// Creare connessione WebSocket
const ws = new WebSocket('ws://localhost:3001');

// Test di connessione
ws.on('open', () => {
    console.log('✅ Connesso al server WebSocket');
    
    // Test 1: Messaggio semplice
    console.log('\n📤 Invio messaggio di test...');
    ws.send('Ciao server!');
    
    // Test 2: Messaggio con dati CSV simulati dopo 2 secondi
    setTimeout(() => {
        console.log('\n📤 Invio dati CSV simulati...');
        const csvData = 'Nome,Età,Città\nMario,25,Roma\nLuigi,30,Milano\nPeach,28,Napoli';
        ws.send(csvData);
    }, 2000);
    
    // Test 3: Messaggio JSON dopo 4 secondi
    setTimeout(() => {
        console.log('\n📤 Invio dati JSON...');
        const jsonData = JSON.stringify({
            type: 'csv-file',
            filename: 'test.csv',
            data: 'Nome,Età,Città\nMario,25,Roma\nLuigi,30,Milano'
        });
        ws.send(jsonData);
    }, 4000);
    
    // Chiudere connessione dopo 6 secondi
    setTimeout(() => {
        console.log('\n🔌 Chiusura connessione...');
        ws.close();
    }, 6000);
});

// Ricevere messaggi dal server
ws.on('message', (data) => {
    console.log('📨 Risposta dal server:', data.toString());
});

// Gestire chiusura connessione
ws.on('close', () => {
    console.log('❌ Connessione chiusa');
    process.exit(0);
});

// Gestire errori
ws.on('error', (error) => {
    console.error('🚨 Errore WebSocket:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
        console.log('\n💡 Suggerimento: Assicurati che il server sia avviato con "node app.js"');
    }
    
    process.exit(1);
});

console.log('🚀 Tentativo di connessione a ws://localhost:3001...');