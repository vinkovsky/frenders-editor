import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    item: {
      width: '100%',
    },
    input: {
      display: 'none',
    },
    download: {
      width: '100%',
      height: 75,
      background: theme.palette.secondary.main,
      // background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      // color: theme.palette.primary.contrastText,
      borderRadius: 4,
      '&:hover': {
        background: theme.palette.secondary.dark,
      },
    },
    // accordion: {
    //   background: theme.palette.primary.light,
    //   color: theme.palette.text.primary,
    // },
    progress: {
      color: theme.palette.text.primary,
      // color: theme.palette.primary.contrastText,
    },
    button: {
      background: theme.palette.secondary.main,
      '&:hover': {
        background: theme.palette.secondary.dark,
      },
    },
  })
)
