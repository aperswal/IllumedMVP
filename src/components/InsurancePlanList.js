import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

const InsurancePlanList = ({ plans }) => {
  if (!plans || plans.length === 0) {
    return <Typography>No plans found.</Typography>;
  }

  return (
    <List>
      {plans.map((plan, index) => (
        <Paper key={index} elevation={2} sx={{ mb: 2, p: 2 }}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={plan.name}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.primary">
                    Type: {plan.type}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="text.primary">
                    Monthly Premium: ${plan.premium}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="text.primary">
                    Deductible: ${plan.deductible}
                  </Typography>
                </>
              }
            />
          </ListItem>
        </Paper>
      ))}
    </List>
  );
};

export default InsurancePlanList;