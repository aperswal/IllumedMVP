import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Grid, Box, CircularProgress, Typography } from '@mui/material';
import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const GoogleMapsSearch = ({ onSearch }) => {
  const [address, setAddress] = useState('');
  const [radius, setRadius] = useState(10);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded && window.google && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        setAddress(place.formatted_address || '');
      });
    }
  }, [isLoaded]);

  const handleSearch = async () => {
    if (address && radius) {
      try {
        setError('');
        await onSearch({ address, radius });
      } catch (err) {
        setError(err.message || 'An error occurred while searching');
      }
    }
  };

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            inputRef={inputRef}
            fullWidth
            placeholder="Enter an address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            fullWidth
            type="number"
            label="Radius (miles)"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            InputProps={{ inputProps: { min: 1 } }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button fullWidth variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default GoogleMapsSearch;