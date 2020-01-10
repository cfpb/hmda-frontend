## Public HMDA data fields with values and definitions

### [activity\_year](#activity_year)

- **Description:** The calendar year the data submission covers
- **Values:**
  - 2018

### [lei](#lei)

- **Description:** A financial institution’s Legal Entity Identifier
- **Values:**
  - Varying values

### [derived\_msa-md](#derived_msa-md)

- **Description:** Derived MSA/MD from the property location reported for the record
- **Values:**
  - Varying values

### [state\_code](#state_code)

- **Description:** Two-letter state code
- **Values:**
  - Varying values

### [county\_code](#county_code)

- **Description:** State-county FIPS code
- **Values:**
  - Varying values

### [census\_tract](#census_tract)

- **Description:** 11 digit census tract number
- **Values:**
  - Varying values

### [derived\_loan\_product\_type](#derived_loan_product_type)

- **Description:** Derived loan product type from Loan Type and Lien Status fields for easier querying of specific records
- **Values:**
  - Conventional:First Lien
  - FHA:First Lien
  - VA:First Lien
  - FSA/RHS:First Lien
  - Conventional:Subordinate Lien
  - FHA:Subordinate Lien
  - VA:Subordinate Lien
  - FSA/RHS:Subordinate Lien

### [derived\_dwelling\_category](#derived_dwelling_category)

- **Description:** Derived dwelling type from Construction Method and Total Units fields for easier querying of specific records
- **Values:**
  - Single Family (1-4 Units):Site-Built
  - Multifamily:Site-Built (5+ Units)
  - Single Family (1-4 Units):Manufactured
  - Multifamily:Manufactured (5+ Units)

### [conforming\_loan\_limit](#conforming_loan_limit)

- **Description:** Indicates whether the reported loan amount exceeds the GSE (government sponsored enterprise) conforming loan limit
- **Values:**
  - C (Conforming)
  - NC (Nonconforming)
  - U (Undetermined)
  - NA (Not Applicable)

### [derived\_ethnicity](#derived_ethnicity)

- **Description:** Single aggregated ethnicity categorization  derived from applicant/borrower and co-applicant/co-borrower ethnicity fields
- **Values:**
  - Hispanic or Latino
  - Not Hispanic or Latino
  - Joint
  - Ethnicity Not Available
  - Free Form Text Only

### [derived\_race](#derived_race)

- **Description:** Single aggregated race categorization derived from applicant/borrower and co-applicant/co-borrower race fields
- **Values:**
  - American Indian or Alaska Native
  - Asian
  - Black or African American
  - Native Hawaiian or Other Pacific Islander
  - White
  - 2 or more minority races
  - Joint
  - Free Form Text Only
  - Race Not Available

### [derived\_sex](#derived_sex)

- **Description:** Single aggregated sex categorization derived from applicant/borrower and co-applicant/co-borrower sex fields
- **Values:**
  - Male
  - Female
  - Joint
  - Sex Not Available

### [action\_taken](#action_taken)

- **Description:** The action taken on the covered loan or application
- **Values:**
  - 1 - Loan originated
  - 2 - Application approved but not accepted
  - 3 - Application denied
  - 4 - Application withdrawn by applicant
  - 5 - File closed for incompleteness
  - 6 - Purchased loan
  - 7 - Preapproval request denied
  - 8 - Preapproval request approved but not accepted

### [purchaser\_type](#purchaser_type)

- **Description:** Type of entity purchasing a covered loan from the institution
- **Values:**
  - 0 - Not applicable
  - 1 - Fannie Mae
  - 2 - Ginnie Mae
  - 3 - Freddie Mac
  - 4 - Farmer Mac
  - 5 - Private securitizer
  - 6 - Commercial bank, savings bank, or savings association
  - 71 - Credit union, mortgage company, or finance company
  - 72 - Life insurance company
  - 8 - Affiliate institution
  - 9 - Other type of purchaser

