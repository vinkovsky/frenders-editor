import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxHeight: 435,
      margin: 0,
      background: '#202020',
      color: theme.palette.primary.contrastText,
      padding: 12,
      textAlign: 'center',
    },
  })
)
