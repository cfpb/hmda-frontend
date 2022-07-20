import React from 'react'
import { deriveHighchartsConfig } from '../highchartsConfig'
import { formatGroupLabel } from '../utils/menuHelpers.js'
import { Graph } from '../Graph'
import { PeriodSelectors } from '../PeriodSelectors'
import CopyURLButton from '../../../common/CopyURLButton.jsx'
import LoadingIcon from '../../../common/LoadingIcon'
import Select from '../../Select.jsx'

export const SectionGraphs = ({
  categories,
  data,
  error,
  handleGraphSelection,
  loadingGraphDetails,
  options,
  periodHigh,
  periodLow,
  props,
  quarters,
  selected,
  seriesForURL,
  setPeriodHigh,
  setPeriodLow,
  setSeriesForURL,
  show,
  singleGraph,
}) => {
  if (!show) return null
  if (!options?.length) return <LoadingIcon />

  return (
    <>
      <p className='instructions'>Select a graph from the menu below</p>
      <Select
        classNamePrefix='react-select__graph' // Used for cypress testing
        options={options}
        placeholder='Select a Graph'
        onChange={e => handleGraphSelection(e)}
        value={selected ? { value: selected.value, label: selected.label } : ''}
        formatGroupLabel={formatGroupLabel}
      />
      <PeriodSelectors
        {...{
          props,
          endpoint: selected.value,
          isLoading: loadingGraphDetails,
          periodHigh,
          periodLow,
          periodOpts: quarters,
          seriesForURL,
          setPeriodHigh,
          setPeriodLow,
        }}
      />

      {!error && seriesForURL && (
        <div className='toolbar'>
          <CopyURLButton text={'Share Graph'} />
        </div>
      )}

      <Graph
        options={deriveHighchartsConfig({
          categories, // will come from the xAxis values of the fetched data
          endpoint: selected?.value,
          loading: loadingGraphDetails,
          periodHigh,
          periodLow,
          periodRange: [
            quarters?.findIndex(q => q.value == periodLow.value),
            quarters?.findIndex(q => q.value == periodHigh.value) + 1,
          ],
          props,
          series: data[selected?.value],
          seriesForURL,
          setSeriesForURL,
          subtitle: singleGraph?.subtitle,
          title: singleGraph?.title,
          yAxis: [singleGraph?.yLabel],
        })}
        loading={!data[selected.value]}
      />
    </>
  )
}