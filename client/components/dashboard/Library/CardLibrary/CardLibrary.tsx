import React, { FunctionComponent, forwardRef, Ref } from 'react'
import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core'
import clsx from 'clsx'

import { Chip, IconButton } from '@ui/index'
import { ICardProps } from '@interfaces/dashboard'

import { useStyles } from './CardLibrary.styles'

const CardLibrary: FunctionComponent<ICardProps> = forwardRef(
  (
    {
      title,
      img,
      categoryItem,
      className,
      height,
      colorChip,
      favorite,
      onIconClick,
      onClick,
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const classes = useStyles()
    const classesCard = clsx(classes.card, className)

    return (
      <MuiCard ref={ref} className={classesCard} style={{ height }}>
        <CardMedia image={img} title={title} className={classes.media} />
        <CardContent className={classes.content}>
          <Grid
            container
            direction="column"
            alignContent="space-between"
            className={classes.grid}
          >
            <Grid container item justify="space-between" alignItems="center">
              <Chip
                label={categoryItem}
                background={colorChip}
                className={classes.chip}
              />
              <IconButton
                icon={favorite ? 'favorite' : 'favoriteOff'}
                className={classes.favorite}
                onClick={onIconClick}
              />
            </Grid>
            <Grid
              container
              item
              justify="center"
              alignItems="center"
              className={classes.gridItem}
            >
              <IconButton
                icon="create"
                className={classes.icon}
                onClick={onClick}
              />
            </Grid>
            <Grid container item justify="flex-start" alignItems="flex-start">
              <Typography variant="h2" className={classes.title}>
                {title}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </MuiCard>
    )
  }
)

export default CardLibrary
