import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root_general: {
      width: '100%',
      padding: 0,
      '& li:nth-child(2)': {
        zIndex: 1001,
      },
    },
    root_advanced: {
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
    widthInput: {
      width: 65,
      background: theme.palette.background.paper,
      '& input': {
        textAlign: 'right',
        padding: '8px 2px 8px 8px',
      },
      '& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button': {
        marginLeft: 5,
      },
    },
  })
)
