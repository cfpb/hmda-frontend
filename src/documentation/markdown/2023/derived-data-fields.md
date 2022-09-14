# Derived HMDA Data Fields

This guide explains fields that are included in public HMDA data collected in 2018 and beyond, that have been modified from the original loan record to protect privacy, or added to enhance the usefulness of the data. Derived fields used in HMDA data and publication products, such as Race, Sex, and Ethnicity, were aggregated from the source data, following a methodology developed by the CFPB for analysis and privacy protection, but are not an official and sole government definition. Researchers and technical professionals interested in the methodology can refer to the [Derived Fields Categorization wiki](https://github.com/cfpb/hmda-platform/wiki/Derived-Fields-Categorization-2018-Onward) or <a target="_blank" rel="noopener noreferrer" href="https://files.consumerfinance.gov/f/documents/HMDA\_Data\_Disclosure\_Policy\_Guidance.Executive\_Summary.FINAL.12212018.pdf">the Data Disclosure Policy</a>.


### Derived Ethnicity

- **Description:** Single aggregated ethnicity categorization  derived from applicant/borrower and co-applicant/co-borrower ethnicity fields
- **Field**: [derived\_ethnicity](#derived_ethnicity)
- **Field Data Type:** Alphanumeric
- **Values:**
  - Hispanic or Latino
  - Not Hispanic or Latino
  - Joint
  - Ethnicity Not Available
  - Free Form Text Only

### Derived Race

- **Description:** Single aggregated race categorization derived from applicant/borrower and co-applicant/co-borrower race fields
- **Field**: [derived\_race](#derived_race)
- **Field Data Type:** Alphanumeric
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

### Derived Sex

- **Description:** Single aggregated sex categorization derived from applicant/borrower and co-applicant/co-borrower sex fields
- **Field**: [derived\_sex](#derived_sex)
- **Field Data Type:** Alphanumeric
- **Values:**
  - Male
  - Female
  - Joint
  - Sex Not Available

### Derived Loan Product Type

- **Description:** Derived loan product type from Loan Type and Lien Status fields for easier querying of specific records
- **Field**: [derived\_loan\_product\_type](#derived_loan_product_type)
- **Field Data Type:** Alphanumeric
- **Values:**
  - Conventional: First Lien
  - FHA: First Lien
  - VA: First Lien
  - FSA/RHS: First Lien
  - Conventional: Subordinate Lien
  - FHA: Subordinate Lien
  - VA: Subordinate Lien
  - FSA/RHS: Subordinate Lien

### Derived Dwelling Category

- **Description:** Derived dwelling type from Construction Method and Total Units fields for easier querying of specific records
- **Field**: [derived\_dwelling\_category](#derived_dwelling_category)
- **Field Data Type:** Alphanumeric
- **Values:**
  - Single Family (1-4 Units): Site-Built
  - Multifamily: Site-Built
  - Single Family (1-4 Units): Manufactured
  - Multifamily: Manufactured

### Conforming Loan Limit

- **Description:** Indicates whether the reported loan amount exceeds the GSE (government sponsored enterprise) conforming loan limit
- **Field**: [conforming\_loan\_limit](#conforming_loan_limit)
- **Field Data Type:** Alphanumeric
- **Values:**
  - C (Conforming)
  - NC (Nonconforming)
  - U (Undetermined)
  - NA (Not Applicable)

### Derived MSA-MD

- **Description:** Derived MSA/MD from the property location reported for the record
- **Field**: [derived\_msa-md](#derived_msa-md)
- **Field Data Type:** Alphanumeric
- **Values:**
  - Varying values

### Applicant Age Above 62

- **Description:** Whether the applicant or borrower age is above 62
- **Field**: [applicant\_age\_above\_62](#applicant_age_above_62)
- **Field Data Type:** Alphanumeric
- **Values:**
  - Yes
  - No
  - NA

### Co-Applicant Age Above 62

- **Description:** Whether the first co-applicant or co-borrower age is above 62
- **Field**: [co-applicant\_age\_above\_62](#co-applicant_age_above_62)
- **Field Data Type:** Alphanumeric
- **Values:**
  - Yes
  - No
  - NA

## Census fields produced by the U.S. Census Bureau and appended to public HMDA Data

### Tract Population

- **Description:** Total population in tract
- **Field**: [tract\_population](#tract_population)
- **Values:**
  - Varying values

### Tract Minority Population Percent

- **Description:** Percentage of minority population to total population for tract, rounded to two decimal places
- **Field**: [tract\_minority\_population\_percent](#tract_minority_population_percent)
- **Values:**
  - Varying values

### FFIEC MSA MD Median Family Income

- **Description:** FFIEC Median family income in dollars for the MSA/MD in which the tract is located (adjusted annually by FFIEC)
- **Field**: [ffiec\_msa\_md\_median\_family\_income](#ffiec_msa_md_median_family_income)
- **Values:**
  - Varying values

### Tract To MSA Income Percentage

- **Description:** Percentage of tract median family income compared to MSA/MD median family income
- **Field**: [tract\_to\_msa\_income\_percentage](#tract_to_msa_income_percentage)
- **Values:**
  - Varying values

### Tract Owner Occupied Units

- **Description:** Number of dwellings, including individual condominiums, that are lived in by the owner
- **Field**: [tract\_owner\_occupied\_units](#tract\_owner\_occupied\_units)
- **Values:**
  - Varying values

### Tract One To Four Family Homes

- **Description:** Dwellings that are built to houses with fewer than 5 families
- **Field**: [tract\_one\_to\_four\_family\_homes](#tract_one_to_four_family_homes)
- **Values:**
  - Varying values

### Tract Median Age Of Housing Units

- **Description:** Tract median age of homes
- **Field**: [tract\_median\_age\_of\_housing\_units](#tract_median_age_of_housing_units)
- **Values:**
  - Varying values