### [preapproval](#preapproval)

- **Description:** Whether the covered loan or application involved a request for a preapproval of a home purchase loan under a preapproval program 
- **Values:**
  - 1 - Preapproval requested
  - 2 - Preapproval not requested

### [loan\_type](#loan_type)

- **Description:** The type of covered loan or application
- **Values:**
  - 1 - Conventional (not insured or guaranteed by FHA, VA, RHS, or FSA)
  - 2 - Federal Housing Administration insured (FHA)
  - 3 - Veterans Affairs guaranteed (VA)
  - 4 - USDA Rural Housing Service or Farm Service Agency guaranteed (RHS or FSA)

### [loan\_purpose](#loan_purpose)

- **Description:** The purpose of covered loan or application
- **Values:**
  - 1 - Home purchase
  - 2 - Home improvement
  - 31 - Refinancing
  - 32 - Cash-out refinancing
  - 4 - Other purpose
  - 5 - Not applicable

### [lien\_status](#lien_status)

- **Description:** Lien status of the property securing the covered loan, or in the case of an application, proposed to secure the covered loan 
- **Values:**
  - 1 - Secured by a first lien
  - 2 - Secured by a subordinate lien

### [reverse\_mortgage](#reverse_mortgage)

- **Description:** Whether the covered loan or application is for a reverse mortgage
- **Values:**
  - 1 - Reverse mortgage
  - 2 - Not a reverse mortgage
  - 1111 - Exempt

### [open-end\_line\_of\_credit](#open-end_line_of_credit)

- **Description:** Whether the covered loan or application is for an open-end line of credit
- **Values:**
  - 1 - Open-end line of credit
  - 2 - Not an open-end line of credit
  - 1111 - Exempt

### [business\_or\_commercial\_purpose](#business_or_commercial_purpose)

- **Description:** Whether the covered loan or application is primarily for a business or commercial purpose
- **Values:**
  - 1 - Primarily for a business or commercial purpose
  - 2 - Not primarily for a business or commercial purpose
  - 1111 - Exempt

### [loan\_amount](#loan_amount)

- **Description:** The amount of the covered loan, or the amount applied for
- **Values:**
  - Varying values

### [loan\_to\_value\_ratio](#loan_to_value_ratio)

- **Description:** The ratio of the total amount of debt secured by the property to the value of the property relied on in making the credit decision
- **Values:**
  - Varying values

### [interest\_rate](#interest_rate)

- **Description:** The interest rate for the covered loan or application
- **Values:**
  - Varying values

### [rate\_spread](#rate_spread)

- **Description:** The difference between the covered loan’s annual percentage rate (APR) and the average prime offer rate (APOR) for a comparable transaction as of the date the interest rate is set
- **Values:**
  - Varying values

### [hoepa\_status](#hoepa_status)

- **Description:** Whether the covered loan is a high-cost mortgage
- **Values:**
  - 1 - High-cost mortgage
  - 2 - Not a high-cost mortgage
  - 3 - Not applicable

### [total\_loan\_costs](#total_loan_costs)

- **Description:** The amount, in dollars, of total loan costs
- **Values:**
  - Varying values

### [total\_points\_and\_fees](#total_points_and_fees)

- **Description:** The total points and fees, in dollars, charged in connection with the covered loan
- **Values:**
  - Varying values

### [origination\_charges](#origination_charges)

- **Description:** The total of all itemized amounts, in dollars, that are designated borrower-paid at or before closing
- **Values:**
  - Varying values

### [discount\_points](#discount_points)

- **Description:** The points paid, in dollars, to the creditor to reduce the interest rate
- **Values:**
  - Varying values

### [lender\_credits](#lender_credits)

- **Description:** The amount, in dollars, of lender credits 
- **Values:**
  - Varying values

### [loan\_term](#loan_term)

