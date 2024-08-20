import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Box,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HospitalFilterComponent = ({ onFilterChange, filterOptions }) => {
  const [filters, setFilters] = useState({
    emergencyServices: [],
    hospitalTypes: [],
    hospitalOwnerships: []
  });

  const handleCheckboxChange = (category, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(value)
        ? prevFilters[category].filter(item => item !== value)
        : [...prevFilters[category], value]
    }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Filter Hospitals</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography gutterBottom>Emergency Services</Typography>
              <FormGroup>
                {filterOptions.emergencyServices.map(service => (
                  <FormControlLabel
                    key={service}
                    control={
                      <Checkbox
                        checked={filters.emergencyServices.includes(service)}
                        onChange={() => handleCheckboxChange('emergencyServices', service)}
                      />
                    }
                    label={service}
                  />
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography gutterBottom>Hospital Types</Typography>
              <FormGroup>
                {filterOptions.hospitalTypes.map(type => (
                  <FormControlLabel
                    key={type}
                    control={
                      <Checkbox
                        checked={filters.hospitalTypes.includes(type)}
                        onChange={() => handleCheckboxChange('hospitalTypes', type)}
                      />
                    }
                    label={type}
                  />
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography gutterBottom>Hospital Ownerships</Typography>
              <FormGroup>
                {filterOptions.hospitalOwnerships.map(ownership => (
                  <FormControlLabel
                    key={ownership}
                    control={
                      <Checkbox
                        checked={filters.hospitalOwnerships.includes(ownership)}
                        onChange={() => handleCheckboxChange('hospitalOwnerships', ownership)}
                      />
                    }
                    label={ownership}
                  />
                ))}
              </FormGroup>
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

export default HospitalFilterComponent;