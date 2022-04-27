import React, { createRef, FunctionComponent } from 'react'
import { SnackbarProvider } from 'notistack'

type AnchorOriginType = {
  vertical: 'top' | 'bottom'
  horizontal: 'center' | 'left' | 'right'
}

interface INotistackProps {
  maxSnack?: number
  autoHideDuration?: number
  anchorOrigin?: AnchorOriginType
  action?: () => void
}

const MAX_SNACKBAR = 3
const AUTO_HIDE_DURATION = 3000
const POSITION: AnchorOriginType = {
  vertical: 'top',
  horizontal: 'center',
}

const NotistackProvider: FunctionComponent<INotistackProps> = ({
  children,
}) => {
  const notistackRef = createRef<any>()

  return (
    <SnackbarProvider
      maxSnack={MAX_SNACKBAR}
      autoHideDuration={AUTO_HIDE_DURATION}
      anchorOrigin={POSITION}
      ref={notistackRef}
    >
      {children}
    </SnackbarProvider>
  )
}

export default NotistackProvider
