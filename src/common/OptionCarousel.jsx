import React, { useState, useEffect } from "react"
import { ReactComponent as IconPlay } from "../common/images/play.svg"
import { ReactComponent as IconPause } from "../common/images/pause.svg"
import "./OptionCarousel.css"

let timeout = false

/**
 * A component to enable testing of potential changes in a live site by clicking to cycle through available options
 * @param {Array} options Components/Elements to display as options
 * @param {Boolean} showControls Display the navigation controls
 * @param {Boolean} hideIcon Hide the icon marking these elements as part of the carousel
 * @param {String} className Optional classname to add to carousel elements
 * @param {Integer} cycleTime Number of seconds to wait before displaying the next option, if multiple options are passed. Setting this to 0 will turn off the auto advance behavior.
 * @param {String} fixedHeight Use a static container height
 */
export const OptionCarousel = ({
  options = [],
  showControls = true,
  cycleTime = 2,
  hideIcon = false,
  className = "",
  fixedHeight = null
}) => {
  if (!options || !options.length) return null

  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false) // Auto-advance?
  const [currHeight, setCurrHeight] = useState(fixedHeight || "100px")
  const [winWidth, setWinWidth] = useState(window.innerWidth)

  const styles = { height: currHeight }
  const totalCount = options.length
  const hasMultiple = totalCount > 1
  const showNavigator = showControls && hasMultiple
  const hideIconClass = hideIcon ? "no-icon" : ""
  const classname = [className, "oc-option", hideIconClass]
    .filter((x) => x)
    .join(" ")

  /* Debounced window resize event listener used to track window width */
  window.onresize = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => setWinWidth(window.innerWidth), 450)
  }

  /* Adjust carousel container height when window is resized */
  useEffect(() => {
    if (fixedHeight) return () => null // Skip dynamic height adjustment

    // Minimum height in pixels
    const baseHeight = () => {
      if (winWidth > 675) return 50
      if (winWidth > 500) return 70
      if (winWidth > 300) return 85
      return 100
    }

    // Values derived from observation
    const multiplier = () => {
      if (winWidth > 500) return 13
      if (winWidth > 400) return 14
      if (winWidth > 300) return 15
      return 20
    }

    // Calculate container height based on the longest message
    let tallest = Math.max(...options.map((o) => o.props.message.length))

    // Estimate how many rows the text will occupy, adding a 2 row cushion
    const estimatedRows =
      Math.round((tallest / window.innerWidth) * multiplier()) + 2

    // Calculate container height based on # rows * presumed px height of text
    const estHeight = baseHeight() + estimatedRows * 17

    // Set height in pixels
    setCurrHeight(`${estHeight}px`)
  }, [winWidth])

  return (
    <div className="oc" style={styles}>
      <span className={classname}>
        {showNavigator && (
          <OptionNavigator
            {...{ idx, setIdx, paused, setPaused, totalCount, cycleTime }}
          />
        )}
        {options[idx]}
      </span>
    </div>
  )
}

/**
 * Navigation controller that displays which option is currently being shown
 * @param {Integer} idx // Index of current option being displayed
 * @param {Boolean} paused // Flag indicating if auto-advance is paused
 * @param {Integer} totalCount // Number of options
 * @returns
 */
const OptionNavigator = ({
  idx,
  setIdx,
  paused,
  totalCount,
  setPaused,
  cycleTime,
}) => {
  const next = () => setIdx((idx + 1) % totalCount)
  const prev = () => setIdx(idx - 1 < 0 ? totalCount - 1 : (idx - 1) % totalCount)

  /* Automatically cycle through available options */
  let autoAdvance
  useEffect(() => {
    if (paused) {
      autoAdvance && clearTimeout(autoAdvance)
    } else {
      if (totalCount < 1) return null
      const secs = parseInt(cycleTime)
      if (secs > 0) {
        autoAdvance = setTimeout(next, secs * 1000)
        return () => clearTimeout(autoAdvance)
      }
    }
  }, [idx, paused])

  return (
    <div className="progress-wrapper">
      <div className={"progress"}>
        <button className="previous clickable" onClick={prev} title="Previous">
          &lt;
        </button>
        <button className="count" tabIndex="-1">
          {idx + 1}/{totalCount}
        </button>
        <button className="next clickable" onClick={next} title="Next">
          &gt;
        </button>
        <button
          className="pause clickable"
          title={paused ? "Resume auto-advance" : "Pause auto-advance"}
          onClick={() => setPaused(!paused)}
        >
          <span className="svg icon">
            {paused ? <IconPlay /> : <IconPause />}
          </span>
        </button>
      </div>
    </div>
  )
}
