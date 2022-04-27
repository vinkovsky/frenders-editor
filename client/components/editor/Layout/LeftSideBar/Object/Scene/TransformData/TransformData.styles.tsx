import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
)
