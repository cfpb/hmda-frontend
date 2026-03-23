import React, { useEffect, useRef, useState } from 'react'
import { useAutoAdvance } from './useAutoAdvance'
import IconPlay from '../common/images/play.svg?react'
import IconPause from '../common/images/pause.svg?react'
import './OptionCarousel.css'

/**
 * A component to enable testing of potential changes in a live site by clicking to cycle through available options
 * @param {String} className Optional classname to add to carousel elements
 * @param {Integer} cycleTime Number of seconds to wait before displaying the next option, if multiple options are passed. Setting this to 0 will turn off the auto advance behavior.
 * @param {String} fixedHeight Use a static container height
 * @param {Boolean} hideIcon Hide the icon marking these elements as part of the carousel
 * @param {Array} options Components/Elements to display as options
 * @param {Boolean} showControls Display the navigation controls
 */
export const OptionCarousel = ({
  autoAdvance = true,
  className = '',
  cycleTime = 2,
  fixedHeight = null,
  hideIcon = false,
  id,
  options = [],
  showControls = true,
}) => {
  if (!options || !options.length) return null

  const measurementRef = useRef(null)
  const [currHeight, setCurrHeight] = useState(fixedHeight || '100px')

  const styles = { '--oc-slide-height': fixedHeight || currHeight }

  const totalCount = options.length
  const hasMultiple = totalCount > 1
  const showNavigator = showControls && hasMultiple
  const hideIconClass = hideIcon ? 'no-icon' : ''
  const classname = [className, 'oc-option', hideIconClass]
    .filter((x) => x)
    .join(' ')

  // Measure all options off-screen and keep carousel height fixed at tallest slide.
  useEffect(() => {
    if (fixedHeight || !measurementRef.current) return

    const updateHeight = () => {
      const nodes = measurementRef.current.querySelectorAll('[data-oc-measure-item]')
      if (!nodes.length) return

      const tallest = Math.max(...Array.from(nodes).map((node) => node.offsetHeight))
      setCurrHeight(`${tallest}px`)
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [fixedHeight, options, showNavigator])

  /* Navigation logic */
  const navControls = useAutoAdvance({ cycleTime, totalCount, autoAdvance })

  const measurementNavigatorProps = {
    currentIdx: 0,
    isPaused: false,
    setPaused: () => {},
    showNext: () => {},
    showPrevious: () => {},
    totalCount,
  }

  return (
    <div id={id} className='oc' style={styles}>
      {!fixedHeight && (
        <div ref={measurementRef} className='oc-measurements' aria-hidden='true'>
          {options.map((option, idx) => (
            <span key={idx} className={classname} data-oc-measure-item>
              {showNavigator && <OptionNavigator {...measurementNavigatorProps} />}
              {option}
            </span>
          ))}
        </div>
      )}
      <span className={classname}>
        {showNavigator && (
          <OptionNavigator {...{ ...navControls, totalCount }} />
        )}
        {options[navControls.currentIdx]}
      </span>
    </div>
  )
}

/**
 * Navigation controller that displays which option is currently being shown
 * @param {Integer} currentIdx
 * @param {Boolean} isPaused // Flag indicating if auto-advance is paused
 * @param {Function} setPaused // Callback to set if auto-advance is paused
 * @param {Function} showNext // Callback to display next option
 * @param {Function} showPrevious // Callback to display previous option
 * @param {Integer} totalCount // Number of options
 */
const OptionNavigator = ({
  currentIdx,
  isPaused,
  setPaused,
  showNext,
  showPrevious,
  totalCount,
}) => {
  return (
    <div className='progress-wrapper'>
      <div className={'progress'}>
        <button
          className='previous clickable'
          onClick={showPrevious}
          title='Previous'
        >
          &lt;
        </button>
        <button className='count' tabIndex='-1'>
          {currentIdx + 1}/{totalCount}
        </button>
        <button className='next clickable' onClick={showNext} title='Next'>
          &gt;
        </button>
        <button
          className='pause clickable'
          title={isPaused ? 'Resume auto-advance' : 'Pause auto-advance'}
          onClick={() => setPaused(!isPaused)}
        >
          <span className='svg icon'>
            {isPaused ? <IconPlay /> : <IconPause />}
          </span>
        </button>
      </div>
    </div>
  )
}
