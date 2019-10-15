import * as types from '../constants'

export default function receiveEdit(data) {
  return {
    type: types.RECEIVE_EDIT,
    edit: data.edit,
    rows: data.rows,
    pagination: {
      count: data.count,
      total: data.total,
      _links: data._links
    }
  }
}
