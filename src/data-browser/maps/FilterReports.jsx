import React from 'react'
import { asNum, calcPct, isNumber } from '../../common/numberServices'
import { valsForVar } from './selectUtils'
import { useScrollIntoView } from '../../common/useScrollIntoView'
import './FilterReports.css'

export const FilterReports = ({ data }) => {
  if (!data || !data.featureName) return null
  return (
    <>
      <FilterReport
        filter={data.filter1}
        otherFilter={data.filter2}
        values={[data.filter1_geo, data.v1_where_f2]}
        label={data.filter1_geo_label}
        total={[data.filter1_geo_total, data.v1_where_f2_total]}
        level={data.geoLevel.label}
        id={1}
      />
      <FilterReport
        filter={data.filter2}
        otherFilter={data.filter1}
        values={[data.filter2_geo, data.v2_where_f1]}
        label={data.filter2_geo_label}
        total={[data.filter2_geo_total, data.v2_where_f1_total]}
        level={data.geoLevel.label}
        id={2}
      />
    </>
  )
}

const FilterReport = ({
  id,
  filter,
  otherFilter,
  values,
  label,
  total,
  level,
}) => {
  const truthy_values = values.filter(Boolean)
  const [tableRef, scrollToTable] = useScrollIntoView()

  if (!filter || !filter.variable || !filter.value || !truthy_values)
    return null
  const { variable, value } = filter
  const primaryFilterHasData = values.length >= 1 && !!values[0]
  const otherFilterHasData = values.length > 1 && !!values[1]

  if (!primaryFilterHasData) return null
  return (
    <div className={`page filter-report filter-report-${id}`}>
      <table ref={tableRef}>
        <thead onClick={scrollToTable} className='clickable'>
          <GroupHeaders
            {...{
              label,
              level,
              otherFilter: !otherFilterHasData ? null : otherFilter,
            }}
          />
          <CountHeaders {...{ variable, values: truthy_values }} />
        </thead>
        <tbody>
          <BodyRows
            {...{ valsForVar, variable, value, total, truthy_values }}
          />
          <TotalsRow {...{ total }} />
        </tbody>
      </table>
    </div>
  )
}

const GroupHeaders = ({ label, level, otherFilter }) => (
  <tr>
    <th className='group-header spacer'>{label}</th>
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
)

const CountHeaders = ({ variable, values }) => (
  <tr>
    {[variable.label, 'Count', 'Pct'].map((x, x_idx) => (
      <th key={x_idx} className={x_idx ? 'count' : ''}>
        {x}
      </th>
    ))}
    {values.length > 1 &&
      ['Count', 'Pct'].map((x, x_idx) => (
        <th key={x_idx} className='count'>
          {x}
        </th>
      ))}
  </tr>
)

const BodyRows = ({ valsForVar, variable, value, total, truthy_values }) => {
  return valsForVar[variable.value].map((v, idx) => {
    let val = v.value
    let cname = ''
    if (val.match('%')) val = v.label
    if (val === value.value) cname += ' highlight colorBgWithBias'

    return (
      <tr key={idx} className={cname}>
        <td>{v.label}</td>
        <BodyColumns {...{ val, cname, total, values: truthy_values }} />
      </tr>
    )
  })
}

const BodyColumns = ({ values, val, cname, total }) =>
  values.reduce(
    (v_mem, _v, v_idx) =>
      v_mem.concat([
        <td
          key={`${v_idx}_count`}
          className={'count' + (v_idx === values.length - 1 ? cname : '')}
        >
          {asNum(values[v_idx][val])}
        </td>,
        <td
          key={`${v_idx}_pct`}
          className={'count' + (v_idx === values.length - 1 ? cname : '')}
        >
          {calcPct(values[v_idx][val], total[v_idx])}%
        </td>,
      ]),
    [],
  )

const TotalsRow = ({ total }) => (
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
        [],
      )}
  </tr>
)
