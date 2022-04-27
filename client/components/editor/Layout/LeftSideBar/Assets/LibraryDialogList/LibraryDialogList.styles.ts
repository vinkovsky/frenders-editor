import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      padding: theme.spacing(1),
      width: 240,
      height: 'calc(100vh - 158px)',
      background: theme.palette.background.default,
    },
  })
)
