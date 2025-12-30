import Alert from './Alert.jsx'

// Temporary component for APOR announcement, see: GHE #5358 
function AporAnnouncement() {
  return (
    <Alert heading='APOR File Path Change - Deadline: January 20, 2026' type='error'>
      <div>
        <p>
          Due to an upgrade to the HMDA Platform that was performed on December
          2, 2025, links to APOR related files have changed as previously
          announced. We have granted an extension before the old links are
          removed. On{' '}
          <strong style={{ fontFamily: 'SourceSansProBold' }}>
            January 20, 2026
          </strong>
          , the old APOR file paths will be removed and inaccessible and APOR
          files will no longer be provided via the AWS S3 public bucket.
        </p>
        <br />
        <p>Please update your bookmarks and integrations to use the new URLs:</p>
        <div style={{ marginBottom: '1rem', marginTop: '1rem' }}>
          <em>Fixed Table</em>
          <br />
          Old: <a href='https://s3.amazonaws.com/cfpb-hmda-public/prod/apor/YieldTableFixed.txt'>https://s3.amazonaws.com/cfpb-hmda-public/prod/apor/YieldTableFixed.txt</a>
          <br />
          New: <a href='https://files.ffiec.cfpb.gov/apor/YieldTableFixed.txt'>https://files.ffiec.cfpb.gov/apor/YieldTableFixed.txt</a>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <em>Adjustable Table</em>
          <br />
          Old: <a href='https://s3.amazonaws.com/cfpb-hmda-public/prod/apor/YieldTableAdjustable.txt'>https://s3.amazonaws.com/cfpb-hmda-public/prod/apor/YieldTableAdjustable.txt</a>
          <br />
          New: <a href='https://files.ffiec.cfpb.gov/apor/YieldTableAdjustable.txt'>https://files.ffiec.cfpb.gov/apor/YieldTableAdjustable.txt</a>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <em>Survey Table</em>
          <br />
          Old: <a href='https://s3.amazonaws.com/cfpb-hmda-public/prod/apor/SurveyTable.csv'>https://s3.amazonaws.com/cfpb-hmda-public/prod/apor/SurveyTable.csv</a>
          <br />
          New: <a href='https://files.ffiec.cfpb.gov/apor/SurveyTable.csv'>https://files.ffiec.cfpb.gov/apor/SurveyTable.csv</a>
        </div>
        <br />
        <p>
          This is a breaking change, and the old links will no longer work after <strong style={{ fontFamily: 'SourceSansProBold' }}>January 20, 2026</strong>.
        </p>
      </div>
    </Alert>
  )
}

export default AporAnnouncement
