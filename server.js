const express = require('express');
const cors = require('cors');
const { searchHospitals } = require('./csvUtils');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.get('/api/hospitals', async (req, res) => {
  try {
    const searchQuery = req.query.query;
    console.log('Received search query:', searchQuery);

    if (!searchQuery || searchQuery.trim() === '') {
      return res.json([]);
    }

    const results = await searchHospitals(searchQuery);
    
    console.log(`Search complete. Found ${results.length} results.`);
    console.log('Search results:', results);

    res.json(results);
  } catch (error) {
    console.error('Error searching hospitals:', error);
    res.status(500).json({ 
      error: 'An error occurred while searching hospitals', 
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});