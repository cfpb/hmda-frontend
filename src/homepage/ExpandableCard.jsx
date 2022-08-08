import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../common/useLocalStorage'
import './ExpandableCard.css'

export const ExpandableCard = ({
  id, // Used to track the user's last expanded/compressed status, per card, via LocalStorage
  title = 'Card Title',
  classname = '',
  description = 'Description of what the information this card links to.',
  destination, // Target endpoint for card's title link to (ex. /documentation)
  isHidden = false, // true = Do not display Card
  expandedByDefault = true, // true = child content is displayed on load
  disableExpansion = false, // true = Allow the Card to be used without expandable content
  children,
}) => {
  const [showMore, setShowMore] = useState(expandedByDefault)
  const [storedVisibility, setStoredVisibility] = useLocalStorage(id, expandedByDefault)

  const toggleShowMore = () => {
    setStoredVisibility(!showMore)
  }

  useEffect(() => {
    setShowMore(storedVisibility)
  }, [storedVisibility])

  if (isHidden) return null

  /* Make the Card's header a link, if we have a destination */
  const cardHeading = destination ? <Link to={destination}>{title}</Link> : title
  
  
  let expandedContent = children
  
  let showMoreButton = (
    <button className='show-more' onClick={toggleShowMore}>
      Show {showMore ? 'Less' : 'More...'}
    </button>
  )
  
  /* Hide the 'Show More' button as well as any child content */
  if (disableExpansion) {
    expandedContent = null
    showMoreButton = null
  }

  return (
    <header className={'expandable-card ' + classname}>
      <h3>{cardHeading}</h3>
      <p>
        {description}
        {showMoreButton}
      </p>
      {showMore && expandedContent}
    </header>
  )
}
