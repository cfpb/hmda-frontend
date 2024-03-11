import { Filing } from './Filing'
import { FilingDocs } from './FilingDocs'
import { FilingGuides } from './FilingGuides'
import iconSprite from '../../common/uswds/img/sprite.svg'

export const FilerInfo = ({ hideContent }) => {
  return (
    <>
      <h2>
        <svg
          className='usa-icon'
          aria-hidden='true'
          focusable='false'
          role='img'
        >
          <use href={`${iconSprite}#account_balance`}></use>
        </svg>{' '}
        Info for Filers
      </h2>
      <section className='usa-card-group'>
        <FilingGuides />
        <Filing />
        <FilingDocs hideContent={hideContent} />
      </section>
    </>
  )
}
