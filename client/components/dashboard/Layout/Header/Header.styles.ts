import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      boxShadow: 'none',
      minHeight: 46,
      background: theme.palette.secondary.main,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    toolBar: {
      minHeight: 46,
      flexGrow: 1,
    },
    link: {
      color: theme.palette.secondary.contrastText,
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
      '&:hover': {
        textDecoration: 'none',
      },
    },
    icon: {
      marginRight: theme.spacing(2),
      color: theme.palette.secondary.contrastText,
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    logo: {
      textTransform: 'uppercase',
      textAlign: 'center',
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(6),
      },
    },
    sectionName: {
      textAlign: 'center',
      flexGrow: 1,
      [theme.breakpoints.up('sm')]: {
        marginLeft: '7.8%',
      },
    },
  })
)
