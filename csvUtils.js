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

function searchHospitalsByRadius(lat, lng, radiusMiles) {
  return new Promise((resolve, reject) => {
    const results = [];
    let totalHospitals = 0;
    let skippedHospitals = 0;

    const rl = readline.createInterface({
      input: fs.createReadStream(CSV_FILE_PATH),
      crlfDelay: Infinity
    });

    let headers = [];
    let isFirstLine = true;

    rl.on('line', (line) => {
      if (isFirstLine) {
        headers = parseCsvLine(line);
        console.log('Headers:', headers);
        isFirstLine = false;
        return;
      }

      totalHospitals++;
      const values = parseCsvLine(line);
      const data = {};
      headers.forEach((header, index) => {
        data[header] = values[index];
      });

      const hospitalLat = parseFloat(data.Latitude);
      const hospitalLng = parseFloat(data.Longitude);
      
      if (isNaN(hospitalLat) || isNaN(hospitalLng)) {
        skippedHospitals++;
        return;
      }

      const distance = calculateDistance(lat, lng, hospitalLat, hospitalLng);
      if (distance <= radiusMiles) {
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
          hospitalOwnership: data['Hospital Ownership'],
          distance: distance.toFixed(2)
        });
      }
    });

    rl.on('close', () => {
      console.log(`Total hospitals processed: ${totalHospitals}`);
      console.log(`Hospitals skipped due to invalid coordinates: ${skippedHospitals}`);
      console.log(`Hospitals found within ${radiusMiles} miles: ${results.length}`);
      resolve(results.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)));
    });

    rl.on('error', (error) => {
      console.error('Error reading file:', error);
      reject(error);
    });
  });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3959; // Radius of the Earth in miles
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in miles
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

module.exports = { searchHospitals, searchHospitalsByRadius };

