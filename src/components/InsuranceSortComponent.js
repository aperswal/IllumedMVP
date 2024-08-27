import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const InsuranceSortComponent = ({ onSortChange }) => {
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
        <MenuItem value="premium_asc">Premium (Low to High)</MenuItem>
        <MenuItem value="premium_desc">Premium (High to Low)</MenuItem>
        <MenuItem value="deductible_asc">Deductible (Low to High)</MenuItem>
        <MenuItem value="deductible_desc">Deductible (High to Low)</MenuItem>
        <MenuItem value="rating_desc">Quality Rating (High to Low)</MenuItem>
      </Select>
    </FormControl>
  );
};

export default InsuranceSortComponent;