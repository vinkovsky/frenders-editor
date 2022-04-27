import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      // background: '#202020',
      background: theme.palette.primary.main,
      // color: '#ffffff',
      color: theme.palette.primary.contrastText,
    },
    iconButton: {
      // color: theme.palette.primary.contrastText,
      color: theme.palette.primary.contrastText,
    },
    caption: {
      fontWeight: 900,
    },
    username: {
      fontSize: '1rem',
      textAlign: 'center',
      fontWeight: 900,
    },
    avatar: {
      background: theme.palette.secondary.main,
    },
  })
)
