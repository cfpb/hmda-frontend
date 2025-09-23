import iconSprite from '../../common/uswds/img/sprite.svg'
import { Filing } from './Filing'
import { FilingDocs } from './FilingDocs'
import FilingGuides from './FilingGuides'

export function FilerInfo({ hideContent }) {
  return (
    <>
      <h2>
        <svg
          className='usa-icon'
          aria-hidden='true'
          focusable='false'
          role='img'
        >
          <use href={`${iconSprite}#account_balance`} />
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
