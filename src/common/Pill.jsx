import X from './images/X.jsx'

const Pill = ({ value, close }) => {
  return (
    <div className='Pill'>
      <div className='PillValue'>{value}</div>
      <div className='PillClose' onClick={close}>
        <X />
      </div>
    </div>
  )
}

export default Pill
