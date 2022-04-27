import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      marginTop: theme.spacing(1),
      '& ul': {
        padding: 0,
        '& li:first-child': {
          padding: theme.spacing(0, 3, 0, 0),
          '&:hover': {
            background: 'none',
          },
        },
      },
    },
    avatar: {
      width: 60,
      height: 60,
      fontSize: '1.5rem',
      margin: theme.spacing(2),
    },
  })
)
