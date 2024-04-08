/**
 * The DatasetSelector component was built with the intention of allowing
 * users to select which dataset is used as the source for their queries. 
 *  
 * For now, we have decided to automatically provide users with the 
 * latest-available dataset.  
 *  
 * Keeping this component around to make it easy to enable this functionality
 * in the future.
 * 
 * 
  <DatasetSelector
    setDataset={setDataset}
    dataset={dataset}
    year={year}
    menuStyle={menuStyle}
  />
 */

export const datasets = ['3-Year', '1-Year', 'Snapshot', 'Dynamic']

export const datasetOptions = (year) => {
  const options = []
  const vintage = new Date().getFullYear() - parseInt(year)
  if (vintage > 3) options.push('3-Year')
  if (vintage > 2) options.push('1-Year')
  if (vintage > 0) {
    options.push('Snapshot')
    options.push('Dynamic')
  }
  return options
}

/**
 * Displays the available Datasets as simple text options based on the selected year.
 * We abuse the `YearSelector` class to match styling with the actual <DBYearSelector/>
 */
export const DatasetSelector = ({ value, year, onChange }) => {
  const options = datasetOptions(year)
  let selected = value || options[0]
  if (!options.includes(selected)) {
    onChange(options[0])
    return null
  }

  return (
    <div className='dataset-selector YearSelector'>
      <h4>Dataset</h4>
      {options.map((val, i) => (
        <a
          key={val}
          onClick={(e) => {
            e.preventDefault()
            onChange(val)
          }}
          className={val === selected ? 'active option' : 'option'}
        >
          {val}
        </a>
      ))}
    </div>
  )
}
