import { createMuiTheme } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'

const errorRed = red[500]

export default createMuiTheme({
  name: 'Light Theme',
  type: 'light',
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#4F4F4F',
      main: '#181818',
      dark: '#000',
      contrastText: '#fff',
    },
    error: {
      main: errorRed,
    },
  },
  typography: {
    h1: {
      fontSize: '1.25rem',
      fontWeight: 900,
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 700,
      textAlign: 'center',
      letterSpacing: 0,
    },
    h3: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '0.75rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      fontVariant: 'small-caps',
    },
    h6: {
      fontSize: '0.875rem',
    },
    subtitle1: {
      fontSize: '0.875rem',
    },
  },
})
