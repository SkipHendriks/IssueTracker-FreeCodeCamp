import React, { PropsWithChildren } from 'react';
import { Container } from '@material-ui/core';
import {
  createStyles, withStyles, WithStyles, Theme,
} from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
  mainContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: '#f5f5f6',
    minHeight: 'calc(100vh - 72px)',
  },
});

const MainContainer = ({ children, classes }: PropsWithChildren<WithStyles<typeof styles>>) => (
  <Container className={classes.mainContainer}>
    {children}
  </Container>
);

export default withStyles(styles)(MainContainer);
