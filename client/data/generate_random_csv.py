import csv
import random
from datetime import datetime, timedelta

# Configurazione
dir_path = 'C:/Users/Davide/OneDrive/Desktop/Git/ExcelCharts/client/data/generated/'
num_files = 150
rows = 20000
cols = 10

for file_idx in range(1, num_files + 1):
    filename = f'{dir_path}2025_W{file_idx}.csv'
    with open(filename, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        # Scrivi intestazione
        # Scrivi intestazione con Timestamp come prima colonna
        writer.writerow(['Timestamp'] + [f'Data{i+1}' for i in range(cols)])
        start_time = datetime(2025, 1, 1, 0, 0, 0) + timedelta(weeks=file_idx-1)
        # Scrivi dati random con timestamp ISO per ogni riga
        for i in range(rows):
            timestamp = (start_time + timedelta(seconds=i)).isoformat()
            row = [timestamp] + [random.randint(20, 400) for _ in range(cols)]
            writer.writerow(row)
        # Scrivi prima riga con timestamp progressivo (numero settimana)
        
print('Generazione completata.')
