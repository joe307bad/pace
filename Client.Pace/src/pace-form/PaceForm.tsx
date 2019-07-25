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
  Snackbar,
  SnackbarContent,
  IconButton
} from '@material-ui/core';
import { WithStyles, CSSProperties } from '@material-ui/styles';
import { ClassKeyInferable } from '@material-ui/styles/withStyles';
import { addMilePace } from '../shared/services/pace.service';
import { PaceDto } from '@pace/api/src/shared/dtos';
import { PaceSchema } from '../shared/schemas/pace.schema';
import CloseIcon from '@material-ui/icons/Close';

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
    newPace: {} as Partial<PaceDto>,
    errors: [],
    snackBarOpen: false
  };

  private _handleChange = (name: any) => (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const newPace = {
      ...this.state.newPace,
      [name]: event.target.value
    };
    this.setState(state => ({
      newPace: newPace
    }));
  };

  private _handleSubmit = () =>
    PaceSchema.validate(this.state.newPace)
      .then(() => {
        addMilePace(this.state.newPace)
        this.setState({
          newPace: {}
        })
      })
      .catch((response: { errors: [] }) =>
        this.setState({
          errors: response.errors,
          snackBarOpen: true
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
            value={this.state.newPace.currentMile || ''}
            className={classes.input}
          />
          <TextField
            label="Mile Time"
            onChange={this._handleChange('mileTime')}
            margin="normal"
            variant="outlined"
            className={classes.input}
            value={this.state.newPace.mileTime || ''}
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
            vertical: 'top',
            horizontal: 'left'
          }}
          open={this.state.snackBarOpen}
          autoHideDuration={6000}
          onClose={this._closeSnackBar}
        >
          <SnackbarContent
            style={{backgroundColor: 'darkred'}}
            aria-describedby="client-snackbar"
            message={this.state.errors[0]}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this._closeSnackBar}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            ]}
          />
        </Snackbar>
      </Container>
    );
  }
}

export default withStyles(styles)(PaceForm);
