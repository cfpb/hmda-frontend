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
  const pastYears = [...Array(past).keys()].map(i => `${year - i - 1}`);

  useEffect(() => {
    if (!data) {
      dispatch(institutions.fetchInstitutionLars({ year, past }));
    }
  }, [dispatch, data]);

  let content = <LoadingIcon />;

  const tableColumns = useMemo(() => {
    const countsColumns = pastYears.map(accessorKey => {
      return {
        header: `${accessorKey} Count`,
        accessorKey,
        sortingFn: 'alphanumeric',
      };
    });

    return [{
      header: 'Institution',
      accessorKey: 'name',
      sortingFn: 'text',
    }, {
      header: 'LEI',
      accessorKey: 'lei',
      enableSorting: false,
    }, {
      header: 'Agency',
      accessorKey: 'agency',
      sortingFn: 'text',
    }, ...countsColumns];
  });

  if (loading === 'succeeded') {
    const tableData = data.quarterly.map(({ name, lei, agency, larCounts }) => {
      let counts = {};
      larCounts.forEach(ts => {
        counts[ts.year] = ts.count;
      });
      return {
        name,
        lei,
        agency,
        ...counts
      }
    });

    let quarterlySums = {};
    pastYears.forEach(yr => {
      quarterlySums[yr] = data.quarterly.reduce((prev, curr) => {
        const tsLar = curr.larCounts.find(ts => ts.year === yr);
        return tsLar ? prev + tsLar.count : prev;
      }, 0);
    });

    const customFooter = <>
      <tr>
        <th colSpan="3" style={{ textAlign: 'right' }}>Total of Quarterly Filers</th>
        {pastYears.map(yr => {
          return <td key={yr}>{quarterlySums[yr].toLocaleString()}</td>
        })}
      </tr>
      <tr>
        <th colSpan="3" style={{ textAlign: 'right' }}>Total of All Filers</th>
        {pastYears.map(yr => {
          return <td key={yr}>{(data.yearly.find(yearlyCount => yearlyCount.year === yr) || { count: 0 }).count.toLocaleString()}</td>
        })}
      </tr>
    </>;
    content = <SimpleSortTable columns={tableColumns} data={tableData} customFooter={customFooter} initialSort={[{id: 'name', desc: false,}]} />;
  }

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