import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorBox: {
      backgroundColor: (props: any) => props.color,
      width: 24,
      height: 24,
      cursor: 'pointer',
      border: `1px solid ${theme.palette.divider}`,
      // borderRadius: 4,
    },
    disabledColorBox: {
      backgroundColor: 'none',
      width: 24,
      height: 24,
      cursor: 'none',
      border: `1px solid ${theme.palette.divider}`,
    },
    picker: {
      position: 'absolute',
      top: 30,
      left: -80,
      zIndex: 999,
    },
    hexInput: {
      display: 'block',
      boxSizing: 'border-box',
      padding: 4,
      width: 70,
      // border: '1px solid #eee',
      // borderRadius: 4,
      border: 'none',
      background: theme.palette.background.paper,
      outline: 'none',
      font: 'inherit',
      textTransform: 'uppercase',
      textAlign: 'center',
      color: theme.palette.text.primary,
      // '&:focus': {
      //   borderColor: theme.palette.primary.dark,
      // },
    },
  })
)
