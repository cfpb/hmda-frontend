## List of filters used in the HMDA Data Browser

### Geography Filters
### [Nationwide](#Nationwide)

- **Description:** Select this option to download the national loan-level dataset. This is a large dataset (5.8 GB) and will take time to download. It will not be able to be opened in standard applications.

### [State](#State)

- **Description:** Select this option to download datasets by state, including the District of Columbia and Puerto Rico.

### [MSA/MD](#MSA/MD)

- **Description:** Select this option to download datasets by the 5 digit derived MSA (metropolitan statistical area) or MD (metropolitan division) code. A MSA/MD is an area that has at least one urbanized area of 50,000 or more population.

### [County](#County)

- **Description:** Select this option to download datasets by county.

### Pre-Selected Filters

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

### [loan\_type](#loan_type)

- **Description:** The type of covered loan or application
- **Values:**
  - 1 - Conventional (not insured or guaranteed by FHA
  - VA
  - RHS
  - or FSA)
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

### [construction\_method](#construction_method)

- **Description:** Construction method for the dwelling
- **Values:**
  - 1 - Site-built
  - 2 - Manufactured home

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

### [derived\_loan\_product\_type](#derived_loan_product_type)

- **Description:** Derived loan product type from Loan Type and Lien Status fields for easier querying of specific records
- **Values:**
  - Conventional: First Lien
  - FHA: First Lien
  - VA: First Lien
  - FSA/RHS: First Lien
  - Conventional: Subordinate Lien
  - FHA: Subordinate Lien
  - VA: Subordinate Lien
  - FSA/RHS: Subordinate Lien

### [derived\_dwelling\_category](#derived_dwelling_category)

- **Description:** Derived dwelling type from Construction Method and Total Units fields for easier querying of specific records
- **Values:**
  - Single Family (1-4 Units): Site-Built
  - Multifamily: Site-Built
  - Single Family (1-4 Units): Manufactured
  - Multifamily: Manufactured
