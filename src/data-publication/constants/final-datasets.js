// TODO: Plug in actual files
export const FINAL_DATASET = {
  2018: {
    date: 'Pending...',
    dataformat: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2018_publicstatic_dataformat.pdf',
    codesheet: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2018_publicstatic_codesheet.pdf',
    datasets: [
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2018_public_lar_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2018_public_lar_txt.zip',
        label: 'One Year Loan/Application Records (LAR)'
      },
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2018_public_ts_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2018_public_ts_txt.zip',
        label: 'One Year Transmittal Sheet Records (TS)'
      },
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2018_public_panel_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2018_public_panel_txt.zip',
        label: 'One Year Reporter Panel'
      },
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2018_public_msamd_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2018_public_msamd_txt.zip',
        label: 'One Year MSA/MD Description'
      }
    ]
  },
  2017: {
    date: 'Pending...',
    dataformat: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2017_publicstatic_dataformat.pdf',
    codesheet: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2017_publicstatic_codesheet.pdf',
    datasets: [
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2017_public_lar_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2017_public_lar_txt.zip',
        label: 'One Year Loan/Application Records (LAR)'
      },
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2017_public_ts_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2017_public_ts_txt.zip',
        label: 'One Year Transmittal Sheet Records (TS)'
      },
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2017_public_panel_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2017_public_panel_txt.zip',
        label: 'One Year Reporter Panel'
      },
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2017_public_msamd_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/final-data/2017_public_msamd_txt.zip',
        label: 'One Year MSA/MD Description'
      }
    ]
  },
}
