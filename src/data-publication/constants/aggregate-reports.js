export const AGGREGATE_REPORTS = {
  2018: [
    { value: '1', label: 'Applications by Tract' },
    { value: '2', label: 'Loans Purchased by Tract' },
    { value: '3', label: 'Applications by Race and Sex' },
    { value: '4', label: 'Applications by Ethnicity and Sex' },
    { value: '5', label: 'Applications by Income, Race, and Ethnicity' },
    { value: '9', label: 'Applications by Median Age of Homes' },
    { value: 'i', label: 'Reporting Financial Institutions' }
  ],
  2017: [
    { value: 'i', label: 'Reporting Institutions' },
    { value: '1', label: 'Applications by Tract' },
    { value: '2', label: 'Loans Purchased by Tract' },
    {
      label: 'Loans Sold',
      options: [
        {
          value: '3-1',
          label: 'Loans Sold by Tract'
        },
        {
          value: '3-2',
          label: 'Loans Sold by Purchaser Type'
        }
      ]
    },
    {
      label: 'By Race',
      options: [
        {
          value: '4-1',
          label: 'FHA, FSA/RHS and VA Purchases by Race'
        },
        {
          value: '4-2',
          label: 'Conventional Purchases by Race'
        },
        {
          value: '4-3',
          label: 'Refinancings by Race'
        },
        {
          value: '4-4',
          label: 'Home Improvements by Race'
        },
        {
          value: '4-5',
          label: 'Multi-Family Loans by Race'
        },
        {
          value: '4-6',
          label: 'Nonoccupant Loans by Race'
        },
        {
          value: '4-7',
          label: 'Manufactured Homes by Race'
        }
      ]
    },
    {
      label: 'By App Income',
      options: [
        {
          value: '5-1',
          label: 'FHA, FSA/RHS and VA by App Income'
        },
        {
          value: '5-2',
          label: 'Conv Purchases by App Income'
        },
        {
          value: '5-3',
          label: 'Refinancings by App Income'
        },
        {
          value: '5-4',
          label: 'Home Improvements by App Income'
        },
        {
          value: '5-6',
          label: 'Nonoccupant Loans by Income'
        },
        {
          value: '5-7',
          label: 'Manufactured Homes by Income'
        }
      ]
    },
    {
      label: 'By Tract Income',
      options: [
        {
          value: '7-1',
          label: 'FHA, FSA/RHS and VA by Tract Income'
        },
        {
          value: '7-2',
          label: 'Conv Purchases by Tract Income'
        },
        {
          value: '7-3',
          label: 'Refinancings by Tract Income'
        },
        {
          value: '7-4',
          label: 'Home Improvements by Tract Income'
        },
        {
          value: '7-5',
          label: 'Multi-Family Loans by Tract Income'
        },
        {
          value: '7-6',
          label: 'Nonoccupant Loans by Tract Income'
        },
        {
          value: '7-7',
          label: 'Manufactured Homes by Tract Income'
        }
      ]
    },
    {
      label: 'Denials',
      options: [
        {
          value: '8-1',
          label: 'FHA, FSA/RHS and VA Purchase Denials'
        },
        {
          value: '8-2',
          label: 'Conv Home-Purchase Denials'
        },
        {
          value: '8-3',
          label: 'Refinancing Denials'
        },
        {
          value: '8-4',
          label: 'Home Improvement Denials'
        },
        {
          value: '8-5',
          label: 'Multi-Family Denials'
        },
        {
          value: '8-6',
          label: 'Nonoccupant Loan Denials'
        },
        {
          value: '8-7',
          label: 'Manufactured Home Denials'
        }
      ]
    },
    { value: '9', label: 'Loan by Med Age of Homes' },
    {
      label: 'Pricing Info First',
      options: [
        {
          value: '11-1',
          label: 'FHA Home-Pur Pricing Info First'
        },
        {
          value: '11-2',
          label: 'VA Home-Pur Pricing Info First'
        },
        {
          value: '11-3',
          label: 'Conv Home-Pur Pricing Info First'
        },
        {
          value: '11-4',
          label: 'Conv Home-Pur Pricing Info Junior'
        },
        {
          value: '11-5',
          label: 'FHA Refi Pricing Info First'
        },
        {
          value: '11-6',
          label: 'VA Refi Pricing Info First'
        },
        {
          value: '11-7',
          label: 'Conv Refi Pricing Info First'
        },
        {
          value: '11-8',
          label: 'Conv Refi Pricing Info Junior'
        },
        {
          value: '11-9',
          label: 'Conv Home-Imp Pricing Info First'
        },
        {
          value: '11-10',
          label: 'Conv Home-Imp Pricing Info Junior'
        }
      ]
    },

    {
      label: 'Conv Manuf Home-Pur',
      options: [
        {
          value: '12-1',
          label: 'Conv Manuf Home-Pur First'
        },
        {
          value: '12-2',
          label: 'Conv Manuf Home-Pur Pricing Info First'
        }
      ]
    },
    {
      label: 'Loan Sale by Loan Type',
      options: [
        {
          value: 'A1',
          label: 'Loan Sale by Loan Type 1 to 4 Families'
        },
        {
          value: 'A2',
          label: 'Loan Sale by Loan Type Manufactured'
        },
        {
          value: 'A3',
          label: 'Loan Sale by Loan Type Multi-Family'
        },
        {
          value: 'A4',
          label: 'Preapproval Conv Home-Pur First'
        }
      ]
    },

    { value: 'B', label: 'Conv Price Info by Incidence and Level' }
  ]
}
