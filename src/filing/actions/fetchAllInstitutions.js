import { getInstitution } from '../api/api'

export default function fetchAllInstitutions(years, institutions) {
  const promises = []
  // Fetch Institution details for each year
  years.forEach((year) => {
    institutions.forEach((i) => {
      promises.push(getInstitution(i.lei, year))
    })
  })
  return Promise.all(promises)
}
