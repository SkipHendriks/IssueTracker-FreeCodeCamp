import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import { IProject } from '../../models/project.model';

interface IProps {
  projects: Array<IProject>;
  isLoading: boolean;
  handleChange(event: React.ChangeEvent<HTMLSelectElement>): void;
  currentProject: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 153,
    },
    selectText: {
      paddingRight: theme.spacing(5),
    },
    title: {
      flexGrow: 1,
    },
  }));

export default ({
  projects, isLoading, handleChange, currentProject,
}: IProps) => {
  const classes = useStyles({});

  let menuItems;
  if (isLoading) {
    menuItems = (
      <MenuItem value="default">
        <em>Loading...</em>
      </MenuItem>
    );
  } else {
    menuItems = [
      !currentProject && (
        <MenuItem value="default" key={0}>
          <em>Select Project</em>
        </MenuItem>
      ),
      projects.map((project: IProject) => (
        <MenuItem value={project.name} key={project._id}>{project.name}</MenuItem>
      )),
    ];
  }

  let selectValue;

  if (isLoading || !currentProject) {
    selectValue = 'default';
  } else {
    selectValue = currentProject;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title} noWrap>
          Issue Tracker
        </Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            onChange={handleChange}
            value={selectValue}
            classes={{ root: classes.selectText }}
          >
            { menuItems }
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};
