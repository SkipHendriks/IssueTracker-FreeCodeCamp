import React from 'react';

import AddIssueForm from './issue-form';
import { Project } from '../../models/project.model';

interface Props {
  currentProject?: Project
  projects: Project[]
  isLoadingProjects: boolean
}

const AddIssue = ({ currentProject, projects, isLoadingProjects }: Props) => (
  <AddIssueForm
    title="Add Issue"
    project_id={currentProject?._id}
    projects={projects}
    isLoadingProjects={isLoadingProjects}
  />
);

export default AddIssue;
