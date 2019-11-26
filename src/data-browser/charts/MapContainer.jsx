import React, { useState, useEffect, useRef }  from 'react'
import { runFetch } from '../api.js'
import mapbox from 'mapbox-gl'

import './mapbox.css'

mapbox.accessToken = 'pk.eyJ1Ijoia3JvbmljayIsImEiOiJjaWxyZGZwcHQwOHRidWxrbnd0OTB0cDBzIn0.u2R3NY5PnevWH3cHRk6TWQ'

const colors = [
'#d3f2a3',
'#97e196',
'#6cc08b',
'#4c9b82',
'#217a79',
'#105965',
'#074050'
]

//
//map, geometry, "GEOID", joinData, "exponential", stops
//joinTileset = (map, tileset_id, foreign_key, data, type, stops) {
//map.setPaintProperty(tileset_id, "fill-color", {property: foreign_key, type: "categorical", default: 'rgba(0,0,0,0)', stops: categoricalStops}

const MapContainer = () => {
  const mapContainer = useRef(null)

  const [data, setData] = useState(null)
  useEffect(() => {
    runFetch('/chartData.json').then(jsonData => {
      console.log(Object.keys(jsonData).length)
      setData(jsonData)
    })
  }, [])
  useEffect(() => {
    const map = new mapbox.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/kronick/cixtov6xg00252qqpoue7ol4c?fresh=true'
    })

    map.on('load', () => {
      map.addSource('counties', {
        type: 'vector',
        url: 'mapbox://mapbox.82pkq93d'
      });

      const stops = [['0', 'rgba(0,0,0,0.05)']]


      map.addLayer({
        'id': 'counties',
        'type': 'fill',
        'source': 'counties',
        'source-layer': 'original',
        'paint': {
          'fill-outline-color': 'rgba(0,0,0,0.1)',
          'fill-color': {
            property: 'GEOID',
            type: 'categorical',
            default: 'rgba(0,0,0,0.05)',
            stops: stops
          }
        }
      }, 'waterway-label');
    })
    return () => map.remove()
  }, [])

  return <div className="mapContainer" ref={mapContainer}/>
}

export default MapContainer
