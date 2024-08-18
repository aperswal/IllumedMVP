import React from 'react';
import { Typography, Box } from '@mui/material';
import InsuranceCard from './InsuranceCard';

const InsurancePlanList = ({ plans }) => {
  if (!plans || plans.length === 0) {
    return <Typography>No insurance plans found.</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      {plans.map((plan, index) => (
        <InsuranceCard key={index} plan={plan} />
      ))}
    </Box>
  );
};

export default InsurancePlanList;