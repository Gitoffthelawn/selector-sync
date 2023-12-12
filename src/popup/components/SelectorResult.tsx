import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { SelectorSpecification } from 'common/types';

type SelectorResultParam = SelectorSpecification & {
  results: string[],
}

function SelectorResult({ selector, showMethod, results }: SelectorResultParam) {
  return (
    <Card sx={{ backgroundColor: '#FFF8F8', mb: 1 }} >
      <CardContent sx={{ paddingTop: "4px !important", paddingBottom: "0px !important" }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h6">{selector}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{results.length} Results</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography color="textSecondary">{showMethod}</Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" component="div">
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </Typography>
      </CardContent>
    </Card>
  );
}

export { SelectorResult }