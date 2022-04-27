import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    panel: {
      width: '100%',
      height: 'calc(100% - 48px)',
      overflowX: 'hidden',
      overflowY: 'auto',
      margin: 0,
      padding: 0,
      '&::-webkit-scrollbar-thumb': {
        background: theme.palette.divider,
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.divider,
      },
      '&::-webkit-scrollbar': {
        width: 5,
      },
      '&::-webkit-scrollbar-track': {
        background: 'none',
      },
      '&::-webkit-scrollbar-corner': {
        backgroundColor: theme.palette.divider,
      },
    },
    box: {
      padding: 14,
    },
  })
)
