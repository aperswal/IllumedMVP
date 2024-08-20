import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Collapse, Box, Grid, Rating, Chip, Divider } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, AttachMoney as AttachMoneyIcon, CheckCircleOutline as CheckCircleOutlineIcon, CancelOutlined as CancelOutlinedIcon } from '@mui/icons-material';
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
            <Typography variant="h5" component="div" gutterBottom>
              {plan.name}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              Issuer: {plan.issuer.name}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              Type: {plan.type} | Metal Level: {plan.metal_level}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
            <Typography variant="h4" color="primary" gutterBottom>
              ${plan.premium.toFixed(2)}/month
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Rating name="read-only" value={plan.quality_rating?.global_rating || 0} readOnly />
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" gutterBottom>
              <AttachMoneyIcon fontSize="small" /> Deductible: ${plan.deductibles[0]?.amount || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" gutterBottom>
              <AttachMoneyIcon fontSize="small" /> Out-of-pocket maximum: ${plan.moops[0]?.amount || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        
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
          <Typography variant="h6" gutterBottom>Additional Information:</Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Chip
                icon={plan.hsa_eligible ? <CheckCircleOutlineIcon /> : <CancelOutlinedIcon />}
                label={`HSA Eligible: ${plan.hsa_eligible ? 'Yes' : 'No'}`}
                color={plan.hsa_eligible ? 'success' : 'default'}
                variant="outlined"
                sx={{ my: 0.5 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Chip
                icon={plan.specialist_referral_required ? <CheckCircleOutlineIcon /> : <CancelOutlinedIcon />}
                label={`Specialist Referral Required: ${plan.specialist_referral_required ? 'Yes' : 'No'}`}
                color={plan.specialist_referral_required ? 'success' : 'default'}
                variant="outlined"
                sx={{ my: 0.5 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Chip
                icon={plan.has_national_network ? <CheckCircleOutlineIcon /> : <CancelOutlinedIcon />}
                label={`National Network: ${plan.has_national_network ? 'Yes' : 'No'}`}
                color={plan.has_national_network ? 'success' : 'default'}
                variant="outlined"
                sx={{ my: 0.5 }}
              />
            </Grid>
          </Grid>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Benefits:</Typography>
          <Grid container spacing={1}>
            {plan.benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Chip
                  icon={benefit.covered ? <CheckCircleOutlineIcon /> : <CancelOutlinedIcon />}
                  label={`${benefit.name}: ${benefit.covered ? 'Covered' : 'Not Covered'}`}
                  color={benefit.covered ? 'success' : 'default'}
                  variant="outlined"
                  sx={{ my: 0.5 }}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default InsuranceCard;