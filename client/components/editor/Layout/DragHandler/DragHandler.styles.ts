import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      cursor: 'move',
      width: '100%',
      padding: theme.spacing(0, 3),
      // color: theme.palette.primary.contrastText,
      color: theme.palette.primary.contrastText,
      // background: '#202020',
      background: theme.palette.primary.main,
    },
  })
)
