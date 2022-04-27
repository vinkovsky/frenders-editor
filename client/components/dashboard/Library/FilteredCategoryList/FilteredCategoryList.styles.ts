import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ul: {
      padding: 0,
    },
    li: {
      display: 'block',
    },
    category: {
      fontVariant: 'small-caps',
      fontSize: '1.25rem',
    },
    categoryItem: {
      margin: theme.spacing(1),
    },
  })
)
