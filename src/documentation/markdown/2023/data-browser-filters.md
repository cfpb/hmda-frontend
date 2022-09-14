# HMDA Data Browser - List of filters

## Geography Filters
### Nationwide

- **Description:** Select this option to download the national loan-level dataset. This is a large dataset (5.8 GB) and will take time to download. It will not be able to be opened in standard applications.
- **Field**: [Nationwide](#Nationwide)

### State

- **Description:** Select this option to download datasets by state, including the District of Columbia and Puerto Rico.
- **Field**: [State](#State)

### MSA MD

- **Description:** Select this option to download datasets by the 5 digit derived MSA (metropolitan statistical area) or MD (metropolitan division) code. A MSA/MD is an area that has at least one urbanized area of 50,000 or more population.
- **Field**: [MSA/MD](#MSA_MD)

### County

- **Description:** Select this option to download datasets by county.
- **Field**: [County](#County)

### Financial Institution Filter

- **Description:** Select one or more financial institution by entering the financial institutions LEI or name

## Pre-Selected Filters

### Action Taken

- **Description:** The action taken on the covered loan or application
- **Field**: [action\_taken](#action_taken)
- **Values:**
  - 1 - Loan originated
  - 2 - Application approved but not accepted
  - 3 - Application denied
  - 4 - Application withdrawn by applicant
  - 5 - File closed for incompleteness
  - 6 - Purchased loan
  - 7 - Preapproval request denied
  - 8 - Preapproval request approved but not accepted

### Loan Type

- **Description:** The type of covered loan or application
- **Field**: [loan\_type](#loan_type)
- **Values:**
  - 1 - Conventional (not insured or guaranteed by FHA, VA, RHS, FSA)
  - 2 - Federal Housing Administration insured (FHA)
  - 3 - Veterans Affairs guaranteed (VA)
  - 4 - USDA Rural Housing Service or Farm Service Agency guaranteed (RHS or FSA)

### Loan Purpose

- **Description:** The purpose of covered loan or application
- **Field**: [loan\_purpose](#loan_purpose)
- **Values:**
  - 1 - Home purchase
  - 2 - Home improvement
  - 31 - Refinancing
  - 32 - Cash-out refinancing
  - 4 - Other purpose
  - 5 - Not applicable

### Lien Status

- **Description:** Lien status of the property securing the covered loan, or in the case of an application, proposed to secure the covered loan
- **Field**: [lien\_status](#lien_status)
- **Values:**
  - 1 - Secured by a first lien
  - 2 - Secured by a subordinate lien

### Construction Method

- **Description:** Construction method for the dwelling
- **Field**: [construction\_method](#construction_method)
- **Values:**
  - 1 - Site-built
  - 2 - Manufactured home

### Total Units

- **Description:** The number of individual dwelling units related to the property securing the covered loan or, in the case of an application, proposed to secure the covered loan
- **Field**: [total\_units](#total_units)
- **Values:**
  - 1
  - 2
  - 3
  - 4
  - 5-24
  - 25-49
  - 50-99
  - 100-149
  - \>149  

### Ageapplicant

- **Description:** The age of the applicant
- **Field**: [ageapplicant](#ageapplicant)
- **Values:**
  - <25
  - 25-34
  - 35-44
  - 45-54
  - 55-64
  - 65-74
  - \>74
  - 8888

### Derived Ethnicity

- **Description:** Single aggregated ethnicity categorization  derived from applicant/borrower and co-applicant/co-borrower ethnicity fields
- **Field**: [derived\_ethnicity](#derived_ethnicity)
- **Values:**
  - Hispanic or Latino
  - Not Hispanic or Latino
  - Joint
  - Ethnicity Not Available
  - Free Form Text Only

### Derived Race

- **Description:** Single aggregated race categorization derived from applicant/borrower and co-applicant/co-borrower race fields
- **Field**: [derived\_race](#derived_race)
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
- **Values:**
  - Male
  - Female
  - Joint
  - Sex Not Available

### Derived Loan Product Type

- **Description:** Derived loan product type from Loan Type and Lien Status fields for easier querying of specific records
- **Field**: [derived\_loan\_product\_type](#derived_loan_product_type)
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
- **Values:**
  - Single Family (1-4 Units): Site-Built
  - Multifamily: Site-Built
  - Single Family (1-4 Units): Manufactured
  - Multifamily: Manufactured
