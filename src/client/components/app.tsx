import React, { useState, useEffect } from 'react';
import {
  withRouter, RouteComponentProps, Route, Switch,
} from 'react-router-dom';
import { ThemeProvider, LinearProgress } from '@material-ui/core';

import Banner from './banner';
import IssueContainer from './issue-container';
import AddIssue from './add-issue';
import { Project } from '../../models/project.model';
import theme from '../styles/theme';
import MainContainer from './main-container';

const App = ({ location }: RouteComponentProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [showLoadingBar, setShowLoadingBar] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined);

  const findCurrentProject = (name: string): Project => (
    projects.find((project) => project.name === name)
  );

  useEffect(() => {
    const getProjects = async () => {
      const response = await fetch('http://localhost:3000/api/projects');
      const newProjects = await response.json() as Project[];
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
      {showLoadingBar && <LinearProgress />}
      <MainContainer>
        <Switch>
          <Route path="/edit">
            Test
          </Route>
          <Route path="/add">
            <AddIssue
              projects={projects}
              isLoadingProjects={isLoadingProjects}
            />
          </Route>
          <Route path="/:projectName/add">
            <AddIssue
              currentProject={currentProject}
              projects={projects}
              isLoadingProjects={isLoadingProjects}
            />
          </Route>

          <Route path="/">
            <IssueContainer
              currentProject={currentProject}
              loadingProjects={isLoadingProjects}
              setShowLoadingBar={setShowLoadingBar}
            />
          </Route>
        </Switch>
      </MainContainer>
    </ThemeProvider>
  );
};

export default withRouter(App);
