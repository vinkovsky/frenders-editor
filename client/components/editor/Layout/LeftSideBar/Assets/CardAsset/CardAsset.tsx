import React, { FunctionComponent, forwardRef, Ref } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Grid,
  Typography,
} from '@material-ui/core'
import { AddCircle, CheckCircle } from '@material-ui/icons'

import { useAssetsStore } from '@store/editor/assets'
import { ICardAssetProps } from '@interfaces/editor/assets'

import { useStyles } from './CardAsset.styles'

const CardAsset: FunctionComponent<ICardAssetProps> = forwardRef(
  ({ item, zone, area, active }, ref: Ref<any>) => {
    const data = useAssetsStore<any>((state: any) => state.data)
    const { selectedItemAsset, unSelectedItemAsset } = useAssetsStore<any>(
      (state: any) => state.api
    )

    const isSelected =
      data[zone]?.selected[area].findIndex((x) => x.id === item.id) !== -1

    const handleSelect = (event) => {
      event.target.checked
        ? selectedItemAsset({ zone, area, item })
        : unSelectedItemAsset({ zone, area, item })
    }
    const classes = useStyles({ zone })

    return (
      <Card ref={ref} className={classes.card}>
        <CardMedia
          image={item.img.url}
          title={item.title}
          className={classes.media}
        />
        <CardContent className={classes.content}>
          <Grid
            container
            direction="column"
            alignContent="space-between"
            className={classes.grid}
          >
            <Grid
              container
              item
              justify="center"
              alignItems="center"
              className={classes.gridItem}
            >
              {!active ? (
                <Checkbox
                  checked={isSelected}
                  onChange={handleSelect}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                  icon={<AddCircle />}
                  checkedIcon={<CheckCircle />}
                  className={classes.icon}
                />
              ) : null}
            </Grid>
            <Grid container item justify="flex-start" alignItems="flex-start">
              {zone === 'library' ? (
                <Typography variant="h3" className={classes.title}>
                  {item.title}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
)

export default CardAsset