- **Description:** The number of months after which the legal obligation will mature or terminate, or would have matured or terminated
- **Values:**
  - Varying values

### [prepayment\_penalty\_term](#prepayment_penalty_term)

- **Description:** The term, in months, of any prepayment penalty
- **Values:**
  - Varying values

### [intro\_rate\_period](#intro_rate_period)

- **Description:** The number of months, or proposed number of months in the case of an application, until the first date the interest rate may change after closing or account opening
- **Values:**
  - Varying values

### [negative\_amortization](#negative_amortization)

- **Description:** Whether the contractual terms include, or would have included, a term that would cause the covered loan to be a negative amortization loan
- **Values:**
  - 1 - Negative amortization
  - 2 - No negative amortization
  - 1111 - Exempt

### [interest\_only\_payment](#interest_only_payment)

- **Description:** Whether the contractual terms include, or would have included, interest-only payments
- **Values:**
  - 1 - Interest-only payments
  - 2 - No interest-only payments
  - 1111 - Exempt

### [balloon\_payment](#balloon_payment)

- **Description:** Whether the contractual terms include, or would have included, a balloon payment
- **Values:**
  - 1 - Balloon payment
  - 2 - No balloon payment
  - 1111 - Exempt

### [other\_nonamortizing\_features](#other_nonamortizing_features)

