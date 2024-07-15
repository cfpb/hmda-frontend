// Used for year 2018+
const shared2018_plus = {
  msa: [
    { value: '1', label: 'Applications by Tract' },
    { value: '2', label: 'Loans Purchased by Tract' },
  ],
  nationwide: [{ value: 'IRS', label: 'Institution Register Summary' }],
}

export const DISCLOSURE_REPORTS = {
  2023: shared2018_plus,
  2022: shared2018_plus,
  2021: shared2018_plus,
  2020: shared2018_plus,
  2019: shared2018_plus,
  2018: shared2018_plus,
  2017: {
    msa: [
      { value: '1', label: 'Applications by Tract' },
      { value: '2', label: 'Loans Purchased by Tract' },
      {
        label: 'Loans Sold',
        options: [
          {
            value: '3-1',
            label: 'Loans Sold by Tract',
          },
          {
            value: '3-2',
            label: 'Loans Sold by Purchaser Type',
          },
        ],
      },
      {
        label: 'By Race',
        options: [
          {
            value: '4-1',
            label: 'FHA, FSA/RHS and VA Purchases by Race',
          },
          {
            value: '4-2',
            label: 'Conventional Purchases by Race',
          },
          {
            value: '4-3',
            label: 'Refinancings by Race',
          },
          {
            value: '4-4',
            label: 'Home Improvements by Race',
          },
          {
            value: '4-5',
            label: 'Multi-Family Loans by Race',
          },
          {
            value: '4-6',
            label: 'Nonoccupant Loans by Race',
          },
          {
            value: '4-7',
            label: 'Manufactured Homes by Race',
          },
        ],
      },
      {
        label: 'By App Income',
        options: [
          {
            value: '5-1',
            label: 'FHA, FSA/RHS and VA by App Income',
          },
          {
            value: '5-2',
            label: 'Conv Purchases by App Income',
          },
          {
            value: '5-3',
            label: 'Refinancings by App Income',
          },
          {
            value: '5-4',
            label: 'Home Improvements by App Income',
          },
          {
            value: '5-6',
            label: 'Nonoccupant Loans by Income',
          },
          {
            value: '5-7',
            label: 'Manufactured Homes by Income',
          },
        ],
      },
      {
        label: 'By Tract Income',
        options: [
          {
            value: '7-1',
            label: 'FHA, FSA/RHS and VA by Tract Income',
          },
          {
            value: '7-2',
            label: 'Conv Purchases by Tract Income',
          },
          {
            value: '7-3',
            label: 'Refinancings by Tract Income',
          },
          {
            value: '7-4',
            label: 'Home Improvements by Tract Income',
          },
          {
            value: '7-5',
            label: 'Multi-Family Loans by Tract Income',
          },
          {
            value: '7-6',
            label: 'Nonoccupant Loans by Tract Income',
          },
          {
            value: '7-7',
            label: 'Manufactured Homes by Tract Income',
          },
        ],
      },
      {
        label: 'Denials',
        options: [
          {
            value: '8-1',
            label: 'FHA, FSA/RHS and VA Purchase Denials',
          },
          {
            value: '8-2',
            label: 'Conv Home-Purchase Denials',
          },
          {
            value: '8-3',
            label: 'Refinancing Denials',
          },
          {
            value: '8-4',
            label: 'Home Improvement Denials',
          },
          {
            value: '8-5',
            label: 'Multi-Family Denials',
          },
          {
            value: '8-6',
            label: 'Nonoccupant Loan Denials',
          },
          {
            value: '8-7',
            label: 'Manufactured Home Denials',
          },
        ],
      },
      {
        label: 'Pricing Info First',
        options: [
          {
            value: '11-1',
            label: 'FHA Home-Pur Pricing Info First',
          },
          {
            value: '11-2',
            label: 'VA Home-Pur Pricing Info First',
          },
          {
            value: '11-3',
            label: 'Conv Home-Pur Pricing Info First',
          },
          {
            value: '11-5',
            label: 'FHA Refi Pricing Info First',
          },
          {
            value: '11-6',
            label: 'VA Refi Pricing Info First',
          },
          {
            value: '11-7',
            label: 'Conv Refi Pricing Info First',
          },
          {
            value: '11-9',
            label: 'Conv Home-Imp Pricing Info First',
          },
        ],
      },
      {
        label: 'Conv Manuf Home-Pur',
        options: [
          {
            value: '12-1',
            label: 'Conv Manuf Home-Pur First',
          },
          {
            value: '12-2',
            label: 'Conv Manuf Home-Pur Pricing Info First',
          },
        ],
      },
      { value: 'R1', label: 'IRS Table' },
      {
        label: 'Loan Sale by Loan Type',
        options: [
          {
            value: 'A1',
            label: 'Loan Sale by Loan Type 1 to 4 Families',
          },
          {
            value: 'A2',
            label: 'Loan Sale by Loan Type Manufactured',
          },
          {
            value: 'A3',
            label: 'Loan Sale by Loan Type Multi-Family',
          },
          {
            value: 'A4',
            label: 'Preapproval Conv-Home-Pur First',
          },
        ],
      },
      { value: 'B', label: 'Conv Price Info by Incidence and Level' },
    ],
    nationwide: [
      {
        label: 'Loan Sale by Loan Type',
        options: [
          {
            value: 'A1W',
            label: 'Loan Sale by Loan Type 1 to 4 Families - Nationwide',
          },
          {
            value: 'A2W',
            label: 'Loan Sale by Loan Type Manufactured - Nationwide',
          },
          {
            value: 'A3W',
            label: 'Loan Sale by Loan Type Multi-Family - Nationwide',
          },
          {
            value: 'A4W',
            label: 'Preapproval Conv-Home-Pur First - Nationwide',
          },
        ],
      },
      {
        value: 'BW',
        label: 'Conv Price Info by Incidence and Level - Nationwide',
      },
      { value: 'R1', label: 'IRS Table' },
    ],
  },
}
