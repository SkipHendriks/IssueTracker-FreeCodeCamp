import React from 'react';
import { withRouter, RouteComponentProps, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import Banner from './banner';
import IssueContainer from './issue-container';
import { IProject } from '../../models/project.model';
import theme from '../styles/theme';


interface IState {
  isLoading: boolean;
  projects: Array<IProject>;
  currentProject?: IProject
}

class App extends React.Component <RouteComponentProps> {
  state: IState = {
    isLoading: true,
    projects: [],
  };

  async componentDidMount() {
    const response = await fetch('http://localhost:3000/api/projects');
    const projects: Array<IProject> = await response.json();
    this.setState({ projects, isLoading: false });
  }

  onProjectSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { history } = this.props;
    history.push(`/${event.target.value}`);
  };

  render() {
    const { projects, isLoading, currentProject } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Banner
          projects={projects}
          isLoading={isLoading}
          handleChange={this.onProjectSelect}
          currentProject={currentProject}
        />
            <IssueContainer currentProject={currentProject} />
          </Route>
      </>
      </ThemeProvider>
    );
  }
}


export default withRouter(App);
