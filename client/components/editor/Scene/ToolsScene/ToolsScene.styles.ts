import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
    },
    divider: {
      margin: theme.spacing(1),
      border: '1px solid rgb(255 255 255 / 22%)',
      height: 'auto',
    },
    grouped: {
      padding: theme.spacing(0.5),
      border: 'none',
      '&:not(:first-child)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-child': {
        borderRadius: theme.shape.borderRadius,
      },
    },
  })
)
