import React, {
  FunctionComponent,
  ElementType,
  forwardRef,
  Ref,
  ReactNode,
} from 'react'
import {
  Button as MuiButton,
  ButtonProps,
  SvgIconProps,
} from '@material-ui/core'
import clsx from 'clsx'

import { GoogleIcon, VKIcon } from './icons/SocialIcons'

import { useStyles } from './SocialButton.styles'
import Link from 'next/link'

export type SocialIconType = 'vk' | 'google'

export interface ISocialButtonProps extends ButtonProps {
  icon: SocialIconType
  children: ReactNode
  className?: string
  onClick?: () => void
}

const iconButtonMap: Record<SocialIconType, ElementType<SvgIconProps>> = {
  vk: VKIcon,
  google: GoogleIcon,
}

const SocialButton: FunctionComponent<ISocialButtonProps> = forwardRef(
  (
    { icon, onClick, className, children, ...props },
    ref: Ref<HTMLButtonElement>
  ) => {
    const classes = useStyles()
    const classesIconButton = clsx(classes.socialButton, className)
    const IconComponent = iconButtonMap[icon]

    return (
      <Link href={`${process.env.STRAPI_API_URL}/connect/${icon}`} passHref>
        <MuiButton
          ref={ref}
          size="small"
          className={classesIconButton}
          onClick={onClick}
          startIcon={<IconComponent />}
          {...props}
        >
          {children}
        </MuiButton>
      </Link>
    )
  }
)

export default SocialButton
