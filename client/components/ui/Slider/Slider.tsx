import React, { ChangeEvent, forwardRef, FunctionComponent, Ref } from 'react'

import {
  Slider as MuiSlider,
  Grid,
  SliderProps,
  TextField,
} from '@material-ui/core'
import clsx from 'clsx'

import { MaterialAreaType } from '@interfaces/editor/objectScene'

import { useStyles } from './Slider.styles'

export interface ISliderProps extends Omit<SliderProps, 'onChange'> {
  className?: string
  doNotShowInput?: boolean
  min: number
  max: number
  step: number
  value: number | undefined
  disabled?: boolean
  onChange: (event: ChangeEvent<any>, value: number | number[]) => void
  onInputChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    area?: MaterialAreaType
  ) => void
  onChangeCommitted?: (event: ChangeEvent<any>, area?: any) => void
}

type SliderPropsType = ISliderProps

const Slider: FunctionComponent<SliderPropsType> = forwardRef(
  (
    {
      className,
      doNotShowInput,
      min,
      max,
      step,
      onInputChange,
      onChangeCommitted,
      onChange,
      value,
      disabled,
      ...props
    },
    ref: Ref<any>
  ) => {
    const classes = useStyles()
    const classesSlider = clsx(classes.slider, className)

    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <MuiSlider
            {...props}
            ref={ref}
            value={typeof value === 'number' ? value : 0}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            onChange={onChange}
            onChangeCommitted={onChangeCommitted}
            classes={{ root: classesSlider, valueLabel: classes.valueLabel }}
          />
        </Grid>
        {doNotShowInput ? null : (
          <Grid item style={{ padding: '8px 0 8px 8px' }}>
            <TextField
              value={value}
              onChange={onInputChange}
              inputProps={{
                step,
                min,
                max,
                type: 'number',
              }}
              className={classes.input}
              disabled={disabled}
            />
          </Grid>
        )}
      </Grid>
    )
  }
)

export default Slider
