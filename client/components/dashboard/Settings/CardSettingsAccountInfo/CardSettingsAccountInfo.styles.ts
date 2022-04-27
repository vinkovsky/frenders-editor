import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { darken } from '@material-ui/core/styles/colorManipulator'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexGrow: 1,
    },
    avatar: {
      width: 90,
      height: 90,
      fontSize: '2.25rem',
    },
    icon: {
      padding: theme.spacing(1),
      border: '1px solid black',
      borderRadius: '100%',
      '& .MuiSvgIcon-root': {
        color: theme.palette.primary.contrastText,
        fontSize: '1.25rem',
      },
    },
    input: {
      marginBottom: theme.spacing(2),
    },
    file: {
      display: 'none',
    },
    delete: {
      background: theme.palette.error.main,
      '&:hover': {
        background: darken(theme.palette.error.main, 0.4),
      },
    },
    header: {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    progress: {
      color: theme.palette.primary.contrastText,
    },
  })
)
