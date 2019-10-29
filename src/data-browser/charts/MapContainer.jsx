import React, { useEffect, useRef }  from 'react'
import mapbox from 'mapbox-gl'

import './mapbox.css'

mapbox.accessToken = 'pk.eyJ1Ijoia3JvbmljayIsImEiOiJjaWxyZGZwcHQwOHRidWxrbnd0OTB0cDBzIn0.u2R3NY5PnevWH3cHRk6TWQ'

const MapContainer = () => {
  const mapContainer = useRef(null)

  useEffect(() => {
    const map = new mapbox.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v9'
    })
    return () => map.remove()
  }, [])

  return <div className="mapContainer" ref={mapContainer}/>
}

export default MapContainer
