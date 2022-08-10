import { QuarterlyFilerInstitutionApiUrl } from '../../constants';

export const fetchQuarterliesWithLars = (year, past) => fetch(`${QuarterlyFilerInstitutionApiUrl}/${year}/lars/past/${past}`)
  .then(response => response.json())