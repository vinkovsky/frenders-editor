import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      top: 112,
      display: 'flex',
      background: '#202020',
      zIndex: 1000,
    },
    texture: {
      minWidth: 50,
      height: 50,
      margin: '0 5px',
      backgroundSize: 'cover',
    },
  })
)
