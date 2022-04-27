import React from 'react'
import { NextPage } from 'next'
import { InstantSearch } from 'react-instantsearch-dom'

import Dashboard from '../components/dashboard/Layout/Dashboard'
import Layout from '../components/layouts/Layout'
import { indexName, searchClient } from '@utils/dashboard/instantSearch'
import withAuth from '@hocs/withAuth'

const DashboardPage: NextPage = () => {
  return (
    <Layout title="Dashboard">
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <Dashboard />
      </InstantSearch>
    </Layout>
  )
}

export default withAuth(DashboardPage)
