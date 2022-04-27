import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    loaderLayout: {
      height: '100vh',
      width: '100%',
      margin: 0,
      padding: 0,
    },
  })
)
