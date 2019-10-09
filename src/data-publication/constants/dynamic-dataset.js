export const DYNAMIC_DATASET = {
  2018: {
    lar : 'https://s3.amazonaws.com/cfpb-hmda-public/prod/dynamic-data/2018/2018_lar.txt',
    ts : 'https://s3.amazonaws.com/cfpb-hmda-public/prod/dynamic-data/2018/2018_ts.txt',
  },
  2017: {
    lar: 'https://s3.amazonaws.com/cfpb-hmda-public/prod/dynamic-data/2017_lar.txt',
    ts : 'https://s3.amazonaws.com/cfpb-hmda-public/prod/dynamic-data/2017_ts.txt',
    lar_spec : 'https://github.com/cfpb/hmda-platform/blob/v1.x/Documents/2017_Dynamic_LAR_Spec.csv',
    ts_spec : 'https://github.com/cfpb/hmda-platform/blob/v1.x/Documents/2017_Dynamic_TS_Spec.csv'
  },
  displayedYears: ['2018', '2017']
}
