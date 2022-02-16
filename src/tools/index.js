import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import CheckDigit from './check-digit/index'
import RateSpread from './rate-spread/index'
import RateSpreadRequirements from './rate-spread/Requirements'
import RateSpreadMethodology from './rate-spread/Methodology'
import FFVT from './file-format-verification/index'
import LARFormatting from './lar-formatting/index'
import { OnlineLARFT } from './online-lar-formatting'

import './index.css'

const Tools = () => {
  return (
    <div className="Tools App">
      <Switch>
        <Route exact path="/tools" component={Home} />
        <Route path="/tools/check-digit" component={CheckDigit} />
        <Route
          path="/tools/rate-spread/requirements"
          component={RateSpreadRequirements}
        />
        <Route
          path="/tools/rate-spread/methodology"
          component={RateSpreadMethodology}
        />
        <Route path="/tools/rate-spread" component={RateSpread} />
        <Route path="/tools/file-format-verification" component={FFVT} />
        {/* <Route path="/tools/lar-formatting" component={LARFormatting} /> */}
        <Route path="/tools/lar-formatting" component={OnlineLARFT} />
      </Switch>
    </div>
  )
}

export default Tools
