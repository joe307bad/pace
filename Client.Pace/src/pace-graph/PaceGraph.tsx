import React, { CSSProperties } from 'react';
import { ResponsiveLine, LineSerieData } from '@nivo/line';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Theme, withStyles, makeStyles, Container } from '@material-ui/core';
import { PaceAverage } from '@pace/api/src/shared/dtos';
import { uniqWith, isEqual } from 'lodash';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

type PaceGraphProps = {
  graph: PaceAverage[];
};

export const PaceGraph = ({ graph }: PaceGraphProps) => {
  const classes = useStyles();

  const data = [
    {
      id: 'Average Pace',
      color: 'hsl(187, 70%, 50%)',
      data: uniqWith(graph, isEqual).map(pace => ({
        x: pace.averagePace,
        y: pace.mile
      }))
    }
  ];

  return (
    <Container style={{ padding: 20 }}>
      <Paper className={classes.root}>
        <Typography variant="h4">Pace Graph</Typography>
        <div style={{ height: 500 }}>{renderPaceGraph(data)}</div>
      </Paper>
    </Container>
  );
};

export const renderPaceGraph = (data: LineSerieData[]) => {
  if (data.some(series => !series.data.length)) {
    return <p>Add a new mile pace</p>;
  }

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Average Pace (minutes)',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Current Mile',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      colors={{ scheme: 'nivo' }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  );
};
