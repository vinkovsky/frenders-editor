import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    socialButton: {
      borderRadius: 0,
      padding: theme.spacing(2),
    },
  })
)
