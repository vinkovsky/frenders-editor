import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorPrimary: {
      background: theme.palette.background.default,
    },
    dense: {
      minHeight: 40,
    },
    root: {
      justifyContent: 'space-between',
      padding: theme.spacing(0, 1),
    },
    button: {
      minWidth: 30,
      color: '#ffffff',
      borderRadius: 0,
      '& .MuiSvgIcon-root': {
        fontSize: '1.25rem',
      },
    },
  })
)
