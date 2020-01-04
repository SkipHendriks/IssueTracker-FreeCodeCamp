import React, { useState, useEffect } from 'react';
import {
  withRouter, RouteComponentProps, Route, Switch,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import Banner from './banner';
import IssueContainer from './issue-container';
import { IProject } from '../../models/project.model';
import theme from '../styles/theme';

const Test = ({ match }: RouteComponentProps<{projectName: string}>) => (
  <>
    {match.url}
  </>
);

const App = ({ location }: RouteComponentProps) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [currentProject, setCurrentProject] = useState<IProject | undefined>(undefined);

  const findCurrentProject = (name: string): IProject => (
    projects.find((project) => project.name === name)
  );

  useEffect(() => {
    const getProjects = async () => {
      const response = await fetch('http://localhost:3000/api/projects');
      const newProjects = await response.json() as IProject[];
      setProjects(newProjects);
    };
    getProjects();
  }, []);

  useEffect(() => {
    if (projects.length) {
      const currentProjectName = location.pathname.split('/')[1];
      const newCurrentProject = findCurrentProject(currentProjectName);
      setCurrentProject(newCurrentProject);
      setIsLoadingProjects(false);
    }
  }, [location.pathname.split('/')[1], projects.reduce((acc, project) => `${acc},${project._id}`, '')]);

  return (
    <ThemeProvider theme={theme}>
      <Banner
        projects={projects}
        loadingProjects={isLoadingProjects}
        currentProject={currentProject}
      />
      <Switch>
        <Route path="/edit">
          Test
        </Route>
        <Route path="/:projectName/add" component={Test} />
        <Route path="/">
          <IssueContainer
            currentProject={currentProject}
            loadingProjects={isLoadingProjects}
          />
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default withRouter(App);
