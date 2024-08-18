const express = require('express');
const cors = require('cors');
const { searchHospitals, searchHospitalsByRadius } = require('./csvUtils');
const axios = require('axios');
require('dotenv').config();

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

    const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    
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

app.post('/api/insurance-plans', async (req, res) => {
  try {
    const formData = req.body;
    console.log('Received insurance search request:', formData);

    // TODO: Implement the actual API call to the Marketplace API
    // This is a placeholder response
    const mockPlans = [
      {
        name: "Sample Health Plan A",
        type: formData.planType,
        premium: 250,
        deductible: 1000
      },
      {
        name: "Sample Health Plan B",
        type: formData.planType,
        premium: 300,
        deductible: 500
      }
    ];

    res.json(mockPlans);
  } catch (error) {
    console.error('Error searching insurance plans:', error);
    res.status(500).json({ 
      error: 'An error occurred while searching insurance plans', 
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});