import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ImageCard from './ImageCard.jsx'
import Heading from '../common/Heading.jsx'
import { withAppContext } from '../common/appContextHOC'
import filterColor from '../common/images/db-filter-color.png'
import filterBw from '../common/images/db-filter-bw.png'
import mapColor from '../common/images/db-map-color.png'
import mapBw from '../common/images/db-map-bw.png'

import './Home.css'

class Home extends Component {
  render() {
    const { showMaps, publicationReleaseYear } = this.props.config
    return (
      <div className='home'>
        <div className='intro'>
          <Heading type={1} headingText='HMDA Data Browser'>
            <p className='lead'>
              The HMDA Data Browser allows users to filter, analyze, and
              download HMDA datasets and visualize data through charts, graphs,
              and maps.
            </p>
            <p className='lead'>
              For questions about the HMDA Data Browser, visit our{' '}
              <Link
                to={`/documentation/${publicationReleaseYear}/data-browser-faq/`}
              >
                FAQ page
              </Link>
              .
            </p>
            <p className='lead'>
              To learn to use the Data Browser API, peruse our{' '}
              <a href='https://cfpb.github.io/hmda-platform/#data-browser-api'>
                API Documentation
              </a>
              .
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
          />
          <ImageCard
            year={publicationReleaseYear}
            caption={`Explore, Compare, Share${
              showMaps ? '' : ' (coming soon)'
            }`}
            path='maps-graphs'
            enabled={showMaps ? true : false}
            description='Explore HMDA datasets using an interactive map'
            image={mapBw}
            imageHover={mapColor}
          />
        </div>
      </div>
    )
  }
}

export default withAppContext(Home)
