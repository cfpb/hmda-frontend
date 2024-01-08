import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import Alert from '../../common/Alert'
import Heading from '../../common/Heading'
import AppContainer from './containers/App'
import UploadContainer from './containers/UploadForm'
import ParseErrorsContainer from './containers/ParseErrors'
import appReducer from './reducers'
import { withAppContext } from '../../common/appContextHOC'

import './FFVT.css'
import { getToolAnnouncement } from '../../common/getToolAnnouncement'

const middleware = [thunkMiddleware]
if (import.meta.env.MODE !== 'production') middleware.push(createLogger())

const store = createStore(
  combineReducers({
    app: appReducer,
  }),
  applyMiddleware(...middleware),
)

let timeout = null

const FFVTDowntimeBanner = ({ message }) =>
  message && (
    <Alert type='error' heading='FFVT Unavailable'>
      <p>{message}</p>
    </Alert>
  )

class FFVT extends React.Component {
  componentDidMount() {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => window.scrollTo(0, 0), 100)
  }

  render() {
    const { maintenanceMode, ffvtAnnouncement, filingAnnouncement } =
      this.props.config
    const downtimeMessage =
      ffvtAnnouncement || (filingAnnouncement && filingAnnouncement.message)
    const toolAnnouncement = getToolAnnouncement('ffvt', this.props.config)

    return (
      <Provider store={store}>
        <AppContainer>
          <div id='main-content' className='grid FFVT'>
            <Heading
              type={1}
              headingText='File Format Verification Tool'
              paragraphText='Select a HMDA file from your computer and
                test whether it meets certain formatting requirements needed
                to submit HMDA data to the HMDA Platform. The File Format 
                Verification Tool does not test for compliance with Edits.'
            />

            {toolAnnouncement && (
              <Alert
                heading={toolAnnouncement.heading}
                type={toolAnnouncement.type}
              >
                <p>{toolAnnouncement.message}</p>
              </Alert>
            )}

            <div className='grid'>
              <div className='item'>
                {maintenanceMode && downtimeMessage ? (
                  <FFVTDowntimeBanner message={downtimeMessage} />
                ) : (
                  <>
                    <UploadContainer />
                    <ParseErrorsContainer />
                  </>
                )}
              </div>
              <div className='item content text-small'>
                <p>
                  The File Format Verification Tool (FFVT) is a resource for
                  testing whether your file meets certain formatting
                  requirements specified in the HMDA Filing Instructions Guide,
                  specifically that the file
                </p>
                <ol>
                  <li>is pipe-delimited;</li>
                  <li>has the proper number of data fields; and</li>
                  <li>
                    has data fields formatted as integers, where necessary.
                  </li>
                </ol>
                <p>The FFVT does not allow you to submit HMDA data.</p>

                <p>
                  The FFVT was developed with no login functions, and does not
                  log identifying information about you or your files. The FFVT
                  simply allows HMDA filers to test the formatting of their
                  files. Thus, no Federal agency will receive or be able to view
                  the files you test using it.
                </p>

                <p>
                  The FFVT will run efficiently for most files, but it will run
                  more slowly for larger files (e.g., containing more than
                  20,000 entries). This website essentially runs on the same
                  software as the HMDA Platform. This means that if your file
                  passes all the checks on this website, then your file will be
                  in the correct format required to be uploaded to the HMDA
                  Platform.
                </p>
              </div>
            </div>
          </div>
        </AppContainer>
      </Provider>
    )
  }
}

export default withAppContext(FFVT)
