import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fabButton: {
      position: 'absolute',
      zIndex: 999,
      top: 18,
      right: 170,
      color: theme.palette.primary.contrastText,
    },
    colorPrimary: {
      background: theme.palette.background.default,
    },
    dense: {
      minHeight: 40,
    },
    root: {
      justifyContent: 'space-between',
      padding: theme.spacing(0, 1),
    },
  })
)
