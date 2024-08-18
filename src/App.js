import React, { useState } from 'react';
import { Container, Typography, CircularProgress, Box, Tabs, Tab } from '@mui/material';
import { LoadScript } from '@react-google-maps/api';
import SearchBar from './components/SearchBar';
import GoogleMapsSearch from './components/GoogleMapsSearch';
import HospitalList from './components/HospitalList';
import InsuranceSearchForm from './components/InsuranceSearchForm';
import InsurancePlanList from './components/InsurancePlanList';

const libraries = ['places'];

function App() {
  const [hospitals, setHospitals] = useState(null);
  const [insurancePlans, setInsurancePlans] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3001/api/hospitals?query=${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setHospitals(data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      setError('An error occurred while fetching hospitals. Please try again.');
      setHospitals(null);
    }
    setLoading(false);
  };

  const handleRadiusSearch = async ({ address, radius }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3001/api/hospitals/radius?address=${encodeURIComponent(address)}&radius=${radius}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setHospitals(data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      setError('An error occurred while fetching hospitals. Please try again.');
      setHospitals(null);
    }
    setLoading(false);
  };

  const handleInsuranceSearch = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/api/insurance-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setInsurancePlans(data);
    } catch (error) {
      console.error('Error fetching insurance plans:', error);
      setError('An error occurred while fetching insurance plans. Please try again.');
      setInsurancePlans(null);
    }
    setLoading(false);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
      libraries={libraries}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mt: 4, mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Healthcare Search
          </Typography>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered>
            <Tab label="Hospital Search" />
            <Tab label="Insurance Search" />
          </Tabs>
        </Box>
        {activeTab === 0 && (
          <>
            <Box sx={{ mb: 4 }}>
              <Tabs value={searchType} onChange={(e, newValue) => setSearchType(newValue)} centered>
                <Tab label="Search by Name" />
                <Tab label="Search by Address" />
              </Tabs>
            </Box>
            <Box sx={{ mt: 4 }}>
              {searchType === 0 ? (
                <SearchBar onSearch={handleSearch} />
              ) : (
                <GoogleMapsSearch onSearch={handleRadiusSearch} />
              )}
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
            {hospitals && <HospitalList hospitals={hospitals} />}
          </>
        )}
        {activeTab === 1 && (
          <>
            <InsuranceSearchForm onSubmit={handleInsuranceSearch} />
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
            {insurancePlans && <InsurancePlanList plans={insurancePlans} />}
          </>
        )}
      </Container>
    </LoadScript>
  );
}

export default App;