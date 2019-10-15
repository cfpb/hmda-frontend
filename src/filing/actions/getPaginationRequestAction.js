import requestEdit from './requestEdit.js'
import requestParseErrors from './requestParseErrors.js'

export default function getPaginationRequestAction(target) {
  switch (target) {
    case 'parseErrors':
      return requestParseErrors()
    default:
      return requestEdit(target)
  }
}
