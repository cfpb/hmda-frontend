# HMDA Data Browser - List of filters (2017)
The dataset filtering feature of the HMDA Data Browser now includes 2017 data. Please note that the number of data fields differ from 2017 to 2018 and beyond. Additionally, some filters (lien status, property type, ARID) differ in regards to the accepted values. To review these differences in detail, consult the 2017 and 2018 documentation resources.  

## Geography Filters

### [Nationwide](#Nationwide)
- **Description:**  Select this option to download the national loan-level dataset.  

### [State](#State)
- **Description:** Select this option to download datasets by state, including the District of Columbia and Puerto Rico. 
- **Values:**  
  - State Number Code or State Name 
  - NA 

### [MSA/MD](#MSA/MD)
- **Description:** Select this option to download datasets by the 5 digit derived MSA (metropolitan statistical area) or MD (metropolitan division) code. An MSA/MD is an area that has at least one urbanized area of 50,000 or more population. 
- **Values** 
  - 5 Digit MSA/MD Code or Name of MSA/MD 

### [County](#County)
- **Description:** Select this option to download by county. 
- **Values** 
  - 3 Digit FIPS Code or County Name 

## Pre-Selected Filters

### [ARID](#ARID)
  - **Description:** A concatenation of a financial institution’s Agency Code and Respondent Identifier (ARID). 
  - **Values:**  
    - Alphanumeric values 

### [action\_taken](#action_taken)
- **Description:** The action taken on the covered loan or application. 
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
- **Description:** The type of covered loan or application. 
- **Values:** 
  - 1 - Conventional (not insured or guaranteed by FHA, VA, RHS, or FSA) 
  - 2 - Federal Housing Administration insured (FHA) 
  - 3 - Veterans Affairs guaranteed (VA) 
  - 4 - USDA Rural Housing Service or Farm Service Agency guaranteed (RHS or FSA) 

### [loan\_purpose](#loan_purpose)
- **Description:** The purpose of covered loan or application. 
- **Values:** 
  - 1 - Home purchase 
  - 2 - Home improvement 
  - 3 - Refinancing 


### [lien\_status](#lien_status)
- **Description:** Lien status of the property securing the covered loan, or in the case of an application, proposed to secure the covered loan. 
- **Values:**  
  - 1 - Secured by a first lien  
  - 2 - Secured by a subordinate lien  
  - 3 - Not secured by a lien  
  - 4 - Not applicable (purchased loans)  

### [property\_type](#property_type)
- **Description:** The type of property indicated in the covered loan or application.  
- **Values:**  
  - 1 - One to four-family (other than manufactured housing)  
  - 2 - Manufactured housing  
  - 3 - Multifamily  
