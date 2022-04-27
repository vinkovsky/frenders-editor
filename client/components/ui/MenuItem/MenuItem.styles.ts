import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItem: {
      padding: theme.spacing(2),
      '&:hover:not(:first-child)': {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
      '&:hover .MuiListItemIcon-root': {
        color: theme.palette.primary.contrastText,
      },
    },
    text: {
      fontSize: '0.875rem',
      fontWeight: 700,
    },
  })
)
