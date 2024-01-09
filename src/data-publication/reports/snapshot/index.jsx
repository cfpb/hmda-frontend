import React from 'react'
import { withAppContext } from '../../../common/appContextHOC'
import { withYearValidation } from '../../../common/withYearValidation'
import SnapshotDataset from './SnapshotDataset'

const _Snapshot = (props) => (
  <SnapshotDataset {...props} label='Snapshot' dataKey='snapshot' />
)

const _OneYear = (props) => (
  <SnapshotDataset {...props} label='One Year' dataKey='oneYear' />
)

const _ThreeYear = (props) => (
  <SnapshotDataset {...props} label='Three Year' dataKey='threeYear' />
)

export const Snapshot = withAppContext(withYearValidation(_Snapshot))
export const OneYearDataset = withAppContext(withYearValidation(_OneYear))
export const ThreeYearDataset = withAppContext(withYearValidation(_ThreeYear))
