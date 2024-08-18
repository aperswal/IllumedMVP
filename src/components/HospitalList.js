import React from 'react';
import { Typography, Box } from '@mui/material';
import HospitalCard from './HospitalCard';

const HospitalList = ({ hospitals }) => {
  if (!hospitals) {
    return null;
  }

  if (!Array.isArray(hospitals)) {
    console.error('Hospitals data is not an array:', hospitals);
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography>Error: Invalid hospital data received.</Typography>
      </Box>
    );
  }

  if (hospitals.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography>No hospitals found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      {hospitals.map((hospital, index) => (
        <HospitalCard key={index} hospital={hospital} />
      ))}
    </Box>
  );
};

export default HospitalList;