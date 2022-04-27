import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slider: {
      width: '100%',
    },
    valueLabel: {
      // backgroundColor: '#fff',
    },
    input: {
      marginRight: 8,
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
