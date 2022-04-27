import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      padding: 0,
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
    slider: {
      width: 120,
    },
  })
)
