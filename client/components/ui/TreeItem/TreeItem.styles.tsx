import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'uppercase',
      fontWeight: 900,
      background: 'transparent',
    },
    content: {
      padding: 6,
      '&:hover': {
        background: theme.palette.primary.light,
      },
    },
    expanded: {},
    selected: {
      background: theme.palette.background.default,
    },
    group: {},
    label: {
      background: 'transparent !important',
      padding: 6,
    },
    iconContainer: {
      padding: 6,
    },
    icon: {
      width: 20,
      height: 20,
    },
  })
)
