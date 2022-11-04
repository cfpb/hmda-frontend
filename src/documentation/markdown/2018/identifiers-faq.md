# Institution Identifiers - Frequently Asked Questions

## Institution Identifiers
The following information below details guidance regarding institution identifiers in 2017 and 2018.

### What are the institution identifiers for 2018?
For 2018 and forward, <a target="_blank" rel="noopener noreferrer" href="http://ffiec.cfpb.gov/documentation/2021/filing-faq#what-is-a-legal-entity-identifier-lei">LEI (Legal Entity Identifier)</a> sourced from a <a target="_blank" rel="noopener noreferrer" href="https://www.gleif.org/">Global LEI Foundation (GLEIF)</a> operating unit is the unique identifier for HMDA Filers. Institutions can be searched by name or LEI on this site.

### What are the institution identifiers for 2017?
For 2017 and prior, an institution's unique identifier is the concatenation of Agency Code and Respondent ID. The use of both Agency Code and Respondent ID is important as Respondent ID by itself is not always sufficient to uniquely identify an institution.

Respondent ID is for 2017 and prior is one of the following: OCC charter number, FDIC certificate number, NCUA charter number, National Information Center (NIC) RSSD, or federal tax ID. The OCC, FDIC, NCUA, and RSSD identifiers all use a sequential integer system. Meaning that identifiers start at 1 and progress in increments of 1 when new institutions are registered. This creates the potential for duplicate IDs for HMDA filers. Joining an institution's Agency Code to its Respondent ID ensures that the resulting identifier is unique.

### How can I map 2017 to 2018 institution identifiers?
The _ARID2017 to LEI Reference Table_ provides a mapping of 2017 Agency Code and Respondent IDs (ARID2017) to their current institution identifiers (LEI). This table is available on the <a href="https://ffiec.cfpb.gov/data-publication/snapshot-national-loan-level-dataset/">Snapshot National Loan Level Dataset</a> page, with direct links to each available table format provided below.

- <a download href="https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/arid2017tolei/arid2017_to_lei_xref_csv.zip">ARID2017 to LEI Reference Table (CSV)</a>  
- <a download href="https://s3.amazonaws.com/cfpb-hmda-public/prod/snapshot-data/arid2017tolei/arid2017_to_lei_xref_psv.zip">ARID2017 to LEI Reference Table (Pipe Delimited)</a>

## Institution Name Changes

### What if institutions change their names for 2018 or later
In 2018 and subsequent years, an institution's name in the HMDA Panel dataset is pulled from <a target="_blank" rel="noopener noreferrer" href="https://www.gleif.org/">GLEIF</a> using the <a target="_blank" rel="noopener noreferrer" href="http://ffiec.cfpb.gov/documentation/2021/filing-faq#what-is-a-legal-entity-identifier-lei">LEI</a> provided by that institution. If the institution changes their legal name with <a target="_blank" rel="noopener noreferrer" href="https://www.gleif.org/">GLEIF</a> after the publication of the HMDA Panel, that change will populate in the subsequent HMDA Panel.

### What if institution's change their names for 2017 or prior
In 2017 an institution's name in the HMDA Panel is pulled from the National Information Center (NIC) dataset. If an institution changed its legal name in NIC after the publication of the HMDA Panel, this change was not back populated.

## Institution Agency Code Changes

### Do institutions change their agency code?
An institution’s Agency Code can change from year to year. These changes are driven by changes to an institution's data in an institution's official regulatory data. Agency Code changes are uncommon, but do occur. Note that changes to Agency Code may create a change in Respondent ID in 2017 and prior years.

## Institution Respondent ID Changes

### Do respondent IDs change with agency code changes?
Changes to an institution's Agency Code may result in changes to that institution's Respondent ID, especially in the case of depository institutions. Please see the <a target="_blank" rel="noopener noreferrer" href="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2017-hmda-fig.pdf#page=14">2017 HMDA FIG Table 1</a> for a breakout of how Respondent ID is derived based on Agency Code.

### How do I distinguish between a depository and a non-depository institution?
In order to distinguish between depository and non-depository institutions in the HMDA data, refer to the <a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/documentation/2020/panel-data-fields/">HMDA Panel</a> data field <a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/documentation/2020/panel-data-fields/#other_lender_code">Other Lender Code</a>. Depository institutions all have Code 0 as their Other Lender Code. The remaining codes are all for non-depository institutions.

The use of Other Lender Code to distinguish between institution types is more accurate than using Agency Code. 

Agency Code is the field that shows which financial regulator has ownership of the data. HMDA data collection is an interagency program that includes the FFIEC and HUD. Agency Code allows quick analysis of data of institutions supervised by their regulator.

Agency Code is not intended to differentiate between depository and non-depository status. In the assignment of Agency Code, relationship data are considered. 

For example, if a non-depository has a parent entity that has Agency Code 1 for OCC, the non-depository will also have Agency Code 1. 

Additionally, all institutions that shares an ownership chain with an institution that has a CFPB <a target="_blank" rel="noopener noreferrer" href="https://www.consumerfinance.gov/compliance/supervision-examinations/institutions/">large depository</a> institution will have a CFPB Agency Code.