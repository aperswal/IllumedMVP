import React from 'react';
import { Typography, Box } from '@mui/material';
import HospitalCard from './HospitalCard';

const HospitalList = ({ hospitals }) => {
  if (hospitals === null) {
    return null;
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