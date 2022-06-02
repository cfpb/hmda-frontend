import React from "react";

/**
 * Component that takes in a 'year' and generates Snapshot, One Year or Three Year direct links and includes link to 'Data Browser - FAQ'
 * @param {String} year string that contains the year (i.e) 2018, 2019, 2020 etc...
 */

const DatasetDocsLink = ({ year }) => {
  /* 
  
  Links to specfic datasets

  Snapshot: https://ffiec.cfpb.gov/data-publication/snapshot-national-loan-level-dataset/2020
  Three Year: Doc to be created
  One Year: Doc to be created

  */

  const determineDataset = (year) => {
    let ThreeYear = [2018, 2017];
    let OneYear = [2019];
    let Snapshot = [2020, 2021];

    if (ThreeYear.includes(year))
      return {
        name: "Three Year",
        link: "",
      };
    // Link will be created after 'Three Year' doc is created
    else if (OneYear.includes(year))
      return {
        name: "One Year",
        link: "",
      };
    // Link will be created after 'One Year' doc is created
    else if (Snapshot.includes(year))
      return {
        name: "Snapshot",
        link: `https://ffiec.cfpb.gov/data-publication/snapshot-national-loan-level-dataset/${year}`,
      };
  };

  let dataset = determineDataset(parseInt(year));

  return (
    <div className="SelectWrapper" style={{ paddingTop: ".33em" }}>
      <p>
        Queries for {year} pull from the{" "}
        <a target="_blank" rel="noopener noreferrer" href={dataset.link}>
          {dataset.name}
        </a>{" "}
        dataset. For more info visit the{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="/documentation/2022/static-dataset-faq" // Link will be created after FAQ page has been created
        >
          Dataset - FAQ.
        </a>
      </p>
    </div>
  );
};

export default DatasetDocsLink;
