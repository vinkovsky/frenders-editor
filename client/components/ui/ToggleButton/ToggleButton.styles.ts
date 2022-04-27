import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sizeSmall: {
      padding: theme.spacing(0.25),
      margin: theme.spacing(0.5),
    },
    root: {
      minWidth: 30,
      padding: theme.spacing(0.25),
      borderRadius: 0,
      color: theme.palette.secondary.contrastText,
      // color: 'rgb(255 255 255 / 45%)',
      '&:hover': {
        backgroundColor: 'rgb(255 255 255 / 15%)',
      },
      '&$selected': {
        color: theme.palette.secondary.contrastText,
        // color: 'rgb(255 255 255 / 1)',
        backgroundColor: 'rgb(255 255 255 / 12%)',
        '&:hover': {
          backgroundColor: 'rgb(255 255 255 / 15%)',
        },
      },
      '& .MuiSvgIcon-root': {
        fontSize: '1.25rem',
      },
    },
    selected: {},
  })
)
