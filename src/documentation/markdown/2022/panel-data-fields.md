## Public Panel - Data Fields with Values and Definitions

### [activity\_year](#activity_year)
- **Description:** The collection year of the HMDA data to which the Panel file relates
- **Values:**
  - 2022

### [lei](#lei)
- **Description:** A financial institution’s Legal Entity Identifier
- **Values:**
  - Varying values

### [tax\_id](#tax_id)
- **Description:** The federal tax ID of the institution
- **Values:**
  - Varying values

### [agency\_code](#agency_code)
- **Description:** The integer code corresponding to an institution's regulatory agency
- **Values:**  

  |Value|Abbreviation|Name|
  |--|--|--|
  |**1**|_OCC_|Office of the Comptroller of the Currency|
  |**2**|_FRB_|Federal Reserve System|
  |**3**|_FDIC_|Federal Deposit Insurance Corporation|
  |**5**|_NCUA_|National Credit Union Administration|
  |**7**|_HUD_|Department of Housing and Urban Development|
  |**9**|_CFPB_|Consumer Financial Protection Bureau|

### [id\_2017](#id_2017)
- **Description:** The 2017 HMDA Platform primary identifier for an institution. This identifier is used in the naming of <a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/data-publication/modified-lar/2017">2017 Modified LAR</a> files.
- **Values:**
  - Varying values

### [respondent\_rssd](#respondent_rssd)
- **Description:** The National Information Center RSSD of the institution
- **Values:**
  - -1: NULL/blank
  - Varying values

### [respondent\_name](#respondent_name)
- **Description:** The name of the institution as registered with <a target="_blank" rel="noopener noreferrer" href="https://www.gleif.org/">GLEIF</a>
- **Values:**
  - Varying values

### [respondent\_state](#respondent_state)
- **Description:** Two-letter state code of the institution's headquarters
- **Values:**
  - Varying values

### [respondent\_city](#respondent_city)
- **Description:** The headquarters city of the institution
- **Values:**
  - Varying values

### [assets](#assets)
- **Description:** The assets of the institution in the 4th quarter of the HMDA collection year
- **Values:**
  - -1: NULL/blank
  - Varying values

### [other\_lender\_code](#other_lender_code)
- **Description:** Derived assignment of an institution's status as, or relationship to, a depository institution
- **Values:**
  - 0: Depository Institution
  - 1: MBS of state member bank
  - 2: MBS of bank holding company
  - 3: Independent mortgage banking subsidiary
  - 5: Affiliate of a depository institution

### [parent\_rssd](#parent_rssd)
- **Description:** The National Information Center's RSSD for the parent of the institution
- **Values:**
  - -1: NULL/blank
  - Varying values

### [parent\_name](#parent_name)
- **Description:** The legal name of the parent institution
- **Values:**
  - Varying values

### [top\_holder\_rssd](#top_holder_rssd)
- **Description:** The National Information Center's RSSD for the top holder of the institution
- **Values:**
  - -1: NULL/blank
  - Varying values

### [top\_holder\_name](#top_holder_name)
- **Description:** The legal name of the top holder of the institution
- **Values:**
  - Varying values
