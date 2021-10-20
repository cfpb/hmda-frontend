// TODO: Plug in actual files
export const THREE_YEAR_DATASET = {
  2017: {
    date: 'September 14, 2020',
    dataformat: 'in-progress',
    codesheet: 'in-progress',
    datasets: [
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/dev/2017/2017_public_lar_ultimate_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/dev/2017/2017_public_lar_ultimate_txt.zip',
        label: 'Three Year Loan/Application Records (LAR)'
      },
      {
        csv: 'https://s3.amazonaws.com/cfpb-hmda-public/dev/2017/2017_public_ts_ultimate_csv.zip',
        txt: 'https://s3.amazonaws.com/cfpb-hmda-public/dev/2017/2017_public_ts_ultimate_txt.zip',
        label: 'Three Year Transmittal Sheet Records (TS)'
      },
      {
        csv: 'in-progress',
        txt: 'in-progress',
        label: '[In Progress] Three Year Reporter Panel'
      },
      {
        csv: 'in-progress',
        txt: 'in-progress',
        label: '[In Progress] Three Year MSA/MD Description'
      }
    ]
  },
}
