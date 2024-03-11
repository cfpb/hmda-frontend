import mapbox from 'mapbox-gl'
import COUNTIES from '../constants/counties.js'
import STATES from '../constants/fipsToState.js'
import { fipsToShortcode } from '../constants/shortcodeToFips'

const geomap = {
  county: COUNTIES[2018],
  state: STATES,
}

const popup = new mapbox.Popup({
  closeButton: false,
  closeOnClick: true,
  closeOnMove: true,
  maxWidth: '750px',
  offset: 15,
})

function buildPopupHTML(geography, feature, origPer1000) {
  return (
    '<h4>' +
    getFeatureName(geography, feature) +
    (origPer1000 !== undefined ? ` - ${origPer1000} per 1000 people` : '') +
    '</h4>'
  )
}

function getFeatureName(geography, feature) {
  const stateAbbr =
    geography === 'county' ? `, ${fipsToShortcode[feature.substr(0, 2)]}` : ''
  return geomap[geography][feature] + stateAbbr
}

export { popup, buildPopupHTML, getFeatureName }
