import { getDefaultConfig } from '../../common/configUtils'
import getOverrides from './overrides'

const { fileServerDomain } = getDefaultConfig(window.location.hostname)

export const ONE_YEAR_DATASET = {
  2023: {
    freezeDate: 'May 19, 2025',
    specialNote: getOverrides.getReporterPanelUnavailableBanner(
      '2023',
      'One Year Dataset',
    ),
    datasets: [
      {
        dataKey: 'lar',
        label: 'Loan/Application Records (LAR)',
        csv: `${fileServerDomain}/static-data/one-year/2023/2023_public_lar_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2023/2023_public_lar_one_year_pipe.zip`,
      },
      {
        dataKey: 'ts',
        label: 'Transmittal Sheet Records (TS)',
        csv: `${fileServerDomain}/static-data/one-year/2023/2023_public_ts_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2023/2023_public_ts_one_year_pipe.zip`,
      },
      {
        dataKey: 'panel',
        label: 'Reporter Panel',
        override: getOverrides.getReporterPanelUnavailable(),
      },
      {
        dataKey: 'msamd',
        label: 'MSA/MD Description',
        csv: `${fileServerDomain}/static-data/one-year/2023/2023_public_msamd_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2023/2023_public_msamd_one_year_pipe.zip`,
      },
    ],
  },
  2022: {
    freezeDate: 'May 1, 2024',
    datasets: [
      {
        dataKey: 'lar',
        label: 'Loan/Application Records (LAR)',
        csv: `${fileServerDomain}/static-data/one-year/2022/2022_public_lar_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2022/2022_public_lar_one_year_pipe.zip`,
      },
      {
        dataKey: 'ts',
        label: 'Transmittal Sheet Records (TS)',
        csv: `${fileServerDomain}/static-data/one-year/2022/2022_public_ts_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2022/2022_public_ts_one_year_pipe.zip`,
      },
      {
        dataKey: 'panel',
        label: 'Reporter Panel',
        csv: `${fileServerDomain}/static-data/one-year/2022/2022_public_panel_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2022/2022_public_panel_one_year_pipe.zip`,
      },
      {
        dataKey: 'msamd',
        label: 'MSA/MD Description',
        csv: `${fileServerDomain}/static-data/one-year/2022/2022_public_msamd_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2022/2022_public_msamd_one_year_pipe.zip`,
      },
    ],
  },
  2021: {
    freezeDate: 'May 1, 2023',
    datasets: [
      {
        dataKey: 'lar',
        label: 'Loan/Application Records (LAR)',
        csv: `${fileServerDomain}/static-data/one-year/2021/2021_public_lar_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2021/2021_public_lar_one_year_pipe.zip`,
      },
      {
        dataKey: 'ts',
        label: 'Transmittal Sheet Records (TS)',
        csv: `${fileServerDomain}/static-data/one-year/2021/2021_public_ts_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2021/2021_public_ts_one_year_pipe.zip`,
      },
      {
        dataKey: 'panel',
        label: 'Reporter Panel',
        csv: `${fileServerDomain}/static-data/one-year/2021/2021_public_panel_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2021/2021_public_panel_one_year_pipe.zip`,
      },
      {
        dataKey: 'msamd',
        label: 'MSA/MD Description',
        csv: `${fileServerDomain}/static-data/one-year/2021/2021_public_msamd_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2021/2021_public_msamd_one_year_pipe.zip`,
      },
    ],
  },
  2020: {
    freezeDate: 'April 30, 2022',
    datasets: [
      {
        dataKey: 'lar',
        label: 'Loan/Application Records (LAR)',
        csv: `${fileServerDomain}/static-data/one-year/2020/2020_public_lar_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2020/2020_public_lar_one_year_pipe.zip`,
      },
      {
        dataKey: 'ts',
        label: 'Transmittal Sheet Records (TS)',
        csv: `${fileServerDomain}/static-data/one-year/2020/2020_public_ts_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2020/2020_public_ts_one_year_pipe.zip`,
      },
      {
        dataKey: 'panel',
        label: 'Reporter Panel',
        csv: `${fileServerDomain}/static-data/one-year/2020/2020_public_panel_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2020/2020_public_panel_one_year_pipe.zip`,
      },
      {
        dataKey: 'msamd',
        label: 'MSA/MD Description',
        csv: `${fileServerDomain}/static-data/one-year/2020/2020_public_msamd_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2020/2020_public_msamd_one_year_pipe.zip`,
      },
    ],
  },
  2019: {
    freezeDate: 'April 5, 2022',
    specialNote: (
      <>
        <b>PLEASE NOTE:</b> Due to the timing of the One Year data product's
        creation, the 2019 One Year datasets contain more than 12 months worth
        of updates.
      </>
    ),
    datasets: [
      {
        dataKey: 'lar',
        label: 'Loan/Application Records (LAR)',
        csv: `${fileServerDomain}/static-data/one-year/2019/2019_public_lar_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2019/2019_public_lar_one_year_pipe.zip`,
      },
      {
        dataKey: 'ts',
        label: 'Transmittal Sheet Records (TS)',
        csv: `${fileServerDomain}/static-data/one-year/2019/2019_public_ts_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2019/2019_public_ts_one_year_pipe.zip`,
      },
      {
        dataKey: 'panel',
        label: 'Reporter Panel',
        csv: `${fileServerDomain}/static-data/one-year/2019/2019_public_panel_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2019/2019_public_panel_one_year_pipe.zip`,
      },
      {
        dataKey: 'msamd',
        label: 'MSA/MD Description',
        csv: `${fileServerDomain}/static-data/one-year/2019/2019_public_msamd_one_year_csv.zip`,
        txt: `${fileServerDomain}/static-data/one-year/2019/2019_public_msamd_one_year_pipe.zip`,
      },
    ],
  },
  2018: {
    exception: (
      <>
        There are no One Year National Loan Level datasets for 2018.
        <br />
        <br />
        This data product was created after the close of 2018 submission
        acceptance, which was on 12/31/2021.
      </>
    ),
  },
  2017: {
    exception: (
      <>
        There are no One Year National Loan Level datasets for 2017.
        <br />
        <br />
        This data product was created after the close of 2017 submission
        acceptance, which was on 12/31/2020.
      </>
    ),
  },
}
