import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      width: '100%',
      height: '100vh',
      background: 'url(./images/auth/promotion-mockup.jpg)',
      backgroundSize: 'cover',
    },
    heading: {
      fontSize: '2rem',
      textAlign: 'center',
      fontWeight: 900,
      marginBottom: theme.spacing(3),
    },
    text: {
      textAlign: 'center',
    },
    button: {
      padding: 15,
      marginBottom: theme.spacing(3),
    },
  })
)
