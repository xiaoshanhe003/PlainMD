# Python program to convert
# CSV to JSON file

import json
import csv

# file names
csvFilePath = r'data.csv'
jsonFilePath = r'data.json'

def csv_to_json(csvFilePath, jsonFilePath):
     
    # create a dictionary
    data = {
        "definitions":[]
    }
     
    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)

        for row in csvReader:
            data["definitions"].append(row)

    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))
         

if __name__ == "__main__":
    csv_to_json(csvFilePath, jsonFilePath)

