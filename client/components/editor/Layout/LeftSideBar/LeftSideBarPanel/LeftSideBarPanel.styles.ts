import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // [theme.breakpoints.up('sm')]: {
      //   width: 400,
      //   flexShrink: 0,
      // },
      // [theme.breakpoints.down('xs')]: {
      //   width: 0,
      //   // flexShrink: 0,
      // },
    },
    paper: {
      height: '100vh',
      background: theme.palette.background.paper,
      position: 'relative',
    },
    paperAnchorDockedLeft: {
      border: 'none',
    },
    tabPanel: {
      padding: '12px 0',
    },
  })
)
