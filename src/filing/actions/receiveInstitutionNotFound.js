export default function receiveInstitutionNotFound({ lei }) {
  return {
    type: 'RECEIVE_INSTITUTION_NOT_FOUND',
    lei,
  }
}
