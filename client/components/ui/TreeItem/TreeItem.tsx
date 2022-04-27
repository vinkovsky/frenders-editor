import React, { FunctionComponent } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { TreeItem as MuiTreeItem, TreeItemProps } from '@material-ui/lab'
import {
  Lock,
  LockOpen,
  SubdirectoryArrowRight,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons'
export interface ITreeItem {
  locked: boolean | undefined
  visible: boolean | undefined
  handleLocked?: () => void
  handleVisible?: () => void
}
import { useStyles } from './TreeItem.styles'
const TreeItem: FunctionComponent<TreeItemProps & ITreeItem> = ({
  label,
  nodeId,
  locked,
  visible,
  handleLocked,
  handleVisible,
  ...props
}) => {
  const classes = useStyles()
  return (
    <MuiTreeItem
      {...props}
      aria-disabled={locked}
      nodeId={nodeId}
      label={
        <Grid
          container
          justify={'space-between'}
          alignItems={'center'}
          onClick={(e) => e.preventDefault()}
        >
          <Grid item>
            <Typography variant="body1">{label}</Typography>
          </Grid>
          {locked != undefined && visible != undefined ? (
            <Grid item>
              <Grid
                container
                spacing={2}
                justify={'space-around'}
                alignItems={'center'}
              >
                <Grid
                  item
                  onClick={(e) => {
                    e.preventDefault()
                    // e.stopPropagation()
                    if (handleLocked) {
                      handleLocked()
                    }
                  }}
                >
                  {locked ? (
                    <Lock className={classes.icon} />
                  ) : (
                    <LockOpen className={classes.icon} />
                  )}
                </Grid>
                <Grid
                  item
                  onClick={(e) => {
                    e.preventDefault()
                    // e.stopPropagation()
                    if (handleVisible) {
                      handleVisible()
                    }
                  }}
                >
                  {visible ? (
                    <Visibility className={classes.icon} />
                  ) : (
                    <VisibilityOff className={classes.icon} />
                  )}
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      }
      endIcon={<SubdirectoryArrowRight className={classes.icon} />}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
        iconContainer: classes.iconContainer,
      }}
    />
  )
}
export default TreeItem

