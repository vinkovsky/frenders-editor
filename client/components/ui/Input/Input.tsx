import React, { ChangeEvent, forwardRef, FunctionComponent, Ref } from 'react'
import { FormControlLabel, Checkbox, TextField } from '@material-ui/core'
import clsx from 'clsx'

import IconButton from '../IconButton'

import { useStyles } from './Input.styles'

type InputTypeType =
  | 'text'
  | 'email'
  | 'password'
  | 'search'
  | 'checkbox'
  | 'number'
type IconType = 'search' | 'visibility' | 'visibilityOff'
type VariantType = 'standard' | 'filled' | 'outlined'
type SizeType = 'small' | 'medium'

export interface IInputProps {
  className?: string
  disabled?: boolean
  value?: string | number
  id?: string
  required?: boolean
  label?: string
  type?: InputTypeType
  icon?: IconType
  name?: string
  size?: SizeType
  multiline?: boolean
  variant?: VariantType
  error?: boolean
  placeholder?: string
  rows?: number
  helperText?: string
  fullWidth?: boolean
  checked?: boolean
  onInputChange?: (e: ChangeEvent<any>) => void
  onIconClick?: () => void
  onCheckBoxChange?: () => void
}

const defaultProps: Partial<IInputProps> = {
  disabled: false,
  multiline: false,
  variant: 'outlined',
  size: 'medium',
}

type DefaultProps = Readonly<typeof defaultProps>

type InputPropsType = IInputProps & DefaultProps

const Input: FunctionComponent<InputPropsType> = forwardRef(
  (
    {
      className,
      disabled,
      onInputChange,
      onIconClick,
      value,
      id,
      label,
      type,
      icon,
      name,
      multiline,
      variant,
      error,
      helperText,
      required,
      placeholder,
      size,
      fullWidth,
      rows,
      checked,
      onCheckBoxChange,
    },
    ref: Ref<HTMLInputElement>
  ) => {
    const classes = useStyles()
    const classesInput = clsx(classes.input, className)

    const endAdornment = icon
      ? {
          endAdornment: (
            <IconButton
              icon={icon}
              disabled={disabled}
              onClick={onIconClick}
              className={classes.icon}
            />
          ),
        }
      : undefined

    if (type === 'checkbox') {
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={onCheckBoxChange}
              name={name}
              color="primary"
            />
          }
          label={label}
        />
      )
    }

    return (
      <TextField
        ref={ref}
        className={classesInput}
        helperText={helperText}
        id={id}
        name={name}
        required={required}
        type={type}
        variant={variant}
        multiline={multiline}
        value={value}
        size={size}
        InputProps={endAdornment}
        error={error}
        placeholder={placeholder}
        disabled={disabled}
        label={label}
        onChange={onInputChange}
        color={error ? 'secondary' : 'primary'}
        fullWidth={fullWidth}
        rows={rows}
      />
    )
  }
)

Input.defaultProps = defaultProps

export default Input
