export interface ITheme {
  colors: {
    [color: string]: string;
  };
  settings: {
    [setting: string]: string;
  };
}

const theme: ITheme = {
  colors: {
    today: '#039BE5',
    open: '#4CAF50',
    partial: '#FFA000',
    full: '#f44336',
    empty: '#E0E0E0',
    black: '#2d2d2d',
  },
  settings: {
    fadeSpeed: '0.3s',
  },
};

export default theme;
