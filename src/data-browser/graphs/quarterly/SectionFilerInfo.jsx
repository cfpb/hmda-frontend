import React from 'react'
import QuarterlyFilersTable from './QuarterlyFilersTable'

export const SectionFilerInfo = ({ show }) => {
  if (!show) return null
  return <QuarterlyFilersTable />
}
