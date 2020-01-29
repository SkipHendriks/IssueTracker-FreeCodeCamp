import React from 'react';
import {
  withStyles, WithStyles, InputLabel, FormHelperText, Switch, createStyles, Theme,
} from '@material-ui/core';

const StyledSwitch = withStyles((theme: Theme) => ({
  switchBase: {
    color: theme.palette.primary.light,
    '&$checked': {
      color: theme.palette.secondary.main,
    },
  },
  checked: {},
  track: {
    backgroundColor: theme.palette.primary.light,
    opacity: 0.5,
    '&$checked': {
      color: theme.palette.secondary.main,
    },
  },
}))(Switch);

const styles = createStyles({
  helperText: {
    marginTop: '2px',
  },
});

interface Props extends WithStyles<typeof styles> {
  id: string
  value: boolean
  onChange: (open: boolean) => void;
}

const StatusSwitch = ({
  id, value, onChange, classes,
}: Props) => (
  <div>
    <InputLabel shrink>Status</InputLabel>
    <StyledSwitch
      id={id}
      onChange={() => {
        onChange(!value);
      }}
      value={!value}
    />
    <FormHelperText className={classes.helperText}>{value ? 'Open' : 'Closed'}</FormHelperText>
  </div>
);

export default withStyles(styles)(StatusSwitch);
