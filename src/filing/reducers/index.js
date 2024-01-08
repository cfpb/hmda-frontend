import { combineReducers } from 'redux'

import lei from './lei.js'
import institutions from './institutions.js'
import filings from './filings.js'
import filingPeriod from './filingPeriod.js'
import pathname from './pathname.js'
import submission from './submission.js'
import upload from './upload.js'
import confirmation from './confirmation.js'
import edits from './edits.js'
import signature from './signature.js'
import summary from './summary.js'
import parseErrors from './parseErrors.js'
import pagination from './pagination.js'
import paginationFade from './paginationFade.js'
import error from './error.js'
import user from './user.js'
import redirecting from './redirecting.js'
import latestSubmissions from './latestSubmissions'
import refiling from './refiling'
import filingPeriodOptions from './filingPeriodOptions'

export default combineReducers({
  lei,
  institutions,
  filings,
  filingPeriod,
  pathname,
  submission,
  upload,
  confirmation,
  edits,
  signature,
  summary,
  parseErrors,
  pagination,
  paginationFade,
  error,
  user,
  redirecting,
  latestSubmissions,
  refiling,
  filingPeriodOptions,
})
