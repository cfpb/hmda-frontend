import React from "react";

const determineDataset = (year) => {
  let ThreeYear = [2018, 2017];
  let OneYear = [2019];

  // Link will be created after 'Three Year' doc is created
  if (ThreeYear.includes(year))
    return {
      name: "Three Year",
      link: `https://ffiec.cfpb.gov/data-publication/three-year-national-loan-level-dataset/${year}`,
    };
  
  // Link will be created after 'One Year' doc is created
  if (OneYear.includes(year))
    return {
      name: "One Year",
      link: `https://ffiec.cfpb.gov/data-publication/one-year-national-loan-level-dataset/${year}`,
    };
  
  return {
    name: 'Snapshot',
    link: `https://ffiec.cfpb.gov/data-publication/snapshot-national-loan-level-dataset/${year}`,
  }
};

/**
 * Component that takes in a 'year' and generates Snapshot, One Year or Three Year direct links and includes link to 'Data Browser - FAQ'
 * @param {String} year string that contains the year (i.e) 2018, 2019, 2020 etc...
 */
const DatasetDocsLink = ({ year }) => {
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
          href={`/documentation/${year}/static-dataset-faq`} // Link will be created after FAQ page has been created
        >
          Dataset - FAQ.
        </a>
      </p>
    </div>
  );
};

export default DatasetDocsLink;
