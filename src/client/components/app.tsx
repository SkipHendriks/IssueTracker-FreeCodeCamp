import React from 'react';
import { BrowserRouter as Router, Route, withRouter, RouteComponentProps } from "react-router-dom";

import Banner from './banner';
import { IProject } from '../../models/project.model';

interface IState {
  isLoading: boolean;
  projects: Array<IProject>;
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
    const { projects, isLoading } = this.state;
    const { location } = this.props;

    const currentProject = location.pathname.split('/')[1];
    return (
      <>
        <Banner
          projects={projects}
          isLoading={isLoading}
          handleChange={this.onProjectSelect}
          currentProject={currentProject}
        />
        <Route path="/:project">
          <div>
            {currentProject}
          </div>
        </Route>
      </>
    );
  }
}


export default withRouter(App);
