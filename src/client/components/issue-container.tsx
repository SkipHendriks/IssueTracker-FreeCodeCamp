import React, { useState, useEffect } from 'react';
import { Container, LinearProgress, Fab } from '@material-ui/core';
import {
  createStyles, withStyles, WithStyles, Theme,
} from '@material-ui/core/styles';
import { Add as AddIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';


import Issue from './issue';
import AddButton from './add-button';
import { Project } from '../../models/project.model';
import { Issue as IssueType } from '../../models/issue.model';

const styles = (theme: Theme) => createStyles({
  mainContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: '#f5f5f6',
    minHeight: 'calc(100vh - 72px)',
  },
});

interface Props extends WithStyles<typeof styles> {
  currentProject: Project;
  loadingProjects: boolean;
}

const IssueContainer = ({ currentProject, loadingProjects, classes }: Props) => {
  const [isLoadingIssues, setIsLoadingIssues] = useState(true);
  const [issues, setIssues] = useState<IssueType[]>([]);

  useEffect(() => {
    if (!loadingProjects) {
      const getIssues = async () => {
        const url = `http://localhost:3000/api/issues/${currentProject?.name || ''}`;
        const response = await fetch(url);
        const newIssues = await response.json() as IssueType[];
        setIssues(newIssues);
      };
      setIsLoadingIssues(true);
      getIssues();
      setIsLoadingIssues(false);
    }
  }, [currentProject?._id, loadingProjects]);

  const addUrl = `${currentProject?.name || ''}/add`;

  return (
    <>
      {isLoadingIssues ? <LinearProgress /> : issues.map((issue) => (
        <Issue issue={issue} key={issue._id} />
      ))}
      <AddButton url={addUrl} />
      )
    </>
  );
};

export default withStyles(styles)(IssueContainer);
