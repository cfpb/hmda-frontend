import { configureStore } from '@reduxjs/toolkit'
import UpdatedOnReducer from './UpdatedOnSlice'

export const s3Store = configureStore({
  reducer: {
    updatedOn: UpdatedOnReducer
  }
})

export default s3Store