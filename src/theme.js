import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0b6b7a', dark: '#064e59' },
    secondary: { main: '#d7472f' },
    success: { main: '#16865f' },
    warning: { main: '#f2a900' },
    background: {
      default: '#f6f8fb',
      paper: '#ffffff'
    },
    text: {
      primary: '#17212b',
      secondary: '#5e6b78'
    }
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: 0 },
    h2: { fontWeight: 800, letterSpacing: 0 },
    h3: { fontWeight: 750, letterSpacing: 0 },
    h4: { fontWeight: 750, letterSpacing: 0 },
    h5: { fontWeight: 700, letterSpacing: 0 },
    h6: { fontWeight: 700, letterSpacing: 0 },
    button: { textTransform: 'none', fontWeight: 700 }
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 14px 40px rgba(22, 33, 43, 0.08)'
        }
      }
    }
  }
});
