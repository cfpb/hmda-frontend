import { QuarterlyFilerInstitutionApiUrl } from '../../constants';

export const fetchQuarterliesWithLars = (year, past) => fetch(`${QuarterlyFilerInstitutionApiUrl}/${year}/lars/past/${past}`)
  .then(response => response.json())
  .then(data => data.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (aName > bName) return 1;
    if (aName < bName) return -1;
    return 0;
  }).map(inst => ({
    key: inst.lei,
    value: inst.name,
    context: {
      keys: ['year', 'count'],
      data: inst.larCounts
    }
  })))
  .catch(err => console.error('quarterly institution api failed', err));