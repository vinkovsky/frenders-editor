import React, { FunctionComponent, useContext } from 'react'
import { Card as MuiCard, CardMedia } from '@material-ui/core'

import { ICardProps } from '@interfaces/dashboard'
import { DashboardContext } from '@providers/DashboardProvider'

import { useStyles } from './CardNewProject.styles'

const CardNewProject: FunctionComponent<ICardProps> = () => {
  const classes = useStyles()
  const { state } = useContext(DashboardContext)

  return (
    <MuiCard className={classes.card}>
      <CardMedia
        className={classes.media}
        image={state.cards.currentCard?.img.url}
        title={state.cards.currentCard?.title}
      />
    </MuiCard>
  )
}

export default CardNewProject
