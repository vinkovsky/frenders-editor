import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
    },
    summary: {
      maxHeight: 46,
      minHeight: 'auto !important',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
      // color: '#e6e6e6',
    },
    title: {
      fontWeight: 500,
      // fontSize: '0.8rem',
    },
    details: {
      display: 'block',
      background: theme.palette.primary.light,
      padding: '8px 16px',
    },
  })
)
