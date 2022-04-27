import React, { ChangeEvent, forwardRef, FunctionComponent, Ref } from 'react'
import { MenuItem, Select as MuiSelect, SelectProps } from '@material-ui/core'
import clsx from 'clsx'

import { useStyles } from './Select.styles'

export interface ISelectProps extends SelectProps {
  value: any
  className?: string
  onChange: (event: ChangeEvent<any>) => void
  items: Array<any>
}

const Select: FunctionComponent<ISelectProps> = forwardRef(
  ({ value, className, onChange, items, ...props }, ref: Ref<any>) => {
    const classes = useStyles()
    const classesSelect = clsx(classes.select, className)

    return (
      <MuiSelect
        ref={ref}
        value={value}
        onChange={onChange}
        className={classesSelect}
        {...props}
      >
        {items.map((item, index) => (
          <MenuItem value={index} key={item.title}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
    )
  }
)

export default Select
