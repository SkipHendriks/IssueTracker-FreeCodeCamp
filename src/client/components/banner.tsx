import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  OutlinedInput,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { IProject } from '../../models/project.model';

interface IProps {
  projects: Array<IProject>;
  loadingProjects: boolean;
  currentProject: IProject;
}

const useOutlinedInputStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    margin: theme.spacing(2),
    minWidth: 153,
    color: theme.palette.primary.contrastText,
    '& $notchedOutline': {
      border: 0,
    },
    '&:hover $notchedOutline': {
      border: 0,
    },
    '&$focused $notchedOutline': {
      border: 0,
      borderRadius: 'inherit',
    },
  },
  focused: {},
  notchedOutline: {},
}));

const useStyles = makeStyles((theme: Theme) => createStyles({
  select: {
    padding: `${theme.spacing(2)}px ${theme.spacing(5)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
    '&:focus': {
      backgroundColor: theme.palette.primary.light,
      borderRadius: 'inherit',
    },
  },
  title: {
    flexGrow: 1,
  },
  selectIcon: {
    display: 'none',
  },
}));

export default ({
  projects, loadingProjects, currentProject,
}: IProps) => {
  const classes = useStyles({});
  const outlinedInputClasses = useOutlinedInputStyles({});

  let menuItems;
  if (loadingProjects) {
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
      projects.map((project) => (
        <MenuItem
          value={project.name}
          key={project._id}
          // @ts-ignore [1]
          component={Link}
          to={project.name}
        >
          {project.name}
        </MenuItem>
      )),
    ];
  }

  let selectValue;

  if (loadingProjects || !currentProject) {
    selectValue = 'default';
  } else {
    selectValue = currentProject.name;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title} noWrap>
          Issue Tracker
        </Typography>
        <Select
          value={selectValue}
          variant="outlined"
          classes={{ root: classes.select, icon: classes.selectIcon }}
          input={(
            <OutlinedInput
              labelWidth={0}
              classes={outlinedInputClasses}
            />
          )}
        >
          { menuItems }
        </Select>
      </Toolbar>
    </AppBar>
  );
};
