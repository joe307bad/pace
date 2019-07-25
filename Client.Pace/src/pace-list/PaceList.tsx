import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Paper, Typography, Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

export default function PaceList() {
  const classes = useStyles('');

  return (
    <Container style={{ padding: 20 }}>
      <Paper className={classes.root}>
        <Typography variant="h4">Pace List</Typography>
        <List component="nav" aria-label="Main mailbox folders">
          <ListItem button>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
}
