import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      background: '#eee',
      maxWidth: 500,
      margin: theme.spacing(0, 0, 2, 0),
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    media: {
      width: 250,
      height: 280,
    },
    subtitle: {
      marginTop: 10,
      fontSize: '0.85rem',
    },
    iconEdit: {
      '&:hover svg': {
        color: theme.palette.primary.main,
      },
    },
    iconDelete: {
      '&:hover svg': {
        color: theme.palette.error.main,
      },
    },
  })
)
