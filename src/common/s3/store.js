import { configureStore } from '@reduxjs/toolkit'
import S3HeadersReducer from './S3Headers'

export const s3Store = configureStore({
  reducer: {
    s3Headers: S3HeadersReducer,
  },
})

export default s3Store
