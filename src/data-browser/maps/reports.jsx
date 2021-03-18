import React, { useRef } from 'react';
import { asNum, calcPct, isNumber } from '../../common/numberServices'
import { valsForVar } from './selectUtils'
import { MapsNavBtns } from './MapsNavBar'

const combinedLabel = (filter) => filter && `${filter.variable.label} - ${filter.value.label}`

const ReportHighlight = ({ data, year }) => {
  const { filter1, filter2, union12, filter1_geo } = data
  
  if (!filter1) return null
  const v = (!filter2 ? filter1_geo[filter1.value.value] : union12) || 0

  return (
    <div className='union-highlight'>
      <div className='count colorTextWithBias' >{asNum(v)}</div>
      <div>Originations in {year}</div>
    </div>
  )
}

export function openPrintDialog(e) {
  e.preventDefault()
  window.print()
  document.activeElement.blur()
}

export const FilterReports = ({ data, tableRef, onClick, year, viewMap, download }) => {
  if (!data) return null
  return (
    <div className='reports-wrapper'>
      <div className="report-nav-btns" ref={tableRef}>
        <MapsNavBtns getData={download} viewMap={viewMap} />
      </div>
      <h3 className='report-heading' onClick={onClick}>
        {data.featureName}
        <ReportHighlight data={data} year={year} />
        {data.filter1 && (
          <div className='filter-label'>
            <div className='filter-clause colorTextWithBias'>WHERE</div>{' '}
            <div className='filter-text'>{combinedLabel(data.filter1)}</div>
          </div>
        )}
        {data.filter2 && (
          <div className='filter-label'>
            <div className='filter-clause colorTextWithBias'>AND</div>{' '}
            <div className='filter-text'>{combinedLabel(data.filter2)}</div>
          </div>
        )}
      </h3>

      <div className='reports'>
        <FilterReport
          filter={data.filter1}
          otherFilter={data.filter2}
          values={[data.filter1_geo, data.v1_where_f2]}
          label={data.filter1_geo_label}
          total={[data.filter1_geo_total, data.v1_where_f2_total]}
          level={data.geoLevel.label}
        />
        <FilterReport
          filter={data.filter2}
          otherFilter={data.filter1}
          values={[data.filter2_geo, data.v2_where_f1]}
          label={data.filter2_geo_label}
          total={[data.filter2_geo_total, data.v2_where_f1_total]}
          level={data.geoLevel.label}
        />
      </div>
    </div>
  )
}

const useScrollTo = (options) => {
  const defaultOpts = { behavior: 'smooth', block: 'start' }
  const opts = {...defaultOpts, ...options}
  const ref = useRef()
  const scrollToRef = ()  => ref && ref.current && ref.current.scrollIntoView(opts)
  return [ref, scrollToRef]
}

const FilterReport = ({ filter, otherFilter, values, label, total, level }) => {
  const values_f = values.filter(Boolean)
  const [tableRef, scrollToTable] = useScrollTo()

  if (!filter || !filter.variable || !filter.value || !values_f) return null
  const { variable, value } = filter

  const buildColumns = (vs, val, cname) =>
    vs.reduce(
      (v_mem, v, v_idx) =>
        v_mem.concat([
          <td key={`${v_idx}_count`} className={'count' + (v_idx === vs.length - 1 ? cname : '')}>
            {asNum(vs[v_idx][val])}
          </td>,
          <td key={`${v_idx}_pct`} className={'count' + (v_idx === vs.length - 1 ? cname : '')}>
            {calcPct(vs[v_idx][val], total[v_idx])}%
          </td>,
        ]),
      []
    )

  const rows = valsForVar[variable.value].map((v, idx) => {
    let val = v.value
    let cname = ''
    if (val.match('%')) val = v.label

    if (val === value.value) cname += ' highlight colorBgWithBias'

    return (
      <tr key={idx} className={cname}>
        <td>{v.label}</td>
        {buildColumns(values_f, val, cname)}
      </tr>
    )
  })

  return (
    <div>
      <table className='filter-report'>
        <thead>
          <tr ref={tableRef}>
            <th onClick={scrollToTable} className='group-header spacer clickable'>
              {label}
            </th>
            <th className='group-header colorBgWithBias' colSpan={2}>
              {level}wide
            </th>
            {otherFilter && (
              <th className='group-header colorBgWithBias' colSpan={2}>
                <div className='variable'>{otherFilter.variable.label}</div>
                <div className='value'>{otherFilter.value.label}</div>
              </th>
            )}
          </tr>
          <tr>
            {[variable.label, 'Count', 'Pct'].map((x, x_idx) => (
              <th key={x_idx} className={x_idx ? 'count' : ''}>
                {x}
              </th>
            ))}
            {values_f.length > 1 &&
              ['Count', 'Pct'].map((x, x_idx) => (
                <th key={x_idx} className='count'>
                  {x}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {rows}
          <tr>
            <th>Total</th>
            {total
              .filter((t) => isNumber(t))
              .reduce(
                (m, t, t_idx) =>
                  m.concat([
                    <td key={`${t_idx}_count`} className='count'>
                      {asNum(t)}
                    </td>,
                    <td key={`${t_idx}_spacer`} className='spacer'></td>,
                  ]),
                []
              )}
          </tr>
        </tbody>
      </table>
    </div>
  )
}