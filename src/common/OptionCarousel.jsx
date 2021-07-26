import React, { useState, useEffect } from 'react'
import { ReactComponent as IconPlay } from '../common/images/play.svg'
import { ReactComponent as IconPause } from '../common/images/pause.svg'
import './OptionCarousel.css'

/**
 * A component to enable testing of potential changes in a live site by clicking to cycle through available options
 * @param {Array} options Components/Elements to display as options
 * @param {Boolean} showControls Display the navigation controls
 * @param {Boolean} hideIcon Hide the icon marking these elements as part of the carousel
 * @param {String} className Optional classname to add to carousel elements
 * @param {Integer} cycleTime Number of seconds to wait before displaying the next option, if multiple options are passed. Setting this to 0 will turn off the auto advance behavior.
 * @returns 
 */
export const OptionCarousel = ({
  options = [],
  showControls = true,
  cycleTime = 2,
  hideIcon = false,
  className = '',
  fixedHeight = 'auto'
}) => {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)  // Auto-advance?
  if (!options || !options.length) return null

  const hasMultiple = options.length > 1
  const next = () => setIdx((idx + 1) % options.length)
  const prev = () =>
    setIdx(idx - 1 < 0 ? options.length - 1 : (idx - 1) % options.length)

  let autoAdvance
  useEffect(() => {
    if (paused) {
      autoAdvance && clearTimeout(autoAdvance)
    } else {
      if (!options.length) return null
      const secs = parseInt(cycleTime)
      if (hasMultiple && secs) {
        autoAdvance = setTimeout(next, secs * 1000)
        return () => clearTimeout(autoAdvance)
      }
    }
  }, [idx, paused])

  const hideIconClass = hideIcon ? 'no-icon' : ''
  const classname = [className, 'oc-option', hideIconClass].filter((x) => x).join(' ')
  const styles = { height: fixedHeight }

  return (
    <div className='oc' style={styles}>
      {showControls && hasMultiple && (
        <div className='progress-wrapper'>
          <div className={'progress'}>
            <button
              className='previous clickable'
              onClick={prev}
              title='Previous'
            >
              &lt;
            </button>
            <button className='count' tabIndex='-1'>
              {idx + 1}/{options.length}
            </button>
            <button className='next clickable' onClick={next} title='Next'>
              &gt;
            </button>
            <button
              className='pause clickable'
              title={paused ? 'Resume auto-advance' : 'Pause auto-advance'}
              onClick={() => setPaused(!paused)}
            >
              <span className='svg icon'>
                {paused ? <IconPlay /> : <IconPause />}
              </span>
            </button>
          </div>
        </div>
      )}

      <span className={classname}>{options[idx]}</span>
    </div>
  )
}