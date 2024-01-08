import React from 'react'
import { withAppContext } from '../../common/appContextHOC.jsx'
import useToolAnnouncement from '../../common/useToolAnnouncement.jsx'
import AppIntro from './AppIntro.jsx'
import CSVUpload from './CSVUpload.jsx'
import Form from './Form.jsx'

const App = (props) => {
  const toolAnnouncement = useToolAnnouncement({
    toolName: 'rate spread',
    config: props.config,
  })

  return (
    <div className='grid' id='main-content'>
      <AppIntro toolAnnouncement={toolAnnouncement} />

      <div className='grid'>
        <div className='item'>
          <Form />
        </div>
        <div className='item'>
          <CSVUpload />
        </div>
      </div>

      <div className='alert' style={{ marginTop: '3em' }}>
        <p>
          <b>7/21/2022:</b> Two sets of APORs were published for the week of
          7/11/2022 for fixed rate loans with terms of 9 to 12 years and
          adjustable rate loans with terms of 9 to 50 years. The first set was
          published on 7/8/2022 and was incorporated into the Bureau’s rate
          spread calculator until 7/15/2022. The second set was briefly
          incorporated into the Bureau’s rate spread calculator from 7/15/2022
          until 7/21/2022, when the first set of APORs was reincorporated. Both
          sets of APORs are{' '}
          <a href='https://s3.amazonaws.com/cfpb-hmda-public/prod/apor/7_11_2022_APOR_tables.csv'>
            available here
          </a>
          .
        </p>
        <p>
          <b>11/15/2021:</b> The publication of Average Prime Offer Rates (APOR)
          for the week of November 15, 2021 was delayed. These data are now
          available on the Bureau’s Rate Spread Calculator above.
        </p>
        <p>
          <b>2/23/2021:</b> Two sets of APORs were published for the week of
          7/20/2020 for fixed rate loans with terms of 13 to 22 years. The first
          set was published on 7/16/2020 and was briefly incorporated into the
          Bureau’s rate spread calculator. The second set was published on
          7/20/2020 and was substituted for the first in the Bureau’s rate
          spread calculator. Both sets of APORs are{' '}
          <a href='https://files.consumerfinance.gov/hmda/7_20_2020_APORs_table.csv'>
            available here
          </a>
          .
        </p>
        <p>
          <b>7/18/2019:</b> Two sets of APOR values were published for the week
          of 03/04/19 and 06/17/19. The APOR values published by the Bureau and
          incorporated into the Bureau’s rate spread calculator are available in
          the tables accessible from this page.
        </p>
        <p>
          <b>2/16/2018:</b> Two sets of APORs were published for certain dates
          in 2017, one on the Bureau’s web site and one on the FFIEC’s web site.
          The APOR values published by the FFIEC and incorporated into the
          FFIEC’s rate spread calculator are available in{' '}
          <a href='https://www.ffiec.gov/ratespread/aportables.htm'>
            the tables on the FFIEC’s web site
          </a>
          . The APOR values published by the Bureau and incorporated into the
          Bureau’s rate spread calculator are available in the tables accessible
          from this page. In addition, APOR values previously published by the
          Bureau between December 28, 2017 and December 31, 2017 are available
          in{' '}
          <a href='https://s3.amazonaws.com/cfpb-hmda-public/prod/apor/122817-123117%20APOR%20Values.csv'>
            this table
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default withAppContext(App)
