import React, {
  FunctionComponent,
  ElementType,
  forwardRef,
  Ref,
  MouseEvent,
} from 'react'
import { Fab as MuiFab, SvgIconProps } from '@material-ui/core'
import { Save, PlayArrow, Stop, Check, Error } from '@material-ui/icons'

type IconType = 'run' | 'stop' | 'save' | 'success' | 'error'

export interface IFabProps {
  icon: IconType
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  className?: string
}

const defaultProps: Partial<IFabProps> = {
  disabled: false,
}

type DefaultProps = Readonly<typeof defaultProps>

type FabPropsType = IFabProps & DefaultProps

const iconFabMap: Record<IconType, ElementType<SvgIconProps>> = {
  run: PlayArrow,
  stop: Stop,
  save: Save,
  success: Check,
  error: Error,
}

const Fab: FunctionComponent<FabPropsType> = forwardRef(
  (
    { icon, onClick, disabled, className, ...props },
    ref: Ref<HTMLButtonElement>
  ) => {
    const IconComponent = iconFabMap[icon]

    return (
      <MuiFab
        ref={ref}
        color="secondary"
        size="small"
        className={className}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        <IconComponent />
      </MuiFab>
    )
  }
)

Fab.defaultProps = defaultProps

export default Fab
