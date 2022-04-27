import React, { FunctionComponent, memo, Suspense } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { Loader as Progress } from '@ui/index'
import InitLoader from './InitLoader'

const useStyles = makeStyles(() =>
  createStyles({
    progress: {
      marginTop: -120,
    },
  })
)

const LoaderAssets: FunctionComponent<any> = () => {
  const classes = useStyles()

  return (
    <Suspense fallback={<Progress className={classes.progress} />}>
      <InitLoader />
    </Suspense>
  )
}

export default memo(LoaderAssets)
