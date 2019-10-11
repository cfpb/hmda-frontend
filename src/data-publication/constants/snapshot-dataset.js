export const SNAPSHOT_DATASET = {
  2018: {
    snapshot_date: 'August 7th, 2019',
    codesheet: 'https://github.com/cfpb/hmda-platform/raw/master/docs/v2/spec/2018_Public_LAR_Code_Sheet_PDF.pdf',
    datasets: [
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2018/2018_public_lar_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2018/2018_public_lar_pipe.zip',
        label: 'Loan/Application Records (LAR)'
      },
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2018/2018_public_ts_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2018/2018_public_ts_pipe.zip',
        label: 'Transmittal Sheet Records (TS)'
      },
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2018/2018_public_panel_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2018/2018_public_panel_pipe.zip',
        label: 'Reporter Panel'
      },
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2018/2018_public_msamd_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2018/2018_public_msamd_pipe.zip',
        label: 'MSA/MD Description'
      }
    ]
  },
  2017: {
    snapshot_date: 'April 18th, 2018',
    dataformat: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_publicstatic_dataformat.pdf',
    codesheet: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_publicstatic_codesheet.pdf',
    datasets: [
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_public_lar_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_public_lar_txt.zip',
        label: 'Loan/Application Records (LAR)'
      },
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_public_ts_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_public_ts_txt.zip',
        label: 'Transmittal Sheet Records (TS)'
      },
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_public_panel_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_public_panel_txt.zip',
        label: 'Reporter Panel'
      },
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_public_msamd_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/2017_public_msamd_txt.zip',
        label: 'MSA/MD Description'
      }
    ]
  },
  displayedYears: ['2018', '2017']

}
