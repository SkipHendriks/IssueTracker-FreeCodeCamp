import React from 'react';
import { Link } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = createStyles({
  addButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
});

interface Props extends WithStyles<typeof styles>{
  url: string
}

const AddButton = ({ url, classes }: Props) => (
  <Link to={url}>
    <Fab color="primary" className={classes.addButton}>
      <AddIcon />
    </Fab>
  </Link>
);

export default withStyles(styles)(AddButton);
