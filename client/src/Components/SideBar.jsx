import { useEffect, useState, useRef } from 'react';
import styles from './Styles/SideBar.module.css'

export const SideBar = ({ open }) => {
    const wsRef = useRef(null);

    useEffect(() => {
        setVisibility(open);
        console.log(open)
    }, [open])

    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        // Crea la connessione WebSocket una sola volta
        if (!wsRef.current) {
            wsRef.current = new window.WebSocket('ws://localhost:3001');
        }
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
            }
        };
    }, []);

    // Funzione sicura per arrayBuffer -> base64
    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const chunkSize = 0x8000;
        for (let i = 0; i < bytes.length; i += chunkSize) {
            binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
        }
        return window.btoa(binary);
    }

    // Invio file in chunk da 1MB
    function sendFileInChunks(ws, file) {
        const chunkSize = 1024 * 1024; // 1MB
        let offset = 0;
        let chunkIndex = 0;
        const totalChunks = Math.ceil(file.size / chunkSize);
        const reader = new FileReader();

        reader.onload = function(e) {
            const base64 = arrayBufferToBase64(e.target.result);
            ws.send(JSON.stringify({
                type: 'csvChunk',
                fileName: file.name,
                chunkIndex,
                totalChunks,
                data: base64
            }));
            offset += chunkSize;
            chunkIndex++;
            if (offset < file.size) {
                readNextChunk();
            }
        };

        function readNextChunk() {
            const slice = file.slice(offset, offset + chunkSize);
            reader.readAsArrayBuffer(slice);
        }
        readNextChunk();
    }

    const handleSubmit = submitEvent => {
        submitEvent.preventDefault();
        const data = new FormData(submitEvent.target);
        const files = data.getAll('path');
        const ws = wsRef.current;
        if (!ws) return;
        files.forEach(file => {
            sendFileInChunks(ws, file);
        });
    };

    return (
        <div className={`${styles.SideBarContainer} ${visibility ? styles.open : styles.closed}`}>
            <form onSubmit={handleSubmit}>
                <div className={styles.pathInput}>
                   <h3>Seleziona una cartella:</h3>
                    <input className={styles.pathObject}
                        name="path"
                        type="file"
                        webkitdirectory="true" 
                        directory="true" //fallback per browser di merda
                        multiple
                    />
                </div>
                <div className={styles.dateInput}>
                    <h3>Seleziona le date:</h3>
                    <div className={styles.dateObject}>
                        <div>
                            <h4>Inizio:</h4>
                            <input name='startDate' type="date" />
                        </div>
                        <div>
                            <h4>Fine:</h4>
                            <input name='endDate' type="date" />
                        </div>
                    </div>
                </div>
                <button type='submit'>Cerca</button>
            </form>

            <div className={styles.blackBackground}/>
        </div>
    )
}

