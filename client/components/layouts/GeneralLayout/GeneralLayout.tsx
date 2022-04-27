import React, { FunctionComponent } from 'react'

import { ILayoutProps } from '@interfaces/layouts'

import { useStyles } from './GeneralLayout.styles'

const GeneralLayout: FunctionComponent<ILayoutProps> = ({ children }) => {
  const classes = useStyles()

  return <main className={classes.root}>{children}</main>
}

export default GeneralLayout
