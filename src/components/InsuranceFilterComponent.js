import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
  TextField,
  Button,
  Box,
  Grid,
  InputAdornment
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const InsuranceFilterComponent = ({ onFilterChange, filterOptions = {} }) => {
  const {
    issuers = [],
    planTypes = [],
    metalLevels = []
  } = filterOptions;

  const [filters, setFilters] = useState({
    metalLevels: [],
    planTypes: [],
    issuers: [],
    premium: [0, 2000],
    deductible: [0, 10000],
    hsaEligible: false,
    hasNationalNetwork: false
  });

  const handleCheckboxChange = (category, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(value)
        ? prevFilters[category].filter(item => item !== value)
        : [...prevFilters[category], value]
    }));
  };

  const handleSliderChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleBooleanChange = (name, event) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: event.target.checked
    }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <Box sx={{ mb: 3, mt: 4 }}>
      <Accordion sx={{ bgcolor: '#f5f5f5' }} id="insurance-filter-accordion">
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          sx={{ '&:hover': { bgcolor: '#e0e0e0' } }}
          id="insurance-filter-accordion-summary"
        >
          <Typography>Filter Insurance Plans</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography gutterBottom>Metal Levels</Typography>
              <FormGroup>
                {metalLevels.map(level => (
                  <FormControlLabel
                    key={level}
                    control={
                      <Checkbox
                        checked={filters.metalLevels.includes(level)}
                        onChange={() => handleCheckboxChange('metalLevels', level)}
                      />
                    }
                    label={level}
                  />
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography gutterBottom>Plan Types</Typography>
              <FormGroup>
                {planTypes.map(type => (
                  <FormControlLabel
                    key={type}
                    control={
                      <Checkbox
                        checked={filters.planTypes.includes(type)}
                        onChange={() => handleCheckboxChange('planTypes', type)}
                      />
                    }
                    label={type}
                  />
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography gutterBottom>Issuers</Typography>
              <FormGroup>
                {issuers.map(issuer => (
                  <FormControlLabel
                    key={issuer}
                    control={
                      <Checkbox
                        checked={filters.issuers.includes(issuer)}
                        onChange={() => handleCheckboxChange('issuers', issuer)}
                      />
                    }
                    label={issuer}
                  />
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Monthly Premium Range</Typography>
              <Slider
                value={filters.premium}
                onChange={(_, newValue) => handleSliderChange('premium', newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={2000}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  size="small"
                  value={filters.premium[0]}
                  onChange={(e) => handleSliderChange('premium', [parseInt(e.target.value), filters.premium[1]])}
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputProps: { min: 0, max: 2000 }
                  }}
                />
                <TextField
                  size="small"
                  value={filters.premium[1]}
                  onChange={(e) => handleSliderChange('premium', [filters.premium[0], parseInt(e.target.value)])}
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputProps: { min: 0, max: 2000 }
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Deductible Range</Typography>
              <Slider
                value={filters.deductible}
                onChange={(_, newValue) => handleSliderChange('deductible', newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  size="small"
                  value={filters.deductible[0]}
                  onChange={(e) => handleSliderChange('deductible', [parseInt(e.target.value), filters.deductible[1]])}
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputProps: { min: 0, max: 10000 }
                  }}
                />
                <TextField
                  size="small"
                  value={filters.deductible[1]}
                  onChange={(e) => handleSliderChange('deductible', [filters.deductible[0], parseInt(e.target.value)])}
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    inputProps: { min: 0, max: 10000 }
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.hsaEligible}
                    onChange={(e) => handleBooleanChange('hsaEligible', e)}
                  />
                }
                label="HSA Eligible"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.hasNationalNetwork}
                    onChange={(e) => handleBooleanChange('hasNationalNetwork', e)}
                  />
                }
                label="Has National Network"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={applyFilters}>
                Apply Filters
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default InsuranceFilterComponent;