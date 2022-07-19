import { useEffect, useState } from "react";
import FlexTable from "../../../common/FlexTable";
import { QuarterlyFilerInstitutionApiUrl } from "../constants";
import "./QuarterlyFilersTable.css";

const QuarterlyFilersTable = props => {
  const [data, setData] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    fetch(`${QuarterlyFilerInstitutionApiUrl}/${year}/lars/past/3`)
      .then(response => response.json())
      .then(d => {
        setData(
          d.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          }).map(v => ({key: v.lei, value: v.name, context: {keys: ['year', 'count'], data: v.larCounts}}))
        );
      })
      .catch(err => console.error('quarterly institution api failed', err))
  }, []);

  const style = collapsed ? {maxHeight: 0, overflow: 'hidden'} : {};

  return (
    <div className="quarterly-filers-table">
      <h2 style={{userSelect: 'none'}}>{year} Quarterly Filers <span className="expander" onClick={() => setCollapsed(!collapsed)}>{collapsed ? '+' : '-'}</span></h2>
      <div className="table-container" style={style}>
        <FlexTable data={data} />
      </div>
    </div>
  );
};

export default QuarterlyFilersTable;