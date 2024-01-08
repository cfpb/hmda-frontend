import { datasetOptions } from '../datasets/DatasetSelector'
import Select from '../Select.jsx'

/**
 * The DatasetSelector component was built with the intention of allowing
 * users to select which dataset is used as the source for their queries.
 *
 * For now, we have decided to automatically provide users with the
 * latest-available dataset.
 *
 * Keeping this component around to make it easy to enable this functionality
 * in the future.
 */

export const DatasetSelector = ({ dataset, year, setDataset, menuStyle }) => {
  const datasetsAvailable = datasetOptions(year)

  return (
    <div className='filter'>
      <span className='filter-clause'>DATASET</span>
      <Select
        id='datasource-select'
        placeholder='Select a dataset (type to search)'
        value={
          datasetsAvailable.includes(dataset)
            ? {
                label: dataset,
                value: dataset,
              }
            : {
                label: datasetsAvailable[0],
                value: datasetsAvailable[0],
              }
        }
        onChange={(opt) => setDataset(opt.value)}
        options={datasetsAvailable.map((d) => ({
          label: d,
          value: d,
        }))}
        autoFocus={false}
        isClearable={false}
        openOnFocus={true}
        searchable={true}
        simpleValue={true}
        styles={menuStyle}
      />
    </div>
  )
}
