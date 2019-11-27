##Institution Identifiers Frequently Asked Questions

### Institution Identifiers
The following information below details guidance regarding institution identifiers in 2017 and 2018. 

**What are the institution identifiers for 2018?** 
For 2018 and forward, Legal Entity Identifier (LEI) sourced from a Global LEI Foundation (GLEIF) operating unit is the unique identifier for HMDA Filers. Institutions can be searched by name or LEI on this site.

**What are the institution identifiers for 2017?** 
For 2017 and prior, an institution's unique identifier is the concatenation of Agency Code and Respondent ID. The use of both Agency Code and Respondent ID is important as Respondent ID by itself is not always sufficient to uniquely identify an institution.

Respondent ID is for 2017 and prior is one of the following: OCC charter number, FDIC certificate number, NCUA charter number, National Information Center (NIC) RSSD, or federal tax ID. The OCC, FDIC< NCUA, and RSSD identifiers all use a sequential integer system. Meaning that identifiers start at 1 and progress in increments of 1 when new institutions are registered. This creates the potential for duplicate IDs for HMDA filers. Joining an institution's Agency Code to its Respondent ID ensures that the resulting identifier is unique.

**How can I map 2017 institution identifiers to 2018 institution identifiers?**
The 2018 Panel file contains two identifiers related to 2017 identity: ID_2017 and ARID_2017. Use the ARID_2017 column to match to the concatenation of Agency Code and Respondent ID from 2017. The ID_2017 column relates to the file name of an institution's modified LAR data found on this page.
See the 2018 HMDA Panel file schema here and field definitions here.

### Institution Name Changes:

**What happens with institution name changes for 2018 and beyond?**
In 2018 and subsequent years, an institution's name in the HMDA Panel dataset is pulled from GLEIF using the LEI provided by that institution. If the institution changes their legal name with GLEIF after the publication of the HMDA Panel, that change will populate in the subsequent HMDA Panel.

**What happens with institution name changes for 2017 and prior?** 
In 2017 an institution's name in the HMDA Panel is pulled from the National Information Center (NIC) dataset. If an institution changed its legal name in NIC after the publication of the HMDA Panel, this change was not back populated.

### Institution Agency Code Changes:
**Do institutions change their agency code?** 
An institution’s Agency Code can change from year to year. These changes are driven by changes to an institution's data in an institution's official regulatory data. Agency Code changes are uncommon, but do occur. Note that changes to Agency Code may create a change in Respondent ID in 2017 and prior years.

### Institution Respondent ID Changes
**Do respondent IDs change with agency code changes?** 
Changes to an institution's Agency Code may result in changes to that institution's Respondent ID, especially in the case of depository institutions. Please see the 2017 HMDA FIG Table 1 for a breakout of how Respondent ID is derived based on Agency Code.
