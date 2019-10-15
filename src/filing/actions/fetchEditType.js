import requestEdit from './requestEdit.js'
import receiveEdit from './receiveEdit.js'
import requestEditType from './requestEditType.js'
import receiveEditType from './receiveEditType.js'
import hasHttpError from './hasHttpError.js'
import suppressEdits from './suppressEdits.js'
import { getEdit } from '../api/api.js'

export default function fetchEditType(type) {
  return (dispatch, getState) => {
    dispatch(requestEditType(type))
    const promises = []
    const editTypes = getState().app.edits.types
    editTypes[type].edits.forEach(edit => {
      dispatch(requestEdit(edit.edit))
      promises.push(
        getEdit({ edit: edit.edit }).then(json => {
          return hasHttpError(json).then(hasError => {
            if (hasError) {
              return dispatch(suppressEdits())
            }
            return dispatch(receiveEdit(json))
          })
        })
      )
    })
    return Promise.all(promises).then(json => {
      return dispatch(receiveEditType(type))
    })
  }
}
