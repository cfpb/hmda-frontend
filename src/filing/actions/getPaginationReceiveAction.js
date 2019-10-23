import receiveEdit from './receiveEdit.js'
import receiveParseErrors from './receiveParseErrors.js'

export default function getPaginationReceiveAction(target, data) {
  switch (target) {
    case 'parseErrors':
      return receiveParseErrors(data)
    default:
      return receiveEdit(data)
  }
}
