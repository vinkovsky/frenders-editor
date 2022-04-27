import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      padding: 0,
      '& li:nth-child(1)': {
        zIndex: 1000,
      },
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
    gridItem: {
      width: '103%',
    },
  })
)
