import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    input: {
      '& > div': {
        borderRadius: 0,
      },
      '& input': {
        padding: '18px 14px',
      },
    },
  })
)
