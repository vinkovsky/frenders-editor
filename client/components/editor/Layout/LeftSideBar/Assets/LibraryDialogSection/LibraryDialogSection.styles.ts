import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: 'calc(100vh - 158px)',
      // overflowX: 'hidden',
    },
    container: {
      padding: theme.spacing(6),
    },
  })
)
