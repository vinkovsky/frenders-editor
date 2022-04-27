import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'relative',
      height: '100vh',
    },
    paperAnchorDockedRight: {
      border: 'none',
    },
    tabPanel: {
      padding: theme.spacing(3, 0),
    },
  })
)
