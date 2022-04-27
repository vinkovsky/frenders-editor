import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      padding: theme.spacing(1),
    },
    listItem: {
      background: '#e4e4e4',
    },
  })
)
