import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginBottom: 10,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.primary.contrastText,
    },
    icons: {
      '& svg': {
        color: theme.palette.primary.contrastText,
      },
    },
  })
)
