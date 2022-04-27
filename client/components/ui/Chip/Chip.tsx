import React, { FunctionComponent, forwardRef, Ref } from 'react'
import { Chip as MuiChip, ChipProps } from '@material-ui/core'

export interface IChipProps extends ChipProps {
  label?: string
  background?: string
  clickable?: boolean
  disabled?: boolean
  className?: string
  onClick?: () => void
  onDelete?: () => void
}

const Chip: FunctionComponent<IChipProps> = forwardRef(
  (
    {
      label,
      background,
      clickable,
      disabled,
      className,
      onClick,
      onDelete,
      ...props
    },
    ref: Ref<any>
  ) => {
    return (
      <MuiChip
        ref={ref}
        size="small"
        label={label}
        style={{ background }}
        className={className}
        clickable={clickable}
        disabled={disabled}
        onClick={onClick}
        onDelete={onDelete}
        {...props}
      />
    )
  }
)

export default Chip
