import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { IIssue } from '../../models/issue.model';

const styles = () => createStyles({
  editButton: {
    float: 'left',
  },
});

interface IProps extends WithStyles<typeof styles> {
  issueId: IIssue['_id']
}

const EditButton = ({ issueId, classes }: IProps) => (
  <Link to={`/edit/${issueId}`}>
    <Button color="primary" className={classes.editButton}>
      Edit
    </Button>
  </Link>
);

export default withStyles(styles)(EditButton);
