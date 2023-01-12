# Public HMDA - Data Fields with Values and Definitions

### [activity\_year](#activity_year)

- **Description:** The calendar year the data submission covers
- **Values:**
  - 2017

### [respondent\_id](#respondent_id)

- **Description:** One component of the primary key identifier for HMDA reporters in 2017 and prior. Respondent ID must be concatenated with Agency Code to guarantee uniqueness in the HMDA data. See Table 1 in the 2017 FIG for derivation instructions.
- **Values:**
  - Varying values

### [agency\_code](#agency_code)

- **Description:** A financial institution's associated Agency Code
- **Values:**

  |Value|Abbreviation|Name|
  |--|--|--|
  |**1**|_OCC_|Office of the Comptroller of the Currency|
  |**2**|_FRB_|Federal Reserve System|
  |**3**|_FDIC_|Federal Deposit Insurance Corporation|
  |**5**|_NCUA_|National Credit Union Administration|
  |**7**|_HUD_|Department of Housing and Urban Development|
  |**9**|_CFPB_|Consumer Financial Protection Bureau|

### [loan\_type](#loan_type)

- **Description:** The type of covered loan or application
- **Values:**
  - 1 - Conventional (not insured or guaranteed by FHA, VA, RHS, or FSA)
  - 2 - Federal Housing Administration insured (FHA)
  - 3 - Veterans Affairs guaranteed (VA)
  - 4 - USDA Rural Housing Service or Farm Service Agency guaranteed (RHS or FSA)

### [property\_type](#property_type)

- **Description:** Classification of dwelling
- **Values:** 
 - 1 - Single family with 1-4 units
 - 2 - Manufactured housing
 - 3 - Multifamily housing

### [loan\_purpose](#loan_purpose)

- **Description:** The purpose of covered loan or application
- **Values:**
  - 1 - Home purchase
  - 2 - Home improvement
  - 3 - Refinancing

### [occupancy_type](#occupancy_type)

- **Description:** Occupancy type for the dwelling
- **Values:**
  - 1 - Owner-occupied as a principal dwelling
  - 2 - Not owner-occupied
  - 3 - Not applicable

### [loan\_amount](#loan_amount)

- **Description:** The amount of the covered loan, or the amount applied for, rounded to the nearest thousand dollars.
- **Values:**
  - Varying values  

### [preapproval](#preapproval)

- **Description:** Whether the covered loan or application involved a request for a preapproval of a home purchase loan under a preapproval program 
- **Values:**
  - 1 - Preapproval was requested
  - 2 - Preapproval was not requested
  - 3 - Not applicable

### [action\_taken](#action_taken)

- **Description:** The action taken on the covered loan or application
- **Values:**
  - 1 - Loan originated
  - 2 - Application approved but not accepted
  - 3 - Application denied by financial institution 
  - 4 - Application withdrawn by applicant
  - 5 - File closed for incompleteness
  - 6 - Loan purchased by your institution
  - 7 - Preapproval request denied by financial institution
  - 8 - Preapproval request approved but not accepted (optional reporting)

### [msa_md](#msa_md)

- **Description:** The 5 digit MSA (metropolitan statistical area) or MD (metropolitan division) code. An MSA/MD is an area that has at least one urbanized area of 50,000 or more population. Note, that in 2017 MSA/MD values were reported by HMDA filers and not derived by the CFPB.
- **Values:**
  - Varying values

### [state\_code](#state_code)

- **Description:** Two-letter state code
- **Values:**
  - Varying values

### [county\_code](#county_code)

- **Description:** Three digit county FIPS code
- **Values:**
  - Varying values

### [census\_tract](#census_tract)

- **Description:** Five digit Census Tract number with decimal. Example: 109.02
- **Values:**
  - Varying values

### [applicant\_ethnicity\_1](#applicant_ethnicity_1)

- **Description:** Ethnicity of the applicant or borrower
- **Values:**
  - 1 - Hispanic or Latino
  - 2 - Not Hispanic or Latino
  - 3 - Information not provided by applicant in mail, internet, or telephone application
  - 4 - Not applicable

### [co\_applicant\_ethnicity\_1](#co_applicant_ethnicity_1)

- **Description:** Ethnicity of the first co-applicant or co-borrower
- **Values:**
  - 1 - Hispanic or Latino
  - 2 - Not Hispanic or Latino
  - 3 - Information not provided by applicant in mail, internet, or telephone application
  - 4 - Not applicable
  - 5 - No co-applicant

### [applicant\_race\_1](#applicant_race_1)

- **Description:** Race of the applicant or borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian
  - 3 - Black or African American
  - 4 - Native Hawaiian or Other Pacific Islander
  - 5 - White

### [applicant\_race\_2](#applicant_race_2)

- **Description:** Race of the applicant or borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian
  - 3 - Black or African American
  - 4 - Native Hawaiian or Other Pacific Islander
  - 5 - White

### [applicant\_race\_3](#applicant_race_3)

- **Description:** Race of the applicant or borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian
  - 3 - Black or African American
  - 4 - Native Hawaiian or Other Pacific Islander
  - 5 - White

### [applicant\_race\_4](#applicant_race_4)

- **Description:** Race of the applicant or borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian
  - 3 - Black or African American
  - 4 - Native Hawaiian or Other Pacific Islander
  - 5 - White

### [applicant\_race\_5](#applicant_race_5)

- **Description:** Race of the applicant or borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian
  - 3 - Black or African American
  - 4 - Native Hawaiian or Other Pacific Islander
  - 5 - White

### [co\_applicant\_race\_1](#co_applicant_race_1)

- **Description:** Race of the first co-applicant or co-borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian or Pacific Islander
  - 3 - Black or African American
  - 4 - Hispanic
  - 5 - White

