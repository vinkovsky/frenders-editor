import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 120,
      minHeight: 40,
    },
    selected: {
      color: theme.palette.secondary.light,
    },
  })
)
