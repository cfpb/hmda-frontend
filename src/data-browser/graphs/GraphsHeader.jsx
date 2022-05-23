// Loading: comes from index.jsx and it contains the length of available graph dropdowns
// If loading length is less then 0 it will display a placeholder message until data has been fetched

export const GraphsHeader = ({ loading }) => (
  <>
    <h1>HMDA Graphs</h1>
    {loading > 0 ? (
      <div>
        <p>
          The following graphs present data for the 19 financial institutions
          reporting HMDA quarterly data throughout 2020 and displays data for
          each of those institutions for 2019 and 2018 as well.
        </p>
        <p>
          Though the graphs provide some insight into trends for these
          institutions, they should not be taken to represent the behavior of
          all mortgage lenders during the relevant period.
        </p>
        <p>Use the menu below to select a graph.</p>
      </div>
    ) : (
      <p>
        The following graphs present data for the financial institutions
        reporting HMDA quarterly data.
      </p>
    )}
  </>
);
