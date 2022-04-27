import React, { ChangeEvent, FunctionComponent, useState } from 'react'
import { AppBar, Box, Tab, Tabs, Typography } from '@material-ui/core'

import CardSettingsAccountInfo from '../CardSettingsAccountInfo'

import { useStyles } from './Profile.styles'

const Profile: FunctionComponent = () => {
  const classes = useStyles()
  const [value, setValue] = useState<number>(0)

  function TabPanel(props: any) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    }
  }

  const handleChange = (event: ChangeEvent<any>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="tabs" centered>
          <Tab label="Account Settings" {...a11yProps(0)} />
          <Tab label="Billing Plan" {...a11yProps(1)} disabled />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CardSettingsAccountInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>Billing plan</div>
      </TabPanel>
    </div>
  )
}

export default Profile
