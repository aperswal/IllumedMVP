const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { searchHospitals, searchHospitalsByRadius } = require('./csvUtils');
require('dotenv').config();

console.log('Marketplace CMS API Key:', process.env.MARKETPLACE_CMS_API_KEY);
console.log('Google API Key:', process.env.REACT_APP_GOOGLE_API_KEY);
console.log('Back4App App ID:', process.env.BACK4APP_APP_ID_KEY);
console.log('Back4App API Key:', process.env.BACK4APP_API_KEY ? 'Set' : 'Not Set');


const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/hospitals', async (req, res) => {
  try {
    const searchQuery = req.query.query;
    console.log('Received search query:', searchQuery);

    if (!searchQuery || searchQuery.trim() === '') {
      return res.json([]);
    }

    const results = await searchHospitals(searchQuery);
    
    console.log(`Search complete. Found ${results.length} results.`);
    res.json(results);
  } catch (error) {
    console.error('Error searching hospitals:', error);
    res.status(500).json({ 
      error: 'An error occurred while searching hospitals', 
      details: error.message
    });
  }
});

app.get('/api/hospitals/radius', async (req, res) => {
  try {
    const { address, radius } = req.query;
    console.log('Received radius search:', address, radius);

    const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
    
    console.log('Geocoding response status:', geocodeResponse.data.status);

    if (geocodeResponse.data.status !== 'OK' || !geocodeResponse.data.results || geocodeResponse.data.results.length === 0) {
      console.error('Geocoding failed:', geocodeResponse.data);
      return res.status(400).json({ error: 'Failed to geocode the provided address' });
    }

    const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
    console.log(`Geocoded coordinates: ${lat}, ${lng}`);

    const results = await searchHospitalsByRadius(lat, lng, parseFloat(radius));
    
    console.log(`Radius search complete. Found ${results.length} results.`);
    res.json(results);
  } catch (error) {
    console.error('Error searching hospitals by radius:', error);
    res.status(500).json({ 
      error: 'An error occurred while searching hospitals', 
      details: error.message
    });
  }
});

app.get('/api/counties/:state', async (req, res) => {
  try {
    const { state } = req.params;
    const response = await axios.get(
      'https://parseapi.back4app.com/classes/Uscounties_Area',
      {
        params: {
          where: JSON.stringify({ stateAbbreviation: state }),
          limit: 1000, // Adjust this limit as needed
        },
        headers: {
          'X-Parse-Application-Id': process.env.BACK4APP_APP_ID_KEY,
          'X-Parse-REST-API-Key': process.env.BACK4APP_API_KEY,
        }
      }
    );
    
    console.log('Back4App API Response:', JSON.stringify(response.data, null, 2));

    if (!response.data || !response.data.results) {
      throw new Error('Unexpected response format from Back4App API');
    }

    const counties = response.data.results.map(item => item.countyName);
    console.log('Processed counties:', counties);

    res.json(counties);
  } catch (error) {
    console.error('Error fetching counties:', error);
    res.status(500).json({ error: 'Failed to fetch counties', details: error.message });
  }
});

app.post('/api/insurance-plans', async (req, res) => {
  try {
    const { income, zipCode, county, state, people, market, year } = req.body;
    
    console.log('Received request:', { income, zipCode, county, state, market, year });

    // Fetch county FIPS code from Back4App
    const back4appResponse = await axios.get(
      'https://parseapi.back4app.com/classes/Uscounties_Area',
      {
        params: {
          where: JSON.stringify({ stateAbbreviation: state, countyName: county }),
          limit: 1,
        },
        headers: {
          'X-Parse-Application-Id': process.env.BACK4APP_APP_ID_KEY,
          'X-Parse-REST-API-Key': process.env.BACK4APP_API_KEY,
        }
      }
    );

    console.log('Back4App API Response:', JSON.stringify(back4appResponse.data, null, 2));

    if (!back4appResponse.data.results || back4appResponse.data.results.length === 0) {
      throw new Error('County not found in Back4App data');
    }

    const countyData = back4appResponse.data.results[0];
    const fullFips = countyData.FIPSCode + countyData.countyCode;

    console.log('Full FIPS code:', fullFips);

    const apiUrl = 'https://marketplace.api.healthcare.gov/api/v1/plans/search';
    const apiKey = process.env.MARKETPLACE_CMS_API_KEY;

    console.log('Using API Key:', apiKey ? 'API key is set' : 'API key is not set');

    const requestBody = {
      household: {
        income: parseInt(income),
        people: people.map(person => ({
          age: parseInt(person.age),
          aptc_eligible: person.eligibleForCoverage,
          gender: person.gender,
          uses_tobacco: person.tobaccoUser
        }))
      },
      market: market,
      place: {
        countyfips: fullFips,
        state: state,
        zipcode: zipCode
      },
      year: parseInt(year)
    };

    console.log('Marketplace API Request Body:', JSON.stringify(requestBody, null, 2));

    const response = await axios.post(`${apiUrl}?apikey=${apiKey}`, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Marketplace API Response Status:', response.status);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching insurance plans:', error.message);
    res.status(500).json({ 
      error: 'An error occurred while fetching insurance plans', 
      details: error.message,
      apiKey: process.env.MARKETPLACE_CMS_API_KEY ? 'API key is set' : 'API key is not set'
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});