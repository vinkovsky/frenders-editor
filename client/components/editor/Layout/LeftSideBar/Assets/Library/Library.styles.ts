import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      margin: 0,
      // background: '#202020',
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      // color: theme.palette.primary.contrastText,
      padding: 12,
      textAlign: 'center',
    },
    grid: {
      height: 'calc(100vh - 158px)',
      overflow: 'hidden',
    },
    content: {
      padding: 0,
      overflow: 'hidden',
    },
    actions: {
      margin: 0,
      padding: theme.spacing(1),
    },
    button: {
      background: theme.palette.secondary.main,
      padding: theme.spacing(2, 0),
      marginBottom: theme.spacing(2),
      '&:hover': {
        background: theme.palette.secondary.dark,
      },
    },
    libraryActionButton: {
      background: theme.palette.secondary.main,
      '&:hover': {
        background: theme.palette.secondary.dark,
      },
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.primary.contrastText,
    },
  })
)