- **Description:** Whether the contractual terms include, or would have included, any term, other than those described in [Paragraphs 1003.4(a)(27)(i), (ii), and (iii)](https://www.consumerfinance.gov/policy-compliance/rulemaking/regulations/1003/4/#a-27) that would allow for payments other than fully amortizing payments during the loan term
- **Values:**
  - 1 - Other non-fully amortizing features
  - 2 - No other non-fully amortizing features
  - 1111 - Exempt

### [property\_value](#property_value)

- **Description:** The value of the property securing the covered loan or, in the case of an application, proposed to secure the covered loan, relied on in making the credit decision
- **Values:**
  - Varying values; Rounded to the midpoint of the nearest $10,000 interval for which the reported value falls

### [construction\_method](#construction_method)

- **Description:** Construction method for the dwelling
- **Values:**
  - 1 - Site-built
  - 2 - Manufactured home

### [occupancy\_type](#occupancy_type)

- **Description:** Occupancy type for the dwelling
- **Values:**
  - 1 - Principal residence
  - 2 - Second residence
  - 3 - Investment property

### [manufactured\_home\_secured\_property\_type](#manufactured_home_secured_property_type)

- **Description:** Whether the covered loan or application is, or would have been, secured by a manufactured home and land, or by a manufactured home and not land
- **Values:**
  - 1 - Manufactured home and land
  - 2 - Manufactured home and not land
  - 3 - Not applicable
  - 1111 - Exempt

### [manufactured\_home\_land\_property\_interest](#manufactured_home_land_property_interest)

- **Description:** The applicant’s or borrower’s land property interest in the land on which a manufactured home is, or will be, located
- **Values:**
  - 1 - Direct ownership
  - 2 - Indirect ownership
  - 3 - Paid leasehold
  - 4 - Unpaid leasehold
  - 5 - Not applicable
  - 1111 - Exempt

### [total\_units](#total_units)

- **Description:** The number of individual dwelling units related to the property securing the covered loan or, in the case of an application, proposed to secure the covered loan
- **Values:**
  - 1
  - 2
  - 3
  - 4
  - 5-24
  - 25-49
  - 50-99
  - 100-149
  - >149

### [multifamily\_affordable\_units](#multifamily_affordable_units)

- **Description:** Reported values as a percentage, rounded to the nearest whole number, of the value reported for Total Units
- **Values:**
  - Varying values

### [income](#income)

- **Description:** The gross annual income, in thousands of dollars, relied on in making the credit decision, or if a credit decision was not made, the gross annual income relied on in processing the application
- **Values:**
  - Varying values

### [debt\_to\_income\_ratio](#debt_to_income_ratio)

- **Description:** The ratio, as a percentage, of the applicant’s or borrower’s total monthly debt to the total monthly income relied on in making the credit decision
- **Varying values; Ratios binned are:**
  - <20%
  - 20%-<30%
  - 30%-<36%,37%
  - 38%
  - 39%
  - 40%
  - 41%
  - 42%
  - 43%
  - 44%
  - 45%
  - 46%
  - 47%
  - 48%
  - 49%
  - 50%-60%
  - >60%
  - NA
  - Exempt

### [applicant\_credit\_score\_type](#applicant_credit_score_type)

- **Description:** The name and version of the credit scoring model used to generate the credit score, or scores, relied on in making the credit decision
- **Values:**
  - 1 - Equifax Beacon 5.0
  - 2 - Experian Fair Isaac
  - 3 - FICO Risk Score Classic 04
  - 4 - FICO Risk Score Classic 98
  - 5 - VantageScore 2.0
  - 6 - VantageScore 3.0
  - 7 - More than one credit scoring model
  - 8 - Other credit scoring model
  - 9 - Not applicable
  - 1111 - Exempt

### [co-applicant\_credit\_score\_type](#co-applicant_credit_score_type)

- **Description:** The name and version of the credit scoring model used to generate the credit score, or scores, relied on in making the credit decision
- **Values:**
  - 1 - Equifax Beacon 5.0
  - 2 - Experian Fair Isaac
  - 3 - FICO Risk Score Classic 04
  - 4 - FICO Risk Score Classic 98
  - 5 - VantageScore 2.0
  - 6 - VantageScore 3.0
  - 7 - More than one credit scoring model
  - 8 - Other credit scoring model
  - 9 - Not applicable
  - 10 - No co-applicant
  - 1111 - Exempt

### [applicant\_ethnicity-1](#applicant_ethnicity-1)

- **Description:** Ethnicity of the applicant or borrower
- **Values:**
  - 1 - Hispanic or Latino
  - 11 - Mexican
  - 12 - Puerto Rican
  - 13 - Cuban
  - 14 - Other Hispanic or Latino
  - 2 - Not Hispanic or Latino
  - 3 - Information not provided by applicant in mail, internet, or telephone application
  - 4 - Not applicable

### [applicant\_ethnicity-2](#applicant_ethnicity-2)

- **Description:** Ethnicity of the applicant or borrower
- **Values:**
  - 1 - Hispanic or Latino
  - 11 - Mexican
  - 12 - Puerto Rican
  - 13 - Cuban
  - 14 - Other Hispanic or Latino
  - 2 - Not Hispanic or Latino

### [applicant\_ethnicity-3](#applicant_ethnicity-3)

- **Description:** Ethnicity of the applicant or borrower
- **Values:**
  - 1 - Hispanic or Latino
  - 11 - Mexican
  - 12 - Puerto Rican
  - 13 - Cuban
  - 14 - Other Hispanic or Latino
  - 2 - Not Hispanic or Latino

### [applicant\_ethnicity-4](#applicant_ethnicity-4)

- **Description:** Ethnicity of the applicant or borrower
- **Values:**
  - 1 - Hispanic or Latino
  - 11 - Mexican
  - 12 - Puerto Rican
  - 13 - Cuban
  - 14 - Other Hispanic or Latino
  - 2 - Not Hispanic or Latino

### [applicant\_ethnicity-5](#applicant_ethnicity-5)

- **Description:** Ethnicity of the applicant or borrower
- **Values:**
  - 1 - Hispanic or Latino
  - 11 - Mexican
  - 12 - Puerto Rican
  - 13 - Cuban
  - 14 - Other Hispanic or Latino
  - 2 - Not Hispanic or Latino

### [co-applicant\_ethnicity-1](#co-applicant_ethnicity-1)

- **Description:** Ethnicity of the first co-applicant or co-borrower
- **Values:**
  - 1 - Hispanic or Latino
  - 11 - Mexican
  - 12 - Puerto Rican
  - 13 - Cuban
  - 14 - Other Hispanic or Latino
  - 2 - Not Hispanic or Latino
  - 3 - Information not provided by applicant in mail, internet, or telephone application
  - 4 - Not applicable
  - 5 - No co-applicant

### [co-applicant\_ethnicity-2](#co-applicant_ethnicity-2)

- **Description:** Ethnicity of the first co-applicant or co-borrower
- **Values:**
  - 1 - Hispanic or Latino
  - 11 - Mexican
  - 12 - Puerto Rican
  - 13 - Cuban
  - 14 - Other Hispanic or Latino
  - 2 - Not Hispanic or Latino

### [co-applicant\_ethnicity-3](#co-applicant_ethnicity-3)

- **Description:** Ethnicity of the first co-applicant or co-borrower
- **Values:**
  - 1 - Hispanic or Latino
  - 11 - Mexican
  - 12 - Puerto Rican
  - 13 - Cuban
  - 14 - Other Hispanic or Latino
  - 2 - Not Hispanic or Latino

### [co-applicant\_ethnicity-4](#co-applicant_ethnicity-4)

- **Description:** Ethnicity of the first co-applicant or co-borrower
- **Values:**
  - 1 - Hispanic or Latino
  - 11 - Mexican
  - 12 - Puerto Rican
  - 13 - Cuban
  - 14 - Other Hispanic or Latino
  - 2 - Not Hispanic or Latino

### [co-applicant\_ethnicity-5](#co-applicant_ethnicity-5)

- **Description:** Ethnicity of the first co-applicant or co-borrower
- **Values:**
  - 1 - Hispanic or Latino
  - 11 - Mexican
  - 12 - Puerto Rican
  - 13 - Cuban
  - 14 - Other Hispanic or Latino
  - 2 - Not Hispanic or Latino

### [applicant\_ethnicity\_observed](#applicant_ethnicity_observed)

- **Description:** Whether the ethnicity of the applicant or borrower was collected on the basis of visual observation or surname
- **Values:**
  - 1 - Collected on the basis of visual observation or surname
  - 2 - Not collected on the basis of visual observation or surname
  - 3 - Not applicable

### [co-applicant\_ethnicity\_observed](#co-applicant_ethnicity_observed)

- **Description:** Whether the ethnicity of the first co-applicant or co-borrower was collected on the basis of visual observation or surname
- **Values:**
  - 1 - Collected on the basis of visual observation or surname
  - 2 - Not collected on the basis of visual observation or surname
  - 3 - Not applicable
  - 4 - No co-applicant

### [applicant\_race-1](#applicant_race-1)

- **Description:** Race of the applicant or borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian
  - 21 - Asian Indian
  - 22 - Chinese
  - 23 - Filipino
  - 24 - Japanese
  - 25 - Korean
  - 26 - Vietnamese
  - 27 - Other Asian
  - 3 - Black or African American
  - 4 - Native Hawaiian or Other Pacific Islander
  - 41 - Native Hawaiian
  - 42 - Guamanian or Chamorro
  - 43 - Samoan
  - 44 - Other Pacific Islander
  - 5 - White
  - 6 - Information not provided by applicant in mail, internet, or telephone application
  - 7 - Not applicable

### [applicant\_race-2](#applicant_race-2)

- **Description:** Race of the applicant or borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian
  - 21 - Asian Indian
  - 22 - Chinese
  - 23 - Filipino
  - 24 - Japanese
  - 25 - Korean
  - 26 - Vietnamese
  - 27 - Other Asian
  - 3 - Black or African American
  - 4 - Native Hawaiian or Other Pacific Islander
  - 41 - Native Hawaiian
  - 42 - Guamanian or Chamorro
  - 43 - Samoan
  - 44 - Other Pacific Islander
  - 5 - White

### [applicant\_race-3](#applicant_race-3)

- **Description:** Race of the applicant or borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian
  - 21 - Asian Indian
  - 22 - Chinese
  - 23 - Filipino
  - 24 - Japanese
  - 25 - Korean
  - 26 - Vietnamese
  - 27 - Other Asian
  - 3 - Black or African American
  - 4 - Native Hawaiian or Other Pacific Islander
  - 41 - Native Hawaiian
  - 42 - Guamanian or Chamorro
  - 43 - Samoan
  - 44 - Other Pacific Islander
  - 5 - White

### [applicant\_race-4](#applicant_race-4)

- **Description:** Race of the applicant or borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian
  - 21 - Asian Indian
  - 22 - Chinese
  - 23 - Filipino
  - 24 - Japanese
  - 25 - Korean
  - 26 - Vietnamese
  - 27 - Other Asian
  - 3 - Black or African American
  - 4 - Native Hawaiian or Other Pacific Islander
  - 41 - Native Hawaiian
  - 42 - Guamanian or Chamorro
  - 43 - Samoan
  - 44 - Other Pacific Islander
  - 5 - White

### [applicant\_race-5](#applicant_race-5)

- **Description:** Race of the applicant or borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian
  - 21 - Asian Indian
  - 22 - Chinese
  - 23 - Filipino
  - 24 - Japanese
  - 25 - Korean
  - 26 - Vietnamese
  - 27 - Other Asian
  - 3 - Black or African American
  - 4 - Native Hawaiian or Other Pacific Islander
  - 41 - Native Hawaiian
  - 42 - Guamanian or Chamorro
  - 43 - Samoan
  - 44 - Other Pacific Islander
  - 5 - White

### [co-applicant\_race-1](#co-applicant_race-1)

- **Description:** Race of the first co-applicant or co-borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian
  - 21 - Asian Indian
  - 22 - Chinese
  - 23 - Filipino
  - 24 - Japanese
  - 25 - Korean
  - 26 - Vietnamese
  - 27 - Other Asian
  - 3 - Black or African American
  - 4 - Native Hawaiian or Other Pacific Islander
  - 41 - Native Hawaiian
  - 42 - Guamanian or Chamorro
  - 43 - Samoan
  - 44 - Other Pacific Islander
  - 5 - White
  - 6 - Information not provided by applicant in mail, internet, or telephone application
  - 7 - Not applicable
  - 8 - No co-applicant

### [co-applicant\_race-2](#co-applicant_race-2)

- **Description:** Race of the first co-applicant or co-borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian
  - 21 - Asian Indian
  - 22 - Chinese
  - 23 - Filipino
  - 24 - Japanese
  - 25 - Korean
  - 26 - Vietnamese
  - 27 - Other Asian
  - 3 - Black or African American
  - 4 - Native Hawaiian or Other Pacific Islander
  - 41 - Native Hawaiian
  - 42 - Guamanian or Chamorro
  - 43 - Samoan
  - 44 - Other Pacific Islander
  - 5 - White

### [co-applicant\_race-3](#co-applicant_race-3)

- **Description:** Race of the first co-applicant or co-borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian
  - 21 - Asian Indian
  - 22 - Chinese
  - 23 - Filipino
  - 24 - Japanese
  - 25 - Korean
  - 26 - Vietnamese
  - 27 - Other Asian
  - 3 - Black or African American
  - 4 - Native Hawaiian or Other Pacific Islander
  - 41 - Native Hawaiian
  - 42 - Guamanian or Chamorro
  - 43 - Samoan
  - 44 - Other Pacific Islander
  - 5 - White

### [co-applicant\_race-4](#co-applicant_race-4)

- **Description:** Race of the first co-applicant or co-borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian
  - 21 - Asian Indian
  - 22 - Chinese
  - 23 - Filipino
  - 24 - Japanese
  - 25 - Korean
  - 26 - Vietnamese
  - 27 - Other Asian
  - 3 - Black or African American
  - 4 - Native Hawaiian or Other Pacific Islander
  - 41 - Native Hawaiian
  - 42 - Guamanian or Chamorro
  - 43 - Samoan
  - 44 - Other Pacific Islander
  - 5 - White

### [co-applicant\_race-5](#co-applicant_race-5)

- **Description:** Race of the first co-applicant or co-borrower
- **Values:**
  - 1 - American Indian or Alaska Native
  - 2 - Asian
  - 21 - Asian Indian
  - 22 - Chinese
  - 23 - Filipino
  - 24 - Japanese
  - 25 - Korean
  - 26 - Vietnamese
  - 27 - Other Asian
  - 3 - Black or African American
  - 4 - Native Hawaiian or Other Pacific Islander
  - 41 - Native Hawaiian
  - 42 - Guamanian or Chamorro
  - 43 - Samoan
  - 44 - Other Pacific Islander
  - 5 - White

### [applicant\_race\_observed](#applicant_race_observed)

- **Description:** Whether the race of the applicant or borrower was collected on the basis of visual observation or surname
- **Values:**
  - 1 - Collected on the basis of visual observation or surname
  - 2 - Not collected on the basis of visual observation or surname
  - 3 - Not applicable

### [co-applicant\_race\_observed](#co-applicant_race_observed)

- **Description:** Whether the race of the first co-applicant or co-borrower was collected on the basis of visual observation or surname
- **Values:**
  - 1 - Collected on the basis of visual observation or surname
  - 2 - Not collected on the basis of visual observation or surname
  - 3 - Not applicable
  - 4 - No co-applicant

### [applicant\_sex](#applicant_sex)

- **Description:** Sex of the applicant or borrower
- **Values:**
  - 1 - Male
  - 2 - Female
  - 3 - Information not provided by applicant in mail, internet, or telephone application
  - 4 - Not applicable
  - 6 - Applicant selected both male and female

### [co-applicant\_sex](#co-applicant_sex)

- **Description:** Sex of the first co-applicant or co-borrower
- **Values:**
  - 1 - Male
  - 2 - Female
  - 3 - Information not provided by applicant in mail, internet, or telephone application
  - 4 - Not applicable
  - 5 - No co-applicant
  - 6 - Co-applicant selected both male and female

### [applicant\_sex\_observed](#applicant_sex_observed)

- **Description:** Whether the sex of the applicant or borrower was collected on the basis of visual observation or surname
- **Values:**
  - 1 - Collected on the basis of visual observation or surname
  - 2 - Not collected on the basis of visual observation or surname
  - 3 - Not applicable

### [co-applicant\_sex\_observed](#co-applicant_sex_observed)

- **Description:** Whether the sex of the first co-applicant or co-borrower was collected on the basis of visual observation or surname
- **Values:**
  - 1 - Collected on the basis of visual observation or surname
  - 2 - Not collected on the basis of visual observation or surname
  - 3 - Not applicable
  - 4 - No co-applicant

### [applicant\_age](#applicant_age)

- **Description:** The age, in years, of the applicant or borrower
- **Varying values; Ages binned are:**
  - 25-34
  - 35-44
  - 45-54
  - 55-64
  - 65-74

### [co-applicant\_age](#co-applicant_age)

- **Description:** The age, in years, of the first co-applicant or co-borrower
- **Varying values; Ages binned are:**
  - 25-34
  - 35-44
  - 45-54
  - 55-64
  - 65-74

### [applicant\_age\_above\_62](#applicant_age_above_62)

- **Description:** Whether the applicant or borrower age is above 62
- **Values:**
  - Yes
  - No
  - NA

### [co-applicant\_age\_above\_62](#co-applicant_age_above_62)

- **Description:** Whether the first co-applicant or co-borrower age is above 62
- **Values:**
  - Yes
  - No
  - NA

### [submission\_of\_application](#submission_of_application)

- **Description:** Whether the applicant or borrower submitted the application directly to the financial institution
- **Values:**
  - 1 - Submitted directly to your institution
  - 2 - Not submitted directly to your institution
  - 3 - Not applicable
  - 1111 - Exempt

### [initially\_payable\_to\_institution](#initially_payable_to_institution)

- **Description:** Whether the obligation arising from the covered loan was, or, in the case of an application, would have been, initially payable to the financial institution
- **Values:**
  - 1 - Initially payable to your institution
  - 2 - Not initially payable to your institution
  - 3 - Not applicable
  - 1111 - Exempt

### [aus-1](#aus-1)

- **Description:** The automated underwriting system(s) (AUS) used by the financial institution to evaluate the application
- **Values:**
  - 1 - Desktop Underwriter (DU)
  - 2 - Loan Prospector (LP) or Loan Product Advisor
  - 3 - Technology Open to Approved Lenders (TOTAL) Scorecard
  - 4 - Guaranteed Underwriting System (GUS)
  - 5 - Other
  - 6 - Not applicable
  - 1111 - Exempt

### [aus-2](#aus-2)

- **Description:** The automated underwriting system(s) (AUS) used by the financial institution to evaluate the application
- **Values:**
  - 1 - Desktop Underwriter (DU)
  - 2 - Loan Prospector (LP) or Loan Product Advisor
  - 3 - Technology Open to Approved Lenders (TOTAL) Scorecard
  - 4 - Guaranteed Underwriting System (GUS)
  - 5 - Other

### [aus-3](#aus-3)

- **Description:** The automated underwriting system(s) (AUS) used by the financial institution to evaluate the application
- **Values:**
  - 1 - Desktop Underwriter (DU)
  - 2 - Loan Prospector (LP) or Loan Product Advisor
  - 3 - Technology Open to Approved Lenders (TOTAL) Scorecard
  - 4 - Guaranteed Underwriting System (GUS)
  - 5 - Other

### [aus-4](#aus-4)

- **Description:** The automated underwriting system(s) (AUS) used by the financial institution to evaluate the application
- **Values:**
  - 1 - Desktop Underwriter (DU)
  - 2 - Loan Prospector (LP) or Loan Product Advisor
  - 3 - Technology Open to Approved Lenders (TOTAL) Scorecard
  - 4 - Guaranteed Underwriting System (GUS)
  - 5 - Other

### [aus-5](#aus-5)

- **Description:** The automated underwriting system(s) (AUS) used by the financial institution to evaluate the application
- **Values:**
  - 1 - Desktop Underwriter (DU)
  - 2 - Loan Prospector (LP) or Loan Product Advisor
  - 3 - Technology Open to Approved Lenders (TOTAL) Scorecard
  - 4 - Guaranteed Underwriting System (GUS)
  - 5 - Other

### [denial\_reason-1](#denial_reason-1)

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
  - 10 - Not applicable

### [denial\_reason-2](#denial_reason-2)

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

### [denial\_reason-3](#denial_reason-3)

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

### [denial\_reason-4](#denial_reason-4)

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

## Census fields produced by the U.S. Census Bureau and appended to public HMDA Data

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

### [tract\_owner\_occupied\_units](#tract\_owner\_occupied\_units)

- **Description:** Number of dwellings, including individual condominiums, that are lived in by the owner
- **Values:**
  - Varying values

### [tract\_one\_to\_four\_family\_homes](#tract_one_to_four_family_homes)

- **Description:** Dwellings that are built to houses with fewer than 5 families
- **Values:**
  - Varying values

### [tract\_median\_age\_of\_housing\_units](#tract_median_age_of_housing_units)

- **Description:** Tract median age of homes
- **Values:**
  - Varying values
