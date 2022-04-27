import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: 'calc(100vh - 46px)',
      overflowY: 'scroll',
    },
    container: {
      padding: theme.spacing(8, 6),
      height: 'calc(100vh - 46px)',
    },
  })
)
