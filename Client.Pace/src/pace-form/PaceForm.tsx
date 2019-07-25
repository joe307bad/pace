import React, { Component, ChangeEvent } from 'react';
import {
  TextField,
  Paper,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  Button,
  Container,
  Snackbar
} from '@material-ui/core';
import { WithStyles, CSSProperties } from '@material-ui/styles';
import { ClassKeyInferable } from '@material-ui/styles/withStyles';
import { addMilePace } from '../shared/services/pace.service';
import { PaceDto } from '@pace/api/src/shared/dtos';
import { PaceSchema } from '../shared/schemas/pace.schema';

interface classNames {
  root: CSSProperties;
  input: CSSProperties;
}

type PaceFormState = {
  newPace: Partial<PaceDto>;
  errors: any[];
  snackBarOpen: boolean;
};

const styles = (theme: Theme): classNames => ({
  root: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto'
  },
  input: {
    width: '100%',
    marginBottom: 10
  }
});

export class PaceForm extends Component<
  WithStyles<ClassKeyInferable<any, any>>,
  PaceFormState
> {
  public readonly state = {
    newPace: {},
    errors: [],
    snackBarOpen: false
  };

  private _handleChange = (name: any) => (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const newPace = {
      [name]: event.target.value,
      ...this.state.newPace
    };

    this.setState(state => ({
      newPace: newPace
    }));
  };

  private _handleSubmit = () =>
    PaceSchema.validate(this.state.newPace)
      .then(() => addMilePace(this.state.newPace))
      .catch((response: { errors: [] }) =>
        this.setState({
          errors: response.errors
        })
      );

  private _closeSnackBar = () =>
    this.setState({
      snackBarOpen: false
    });

  public render() {
    const { classes } = this.props;
    return (
      <Container style={{ padding: 20 }}>
        <Paper className={classes.root}>
          <Typography variant="h4">Enter a new Mile Pace</Typography>
          <TextField
            label="Current Mile"
            onChange={this._handleChange('currentMile')}
            margin="normal"
            variant="outlined"
            className={classes.input}
          />
          <TextField
            label="Mile Time"
            onChange={this._handleChange('mileTime')}
            margin="normal"
            variant="outlined"
            className={classes.input}
          />
          <Button
            onClick={this._handleSubmit}
            variant="contained"
            color="primary"
          >
            Add Mile Pace
          </Button>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.snackBarOpen}
          autoHideDuration={6000}
          onClose={this._closeSnackBar}
        >
          <p>Snack bar message</p>
        </Snackbar>
      </Container>
    );
  }
}

export default withStyles(styles)(PaceForm);
