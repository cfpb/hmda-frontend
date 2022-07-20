import { useEffect, useState } from 'react';
import { QuarterlyFilerInstitutionApiUrl } from '../constants';

const useInstitutionsData = year => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${QuarterlyFilerInstitutionApiUrl}/${year}/lars/past/3`)
      .then(response => response.json())
      .then(d => {
        setData(
          d.sort((a, b) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            if (aName > bName) return 1;
            if (aName < bName) return -1;
            return 0;
          }).map(v => ({key: v.lei, value: v.name, context: {keys: ['year', 'count'], data: v.larCounts}}))
        );
      })
      .catch(err => console.error('quarterly institution api failed', err))
  }, []);

  return data;
};

export default useInstitutionsData;