import React, { useState, useEffect } from 'react';

import Issue from './issue';
import AddButton from './add-button';
import { Project } from '../../models/project.model';
import { Issue as IssueType } from '../../models/issue.model';

interface Props {
  currentProject: Project;
  loadingProjects: boolean;
  setShowLoadingBar: (showIsLoading: boolean) => void;
}

const IssueContainer = ({ currentProject, loadingProjects, setShowLoadingBar }: Props) => {
  const [issues, setIssues] = useState<IssueType[]>([]);
  const [isLoadingIssues, setIsLoadingIssuesState] = useState(true);

  const setIsLoadingIssues = (isLoading: boolean) => {
    setIsLoadingIssuesState(isLoading);
    setShowLoadingBar(isLoading);
  };

  useEffect(() => {
    if (!loadingProjects) {
      const getIssues = async () => {
        setIsLoadingIssues(true);
        const url = `http://localhost:3000/api/issues/${currentProject?.name || ''}`;
        const response = await fetch(url);
        const newIssues = await response.json() as IssueType[];
        setIssues(newIssues);
        setIsLoadingIssues(false);
      };
      getIssues();
    }
  }, [currentProject?._id, loadingProjects]);

  const addUrl = `${currentProject?.name || ''}/add`;

  return (
    <>
      {!isLoadingIssues && issues.map((issue) => (
        <Issue issue={issue} key={issue._id} />
      ))}
      <AddButton url={addUrl} />
    </>
  );
};

export default IssueContainer;
