const fs = require('fs');
const readline = require('readline');

const CSV_FILE_PATH = './Hospital_General_Information.csv';

function parseCsvLine(line) {
  const values = [];
  let currentValue = '';
  let insideQuotes = false;

  for (let char of line) {
    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      values.push(currentValue.trim());
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  values.push(currentValue.trim());
  return values;
}

function searchHospitals(query) {
  return new Promise((resolve, reject) => {
    const results = [];
    const rl = readline.createInterface({
      input: fs.createReadStream(CSV_FILE_PATH),
      crlfDelay: Infinity
    });

    let headers = [];
    let isFirstLine = true;
    let lineCount = 0;

    rl.on('line', (line) => {
      lineCount++;
      if (isFirstLine) {
        headers = parseCsvLine(line);
        console.log('Headers:', headers);
        isFirstLine = false;
        return;
      }

      const values = parseCsvLine(line);
      const data = {};
      headers.forEach((header, index) => {
        data[header] = values[index];
      });

      if (data['Facility Name'] && data['Facility Name'].toLowerCase().includes(query.toLowerCase())) {
        console.log('Match found:', data['Facility Name']);
        results.push({
          facilityName: data['Facility Name'],
          address: data['Address'],
          city: data['City/Town'],
          state: data['State'],
          zipCode: data['ZIP Code'],
          phoneNumber: data['Telephone Number'],
          overallRating: data['Hospital overall rating'],
          emergencyServices: data['Emergency Services'],
          hospitalType: data['Hospital Type'],
          hospitalOwnership: data['Hospital Ownership']
        });
      }

      if (lineCount % 1000 === 0) {
        console.log(`Processed ${lineCount} lines...`);
      }

      if (results.length >= 10) {
        rl.close();
      }
    });

    rl.on('close', () => {
      console.log(`Finished processing. Total lines: ${lineCount}`);
      console.log(`Total results found: ${results.length}`);
      resolve(results.slice(0, 10));
    });

    rl.on('error', (error) => {
      console.error('Error reading file:', error);
      reject(error);
    });
  });
}

module.exports = { searchHospitals };