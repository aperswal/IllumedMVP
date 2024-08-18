import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, Typography, Checkbox, FormControlLabel, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const InsuranceSearchForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    income: '',
    zipCode: '',
    county: '',
    state: '',
    people: [{
      age: '',
      gender: '',
      eligibleForCoverage: false,
      legalGuardian: false,
      pregnant: false,
      tobaccoUser: false
    }],
    market: 'Individual',
    year: new Date().getFullYear()
  });

  const handleChange = (e, index) => {
    const { name, value, checked, type } = e.target;
    if (name.startsWith('person')) {
      const newPeople = [...formData.people];
      newPeople[index] = { 
        ...newPeople[index], 
        [name.split('.')[1]]: type === 'checkbox' ? checked : value 
      };
      setFormData({ ...formData, people: newPeople });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addPerson = () => {
    setFormData({
      ...formData,
      people: [...formData.people, {
        age: '',
        gender: '',
        eligibleForCoverage: false,
        legalGuardian: false,
        pregnant: false,
        tobaccoUser: false
      }]
    });
  };

  const removePerson = (index) => {
    const newPeople = formData.people.filter((_, i) => i !== index);
    setFormData({ ...formData, people: newPeople });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Household Information</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Household Income"
            name="income"
            type="number"
            value={formData.income}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="ZIP Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="County"
            name="county"
            value={formData.county}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Household Members</Typography>
        </Grid>
        {formData.people.map((person, index) => (
          <Grid item xs={12} key={index}>
            <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    label="Age"
                    name={`person.age`}
                    type="number"
                    value={person.age}
                    onChange={(e) => handleChange(e, index)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Sex</InputLabel>
                    <Select
                      name={`person.gender`}
                      value={person.gender}
                      onChange={(e) => handleChange(e, index)}
                      required
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={person.eligibleForCoverage}
                            onChange={(e) => handleChange(e, index)}
                            name={`person.eligibleForCoverage`}
                          />
                        }
                        label="Eligible for health coverage through a job, Medicare, Medicaid, or CHIP"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={person.legalGuardian}
                            onChange={(e) => handleChange(e, index)}
                            name={`person.legalGuardian`}
                          />
                        }
                        label="Legal parent or guardian of a child under 19 (claimed as a tax dependent)"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={person.pregnant}
                            onChange={(e) => handleChange(e, index)}
                            name={`person.pregnant`}
                          />
                        }
                        label="Pregnant"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={person.tobaccoUser}
                            onChange={(e) => handleChange(e, index)}
                            name={`person.tobaccoUser`}
                          />
                        }
                        label="Tobacco user"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {formData.people.length > 1 && (
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={() => removePerson(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="outlined" onClick={addPerson}>ADD PERSON</Button>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Search Insurance Plans
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default InsuranceSearchForm;