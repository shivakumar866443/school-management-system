import { CssBaseline, ThemeProvider } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import { theme } from './theme.js';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <AppRoutes />
      <Footer />
    </ThemeProvider>
  );
}
