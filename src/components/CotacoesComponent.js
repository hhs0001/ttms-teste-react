import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import MoneyIcon from '@mui/icons-material/Money';

const CotacoesComponent = ({ cotacoes, isLoading, error }) => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {isLoading && <Typography>Carregando cotações...</Typography>}
      {error && <Typography color="error">Erro: {error}</Typography>}
      {cotacoes.bpi && (
        <Grid container spacing={2}>
          {Object.entries(cotacoes.bpi).map(([currency, info]) => (
            <Grid item xs={12} sm={4} key={currency}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {info.description}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {info.code}
                  </Typography>
                  <Typography variant="body2">
                    <MoneyIcon sx={{ verticalAlign: 'middle' }} /> {info.rate}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CotacoesComponent;
