import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tools: {
      display: 'flex',
    },
    divider: {
      margin: theme.spacing(1),
      border: '1px solid rgb(255 255 255 / 22%)',
      height: 'auto',
    },
    button: {
      minWidth: 30,
      color: theme.palette.secondary.contrastText,
      borderRadius: 0,
      padding: 2,
      margin: 4,
      border: '1px solid rgba(255, 255, 255, 0.12)',
      '& .MuiSvgIcon-root': {
        fontSize: '1.25rem',
      },
    },
  })
)
