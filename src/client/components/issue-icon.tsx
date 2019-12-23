import React from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { ReportProblemOutlined as OpenIssueIcon, Done as ClosedIssueIcon } from '@material-ui/icons';

const styles = (theme: Theme) => ({
  openIssueIcon: {
    fill: theme.palette.primary.contrastText,
    margin: '0 auto',
    fontSize: '1.8rem',
  },
  closedIssueIcon: {
    fill: 'white',
    margin: '0 auto',
    stroke: theme.palette.primary.contrastText,
    strokeWidth: 2,
  },
  iconContainer: {
    height: 'inherit',
    width: `${theme.spacing(7)}px`,
    display: 'flex',
    alignItems: 'center',
    borderTopLeftRadius: 'inherit',
  },
  openIconContainer: {
    backgroundColor: theme.palette.secondary.main,
    borderRight: `solid 1px ${theme.palette.secondary.shadowBorder}`,
  },
  closedIconContainer: {
    backgroundColor: theme.palette.primary.light,
    borderRight: `solid 1px ${theme.palette.primary.shadowBorderLight}`,
  },
});

interface IProps extends WithStyles<typeof styles> {
  open: boolean;
}

const IssueIcon = ({ open, classes }: IProps) => {
  let icon;
  if (open) {
    icon = (
      <div className={`${classes.iconContainer} ${classes.openIconContainer}`}>
        <OpenIssueIcon className={classes.openIssueIcon} />
      </div>
    );
  } else {
    icon = (
      <div className={`${classes.iconContainer} ${classes.closedIconContainer}`}>
        <ClosedIssueIcon className={classes.closedIssueIcon} />
      </div>
    );
  }
  return icon;
};

export default withStyles(styles)(IssueIcon);
