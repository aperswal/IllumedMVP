import React, { useState } from 'react';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import SearchBar from './components/SearchBar';
import HospitalList from './components/HospitalList';

function App() {
  const [hospitals, setHospitals] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setHospitals(null);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const response = await fetch(`http://localhost:3001/api/hospitals?query=${query}`);
      const data = await response.json();
      setHospitals(data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      setError('An error occurred while fetching hospitals. Please try again.');
      setHospitals(null);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Hospital Search
        </Typography>
        <SearchBar onSearch={handleSearch} />
      </Box>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
          {error}
        </Typography>
      )}
      {!loading && !error && hasSearched && (
        <HospitalList hospitals={hospitals} />
      )}
    </Container>
  );
}

export default App;