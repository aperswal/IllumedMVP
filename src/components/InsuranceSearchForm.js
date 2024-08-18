import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, RadioGroup, Radio, Button, Typography, Box, Grid } from '@mui/material';

const InsuranceSearchForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    zipCode: '',
    age: '',
    sex: '',
    eligibleForCoverage: false,
    legalGuardian: false,
    pregnant: false,
    tobaccoUser: false,
    dependents: [],
    expectedIncome: '',
    planType: 'health'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Typography component="legend">Sex</Typography>
          <RadioGroup
            row
            name="sex"
            value={formData.sex}
            onChange={handleChange}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography component="legend">Select any that apply:</Typography>
          <FormControlLabel
            control={<Checkbox checked={formData.eligibleForCoverage} onChange={handleChange} name="eligibleForCoverage" />}
            label="Eligible for health coverage through a job, Medicare, Medicaid, or CHIP"
          />
          <FormControlLabel
            control={<Checkbox checked={formData.legalGuardian} onChange={handleChange} name="legalGuardian" />}
            label="Legal parent or guardian of a child under 19 (claimed as a tax dependent)"
          />
          <FormControlLabel
            control={<Checkbox checked={formData.pregnant} onChange={handleChange} name="pregnant" />}
            label="Pregnant"
          />
          <FormControlLabel
            control={<Checkbox checked={formData.tobaccoUser} onChange={handleChange} name="tobaccoUser" />}
            label="Tobacco user"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Expected Income for the Year"
            name="expectedIncome"
            type="number"
            value={formData.expectedIncome}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Typography component="legend">Plan Type</Typography>
          <RadioGroup
            row
            name="planType"
            value={formData.planType}
            onChange={handleChange}
          >
            <FormControlLabel value="health" control={<Radio />} label="Health Plans" />
            <FormControlLabel value="dental" control={<Radio />} label="Dental Plans" />
          </RadioGroup>
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Search Plans
      </Button>
    </Box>
  );
};

export default InsuranceSearchForm;