import React from 'react';
import {
  ExpansionPanelDetails as MuiExpansionPanelDetails,
  ExpansionPanel as MuiExpansionPanel,
  ExpansionPanelSummary as MuiExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';

import IssueIcon from './issue-icon';
import { IIssue } from '../../models/issue.model';

const ExpansionPanelSummary = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: 0,
    borderRadius: 'inherit',
    minHeight: 0,
    height: `${theme.spacing(5)}px`,
    '&$expanded': {
      minHeight: 0,
      backgroundColor: '#f5f5f6',
    },
  },
  content: {
    margin: 0,
    height: 'inherit',
    borderRadius: 'inherit',
    alignItems: 'center',
    display: 'flex',
    '&$expanded': {
      margin: 0,
    },
  },
  expanded: {},
}))(MuiExpansionPanelSummary);

const ExpansionPanel = withStyles({
  root: {
    padding: 0,
    // border: '1px solid rgba(0, 0, 0, .125)',
    // boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    // '&$expanded + &::before': {
    //   display: 'block',
    //   opacity: 1,
    // },
    // '&$expanded': {
    //   margin: 'auto',
    // },
  },
  expanded: {
    // '&::before': {
    //   opacity: '1 !important',
    // },
    borderRadius: '4px',
  },
})(MuiExpansionPanel);

const ExpansionPanelDetails = withStyles({
  root: {
    padding: 0,
    position: 'relative',
    '&::before': {
      top: '-1px',
      left: '57px',
      right: 0,
      height: '1px',
      width: 'calc(100% - 57px)',
      content: '""',
      opacity: 1,
      position: 'absolute',
      // transition: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
  },
  expanded: {},
})(MuiExpansionPanelDetails);

const styles = (theme: Theme) => ({
  panelRoot: {
    padding: 0,
  },
  issueTitle: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,
    lineHeight: '1.5rem',
    flex: '1 1 auto',
  },
  assignedTo: {
    flex: '0 0 auto',
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`,
  },
  iconContainerExtension: {
    height: 'inherit',
    width: theme.spacing(7),
  },
  iconContainerExtensionOpen: {
    borderRight: `solid 1px ${theme.palette.secondary.shadowBorder}`,
    backgroundColor: theme.palette.secondary.main,
  },
  iconContainerExtensionClosed: {
    borderRight: `solid 1px ${theme.palette.primary.shadowBorderLight}`,
    backgroundColor: theme.palette.primary.light,
  },
  issueText: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
});

interface IProps extends WithStyles<typeof styles> {
  issue: IIssue
}


const Issue = ({ issue, classes }: IProps) => {
  let iconContainerExtensionColor;
  if (issue.open) {
    iconContainerExtensionColor = classes.iconContainerExtensionOpen;
  } else {
    iconContainerExtensionColor = classes.iconContainerExtensionClosed;
  }

  return (
    <ExpansionPanel className={classes.panelRoot}>
      <ExpansionPanelSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <IssueIcon open={issue.open} />
        <Typography variant="h5" color="textPrimary" className={classes.issueTitle}>{issue.issue_title}</Typography>
        { issue.assigned_to && <Typography variant="h6" color="textSecondary" className={classes.assignedTo}>{`~ ${issue.assigned_to}`}</Typography> }
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={`${classes.iconContainerExtension} ${iconContainerExtensionColor}`} />
        <Typography className={classes.issueText}>
          {issue.issue_text}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(Issue);
