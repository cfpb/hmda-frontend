export const graphOptions = [
  {
    id: 'chart-a',
    category: 'quantity',
    endpoint: '/how-number-apps-changed',
    title: 'How has the number of applications changed?',
    yAxisLabel: 'Value',
    footer:
      'Conventional conforming applications dramatically increased since 2019. FHA loans temporarily moved higher in 2020 Q3.',
  },
  {
    id: 'chart-b',
    category: 'quantity',
    endpoint: '/how-number-loans-changed',
    title: 'How has the number of loans changed?',
    yAxisLabel: 'Value',
    footer:
      'Conventional conforming loans increased starting in 2019 and the increase quickened in 2020. VA loans have also been steadily increasing since 2019.',
  },
  {
    id: 'chart-c',
    category: 'quantity',
    endpoint: '/how-median-cs-changed',
    title: 'How have median credit scores changed?',
    yAxisLabel: 'Median Value',
    footer:
      'HELOC loans had the highest median credit scores while FHA loans had the lowest.',
  },
  {
    id: 'chart-d',
    category: 'race',
    endpoint: '/endpoint',
    title:
      'For conventional conforming loans, how have median credit scores differed by race/ethnicity?',
    yAxisLabel: 'Median Value',
    footer:
      'In 2019, median credit scores increased for all racial and ethnic groups.',
  },
  {
    id: 'chart-e',
    category: 'race',
    endpoint: '/endpoint',
    title:
      'For FHA loans, how have median credit scores differed by race/ ethnicity?',
    yAxisLabel: 'Median Value',
    footer:
      'In 2019, median credit scores increased for all groups and, in 2020, median credit scores declined for all groups.',
  },
  {
    id: 'chart-f',
    category: 'quantity',
    endpoint: '/endpoint',
    title: 'How has median CLTV changed?',
    yAxisLabel: 'Median Value',
    footer:
      'RHS/FSA loans had the highest median CLTV while HELOCs had generally the lowest.',
  },
  {
    id: 'chart-g',
    category: 'race',
    endpoint: '/endpoint',
    title:
      'For conventional conforming loans, how has median CLTV differed by race/ ethnicity?',
    yAxisLabel: 'Median Value',
    footer:
      'In 2019, all racial and ethnicity groups experienced a decline in median CLTV.',
  },
  {
    id: 'chart-h',
    category: 'race',
    endpoint: '/endpoint',
    title: 'For FHA loans, how has median CLTV differed by race/ethnicity?',
    yAxisLabel: 'Median Value',
    footer:
      'Both Blacks and Hispanics on average had the same median CLTV for FHA loans.',
  },
  {
    id: 'chart-i',
    category: 'loans',
    endpoint: '/endpoint',
    title: 'How has median DTI changed?',
    yAxisLabel: 'Median Value',
    footer:
      'Conventional non-conforming loans on average had the lowest median DTI.',
  },
  {
    id: 'chart-j',
    category: 'race',
    endpoint: '/endpoint',
    title:
      'For conventional conforming loans, how has median DTI differed by race/ ethnicity?',
    yAxisLabel: 'Median Value',
    footer:
      'For conventional conforming loans, Hispanics had the highest median DTI while whites had the lowest.',
  },
  {
    id: 'chart-k',
    category: 'race',
    endpoint: '/endpoint',
    title: 'For FHA loans, how has median DTI differed by race/ethnicity?',
    yAxisLabel: 'Median Value',
    footer:
      'For FHA loans, whites had the lowest median DTI while the position of other racial and ethnic groups changed.',
  },
  {
    id: 'chart-l',
    category: 'loans',
    endpoint: '/endpoint',
    title: 'How have denial rates changed?',
    yAxisLabel: 'Median Value',
    footer: 'HELOC loans had the highest denial rate.',
  },
  {
    id: 'chart-m',
    category: 'race',
    endpoint: '/endpoint',
    title:
      'For conventional conforming loans, how have denial rates differed by race/ethnicity?',
    yAxisLabel: 'Median Value',
    footer:
      'All racial and ethnic groups experienced an overall decrease in denial rates.',
  },
  {
    id: 'chart-n',
    category: 'race',
    endpoint: '/endpoint',
    title: 'For FHA loans, how have denial rates differed by race/ethnicity?',
    yAxisLabel: 'Median Value',
    footer:
      'All racial and ethnic groups experienced an overall decrease in denial rates.',
  },
  {
    id: 'chart-o',
    category: 'rates',
    endpoint: '/endpoint',
    title: 'How have median interest rates changed?',
    yAxisLabel: 'Median Value',
    footer: 'Median interest rates decreased overall for all loan types.',
  },
  {
    id: 'chart-p',
    category: 'rates',
    endpoint: '/endpoint',
    title:
      'For conventional conforming loans, how have median interest rates differed by race/ethnicity?',
    yAxisLabel: 'Median Value',
    footer: 'Since 2019, all median interest rates have decreased.',
  },
  {
    id: 'chart-q',
    category: 'rates',
    endpoint: '/endpoint',
    title:
      'By FHA loans, how have median interest rates differed by race/ ethnicity?',
    yAxisLabel: 'Median Value',
    footer: 'Interest rates decreased from 2018 quarter four to 2020.',
  },
  {
    id: 'chart-r',
    category: 'loans',
    endpoint: '/endpoint',
    title: 'How have median total loan costs changed?',
    yAxisLabel: 'Median Value',
    footer:
      'Median total loan costs increased from 2018 to 2020 except for VA loans.',
  },
  {
    id: 'chart-s',
    category: 'race',
    endpoint: '/endpoint',
    title:
      'For conventional conforming loans, how have median total loan costs differed by race/ethnicity?',
    yAxisLabel: 'Median Value',
    footer:
      'Median total loan costs increased from 2018 to 2020 for all racial and ethnic groups except for Asians.',
  },
  {
    id: 'chart-t',
    category: 'loans',
    endpoint: '/endpoint',
    title:
      'For FHA loans, how have median total loan costs differed by race/ ethnicity?',
    yAxisLabel: 'Median Value',
    footer: 'Median total loan costs increased from the start of 2018 to 2020.',
  },
]
