import Alert from './Alert.jsx'

// Temporary component for APOR announcement, see: GHE #5358 
function AporAnnouncement() {
  return (
    <Alert heading='APOR File Path Change' type='error'>
      <div>
        <p>
          Due to an upgrade to the HMDA Platform that was performed on 
          December 2, 2025, links to APOR related files have changed. As 
          of January 20, 2026, APOR files are no longer provided via the 
          AWS S3 public bucket.
        </p>
        <br />
        <p>Please update your bookmarks and integrations to use the new URLs:</p>
        <div style={{ marginBottom: '1rem', marginTop: '1rem' }}>
          <em>Fixed Table: </em>
          <a href='https://files.ffiec.cfpb.gov/apor/YieldTableFixed.txt'>
            https://files.ffiec.cfpb.gov/apor/YieldTableFixed.txt
          </a>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <em>Adjustable Table: </em>
          <a href='https://files.ffiec.cfpb.gov/apor/YieldTableAdjustable.txt'>
            https://files.ffiec.cfpb.gov/apor/YieldTableAdjustable.txt
          </a>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <em>Survey Table: </em>
          <a href='https://files.ffiec.cfpb.gov/apor/SurveyTable.csv'>
            https://files.ffiec.cfpb.gov/apor/SurveyTable.csv
          </a>
        </div>
      </div>
    </Alert>
  )
}

export default AporAnnouncement
