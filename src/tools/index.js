import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import larftStore from './larft/data-store/store'

import Home from './Home'
import CheckDigit from './check-digit/index'
import RateSpread from './rate-spread/index'
import RateSpreadRequirements from './rate-spread/Requirements'
import RateSpreadMethodology from './rate-spread/Methodology'
import AppIntro from './lar-formatting/AppIntro'
import RateSpreadMethodology_alt from './rate-spread/Methodology_Alt'
import FFVT from './file-format-verification/index'
import { LARFT } from './larft'

import './index.css'

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const Tools = () => {
  return (
    <div className='Tools App'>
      <ScrollToTop />
      <Switch>
        <Route exact path='/tools' component={Home} />
        <Route path='/tools/check-digit' component={CheckDigit} />
        <Route
          path='/tools/rate-spread/requirements'
          component={RateSpreadRequirements}
        />
        <Route
          path='/tools/rate-spread/methodology'
          component={RateSpreadMethodology}
        />
        <Route
          path='/tools/rate-spread/methodology-alt'
          component={RateSpreadMethodology_alt}
        />
        <Route path='/tools/rate-spread' component={RateSpread} />
        <Route path='/tools/file-format-verification' component={FFVT} />
        <Route path='/tools/lar-formatting' component={AppIntro} />
        <Route path='/tools/online-lar-formatting'>
          <Provider store={larftStore}>
            <LARFT />
          </Provider>
        </Route>
      </Switch>
    </div>
  )
}

export default Tools
