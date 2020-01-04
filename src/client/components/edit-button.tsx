import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { Issue } from '../../models/issue.model';

const styles = () => createStyles({
  editButton: {
    float: 'right',
    lineHeight: 0.8,
    padding: '8px 8px 4px 8px',
=======
import { IIssue } from '../../models/issue.model';

const styles = () => createStyles({
  editButton: {
    float: 'left',
>>>>>>> 544981d87dc1381e9149dc3146c213d9c79adc07
  },
});

interface IProps extends WithStyles<typeof styles> {
<<<<<<< HEAD
  issueId: Issue['_id']
=======
  issueId: IIssue['_id']
>>>>>>> 544981d87dc1381e9149dc3146c213d9c79adc07
}

const EditButton = ({ issueId, classes }: IProps) => (
  <Link to={`/edit/${issueId}`}>
    <Button color="primary" className={classes.editButton}>
      Edit
    </Button>
  </Link>
);

export default withStyles(styles)(EditButton);
