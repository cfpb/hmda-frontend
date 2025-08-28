import React from 'react'
import { withAppContext } from '../../../common/appContextHOC'
import { withYearValidation } from '../../../common/withYearValidation'
import SnapshotDataset from './SnapshotDataset'

function _Snapshot(props) {
  return <SnapshotDataset {...props} label='Snapshot' dataKey='snapshot' />
}

function _OneYear(props) {
  return <SnapshotDataset {...props} label='One Year' dataKey='oneYear' />
}

function _ThreeYear(props) {
  return <SnapshotDataset {...props} label='Three Year' dataKey='threeYear' />
}

export const Snapshot = withAppContext(withYearValidation(_Snapshot))
export const OneYearDataset = withAppContext(withYearValidation(_OneYear))
export const ThreeYearDataset = withAppContext(withYearValidation(_ThreeYear))
