import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scrollbar: {
      // background: theme.palette.divider,
      overflowX: 'hidden',
      overflowY: 'scroll',
      width: '100%',
      display: 'flex',
      '&::-webkit-scrollbar-thumb': {
        background: theme.palette.divider,
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.divider,
      },
      '&::-webkit-scrollbar': {
        width: 5,
        height: 5,
      },
      '&::-webkit-scrollbar-track': {
        background: 'none',
      },
      '&::-webkit-scrollbar-corner': {
        backgroundColor: theme.palette.divider,
      },
    },
  })
)
