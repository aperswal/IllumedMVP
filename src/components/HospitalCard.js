import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Collapse, Box, Grid } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, LocalHospital as HospitalIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ExpandMoreStyled = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const HospitalCard = ({ hospital }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <HospitalIcon color="primary" sx={{ fontSize: 40 }} />
          </Grid>
          <Grid item xs>
            <Typography variant="h6" component="div">
              {hospital.facilityName}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {hospital.address}, {hospital.city}, {hospital.state} {hospital.zipCode}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Phone: {hospital.phoneNumber}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {hospital.overallRating && hospital.overallRating !== 'Not Available'
                ? `${hospital.overallRating}/5 CMS Overall Rating`
                : 'Rating Not Available'}
            </Typography>
          </Grid>
          <Grid item>
            <ExpandMoreStyled
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
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