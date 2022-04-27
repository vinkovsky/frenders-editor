import React, { FunctionComponent, useState } from 'react'
import { ClickAwayListener, Grid } from '@material-ui/core'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import * as _ from 'lodash'

export interface IColorPickerProps {
  color: string
  disabled?: boolean
  onChange: (color: string) => void
}

import { useStyles } from './ColorPicker.styles'

const ColorPicker: FunctionComponent<IColorPickerProps> = ({
  color,
  disabled,
  onChange,
}) => {
  const classes = useStyles({ color })
  const [openPicker, setOpenPicker] = useState<boolean>(false)

  return (
    <Grid
      container
      spacing={2}
      alignItems={'center'}
      justify={'space-around'}
      style={disabled ? { pointerEvents: 'none' } : undefined}
    >
      <Grid item>
        <HexColorInput
          className={classes.hexInput}
          color={disabled ? '' : color}
          disabled={disabled}
          onChange={_.debounce(onChange, 50)}
        />
      </Grid>
      <Grid item>
        <div
          className={!disabled ? classes.colorBox : classes.disabledColorBox}
          onClick={() => setOpenPicker(true)}
        />
      </Grid>
      {openPicker ? (
        <ClickAwayListener onClickAway={() => setOpenPicker(false)}>
          <div className={classes.picker}>
            <HexColorPicker onChange={_.debounce(onChange, 50)} color={color} />
          </div>
        </ClickAwayListener>
      ) : null}
    </Grid>
  )
}

export default ColorPicker
