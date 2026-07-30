
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e6007e', // Daiso Pink
    },
    secondary: {
      main: '#ffeb3b', // A complementary yellow
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
});

export default theme;