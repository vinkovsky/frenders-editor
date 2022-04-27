import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      height: '100vh',
    },
    heading: {
      fontSize: '3em',
    },
  })
)
