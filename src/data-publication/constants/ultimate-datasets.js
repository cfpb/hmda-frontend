// TODO: Plug in actual files
export const ULTIMATE_DATASET = {
  2017: {
    date: 'September 10, 2020',
    dataformat: 'in-progress',
    codesheet: 'in-progress',
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
        csv: 'in-progress',
        txt: 'in-progress',
        label: '[In Progress] Ultimate Reporter Panel'
      },
      {
        csv: 'in-progress',
        txt: 'in-progress',
        label: '[In Progress] Ultimate MSA/MD Description'
      }
    ]
  },
}
