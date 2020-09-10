// TODO: Plug in actual files
export const ULTIMATE_DATASET = {
  2017: {
    date: '<TODO: Add Ultimate generation date>',
    dataformat: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/ultimate-data/2017_publicstatic_dataformat.pdf',
    codesheet: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/ultimate-data/2017_publicstatic_codesheet.pdf',
    datasets: [
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/ultimate-data/2017_public_lar_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/ultimate-data/2017_public_lar_txt.zip',
        label: 'Ultimate Loan/Application Records (LAR)'
      },
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/ultimate-data/2017_public_ts_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/ultimate-data/2017_public_ts_txt.zip',
        label: 'Ultimate Transmittal Sheet Records (TS)'
      },
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/ultimate-data/2017_public_panel_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/ultimate-data/2017_public_panel_txt.zip',
        label: 'Ultimate Reporter Panel'
      },
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/ultimate-data/2017_public_msamd_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/ultimate-data/2017_public_msamd_txt.zip',
        label: 'Ultimate MSA/MD Description'
      }
    ]
  },
}
