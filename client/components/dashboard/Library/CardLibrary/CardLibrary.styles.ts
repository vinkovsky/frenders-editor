import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: '100%',
      maxWidth: 500,
      '&:hover .MuiCardContent-root': {
        opacity: 1,
        transition: '1s',
      },
    },
    media: {
      width: 'inherit',
      height: 'inherit',
      backgroundSize: 'cover',
    },
    content: {
      position: 'absolute',
      top: 0,
      left: 0,
      boxSizing: 'border-box',
      width: '100%',
      maxWidth: 500,
      height: 'inherit',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      paddingBottom: '16px!important',
      opacity: 0,
      transition: '1s',
    },
    grid: {
      height: '100%',
    },
    gridItem: {
      flexGrow: 2,
    },
    icon: {
      '& svg': {
        fontSize: '4rem',
        color: theme.palette.primary.contrastText,
      },
    },
    favorite: {
      color: theme.palette.primary.contrastText,
    },
    chip: {
      color: theme.palette.primary.contrastText,
    },
    title: {
      fontWeight: 700,
      color: theme.palette.primary.contrastText,
    },
  })
)
