import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Collapse, Box, Grid, Rating } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
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

const InsuranceCard = ({ plan }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" component="div">
              {plan.name}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Issuer: {plan.issuer.name}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Type: {plan.type} | Metal Level: {plan.metal_level}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary">
              ${plan.premium.toFixed(2)}/month
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography component="legend">Rating:</Typography>
              <Rating name="read-only" value={plan.quality_rating?.global_rating || 0} readOnly />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Deductible: ${plan.deductibles[0]?.amount || 'N/A'}
          </Typography>
          <Typography variant="body2">
            Out-of-pocket maximum: ${plan.moops[0]?.amount || 'N/A'}
          </Typography>
        </Box>
        <ExpandMoreStyled
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMoreStyled>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Additional Information:</Typography>
          <Typography paragraph>
            HSA Eligible: {plan.hsa_eligible ? 'Yes' : 'No'}
          </Typography>
          <Typography paragraph>
            Specialist Referral Required: {plan.specialist_referral_required ? 'Yes' : 'No'}
          </Typography>
          <Typography paragraph>
            National Network: {plan.has_national_network ? 'Yes' : 'No'}
          </Typography>
          {plan.benefits.map((benefit, index) => (
            <Typography key={index} paragraph>
              {benefit.name}: {benefit.covered ? 'Covered' : 'Not Covered'}
            </Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default InsuranceCard;