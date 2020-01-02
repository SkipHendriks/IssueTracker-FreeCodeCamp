import createMuiTheme, { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const styles: ThemeOptions = {
  palette: {
    primary: {
      main: '#006776',
      shadowBorderLight: '#2c727d',
    },
    secondary: {
      main: '#00e676',
      shadowBorder: '#00c665',
    },
    text: {
      primary: '#464646',
    },
  },
  typography: {
    fontSize: 16,
    // lineHeight: '1.5',
    h5: {
      fontSize: 24,
    },
  },
};

export default createMuiTheme(styles);
