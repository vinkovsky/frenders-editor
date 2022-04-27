import React, {
  FunctionComponent,
  forwardRef,
  Ref,
  ReactNode,
  MouseEvent,
} from 'react'
import {
  ToggleButtonGroup as MuiToggleButtonGroup,
} from '@material-ui/lab'
import clsx from 'clsx'

import { useStyles } from './ToggleButtonGroup.styles'

export interface IToggleButtonGroupProps {
  value?: string
  children?: ReactNode
  className?: string
  exclusive?: boolean
  onChange?: (event: MouseEvent<HTMLElement>, newItem: string | null) => void
}

const defaultProps: Partial<IToggleButtonGroupProps> = {
  value: 'select',
}

type DefaultProps = Readonly<typeof defaultProps>

type ToggleButtonGroupPropsType = IToggleButtonGroupProps & DefaultProps

const ToggleButtonGroup: FunctionComponent<ToggleButtonGroupPropsType> = forwardRef(
  (
    { exclusive, value, onChange, children, className, ...props },
    ref: Ref<HTMLButtonElement>
  ) => {
    const classes = useStyles()
    const classesToggleButtonGroup = clsx(classes.root, className)

    return (
      <MuiToggleButtonGroup
        ref={ref}
        exclusive={exclusive}
        onChange={onChange}
        value={value}
        className={classesToggleButtonGroup}
        {...props}
      >
        {children}
      </MuiToggleButtonGroup>
    )
  }
)

ToggleButtonGroup.defaultProps = defaultProps

export default ToggleButtonGroup