### [co\_applicant\_race\_2](#co_applicant_race_2)

- **Description:** Race of the first co-applicant or co-borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian or Pacific Islander
  - 3 - Black or African American
  - 4 - Hispanic
  - 5 - White

### [co\_applicant\_race\_3](#co_applicant_race_3)

- **Description:** Race of the first co-applicant or co-borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian or Pacific Islander
  - 3 - Black or African American
  - 4 - Hispanic
  - 5 - White

### [co\_applicant\_race\_4](#co_applicant_race_4)

- **Description:** Race of the first co-applicant or co-borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian or Pacific Islander
  - 3 - Black or African American
  - 4 - Hispanic
  - 5 - White

### [co\_applicant\_race\_5](#co_applicant_race_5)

- **Description:** Race of the first co-applicant or co-borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian or Pacific Islander
  - 3 - Black or African American
  - 4 - Hispanic
  - 5 - White

### [applicant\_sex](#applicant_sex)

- **Description:** Sex of the applicant or borrower
- **Values:**
  - 1 - Male
  - 2 - Female
  - 3 - Information not provided by applicant in mail, internet, or telephone application (see App. A, I.D.2.)
  - 4 - Not applicable

### [co\_applicant\_sex](#co_applicant_sex)

- **Description:** Sex of the first co-applicant or co-borrower
- **Values:**
  - 1 - Male
  - 2 - Female
  - 3 - Information not provided by applicant in mail, internet, or telephone application (see App. A, I.D.2.)
  - 4 - Not applicable
  - 5 - No co-applicant

### [income](#income)

- **Description:** The gross annual income, in thousands of dollars, relied on in making the credit decision, or if a credit decision was not made, the gross annual income relied on in processing the application
- **Values:**
  - Varying values

### [purchaser\_type](#purchaser_type)

- **Description:** Type of entity purchasing a covered loan from the institution
- **Values:**
  - 0 - Loan was not originated or was not sold in calendar year covered by register
  - 1 - FNMA (Federal National Mortgage Association)
  - 2 - GNMA (Government National Mortgage Association)
  - 3 - FHLMC (Federal Home Loan Mortgage Corporation)
  - 4 – FAMC (Federal Agricultural Mortgage Corporation)
  - 5 - Commercial bank
  - 6 - Savings bank or savings association
  - 7 - Life insurance company
  - 8 - Affiliate institution
  - 9 - Other type of purchaser 

### [denial\_reason\_1](#denial_reason_1)

- **Description:** The principal reason, or reasons, for denial
- **Values:**
  - 1 - Debt-to-income ratio
  - 2 - Employment history
  - 3 - Credit history
  - 4 - Collateral
  - 5 - Insufficient cash (downpayment, closing costs)
  - 6 - Unverifiable information
  - 7 - Credit application incomplete
  - 8 - Mortgage insurance denied
  - 9 - Other

### [denial\_reason\_2](#denial_reason_2)

- **Description:** The principal reason, or reasons, for denial
- **Values:**
  - 1 - Debt-to-income ratio
  - 2 - Employment history
  - 3 - Credit history
  - 4 - Collateral
  - 5 - Insufficient cash (downpayment, closing costs)
  - 6 - Unverifiable information
  - 7 - Credit application incomplete
  - 8 - Mortgage insurance denied
  - 9 - Other

### [denial\_reason\_3](#denial_reason_3)

- **Description:** The principal reason, or reasons, for denial
- **Values:**
  - 1 - Debt-to-income ratio
  - 2 - Employment history
  - 3 - Credit history
  - 4 - Collateral
  - 5 - Insufficient cash (downpayment, closing costs)
  - 6 - Unverifiable information
  - 7 - Credit application incomplete
  - 8 - Mortgage insurance denied
  - 9 - Other

### [rate\_spread](#rate_spread)

- **Description:** The difference between the covered loan’s annual percentage rate (APR) and the average prime offer rate (APOR) for a comparable transaction as of the date the interest rate is set
- **Values:**
  - Varying values

### [hoepa\_status](#hoepa_status)

- **Description:** Whether the covered loan is a high-cost mortgage
- **Values:**
  - 1 - HOEPA loan
  - 2 - Not a HOEPA loan

### [lien\_status](#lien_status)

- **Description:** Lien status of the property securing the covered loan, or in the case of an application, proposed to secure the covered loan 
- **Values:**
  - 1 - Secured by a first lien
  - 2 - Secured by a subordinate lien
  - 3 - Not secured by a lien
  - 3 - Not applicable (purchased loans)

### [tract\_population](#tract_population)

- **Description:** Total population in tract
- **Values:**
  - Varying values

### [tract\_minority\_population\_percent](#tract_minority_population_percent)

- **Description:** Percentage of minority population to total population for tract, rounded to two decimal places
- **Values:**
  - Varying values

### [ffiec\_msa\_md\_median\_family\_income](#ffiec_msa_md_median_family_income)

- **Description:** FFIEC Median family income in dollars for the MSA/MD in which the tract is located (adjusted annually by FFIEC)
- **Values:**
  - Varying values

### [tract\_to\_msa\_income\_percentage](#tract_to_msa_income_percentage)

- **Description:** Percentage of tract median family income compared to MSA/MD median family income
- **Values:**
  - Varying values

### [tract\_owner\_occupied\_units](#tract_owner_occupied_units)

- **Description:** Number of dwellings, including individual condominiums, that are lived in by the owner
- **Values:**
  - Varying values

### [tract\_one\_to\_four\_family\_housing\_units](#tract_one_to_four_family_housing_units)

- **Description:** Dwellings that are built to houses with fewer than 5 families
- **Values:**
  - Varying values