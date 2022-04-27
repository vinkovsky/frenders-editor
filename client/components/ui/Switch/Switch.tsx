import React, { ChangeEvent, forwardRef, FunctionComponent, Ref } from 'react'
import { Switch as MuiSwitch, SwitchProps } from '@material-ui/core'

export interface ISwitchProps extends SwitchProps {
  checked: boolean
  onChange: (event: ChangeEvent<any>, value: boolean) => void
}

const Switch: FunctionComponent<ISwitchProps> = forwardRef(
  ({ checked, onChange, ...props }, ref: Ref<any>) => {
    return (
      <MuiSwitch
        ref={ref}
        color="primary"
        checked={checked}
        onChange={onChange}
        {...props}
      />
    )
  }
)

export default Switch
