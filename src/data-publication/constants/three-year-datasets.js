// TODO: Plug in actual files
export const THREE_YEAR_DATASET = {
  2017: {
    dataformat: 'in-progress',
    codesheet: 'in-progress',
    datasets: [
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/dev/2017/2017_public_lar_ultimate_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/dev/2017/2017_public_lar_ultimate_txt.zip',
        label: 'Loan/Application Records (LAR)'
      },
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/dev/2017/2017_public_ts_ultimate_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/dev/2017/2017_public_ts_ultimate_txt.zip',
        label: 'Transmittal Sheet Records (TS)'
      },
      {
        csv: 'in-progress',
        txt: 'in-progress',
        label: '[In Progress] Reporter Panel'
      },
      {
        csv: 'in-progress',
        txt: 'in-progress',
        label: '[In Progress] MSA/MD Description'
      }
    ]
  },
}
