import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      margin: '0 auto',
      width: 500,
      padding: 10,
    },
    card: {
      maxWidth: 160,
      height: 118,
    },
    media: {
      width: 'inherit',
      height: 'inherit',
      backgroundSize: 'cover',
    },
    slider: {
      '& .slick-active': {
        outline: 'none',
        border: 'none',
      },
    },
  })
)
