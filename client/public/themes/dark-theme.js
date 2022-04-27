import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'

const errorRed = red[500]

export default responsiveFontSizes(
  createMuiTheme({
    name: 'Dark Theme',
    palette: {
      type: 'dark',
      primary: {
        light: '#4f4f4f',
        main: '#202020',
        dark: '#000',
        contrastText: '#fff',
      },
      secondary: {
        light: '#69a7ee',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      error: {
        main: errorRed,
      },
    },
    typography: {
      htmlFontSize: 18,
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
)
