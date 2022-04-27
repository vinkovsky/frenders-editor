import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const drawerWidth = 240

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
      height: 'calc(100vh - 46px)',
      background: '#e4e4e4',
      marginTop: 46,
      [theme.breakpoints.down('xs')]: {
        marginTop: 0,
        height: '100vh',
      },
    },
  })
)
