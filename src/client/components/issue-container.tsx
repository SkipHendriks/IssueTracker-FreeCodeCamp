import React from 'react';
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
}

interface IState {
  isLoading: boolean;
  issues: Array<IIssue>
}

class IssueContainer extends React.Component<IProps> {
  state: IState = {
    isLoading: true,
    issues: [],
  };

  async componentDidUpdate(oldProps: IProps) {
    const { currentProject } = this.props;
    const firstProjectProp = !oldProps.currentProject;
    const updatedProjectProp = oldProps.currentProject
      && oldProps.currentProject._id !== currentProject._id;
    if (firstProjectProp || updatedProjectProp) {
      const issues = await this.getIssues();
      this.setState({ issues, isLoading: false });
    }
  }

  async getIssues(): Promise<Array<IIssue>> {
    const { currentProject } = this.props;
    const url = `http://localhost:3000/api/issues/${currentProject ? currentProject.name : ''}`;
    const response = await fetch(url);
    const issues: Array<IIssue> = await response.json();
    return issues;
  }

  render() {
    const { issues, isLoading } = this.state;
    const { classes, currentProject } = this.props;
    const addUrl = currentProject ? `${currentProject.name}/add` : '/add';
    return (
      <>
        {isLoading && <LinearProgress />}
        {!isLoading && (
          <Container className={classes.mainContainer}>
            {!isLoading && issues.map((issue: IIssue) => (
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
  }
}

export default withStyles(styles)(IssueContainer);
