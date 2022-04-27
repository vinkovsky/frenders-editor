import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scrollbar: {
      // background: '#e6e6e6',
      overflow: 'auto',
      width: '100%',
      display: 'flex',
      height: 'calc(100% - 102px)',
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
        height: 5,
      },
      '&::-webkit-scrollbar-track': {
        background: 'none',
      },
      '&::-webkit-scrollbar-corner': {
        background: theme.palette.divider,
        // backgroundColor: '#f3f3f3',
        // outline: '1px solid slategrey',
      },
      '& .drawingCanvas': {
        display: 'none',
      },
    },
  })
)
