## Public Panel data fields with values and definitions

### [activity\_year](#activity_year)
**Description:** The collection year of the HMDA data to which the Panel file relates

**Values:**

- 2018

### [lei](#lei)
**Description:** A financial institution’s Legal Entity Identifier

**Values:**

- Varying values

### [tax\_id](#tax_id)
**Description:** The federal tax ID of the institution

**Values:**

- Varying values

### [agency\_code](#agency_code)
**Description:** The integer code corresponding to an institution's regulatory agency

**Values:**

- 1: OCC
- 2: FRB
- 3: FDIC
- 5: NCUA
- 7: HUD
- 9: CFPB

### [id\_2017](#id_2017)
**Description:** The 2017 HMDA Platform primary identifier for an institution. This identifier is used in naming modified LAR files on [this page](https://ffiec.cfpb.gov/data-publication/modified-lar/2017)

**Values:**

- Varying values

### [arid\_2017](#arid_2017)
**Description:** The concatenation of an institution's 2017 Agency Code and Respondent ID. In order to match between 2017 and 2018, take the arid_2017 column from the 2018 panel and use this to join to the concatenation of the agency code and respondent ID in the 2017 panel. Respondent ID in 2017 and prior is not a unique value and must be joined to agency code to generate a primary key for the HMDA dataset. For 2018 and forward, LEI will be the primary key.

**Values:**

- Varying values

### [respondent\_rssd](#respondent_rssd)
**Description:** The National Information Center RSSD of the institution

**Values:**

- -1: NULL/blank
- Varying values

### [respondent\_name](#respondent_name)
**Description:** The name of the institution as registered with GLEIF

**Values:**

- Varying values

### [respondent\_state](#respondent_state)
**Description:** Two-letter state code of the institution's headquarters

**Values:**

- Varying values

### [respondent\_city](#respondent_city)
**Description:** The headquarters city of the institution

**Values:**

- Varying values

### [assets](#assets)
**Description:** The assets of the institution in the 4th quarter of the HMDA collection year

**Values:**

- -1: NULL/blank
- Varying values

### [other\_lender\_code](#other_lender_code)
**Description:** Derived assignment of an institution's status as, or relationship to, a depository institution

**Values:**

- 0: Depository Institution
- 1: MBS of state member bank
- 2: MBS of bank holding company
- 3: Independent mortgage banking subsidiary
- 5: Affiliate of a depository institution

### [parent\_rssd](#parent_rssd)
**Description:** The National Information Center's RSSD for the parent of the institution

**Values:**

- -1: NULL/blank
- Varying values

### [parent\_name](#parent_name)
**Description:** The legal name of the parent institution

**Values:**

- Varying values

### [top\_holder\_rssd](#top_holder_rssd)
**Description:** The National Information Center's RSSD for the top holder of the institution

**Values:**

- -1: NULL/blank
- Varying values

### [top\_holder\_name](#top_holder_name)
**Description:** The legal name of the top holder of the institution

**Values:**

- Varying values
