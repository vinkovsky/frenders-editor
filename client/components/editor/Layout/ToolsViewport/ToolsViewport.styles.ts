import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tools: {
      display: 'flex',
    },
    divider: {
      margin: theme.spacing(0, 1),
      border: '1px solid rgb(255 255 255 / 22%)',
      height: 'auto',
    },
    fabButton: {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.contrastText,
      position: 'absolute',
      zIndex: 999,
      top: -22,
      left: 100,
      '&:hover': {
        background: theme.palette.secondary.dark,
      },
    },
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -26,
      left: 96,
      zIndex: 999,
    },
    button: {
      minWidth: 30,
      // color: '#ffffff',
      color: theme.palette.text.primary,
      borderRadius: 0,
      '& .MuiSvgIcon-root': {
        fontSize: '1.25rem',
      },
    },
  })
)
