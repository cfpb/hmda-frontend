import mapbox from 'mapbox-gl'
import COUNTIES from '../constants/counties.js'
import STATES from '../constants/fipsToState.js'

const geomap = {
  county: COUNTIES[2018],
  state: STATES
}

const popup = new mapbox.Popup({
  closeButton: false,
  closeOnClick: false,
  maxWidth: '750px'
})

function buildPopupHTML(geography, feature, origPer1000){
  return '<h4>' + getFeatureName(geography, feature) + (origPer1000 !== undefined ? ` - ${origPer1000} per 1000 people` : '') + '</h4>'
}

function getFeatureName(geography, feature){
  return geomap[geography][feature]
}

export {
  popup,
  buildPopupHTML,
  getFeatureName
}
