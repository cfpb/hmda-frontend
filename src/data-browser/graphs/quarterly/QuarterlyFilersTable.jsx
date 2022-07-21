import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIcon from '../../../common/LoadingIcon';
import { institutions } from '../slice';
import './QuarterlyFilersTable.css';
import SimpleSortTable from '../../../common/SimpleSortTable';

const QuarterlyFilersTable = props => {
  const dispatch = useDispatch();
  const [year, past] = [new Date().getFullYear(), 3];
  const { data, loading } = useSelector(state => state.institutions);

  useEffect(() => {
    if (!data.length) {
      dispatch(institutions.fetchInstitutionLars({ year, past }));
    }
  }, [dispatch, data]);

  let content = <LoadingIcon />;
  
  const columns = useMemo(() => {
    const countsColumns = [...Array(past).keys()].map(i => {
      const accessorKey = `${year - i - 1}`
      return {
        header: `${accessorKey} Count`,
        accessorKey,
        sortingFn: 'alphanumeric',
      };
    })
    return [{
      header: 'Institution',
      accessorKey: 'name',
      sortingFn: 'text',
    }, ...countsColumns];
  });

  if (loading === 'succeeded') {
    const formattedData = data.map(({ value: name, context: {data: larCounts} }) => {
      let counts = {};
      larCounts.forEach(lar => {
        counts[lar.year] = lar.count;
      });
      return {
        name,
        ...counts
      }
    });
    content = <SimpleSortTable columns={columns} data={formattedData} />;
  }

  // const content = loading === 'succeeded' ? <SimpleSortTable columns={columns} data={formattedData} /> : <LoadingIcon />;

  return (
    <div className="quarterly-filers-table">
      <h2 className="table-heading">{year} Quarterly Filers</h2>
      <div className="table-container">
        {content}
      </div>
    </div>
  );
};

export default QuarterlyFilersTable;