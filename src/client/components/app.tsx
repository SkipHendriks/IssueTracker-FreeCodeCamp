import React from 'react';
import {
  withRouter, RouteComponentProps, Route, Switch,
} from 'react-router-dom';
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

const Test = ({ match }: RouteComponentProps<{projectName: string}>) => (
  <>
    {match.url}
  </>
);

class App extends React.Component <RouteComponentProps> {
  state: IState = {
    isLoading: true,
    projects: [],
  };

  async componentDidMount() {
    const response = await fetch('http://localhost:3000/api/projects');
    const projects: Array<IProject> = await response.json();
    const { location } = this.props;
    const currentProjectName = location.pathname.split('/')[1];
    const currentProject = projects.find((project) => project.name === currentProjectName);
    this.setState({ projects, isLoading: false, currentProject });
  }

  onProjectSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { history } = this.props;
    const { projects } = this.state;
    const newProjectName = event.target.value;
    history.push(`/${newProjectName}`);
    const newProject = projects.find((project) => project.name === newProjectName);
    this.setState({ currentProject: newProject });
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
        <Switch>
          <Route path="/edit">
            Test
          </Route>
          <Route path="/:projectName/add" component={Test} />
          <Route path="/">
            <IssueContainer currentProject={currentProject} />
          </Route>
        </Switch>
      </ThemeProvider>
    );
  }
}

export default withRouter(App);
