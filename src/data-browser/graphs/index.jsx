import { useState, useEffect } from "react";
import produce from "immer";
import LineGraph from "./LineGraph/index";
import Select from "../Select.jsx";
import { graphOptions } from "./graphOptions";
import "./graphs.css";

// Drop-down options
const availableGraphs = graphOptions.map((g) => ({
  value: g.id,
  label: g.title,
}));

// Mock data
const graphA_data1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const randomize = (num) => Math.round(num * Math.random() * 10);

export const Graphs = () => {
  const [selected, setSelected] = useState(graphOptions[0]); // Selected graph
  const [data, setData] = useState({}); // Cache API data

  const handleGraphSelection = (e) => {
    setSelected(graphOptions.find((opt) => opt.id == e.value));
  };

  // Fetch API data on graph selection, if necessary
  useEffect(() => {
    if (!selected) return; // Nothing to do until a graph is selected
    if (data[selected.id]) return // Graph's data is already cached
    
    // Mock data fetching
    setTimeout(() => {
      const nextState = produce(data, draft => {
        draft[selected.id] = [
          {
            name: 'Closed-End',
            data: graphA_data1.map(randomize),
            yAxis: 0,
          },
          {
            name: 'Open-End',
            data: graphA_data1.map(randomize),
            yAxis: 0,
          },
        ]
      })

      setData(nextState)
    }, 1000)

    // fetch(selected.endpoint)
    // .then(success => success.json)
    // .then(json => {
    //     const nextState = produce(data, draft => { draft[selected.id] = json })
    //     saveData(nextState)
    //     setIsLoading(true) // Loader gets removed once data shows in chart
    //   }
    // )
    // .catch(reject => {
    //   // Notify user of error
    // })
  }, [selected]);

  return (
    <div className='Graphs'>
      <h1>HMDA Graphs</h1>
      <p>
        The following graphs present data for the 19 financial institutions
        reporting HMDA quarterly data throughout 2020 and displays data for each
        of those institutions for 2019 and 2018 as well.
      </p>
      <p>
        Though the graphs provide some insight into trends for these
        institutions, they should not be taken to represent the behavior of all
        mortgage lenders during the relevant period.
      </p>
      <p>Use the menu below to select a graph.</p>
      <Select
        options={availableGraphs}
        placeholder='Select a Graph'
        onChange={e => handleGraphSelection(e)}
        value={{ value: selected.id, label: selected.title }}
      />
      <br />
      <br />
      {selected && (
        <LineGraph
          loading={!data[selected.id]}
          title={selected.title}
          footerText={selected.footer}
          yAxis={[selected.yAxisLabel]}
          series={data[selected.id]}
        />
      )}
    </div>
  )
};
