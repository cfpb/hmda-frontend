import receiveEdit from './receiveEdit.jsx'
import receiveParseErrors from './receiveParseErrors.js'

export default function getPaginationReceiveAction(target, data) {
  switch (target) {
    case 'parseErrors':
      return receiveParseErrors(data)
    default:
      return receiveEdit(data)
  }
}
