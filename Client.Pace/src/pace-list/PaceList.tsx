import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {
  Paper,
  Typography,
  Container,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { PaceDto } from '@pace/api/src/shared/dtos';
import { deletePace } from '../shared/services/pace.service';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    marginBottom: 50
  }
}));

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

type PaceListProps = {
  paces: Partial<PaceDto>[];
  reloadPaceData(): void;
};

export default function PaceList({ paces, reloadPaceData }: PaceListProps) {
  const classes = useStyles('');

  return (
    <Container style={{ padding: 20 }}>
      <Paper className={classes.root}>
        <Typography variant="h4">Pace List</Typography>
        {renderPacesList(paces, reloadPaceData)}
      </Paper>
    </Container>
  );
}

const handleDelete = (id: string, reloadPaceData: () => void) => (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>
) => deletePace(id).then(() => reloadPaceData());

const renderPacesList = (paces: Partial<PaceDto>[], reloadPaceData: () => void) => {
  if (!paces.length) {
    return <p>No mile paces found</p>;
  }
  return (
    <List component="nav" aria-label="Main mailbox folders">
      {paces.map((pace: Partial<PaceDto>, index: number) => (
        <ListItem key={index}>
          <ListItemText primary={`Mile: ${pace.currentMile}`} />
          <ListItemText primary={`Pace: ${pace.mileTime}`} />
          <ListItemSecondaryAction onClick={handleDelete(pace._id, reloadPaceData)}>
            <IconButton edge="end" aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};
