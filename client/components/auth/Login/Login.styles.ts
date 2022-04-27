import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { darken } from '@material-ui/core/styles/colorManipulator'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    background: {
      width: '100%',
      height: '100vh',
      background: 'url(./images/auth/promotion-mockup.jpg)',
      backgroundSize: 'cover',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: 900,
      textAlign: 'center',
      marginBottom: theme.spacing(3),
    },
    socialAuth: {
      padding: `0 ${theme.spacing(3)}`,
      marginBottom: theme.spacing(2),
    },
    vk: {
      width: '100%',
      backgroundColor: '#2787F5',
      color: theme.palette.primary.contrastText,
      fontSize: '0.7rem',
      '&:hover': {
        backgroundColor: darken('#2787F5', 0.4),
      },
    },
    google: {
      width: '100%',
      backgroundColor: '#DB4437',
      color: theme.palette.primary.contrastText,
      fontSize: '0.7rem',
      '&:hover': {
        backgroundColor: darken('#DB4437', 0.4),
      },
    },
    divider: {
      marginBottom: theme.spacing(3),
    },
    input: {
      marginBottom: theme.spacing(3),
    },
    button: {
      padding: 15,
      marginBottom: theme.spacing(3),
    },
    error: {
      color: theme.palette.error.main,
    },
  })
)
