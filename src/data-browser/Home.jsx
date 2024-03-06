import React from 'react'
import { withAppContext } from '../common/appContextHOC'
import Heading from '../common/Heading.jsx'
import filter from '../common/images/db-filter-lightblue.png'
import graph from '../common/images/db-graph-lightblue.png'
import map from '../common/images/db-map-lightblue.png'
import ImageCard from './ImageCard.jsx'

import './Home.css'

const Home = (props) => {
  const { publicationReleaseYear } = props.config
  return (
    <div className='home'>
      <div className='intro'>
        <Heading
          type={1}
          headingText='HMDA Data Browser'
          data-cy='dataBrowserHeader'
        >
          <p className='lead'>
            HMDA Data Browser allows you to filter, aggregate, download, and
            visualize HMDA datasets.
          </p>
          <p className='lead'>
            Visit our{' '}
            <a
              href='/documentation/api/data-browser/'
              data-cy='dataBrowserAPILink'
            >
              HMDA Data Browser API
            </a>{' '}
            page to learn more about the HMDA Data Browser API.
          </p>
        </Heading>
      </div>

      <h3>Data Browser Tools:</h3>

      <div className='card-container'>
        <ImageCard
          year={publicationReleaseYear}
          title='Dataset Filtering'
          caption='Select, Summarize, Download'
          description='Filter, summarize, and download HMDA datasets'
          path='data'
          enabled
          image={filter}
          faq={{
            url: `/documentation/tools/data-browser/data-browser-faq`,
            label: 'HMDA Dataset FAQ',
          }}
        />
        <ImageCard
          year={publicationReleaseYear}
          title='Maps'
          caption={'Explore, Compare, Share'}
          path='maps'
          enabled
          description='Explore HMDA datasets using an interactive map with custom filters'
          image={map}
          faq={{
            url: `/documentation/faq/data-browser-maps-faq`,
            label: 'HMDA Maps FAQ',
          }}
        />
        <ImageCard
          year=''
          title='Graphs'
          caption='Visualize Mortgage Trends'
          description='Visualize quarterly mortgage trends with interactive graphs of summarized HMDA data'
          path='graphs/quarterly'
          enabled
          image={graph}
          faq={{
            url: `/documentation/faq/data-browser-graphs-faq`,
            label: 'HMDA Graphs FAQ',
          }}
        />
      </div>
    </div>
  )
}

export default withAppContext(Home)
