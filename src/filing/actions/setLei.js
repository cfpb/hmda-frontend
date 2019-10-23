import * as types from '../constants'

export default function setLei(lei) {
  return {
    type: types.SET_LEI,
    lei
  }
}
