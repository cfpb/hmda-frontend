import React, { Component } from 'react'
import { withAppContext } from '../common/appContextHOC'
import { CURRENT_YEAR } from '../common/constants/years.js'
import ExternalLink from '../common/ExternalLink'
import Heading from '../common/Heading.jsx'
import filterBw from '../common/images/db-filter-bw.png'
import filterColor from '../common/images/db-filter-color.png'
import graphBw from '../common/images/db-graph-bw.png'
import graphColor from '../common/images/db-graph-color.png'
import mapBw from '../common/images/db-map-bw.png'
import mapColor from '../common/images/db-map-color.png'
import ImageCard from './ImageCard.jsx'

import './Home.css'

class Home extends Component {
  render() {
    const { publicationReleaseYear } = this.props.config
    return (
      <div className='home'>
        <div className='intro'>
          <Heading type={1} headingText='HMDA Data Browser'>
            <p className='lead'>
              HMDA Data Browser allows you to filter, aggregate, download, and
              visualize HMDA datasets.
            </p>
            <p className='lead'>
              Visit our <a href='/documentation/api/data-browser/'>HMDA Data Browser API</a> {" "}
              page to learn more about the HMDA Data Browser API.
            </p>
          </Heading>
        </div>

        <h3>I would like to...</h3>

        <div className='card-container'>
          <ImageCard
            year={publicationReleaseYear}
            caption='Select, Summarize, Download'
            description='Filter and download HMDA datasets'
            path='data'
            enabled
            image={filterBw}
            imageHover={filterColor}
            faq={{
              url: `/documentation/tools/data-browser/data-browser-faq`,
              label: 'HMDA Dataset Filtering FAQ',
            }}
          />
          <ImageCard
            year={publicationReleaseYear}
            caption={'Explore, Compare, Share'}
            path='maps'
            enabled
            description='Explore HMDA datasets using an interactive map'
            image={mapBw}
            imageHover={mapColor}
            faq={{
              url: `/documentation/tools/data-browser/data-browser-maps-faq`,
              label: 'HMDA Maps FAQ',
            }}
          />
        </div>
        <div className='card-container'>
          <ImageCard
            year=''
            caption='Visualize Mortgage Trends'
            description='Interactive graphs of summarized HMDA data'
            path='graphs/quarterly'
            enabled
            image={graphBw}
            imageHover={graphColor}
            faq={{
              url: `/documentation/faq/data-browser-graphs-faq`,
              label: 'HMDA Graphs FAQ',
            }}
          />
          <ImageCard placeholder />
        </div>
      </div>
    )
  }
}

export default withAppContext(Home)
