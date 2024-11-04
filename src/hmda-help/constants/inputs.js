import states from './states'
import agencyCodes from './agencyCodes'
import institutionTypes from './institutionTypes'
import otherLenderCodes from './otherLenderCodes'

const searchInputs = [
  {
    label: 'LEI',
    id: 'lei',
    name: 'lei',
    value: '',
    placeholder: 'eg 987875HAG543RFDAHG54',
    // order matters
    validation: [
      { type: 'required' },
      { type: 'length', value: 20 },
      // eg, 1234ASDF5678QWER00ZZ (20 characters)
      {
        type: 'regex',
        value: '([a-zA-Z0-9]{20})',
        message: 'Must contain only a-z, A-Z, and 0-9 (no special characters).',
      },
    ],
  },
]

const requiredInputs = [
  {
    label: 'Activity Year',
    id: 'activityYear',
    name: 'activityYear',
    value: '',
    placeholder: '',
    type: 'select',
    options: [{ name: 'Select Year' }],
  },
  {
    label: 'Respondent Name',
    id: 'respondentName',
    name: 'respondentName',
    value: '',
    placeholder: '',
    validation: [{ type: 'required' }],
  },
  {
    label: 'Email Domains',
    id: 'emailDomains',
    name: 'emailDomains',
    value: '',
    placeholder: '',
  },
  {
    label: 'Tax Id',
    id: 'taxId',
    name: 'taxId',
    value: '',
    placeholder: 'eg 99-9999999',
    validation: [
      { type: 'required' },
      // 10 is including the dash
      { type: 'length', value: 10 },
      // eg, 99-9999999 (2 digits, followed by a dash, followed by 7 digits)
      {
        type: 'regex',
        value: '^([0-9]{2}-[0-9]{7})',
        message: 'Must be 2 digits, followed by a dash, followed by 7 digits.',
      },
    ],
  },
  {
    label: 'Agency Code',
    id: 'agency',
    name: 'agency',
    value: '',
    type: 'radio',
    options: agencyCodes,
    validation: [{ type: 'required' }],
  },
  {
    label: 'Quarterly Filer',
    id: 'quarterlyFiler',
    name: 'quarterlyFiler',
    value: '',
    placeholder: '',
    disabled: true,
    type: 'select',
    options: [
      { id: 'false', name: 'false', value: false },
      { id: 'true', name: 'true', value: true },
    ],
  },
]

const otherInputs = [
  {
    label: 'Institution Type',
    id: 'institutionType',
    name: 'institutionType',
    value: '',
    placeholder: '',
    type: 'select',
    options: institutionTypes,
  },
  {
    label: 'Other Lender Code',
    id: 'otherLenderCode',
    name: 'otherLenderCode',
    value: '',
    placeholder: '',
    type: 'select',
    options: otherLenderCodes,
  },
  {
    label: 'Institution ID 2017',
    id: 'institutionId2017',
    name: 'institutionId2017',
    value: '',
    placeholder: '',
  },
  {
    label: 'RSSD',
    id: 'rssd',
    name: 'rssd',
    value: '',
    placeholder: '',
  },
  {
    label: 'Respondent State',
    id: 'respondentState',
    name: 'respondentState',
    value: '',
    placeholder: '',
    type: 'select',
    options: states,
  },
  {
    label: 'Respondent City',
    id: 'respondentCity',
    name: 'respondentCity',
    value: '',
    placeholder: '',
  },
  {
    label: 'Parent ID RSSD',
    id: 'parentIdRssd',
    name: 'parentIdRssd',
    value: '',
    placeholder: '',
  },
  {
    label: 'Parent Name',
    id: 'parentName',
    name: 'parentName',
    value: '',
    placeholder: '',
  },
  {
    label: 'Assets',
    id: 'assets',
    name: 'assets',
    value: '',
    placeholder: '',
  },
  {
    label: 'Top Holder ID RSSD',
    id: 'topHolderIdRssd',
    name: 'topHolderIdRssd',
    value: '',
    placeholder: '',
  },
  {
    label: 'Top Holder Name',
    id: 'topHolderName',
    name: 'topHolderName',
    value: '',
    placeholder: '',
  },
]

export const notesInput = {
  label: 'Notes',
  id: 'notes',
  name: 'notes',
  placeholder: '',
  validation: [{ type: 'required' }],
}

export { searchInputs, requiredInputs, otherInputs }
