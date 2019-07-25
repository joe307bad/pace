import React, { Component } from 'react';
import './Home.css';
import { Grid } from '@material-ui/core';
import PaceForm from '../pace-form/PaceForm';
import { PaceGraph } from '../pace-graph/PaceGraph';
import PaceList from '../pace-list/PaceList';
import { getAveragePaceGraph } from '../shared/services/pace.service';
import { PaceAverage } from '@pace/api/src/shared/dtos';

type AppState = {
  averagePaceGraph: PaceAverage[]
}

export class App extends Component<{}, AppState> {

  public readonly state = {
    averagePaceGraph: []
  }

  public componentDidMount() {
    setInterval(
      async () =>
        this.setState({
          averagePaceGraph: await getAveragePaceGraph()
        }),
      1000
    );
  }

  public render() {
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
        <Grid item xs={3} style={{ marginTop: 'auto' }}>
          <PaceForm />
        </Grid>
        <Grid item xs={9} style={{ marginTop: 'auto' }}>
          <PaceGraph graph={this.state.averagePaceGraph} />
        </Grid>
        <Grid item xs={12} style={{ height: '100%' }}>
          <PaceList />
        </Grid>
      </Grid>
    );
  }
}

export default App;
