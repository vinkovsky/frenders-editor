import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: 0,
    },
    root_filters: {
      width: '100%',
      padding: '0 0 20px 0',
    },
    item: {
      width: '100%',
    },
    listItem: {
      paddingLeft: 0,
    },
    listItem1: {
      paddingLeft: 0,
      marginTop: 10,
    },
    listItem2: {
      paddingLeft: 0,
      marginTop: 5,
    },
    listItemAction: {
      right: 0,
    },
    input: {
      width: 70,
      background: theme.palette.background.paper,
      '& input': {
        textAlign: 'right',
        padding: '8px 2px 8px 8px',
      },
      '& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button': {
        marginLeft: 5,
      },
    },
    gridItem: {
      width: '103%',
    },
  })
)
