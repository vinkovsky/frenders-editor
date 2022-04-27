import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      '& .canvas-container': {
        margin: 'auto',
      },
    },
    fullscreen: {
      height: 'inherit',
    },
    scrollbar: {
      overflowX: 'hidden',
      overflowY: 'auto',
      margin: 0,
      padding: 0,
      height: '100vh',
      '&::-webkit-scrollbar-thumb': {
        // backgroundColor: '#dddddd',
        background: theme.palette.divider,
      },
      '&::-webkit-scrollbar-thumb:hover': {
        // backgroundColor: '#cdcdcd',
        background: theme.palette.divider,
      },
      '&::-webkit-scrollbar': {
        width: 5,
      },
      '&::-webkit-scrollbar-track': {
        background: 'none',
      },
    },
  })
)
