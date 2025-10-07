import { getDefaultConfig } from '../../common/configUtils'

const config = getDefaultConfig(window.location.hostname)

export const DYNAMIC_DATASET = {
  2024: {
    lar: `${config.fileServerDomain}/prod/dynamic-data/2024/2024_lar.zip`,
    ts: `${config.fileServerDomain}/prod/dynamic-data/2024/2024_ts.zip`,
  },
  2023: {
    lar: `${config.fileServerDomain}/prod/dynamic-data/2023/2023_lar.zip`,
    ts: `${config.fileServerDomain}/prod/dynamic-data/2023/2023_ts.zip`,
  },
  2022: {
    lar: `${config.fileServerDomain}/prod/dynamic-data/2022/2022_lar.zip`,
    ts: `${config.fileServerDomain}/prod/dynamic-data/2022/2022_ts.zip`,
  },
  2021: {
    lar: `${config.fileServerDomain}/prod/dynamic-data/2021/2021_lar.zip`,
    ts: `${config.fileServerDomain}/prod/dynamic-data/2021/2021_ts.zip`,
  },
  2020: {
    lar: `${config.fileServerDomain}/prod/dynamic-data/2020/2020_lar.zip`,
    ts: `${config.fileServerDomain}/prod/dynamic-data/2020/2020_ts.zip`,
  },
  2019: {
    lar: `${config.fileServerDomain}/prod/dynamic-data/2019/2019_lar.zip`,
    ts: `${config.fileServerDomain}/prod/dynamic-data/2019/2019_ts.zip`,
  },
  2018: {
    lar: `${config.fileServerDomain}/prod/dynamic-data/2018/2018_lar.zip`,
    ts: `${config.fileServerDomain}/prod/dynamic-data/2018/2018_ts.zip`,
  },
  2017: {
    lar: `${config.fileServerDomain}/prod/dynamic-data/dynamic_lar_ultimate_2017.txt`,
    ts: `${config.fileServerDomain}/prod/dynamic-data/dynamic_ts_ultimate_2017.txt`,
    lar_spec:
      'https://github.com/cfpb/hmda-platform/blob/v1.x/Documents/2017_Dynamic_LAR_Spec.csv',
    ts_spec:
      'https://github.com/cfpb/hmda-platform/blob/v1.x/Documents/2017_Dynamic_TS_Spec.csv',
  },
}
