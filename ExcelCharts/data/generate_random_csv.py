import csv
import random

# Configurazione
dir_path = 'c:/Users/Davide/OneDrive/Desktop/ExcelCharts/ExcelCharts/data/generated/'
num_files = 10
rows = 8000
cols = 4

for file_idx in range(1, num_files + 1):
    filename = f'{dir_path}2025_W{file_idx}.csv'
    with open(filename, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        # Scrivi intestazione
        writer.writerow([f'Col{i+1}' for i in range(cols)])
        # Scrivi dati random
        for _ in range(rows):
            row = [random.randint(20, 400) for _ in range(cols)]
            writer.writerow(row)
print('Generazione completata.')
