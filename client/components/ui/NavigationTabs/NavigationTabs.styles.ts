import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      height: 48,
      background: theme.palette.primary.main,
      overflow: 'hidden',
    },
    root: {
      color: theme.palette.primary.light,
      '&$iconOnly': {
        paddingTop: 20,
      },
      '&$selected': {
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        fontSize: '0.75rem',
      },
    },
    selected: {},
    iconOnly: {},
  })
)
