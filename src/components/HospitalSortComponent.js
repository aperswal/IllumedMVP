import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const HospitalSortComponent = ({ onSortChange }) => {
  const handleSortChange = (event) => {
    onSortChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Sort by</InputLabel>
      <Select defaultValue="" onChange={handleSortChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="name_asc">Name (A-Z)</MenuItem>
        <MenuItem value="name_desc">Name (Z-A)</MenuItem>
        <MenuItem value="rating_desc">Rating (High to Low)</MenuItem>
        <MenuItem value="rating_asc">Rating (Low to High)</MenuItem>
        <MenuItem value="distance_asc">Distance (Nearest first)</MenuItem>
      </Select>
    </FormControl>
  );
};

export default HospitalSortComponent;