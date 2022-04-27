import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    main: {
      width: '100%',
      height: 'calc(100vh - 46px)',
      marginTop: 46,
    },
  })
)
