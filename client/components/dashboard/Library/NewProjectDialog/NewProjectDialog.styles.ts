import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    grid: {
      padding: 20,
    },
    typography: {
      fontSize: 18,
      fontWeight: 900,
    },
    gridButton: {
      marginTop: 22,
    },
    button: {
      height: 50,
    },
    content: {
      overflowY: 'hidden',
    },
    input: {
      marginTop: 22,
    },
  })
)
