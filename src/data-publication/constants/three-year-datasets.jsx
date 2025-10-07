import { getDefaultConfig } from '../../common/configUtils'
import getOverrides from './overrides'

const config = getDefaultConfig(window.location.hostname)

export const THREE_YEAR_DATASET = {
  2017: {
    freezeDate: 'December 31, 2020',
    dataformat: `${config.fileServerDomain}/prod/snapshot-data/2017_publicstatic_dataformat.pdf`,
    datasets: [
      {
        label: 'Loan/Application Records (LAR)',
        dataKey: 'lar',
        csv: `${config.fileServerDomain}/prod/three-year-data/2017/2017_public_lar_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2017/2017_public_lar_three_year_pipe.zip`,
      },
      {
        label: 'Transmittal Sheet Records (TS)',
        dataKey: 'ts',
        csv: `${config.fileServerDomain}/prod/three-year-data/2017/2017_public_ts_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2017/2017_public_ts_three_year_pipe.zip`,
      },
      {
        label: 'Reporter Panel',
        dataKey: 'panel',
        csv: `${config.fileServerDomain}/prod/three-year-data/2017/2017_public_panel_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2017/2017_public_panel_three_year_pipe.zip`,
      },
      {
        label: 'MSA/MD Description',
        dataKey: 'msamd',
        csv: `${config.fileServerDomain}/prod/three-year-data/2017/2017_public_msamd_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2017/2017_public_msamd_three_year_pipe.zip`,
      },
    ],
  },
  2018: {
    freezeDate: 'December 31, 2021',
    datasets: [
      {
        label: 'Loan/Application Records (LAR)',
        dataKey: 'lar',
        csv: `${config.fileServerDomain}/prod/three-year-data/2018/2018_public_lar_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2018/2018_public_lar_three_year_pipe.zip`,
      },
      {
        label: 'Transmittal Sheet Records (TS)',
        dataKey: 'ts',
        csv: `${config.fileServerDomain}/prod/three-year-data/2018/2018_public_ts_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2018/2018_public_ts_three_year_pipe.zip`,
      },
      {
        label: 'Reporter Panel',
        dataKey: 'panel',
        csv: `${config.fileServerDomain}/prod/three-year-data/2018/2018_public_panel_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2018/2018_public_panel_three_year_pipe.zip`,
      },
      {
        label: 'MSA/MD Description',
        dataKey: 'msamd',
        csv: `${config.fileServerDomain}/prod/three-year-data/2018/2018_public_msamd_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2018/2018_public_msamd_three_year_pipe.zip`,
      },
    ],
  },
  2019: {
    freezeDate: 'December 31, 2022',
    datasets: [
      {
        label: 'Loan/Application Records (LAR)',
        dataKey: 'lar',
        csv: `${config.fileServerDomain}/prod/three-year-data/2019/2019_public_lar_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2019/2019_public_lar_three_year_pipe.zip`,
      },
      {
        label: 'Transmittal Sheet Records (TS)',
        dataKey: 'ts',
        csv: `${config.fileServerDomain}/prod/three-year-data/2019/2019_public_ts_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2019/2019_public_ts_three_year_pipe.zip`,
      },
      {
        label: 'Reporter Panel',
        dataKey: 'panel',
        csv: `${config.fileServerDomain}/prod/three-year-data/2019/2019_public_panel_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2019/2019_public_panel_three_year_pipe.zip`,
      },
      {
        label: 'MSA/MD Description',
        dataKey: 'msamd',
        csv: `${config.fileServerDomain}/prod/three-year-data/2019/2019_public_msamd_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2019/2019_public_msamd_three_year_pipe.zip`,
      },
    ],
  },
  2020: {
    freezeDate: 'December 31, 2023',
    datasets: [
      {
        label: 'Loan/Application Records (LAR)',
        dataKey: 'lar',
        csv: `${config.fileServerDomain}/prod/three-year-data/2020/2020_public_lar_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2020/2020_public_lar_three_year_pipe.zip`,
      },
      {
        label: 'Transmittal Sheet Records (TS)',
        dataKey: 'ts',
        csv: `${config.fileServerDomain}/prod/three-year-data/2020/2020_public_ts_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2020/2020_public_ts_three_year_pipe.zip`,
      },
      {
        label: 'Reporter Panel',
        dataKey: 'panel',
        csv: `${config.fileServerDomain}/prod/three-year-data/2020/2020_public_panel_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2020/2020_public_panel_three_year_pipe.zip`,
      },
      {
        label: 'MSA/MD Description',
        dataKey: 'msamd',
        csv: `${config.fileServerDomain}/prod/three-year-data/2020/2020_public_msamd_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2020/2020_public_msamd_three_year_pipe.zip`,
      },
    ],
  },
  2021: {
    freezeDate: 'December 31, 2024',
    specialNote: getOverrides.getReporterPanelUnavailableBanner(
      '2021',
      'Three Year Dataset',
    ),
    datasets: [
      {
        label: 'Loan/Application Records (LAR)',
        dataKey: 'lar',
        csv: `${config.fileServerDomain}/prod/three-year-data/2021/2021_public_lar_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2021/2021_public_lar_three_year_pipe.zip`,
      },
      {
        label: 'Transmittal Sheet Records (TS)',
        dataKey: 'ts',
        csv: `${config.fileServerDomain}/prod/three-year-data/2021/2021_public_ts_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2021/2021_public_ts_three_year_pipe.zip`,
      },
      {
        label: 'Reporter Panel',
        dataKey: 'panel',
        override: getOverrides.getReporterPanelUnavailable(),
      },
      {
        label: 'MSA/MD Description',
        dataKey: 'msamd',
        csv: `${config.fileServerDomain}/prod/three-year-data/2021/2021_public_msamd_three_year_csv.zip`,
        txt: `${config.fileServerDomain}/prod/three-year-data/2021/2021_public_msamd_three_year_pipe.zip`,
      },
    ],
  },
}
