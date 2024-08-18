import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Collapse, Box, Grid, Button, Rating } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, LocalHospital as HospitalIcon, Map as MapIcon, Phone as PhoneIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ExpandMoreStyled = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const HospitalCard = ({ hospital }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMapClick = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.address + ', ' + hospital.city + ', ' + hospital.state + ' ' + hospital.zipCode)}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${hospital.phoneNumber}`;
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2, position: 'relative' }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <HospitalIcon color="primary" sx={{ fontSize: 40 }} />
          </Grid>
          <Grid item xs>
            <Typography variant="h6" component="div">
              {hospital.facilityName}
            </Typography>
            <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
              <Grid item xs={12} sm={8} md={9}>
                <Typography color="text.secondary" variant="body2">
                  {hospital.address}, {hospital.city}, {hospital.state} {hospital.zipCode}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={3} textAlign={{ xs: 'left', sm: 'right' }}>
                <Button 
                  onClick={handleMapClick} 
                  startIcon={<MapIcon />} 
                  sx={{ textTransform: 'none', color: '#1E90FF' }}
                >
                  Take me to maps
                </Button>
              </Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
              <Grid item xs={12} sm={8} md={9}>
                <Typography color="text.secondary" variant="body2">
                  Phone: {hospital.phoneNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={3} textAlign={{ xs: 'left', sm: 'right' }}>
                <Button 
                  onClick={handlePhoneClick} 
                  startIcon={<PhoneIcon />} 
                  sx={{ textTransform: 'none', color: '#1E90FF' }}
                >
                  Call
                </Button>
              </Grid>
            </Grid>
            <Grid container alignItems="center" sx={{ mt: 1 }}>
              {hospital.overallRating && hospital.overallRating !== 'Not Available' ? (
                <>
                  <Grid item>
                    <Rating
                      name="read-only"
                      value={parseFloat(hospital.overallRating)}
                      precision={0.5}
                      readOnly
                    />
                  </Grid>
                  <Grid item>
                    <Typography color="text.secondary" variant="body2" sx={{ ml: 1 }}>
                      {`${hospital.overallRating}/5 CMS Overall Rating`}
                    </Typography>
                  </Grid>
                </>
              ) : (
                <Typography color="text.secondary" variant="body2">
                  Rating Not Available
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid item>
            <ExpandMoreStyled
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label={expanded ? "Collapse" : "Expand"}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <ExpandMoreIcon />
            </ExpandMoreStyled>
          </Grid>
        </Grid>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box sx={{ pl: 2, borderLeft: 4, borderColor: 'primary.main' }}>
            <Typography variant="h6" gutterBottom>Additional Information:</Typography>
            <Typography variant="body2" paragraph>
              <strong>Emergency Services:</strong> {hospital.emergencyServices}
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Hospital Type:</strong> {hospital.hospitalType}
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Hospital Ownership:</strong> {hospital.hospitalOwnership}
            </Typography>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default HospitalCard;
