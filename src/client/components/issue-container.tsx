import React, { useState, useEffect } from 'react';
import { Container, LinearProgress, Fab } from '@material-ui/core';
import {
  createStyles, withStyles, WithStyles, Theme,
} from '@material-ui/core/styles';
import { Add as AddIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';


import Issue from './issue';
import { IProject } from '../../models/project.model';
import { IIssue } from '../../models/issue.model';

const styles = (theme: Theme) => createStyles({
  mainContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: '#f5f5f6',
    minHeight: 'calc(100vh - 72px)',
  },
  addButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
});

interface IProps extends WithStyles<typeof styles> {
  currentProject: IProject;
  loadingProjects: boolean;
}

const IssueContainer = ({ currentProject, loadingProjects, classes }: IProps) => {
  const [isLoadingIssues, setIsLoadingIssues] = useState(true);
  const [issues, setIssues] = useState<IIssue[]>([]);

  useEffect(() => {
    if (!loadingProjects) {
      const getIssues = async () => {
        const url = `http://localhost:3000/api/issues/${currentProject?.name || ''}`;
        const response = await fetch(url);
        const newIssues = await response.json() as IIssue[];
        setIssues(newIssues);
      };
      getIssues();
      setIsLoadingIssues(false);
    }
  }, [currentProject?._id, loadingProjects]);

  const addUrl = `${currentProject?.name || ''}/add`;

  return (
    <>
      {isLoadingIssues && <LinearProgress />}
      {!isLoadingIssues && (
        <Container className={classes.mainContainer}>
          {!isLoadingIssues && issues.map((issue) => (
            <Issue issue={issue} key={issue._id} />
          ))}
          <Link to={addUrl}>
            <Fab color="primary" className={classes.addButton}>
              <AddIcon />
            </Fab>
          </Link>
        </Container>
      )}
    </>
  );
};

export default withStyles(styles)(IssueContainer);
