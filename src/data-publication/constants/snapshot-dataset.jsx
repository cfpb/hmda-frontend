import { getDefaultConfig } from '../../common/configUtils'
import getOverrides from './overrides'

const { fileServerDomain } = getDefaultConfig(window.location.hostname)

// Cross Reference for ARID2017 to LEI.  Same source for all years
const ARID2017_XREF = {
  csv: `${fileServerDomain}/snapshot/arid2017tolei/arid2017_to_lei_xref_csv.zip`,
  txt: `${fileServerDomain}/snapshot/arid2017tolei/arid2017_to_lei_xref_psv.zip`,
  label: 'ARID2017 to LEI Reference Table',
  dataKey: 'arid',
}

export const SNAPSHOT_DATASET = {
  2024: {
    freezeDate: 'May 19, 2025',
    specialNote: getOverrides.getReporterPanelUnavailableBanner(
      '2024',
      'Snapshot Dataset',
    ),
    datasets: [
      {
        csv: `${fileServerDomain}/snapshot/2024/2024_public_lar_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2024/2024_public_lar_pipe.zip`,
        label: 'Loan/Application Records (LAR)',
        dataKey: 'lar',
      },
      {
        csv: `${fileServerDomain}/snapshot/2024/2024_public_ts_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2024/2024_public_ts_pipe.zip`,
        label: 'Transmittal Sheet Records (TS)',
        dataKey: 'ts',
      },
      {
        label: 'Reporter Panel',
        dataKey: 'panel',
        override: getOverrides.getReporterPanelUnavailable(),
      },
      {
        csv: `${fileServerDomain}/snapshot/2024/2024_public_msamd_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2024/2024_public_msamd_pipe.zip`,
        label: 'MSA/MD Description',
        dataKey: 'msamd',
      },
      ARID2017_XREF,
    ],
  },
  2023: {
    freezeDate: 'May 1, 2024',
    datasets: [
      {
        csv: `${fileServerDomain}/snapshot/2023/2023_public_lar_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2023/2023_public_lar_pipe.zip`,
        label: 'Loan/Application Records (LAR)',
        dataKey: 'lar',
      },
      {
        csv: `${fileServerDomain}/snapshot/2023/2023_public_ts_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2023/2023_public_ts_pipe.zip`,
        label: 'Transmittal Sheet Records (TS)',
        dataKey: 'ts',
      },
      {
        csv: `${fileServerDomain}/snapshot/2023/2023_public_panel_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2023/2023_public_panel_pipe.zip`,
        label: 'Reporter Panel',
        dataKey: 'panel',
      },
      {
        csv: `${fileServerDomain}/snapshot/2023/2023_public_msamd_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2023/2023_public_msamd_pipe.zip`,
        label: 'MSA/MD Description',
        dataKey: 'msamd',
      },
      ARID2017_XREF,
    ],
  },
  2022: {
    freezeDate: 'May 1, 2023',
    datasets: [
      {
        csv: `${fileServerDomain}/snapshot/2022/2022_public_lar_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2022/2022_public_lar_pipe.zip`,
        label: 'Loan/Application Records (LAR)',
        dataKey: 'lar',
      },
      {
        csv: `${fileServerDomain}/snapshot/2022/2022_public_ts_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2022/2022_public_ts_pipe.zip`,
        label: 'Transmittal Sheet Records (TS)',
        dataKey: 'ts',
      },
      {
        csv: `${fileServerDomain}/snapshot/2022/2022_public_panel_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2022/2022_public_panel_pipe.zip`,
        label: 'Reporter Panel',
        dataKey: 'panel',
      },
      {
        csv: `${fileServerDomain}/snapshot/2022/2022_public_msamd_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2022/2022_public_msamd_pipe.zip`,
        label: 'MSA/MD Description',
        dataKey: 'msamd',
      },
      ARID2017_XREF,
    ],
  },
  2021: {
    freezeDate: 'April 30, 2022',
    datasets: [
      {
        csv: `${fileServerDomain}/snapshot/2021/2021_public_lar_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2021/2021_public_lar_pipe.zip`,
        label: 'Loan/Application Records (LAR)',
        dataKey: 'lar',
      },
      {
        csv: `${fileServerDomain}/snapshot/2021/2021_public_ts_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2021/2021_public_ts_pipe.zip`,
        label: 'Transmittal Sheet Records (TS)',
        dataKey: 'ts',
      },
      {
        csv: `${fileServerDomain}/snapshot/2021/2021_public_panel_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2021/2021_public_panel_pipe.zip`,
        label: 'Reporter Panel',
        dataKey: 'panel',
      },
      {
        csv: `${fileServerDomain}/snapshot/2021/2021_public_msamd_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2021/2021_public_msamd_pipe.zip`,
        label: 'MSA/MD Description',
        dataKey: 'msamd',
      },
      ARID2017_XREF,
    ],
  },
  2020: {
    freezeDate: 'May 3, 2021',
    datasets: [
      {
        csv: `${fileServerDomain}/snapshot/2020/2020_public_lar_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2020/2020_public_lar_pipe.zip`,
        label: 'Loan/Application Records (LAR)',
        dataKey: 'lar',
      },
      {
        csv: `${fileServerDomain}/snapshot/2020/2020_public_ts_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2020/2020_public_ts_pipe.zip`,
        label: 'Transmittal Sheet Records (TS)',
        dataKey: 'ts',
      },
      {
        csv: `${fileServerDomain}/snapshot/2020/2020_public_panel_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2020/2020_public_panel_pipe.zip`,
        label: 'Reporter Panel',
        dataKey: 'panel',
      },
      {
        csv: `${fileServerDomain}/snapshot/2020/2020_public_msamd_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2020/2020_public_msamd_pipe.zip`,
        label: 'MSA/MD Description',
        dataKey: 'msamd',
      },
      ARID2017_XREF,
    ],
  },
  2019: {
    freezeDate: 'April 27, 2020',
    datasets: [
      {
        csv: `${fileServerDomain}/snapshot/2019/2019_public_lar_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2019/2019_public_lar_pipe.zip`,
        label: 'Loan/Application Records (LAR)',
        dataKey: 'lar',
      },
      {
        csv: `${fileServerDomain}/snapshot/2019/2019_public_ts_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2019/2019_public_ts_pipe.zip`,
        label: 'Transmittal Sheet Records (TS)',
        dataKey: 'ts',
      },
      {
        csv: `${fileServerDomain}/snapshot/2019/2019_public_panel_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2019/2019_public_panel_pipe.zip`,
        label: 'Reporter Panel',
        dataKey: 'panel',
      },
      {
        csv: `${fileServerDomain}/snapshot/2019/2019_public_msamd_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2019/2019_public_msamd_pipe.zip`,
        label: 'MSA/MD Description',
        dataKey: 'msamd',
      },
      ARID2017_XREF,
    ],
  },
  2018: {
    freezeDate: 'August 7th, 2019',
    datasets: [
      {
        csv: `${fileServerDomain}/snapshot/2018/2018_public_lar_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2018/2018_public_lar_pipe.zip`,
        label: 'Loan/Application Records (LAR)',
        dataKey: 'lar',
      },
      {
        csv: `${fileServerDomain}/snapshot/2018/2018_public_ts_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2018/2018_public_ts_pipe.zip`,
        label: 'Transmittal Sheet Records (TS)',
        dataKey: 'ts',
      },
      {
        csv: `${fileServerDomain}/snapshot/2018/2018_public_panel_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2018/2018_public_panel_pipe.zip`,
        label: 'Reporter Panel',
        dataKey: 'panel',
      },
      {
        csv: `${fileServerDomain}/snapshot/2018/2018_public_msamd_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2018/2018_public_msamd_pipe.zip`,
        label: 'MSA/MD Description',
        dataKey: 'msamd',
      },
      ARID2017_XREF,
    ],
  },
  2017: {
    freezeDate: 'April 18th, 2018',
    dataformat: `${fileServerDomain}/snapshot/2017_publicstatic_dataformat.pdf`,
    codesheet: `${fileServerDomain}/snapshot/2017_publicstatic_codesheet.pdf`,
    datasets: [
      {
        csv: `${fileServerDomain}/snapshot/2017_public_lar_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2017_public_lar_txt.zip`,
        label: 'Loan/Application Records (LAR)',
        dataKey: 'lar',
      },
      {
        csv: `${fileServerDomain}/snapshot/2017_public_ts_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2017_public_ts_txt.zip`,
        label: 'Transmittal Sheet Records (TS)',
        dataKey: 'ts',
      },
      {
        csv: `${fileServerDomain}/snapshot/2017_public_panel_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2017_public_panel_txt.zip`,
        label: 'Reporter Panel',
        dataKey: 'panel',
      },
      {
        csv: `${fileServerDomain}/snapshot/2017_public_msamd_csv.zip`,
        txt: `${fileServerDomain}/snapshot/2017_public_msamd_txt.zip`,
        label: 'MSA/MD Description',
        dataKey: 'msamd',
      },
      ARID2017_XREF,
    ],
  },
}
