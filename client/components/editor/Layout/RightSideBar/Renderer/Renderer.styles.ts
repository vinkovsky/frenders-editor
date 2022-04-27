import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: 0,
      '& li:nth-child(2)': {
        zIndex: 1000,
      },
    },
    item: {
      width: '100%',
    },
    listItem: {
      paddingLeft: 0,
    },
    listItemAction: {
      right: 0,
    },
    bouncesInput: {
      background: theme.palette.background.paper,
      width: 65,
      '& input': {
        textAlign: 'right',
        padding: '8px 2px 8px 8px',
      },
      '& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button': {
        marginLeft: 5,
      },
    },
    select: {
      boxSizing: 'border-box',
      textAlign: 'center',
      minWidth: 92,
      background: theme.palette.background.paper,
    },
  })
)
