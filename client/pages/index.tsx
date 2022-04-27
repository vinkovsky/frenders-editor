import React from 'react'
import { NextPage } from 'next'

import Layout from '../components/layouts/Layout'
import Index from '../components/index'

const HomePage: NextPage = () => {
  return (
    <Layout title="Home">
      <Index />
    </Layout>
  )
}

export default HomePage
