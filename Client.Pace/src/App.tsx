import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Typography, Container, Grid, Paper } from '@material-ui/core';

const App: React.FC = () => {
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      style={{
        height: '100%'
      }}
    >
      <Grid container xs={6} justify="center">
        <Paper>
          <Typography variant='h2'>
            Pace Form
        </Typography>
        </Paper>
      </Grid>
      <Grid container xs={6} justify="center">
        <Paper>
          <Typography variant='h2'>
            Pace Graph
        </Typography>
        </Paper>
      </Grid>
      <Grid container xs={12} justify="center">
        <Paper>
          <Typography variant='h2'>
            Pace List
        </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default App;
