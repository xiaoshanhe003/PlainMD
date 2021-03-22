# Python program to convert
# JSON file to CSV

import json
import csv

# file names
csvFilePath = r'data.csv'
jsonFilePath = r'data.json'

def json_to_csv(csvFilePath, jsonFilePath):
    # open json file
    with open(jsonFilePath) as json_file: 
        data = json.load(json_file)
    
    # open the csv file for writing 
    data_file = open(csvFilePath, 'w')
    csv_writer = csv.writer(data_file) 

    # write csv file
    count = 0
    for item in data["definitions"]: 
        if count == 0: 
            # Writing headers of CSV file 
            header = item.keys() 
            csv_writer.writerow(header) 
            count += 1
    
        # Writing data of CSV file 
        csv_writer.writerow(item.values()) 
  
    data_file.close()

if __name__ == "__main__":
    json_to_csv(csvFilePath,jsonFilePath)