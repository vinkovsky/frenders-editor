import React, { ChangeEvent, FunctionComponent } from 'react'
import { Grid, TextField } from '@material-ui/core'

import { ITransformProps } from '@interfaces/editor'
import { TransformAreaCameraType } from '@interfaces/editor/camera'
import { TransformAreaType } from '@interfaces/editor/objectScene'
import { IActionsProps } from '@interfaces/index'
import { useHistoryStore } from '@store/editor/history'

import { useStyles } from './TransformData.styles'

export interface ITransformDataProps {
  area: TransformAreaType | TransformAreaCameraType
  disabled: boolean
  state: ITransformProps | null | undefined
  handleFunction(value: {
    area:
      | 'position'
      | 'rotation'
      | 'scale'
      | 'cameraPosition'
      | 'targetPosition'
    coords: {}
  }): IActionsProps
}

const TransformData: FunctionComponent<ITransformDataProps> = ({
  area,
  disabled = false,
  state,
  handleFunction,
}) => {
  const classes = useStyles()
  const { setHistoryModelTransform } = useHistoryStore<any>(
    (state: any) => state.api
  )

  const props =
    area === 'scale'
      ? {
          min: 0,
          max: 5,
          step: 0.1,
        }
      : {
          step: 1,
        }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (area === 'position' || area === 'scale' || area === 'rotation') {
      setHistoryModelTransform({
        area: 'model',
        attr: area,
        value: {
          ...state,
          [event.target.id]: Number(event.target.value),
        },
      })
    }
    handleFunction({
      area,
      coords: {
        ...state,
        [event.target.id]: Number(event.target.value),
      },
    })
  }

  return (
    <Grid container spacing={1} alignItems={'center'}>
      <Grid item>
        <TextField
          type={'number'}
          value={
            state && state.x != undefined
              ? area === 'scale'
                ? state.x.toFixed(2)
                : state.x.toFixed(1)
              : 0.0
          }
          placeholder={'x'}
          id={'x'}
          className={classes.input}
          onChange={(event) => handleChange(event)}
          size={'small'}
          disabled={disabled}
          inputProps={props}
        />
      </Grid>
      <Grid item>
        <TextField
          type={'number'}
          value={
            state && state.y != undefined
              ? area === 'scale'
                ? state.y.toFixed(2)
                : state.y.toFixed(1)
              : 0.0
          }
          placeholder={'y'}
          id={'y'}
          className={classes.input}
          onChange={(event) => handleChange(event)}
          size={'small'}
          disabled={disabled}
          inputProps={props}
        />
      </Grid>
      <Grid item>
        <TextField
          type={'number'}
          value={
            state && state.z != undefined
              ? area === 'scale'
                ? state.z?.toFixed(2)
                : state.z?.toFixed(1)
              : 0.0
          }
          placeholder={'z'}
          id={'z'}
          className={classes.input}
          onChange={(event) => handleChange(event)}
          size={'small'}
          disabled={disabled}
          inputProps={props}
        />
      </Grid>
    </Grid>
  )
}

export default TransformData
