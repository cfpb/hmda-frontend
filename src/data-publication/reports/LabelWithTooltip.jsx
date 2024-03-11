import React from 'react'
import InfoIcon from '../../filing/images/info.svg?react'
import { Descriptions } from '../constants/descriptions.js'
import Tooltip from '../../common/Tooltip'
import './LabelWithTooltip.css'

export const LabelWithTooltip = ({ label, dataKey }) => {
  if (!dataKey || !Descriptions[dataKey]) return label

  return (
    <span className='LabelWithTooltip'>
      <Tooltip id={label} className={'mytooltip'}>
        {Descriptions[dataKey]}
      </Tooltip>
      <span className='nowrap'>
        {label}
        <div id='infoIcon'>
          <a
            data-tip
            data-for={label}
            href='#' // Enable keyboard focus
            onClick={(e) => e.preventDefault()} // Disable click
          >
            <InfoIcon />
          </a>
        </div>
      </span>
    </span>
  )
}
