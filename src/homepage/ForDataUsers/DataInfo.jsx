import { DataBrowser } from './DataBrowser'
import { DataDocs } from './DataDocs'
import { ChangeLog } from './ChangeLog'
import { DataPublication } from './DataPublication'
import { ResearchAndReports } from './ResearchAndReports'
import iconSprite from '../../common/uswds/img/sprite.svg'

export function DataInfo({ config, hideContent }) {
  if (hideContent) return <></>

  return (
    <>
      <h2 className='alt'>
        <svg
          className='usa-icon'
          aria-hidden='true'
          focusable='false'
          role='img'
        >
          <use href={`${iconSprite}#insights`} />
        </svg>{' '}
        Info for Data Users
      </h2>
      <section className='usa-card-group'>
        <DataBrowser />
        <DataDocs />
        <ChangeLog />
        <DataPublication {...config} />
        <ResearchAndReports />
      </section>
    </>
  )
}
