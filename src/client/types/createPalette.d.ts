import '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface SimplePaletteColorOptions {
    shadowBorder?: string;
    shadowBorderLight?: string;
  }

  interface PaletteColor {
    shadowBorder?: string;
    shadowBorderLight?: string;
  }
}
