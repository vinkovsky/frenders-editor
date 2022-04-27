import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: '100%',
      // maxWidth: (props: any) => (props.zone === 'library' ? 150 : 80),
      height: (props: any) => (props.zone === 'library' ? 150 : 75),
      '&:hover div:last-child': {
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
      // maxWidth: (props: any) => (props.zone === 'library' ? 150 : 80),
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
      marginTop: (props: any) =>
        props.zone === 'library' ? theme.spacing(2) : theme.spacing(0),
    },
    title: {
      fontWeight: 700,
      color: theme.palette.primary.contrastText,
    },
    icon: {
      '& svg': {
        fontSize: (props: any) => (props.zone === 'library' ? '3rem' : '2rem'),
        color: theme.palette.primary.contrastText,
      },
    },
  })
)
