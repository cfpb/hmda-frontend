import STATES from '../../../../data-browser/constants/states'
import { buildEnumeratedOptions } from './EnumOption'

/**
 * Drop-down menu for US State selection.
 *
 * @param {String} value Current input value
 * @param {Object} common Common input field attributes
 */
export const InputStateSelector = ({ value, ...common }) => {
  return (
    <select {...common} value={value || ''}>
      {stateOptions}
    </select>
  )
}

const enumerations = STATES.filter((state) => !['NW'].includes(state.id)).map(
  ({ id, name }) => ({
    value: id,
    description: name,
  }),
)

const stateOptions = buildEnumeratedOptions({
  enumerations,
  fieldName: 'State',
})
