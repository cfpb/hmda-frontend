import React from 'react'
import { capitalize, valOrNone } from './helpers'
import { keyMap } from '../constants'

export function Input({ type = 'text', disabled, name, value }) {
  return (
    <div className={`input-wrap ${type}`}>
      <label htmlFor={name}>{name}</label>
      <input
        type={type}
        value={valOrNone(value)}
        disabled={disabled}
        readOnly
      />
    </div>
  )
}

export function InputGroup({ name, value, disabled }) {
  const keys = Object.keys(value).map((key) => keyMap[key] || key)
  return (
    <>
      {keys.map((key) => (
        <Input
          key={`${name} ${key}`}
          disabled={disabled}
          name={capitalize(`${name} ${key}`)}
          value={value[key]}
        />
      ))}
    </>
  )
}
