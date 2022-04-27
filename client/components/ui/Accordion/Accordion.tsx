import React, {
  ElementType,
  forwardRef,
  FunctionComponent,
  ReactNode,
  Ref,
} from 'react'
import {
  Accordion as MuiAccordion,
  Typography,
  Grid,
  SvgIconProps,
  AccordionSummary,
  AccordionDetails,
  AccordionProps,
} from '@material-ui/core'
import {
  Settings,
  Speed,
  ExpandMore,
  Category,
  Texture,
  Landscape,
  Tonality,
  Tune,
  HdrOn,
  Link,
} from '@material-ui/icons'
import clsx from 'clsx'

export type AccordionIconType =
  | 'general'
  | 'advanced'
  | 'models'
  | 'textures'
  | 'environments'
  | 'materials'
  | 'camera'
  | 'env'
  | 'link'
  | 'embed'

export interface IAccordionProps {
  className?: string
  children: ReactNode
  title: string
  icon: AccordionIconType
}

type AccordionType = IAccordionProps & AccordionProps

const iconAccordionMap: Record<AccordionIconType, ElementType<SvgIconProps>> = {
  general: Settings,
  advanced: Speed,
  models: Category,
  textures: Texture,
  environments: Landscape,
  materials: Tonality,
  camera: Tune,
  env: HdrOn,
  link: Link,
  embed: Tune,
}

import { useStyles } from './Accordion.styles'

const Accordion: FunctionComponent<AccordionType> = forwardRef(
  ({ children, title, icon, className, ...props }, ref: Ref<any>) => {
    const classes = useStyles()
    const accordionSummary = clsx(className, classes.summary)

    const IconComponent: any = iconAccordionMap[icon]

    return (
      <div className={classes.container}>
        <MuiAccordion ref={ref} {...props} elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`accordion_${title}`}
            id={`accordion_${title}`}
            classes={{ root: accordionSummary }}
          >
            <Grid container alignItems={'center'} spacing={1}>
              <Grid item>
                <IconComponent />
              </Grid>
              <Grid item>
                <Typography className={classes.title}>{title}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            {children}
          </AccordionDetails>
        </MuiAccordion>
      </div>
    )
  }
)

export default Accordion
