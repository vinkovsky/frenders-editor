import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: 300,
      maxWidth: 500,
      height: 300,
    },
    media: {
      width: 'inherit',
      height: 'inherit',
      backgroundSize: 'cover',
    },
    title: {
      fontWeight: 700,
      color: theme.palette.primary.contrastText,
    },
  })
)
