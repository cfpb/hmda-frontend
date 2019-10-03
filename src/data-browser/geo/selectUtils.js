import stateToMsas from '../constants/stateToMsas.js'
import STATEOBJ from '../constants/stateObj.js'
import MSATONAME from '../constants/msaToName.js'
import MSATOSTATE from '../constants/msaToState.js'
import VARIABLES from '../constants/variables.js'
import msaToName from '../constants/msaToName.js'

function setGeographySelect(states, msamds, nationwide){
  const options = []

  if(nationwide) return [{value: 'nationwide', label: 'NATIONWIDE'}]

  if(states.length){
    states.forEach(state => {
      createStateOption(state, options)
    })
  }

  if(msamds.length){
    msamds.forEach(msa => {
      createMSAOption(msa, msaToName[msa], options)
    })
  }

  return options
}

function setVariableSelect(orderedVariables){
  const options = []
  orderedVariables.forEach(v => {
    options.push({value: v, label: VARIABLES[v].label})
  })
  return options
}

function makeGeograpyPlaceholder(nationwide, geoValues) {
  if(nationwide) return 'Nationwide selected, clear this selection to pick states or MSA/MDs'
  if(geoValues.length){
    if(geoValues[0].value.length === 2) return 'Select or type additional states'
    return 'Select or type additional MSA/MDs'
  }
  return 'Select or type a state, an MSA/MD, or \'nationwide\''
}

function someChecksExist(vars){
  const keys = Object.keys(vars)
  if(!keys[0]) return false

  const checkVars = vars[keys[0]]
  const checkKeys = Object.keys(checkVars)
  for(let j=0; j < checkKeys.length; j++){
    if(checkVars[checkKeys[j]]) return true
  }
  return false
}

function removeSelected(selected, options) {
  if(selected.length === 0) return options

  const trimmed = []
  selected = [...selected]

  for(let i=0; i < options.length; i++){
    if(!selected.length) trimmed.push(options[i])
    else {
      for(let j=0; j<selected.length; j++){
        if(selected[j].value === options[i].value){
          selected = selected.slice(0,j).concat(selected.slice(j+1))
          break
        } else if (j === selected.length - 1){
          trimmed.push(options[i])
        }
      }
    }
  }
  return trimmed
}

function formatWithCommas(str='') {
  str = str + ''
  let formatted = ''
  let comma = ','
  for(let i = str.length; i > 0; i-=3) {
    let start = i - 3
    if(start < 0) start = 0
    if(start === 0) comma = ''
    formatted = `${comma}${str.slice(start, i)}${formatted}`
  }
  return formatted
}

function separateGeographyOptions(options){
  const states = []
  const msas = []
  //skip nationwide
  for(let i=1; i<options.length; i++){
    let opt = options[i]
    if(opt.value.length === 2) states.push(opt)
    else msas.push(opt)
  }
  return [states, msas]
}

function createStateOption(state, options){
  if(state !== 'NA') options.push({value: state, label: `${STATEOBJ[state]} - STATEWIDE`})
}

function createMSAOption(id, name, options){
  const stateLabel = MSATOSTATE[id].map(v => STATEOBJ[v]).join(' - ')
  options.push({
    value: '' + id,
    label:  `${id} - ${name} - ${stateLabel}`,
  })
}

function createGeographyOptions(props) {
  const subsetYear = props.location.pathname.split('/')[3]

  const statesWithMsas = stateToMsas[subsetYear]
  let geographyOptions = [{value: 'nationwide', label: 'NATIONWIDE'}]

  const multi = new Set()

  Object.keys(statesWithMsas).forEach(state => {
    createStateOption(state, geographyOptions)
    statesWithMsas[state].forEach(msa => {
      if(MSATOSTATE[msa].length > 1) multi.add(msa)
      else createMSAOption(msa, MSATONAME[msa], geographyOptions)
    })
  })

  multi.forEach(msa => {
    createMSAOption(msa, MSATONAME[msa], geographyOptions)
  })

  return geographyOptions
}

function createVariableOptions() {
  return Object.keys(VARIABLES).map(variable => {
    return { value: variable, label: VARIABLES[variable].label }
  })
}

const geographyStyleFn = {
  option: (provided, state) => {
    const value = state.data.value
   if (value.length === 2 || value === 99999) {
     return {
       ...provided,
       fontWeight: 'bold',
       textDecoration: 'underline'
     }
   }
   return provided
  }
}

export {
  createStateOption,
  createMSAOption,
  createGeographyOptions,
  createVariableOptions,
  separateGeographyOptions,
  geographyStyleFn,
  formatWithCommas,
  removeSelected,
  makeGeograpyPlaceholder,
  setGeographySelect,
  someChecksExist,
  setVariableSelect
}
