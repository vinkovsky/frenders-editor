import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      boxSizing: 'border-box',
      textAlign: 'center',
      // paddingLeft: 6,
      minWidth: 92,
      background: theme.palette.background.paper,
    },
  })
)
