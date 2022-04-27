import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      overflow: 'hidden',
      width: '100%',
      height: '100vh',
    },
    layout: {
      width: 'calc(100% - 700px)',
      minHeight: '100vh',
      // background: '#f3f3f3',
      background: theme.palette.primary.light,
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    gridItem: {
      width: 350,
    },
  })
)
