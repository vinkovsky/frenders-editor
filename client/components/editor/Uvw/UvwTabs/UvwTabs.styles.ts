import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: 'center',
      minHeight: 40,
    },
    scroller: {
      flexGrow: 0,
    },
    indicator: {
      background: theme.palette.secondary.light,
    },
  })
)
