import * as types from '../constants'

export default function receiveParseErrors(data) {
  return {
    type: types.RECEIVE_PARSE_ERRORS,
    transmittalSheetErrors: data.transmittalSheetErrors,
    larErrors: data.larErrors,
    pagination: {
      count: data.count,
      total: data.total,
      _links: data._links
    }
  }
}
