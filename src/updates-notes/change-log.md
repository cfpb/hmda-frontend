---
date: 04/30/26
type: update
product: documentation
---
To optimize filers' user experience workflow, we have added links between the filing application and the Filing Instructions Guides. Triggered edits now link directly to their descriptions in the FIG. The new links can be found by clicking the **#** next to the edit ID in a FIG, e.g. [https://ffiec.cfpb.gov/documentation/fig/2026/overview#edit-S302](https://ffiec.cfpb.gov/documentation/fig/2026/overview#edit-S302)

---
date: 04/13/26
type: update
product: mlar
---
Downloadable [modified LAR files](https://ffiec.cfpb.gov/data-publication/modified-lar/2025) have been updated to use `.txt` instead of `.csv` file extensions to align with their content. Users wanting to open these files in spreadsheet editors like Excel can [refer to our documentation](https://ffiec.cfpb.gov/documentation/publications/modified-lar/resources/mlar-with-excel). Additionally, the 2017 modified LAR file names have been updated to include the RSSD ID of the institution. 

---
date: 03/31/26
type: announcement
product: mlar
---
On March 31, 2026, the 2026 Modified Loan/Application Register (LAR) data was released. Users may download a combined file containing modified LAR records for every financial institution that has completed a HMDA data submission. The modified LAR data provides each financial institution's loan-level HMDA data, and has been modified to protect applicant and borrower privacy in accordance with the Consumer Financial Protection Bureau’s [final policy guidance](https://files.consumerfinance.gov/f/documents/HMDA_Data_Disclosure_Policy_Guidance.Executive_Summary.FINAL.12212018.pdf) on the disclosure of HMDA data.

To learn more about this data, visit [the modified LAR webpage](https://ffiec.cfpb.gov/data-publication/modified-lar/2025).

---
date: 01/20/26
type: announcement
product: tools
---
Due to an upgrade to the HMDA Platform that was performed on December 2, 2025, links to APOR-related files have changed. As of January 20, 2026, APOR files are no longer provided via the AWS S3 public bucket.

Please update your bookmarks and integrations to use the new URLs:

- Fixed Table: [https://files.ffiec.cfpb.gov/apor/YieldTableFixed.txt](https://files.ffiec.cfpb.gov/apor/YieldTableFixed.txt)
- Adjustable Table: [https://files.ffiec.cfpb.gov/apor/YieldTableAdjustable.txt](https://files.ffiec.cfpb.gov/apor/YieldTableAdjustable.txt)
- Survey Table: [https://files.ffiec.cfpb.gov/apor/SurveyTable.csv](https://files.ffiec.cfpb.gov/apor/SurveyTable.csv)

---
date: 01/09/26
type: announcement
product: tools
---
Two sets of APORs were published for the week of 1/5/2026. The first set was published on 1/2/2026 and was briefly incorporated into the Bureau's rate spread calculator. The second set was published on 1/9/2026, and APORs for fixed rate loans with terms of 2, 3 to 4, 7 to 8, and 26 to 50 years were substituted for the first set in the Bureau's rate spread calculator. Consistent with the Bureau's prior practice in instances when APORs have been updated after their initial publication.

- [Both sets of APORs are available here](https://files.ffiec.cfpb.gov/apor/01_09_2026_APOR_tables.csv)

---
date: 01/06/26
type: announcement
product: filing
---
As the 2026 Home Mortgage Disclosure Act (HMDA) filing season is in full swing for 2025 data, here are some reminders and tips for preparing and uploading your submission.

- **Filing Season Dates:** The 2026 filing season is now open for HMDA Data submissions. It will close for on-time submissions on Monday, March 2, 2026. You can review annual filing season information [here](https://ffiec.cfpb.gov/documentation/faq/filing-faq).
- **Rate Spread APOR File Path Changes:** An upgrade to the HMDA Platform was performed and as a result, the [fixed](https://files.ffiec.cfpb.gov/apor/YieldTableFixed.txt), [adjustable](https://files.ffiec.cfpb.gov/apor/YieldTableAdjustable.txt), and [survey table](https://files.ffiec.cfpb.gov/apor/SurveyTable.csv) APOR file paths have changed. On Tuesday, January 20, 2026, the old APOR file paths will be removed and inaccessible and APOR files will no longer be provided via the AWS S3 public bucket. Please update your bookmarks and integrations to correspond with these changes.
- **What’s my User Account?** If you are new to filing and do not have an account, please fill out a [registration form](https://hmdahelp.consumerfinance.gov/accounthelp/). All users logging into the HMDA platform will need to login via Login.gov, which utilizes multifactor authentication (MFA).
- **Active HMDA Platform Users:** Any user accounts that have not logged in to the HMDA platform within the last two years will be disabled at the end of the 2026 filing season. If you would like to receive a list of user accounts associated with your financial institution, please contact [hmdahelp@cfpb.gov](mailto:hmdahelp@cfpb.gov).
- **Multiple User Accounts:** Multiple employees from the same institution can create an account on the HMDA Platform. If your institution would like to add additional users to the HMDA Platform, please have them register for an account at [https://ffiec.cfpb.gov/filing](https://ffiec.cfpb.gov/filing)/.
- **LEI Reminder:** Filers must have an LEI, or Legal Entity Identifier, to register with the HMDA Platform and submit HMDA data, and that LEI must relate to the institution covered by Regulation C. An institution may not use an LEI assigned to a parent company, holding company, or other affiliated institution. You can learn more about registering your institution for a LEI [here](https://www.gleif.org/en/about-lei/get-an-lei-find-lei-issuing-organizations).
- **`No associated institutions` message:** If you login to the HMDA Platform and receive a message stating `No associated institutions`, please send an email to [hmdahelp@cfpb.gov](mailto:hmdahelp@cfpb.gov).  HMDA Help can assist you with adding your institution to your account, so you are able to complete your filing.
- **Reporting Street Address:** When reporting Street Address (Field 13), please ensure that you are following the reporting guidance in the [Filing Instructions Guide](https://ffiec.cfpb.gov/documentation/fig/2025/overview). The Street Address field should not contain placeholders or multiple addresses.
- **Census Tract:** When reporting the census tract data point (Field 18), use the boundaries and codes effective January 1st of the calendar year covered by the loan/application register that it is reporting.
- **NMLSR Identifier:** The reported value for Mortgage Loan Originator NMLSR Identifier (Field 95) should be an integer with a minimum of four digits as defined by [NMLS](https://mortgage.nationwidelicensingsystem.org/knowledge/products/nmls/pubs/aboutNMLS/index.html?contextID=nmls-sw-uniqID), if not reporting Exempt or NA in the field. The value should pertain to the mortgage loan originator with primary responsibility for the transaction as of the date of action taken. If the mortgage loan originator is not required to obtain and has not been assigned an NMLSR ID, a financial institution must report NA. Please refer to [Regulation C, Section 1003.4(a)(34)](https://www.consumerfinance.gov/rules-policy/regulations/1003/4/#a-34) for additional reporting guidance on NMLSR ID.
- **Online Loan/Application Register (LAR) Formatting Tool:** The [Online LAR Formatting Tool](https://ffiec.cfpb.gov/tools/online-lar-formatting) helps financial institutions, often those with small volumes of covered loans and applications, create an electronic file that can be submitted to the HMDA Platform. Filers can create their transmittal sheet and LAR rows, entering values for each data field, and use this tool to download the entire LAR file. Filers can also easily edit an existing file by uploading their file to the tool. The Online LAR Formatting Tool does not save any user data.
- **Have a question?** HMDA filers can contact the HMDA Help queue at [hmdahelp@cfpb.gov](mailto:hmdahelp@cfpb.gov) throughout the filing season for data questions, filing help, and other inquiries.

---
date: 1/01/26
type: announcement
product: filing
---
2025 Annual filing period is open.

Submissions of 2025 HMDA data will be considered timely if received on or before March 2, 2026.

---
date: 01/20/26
type: announcement
product: documentation
---
Due to operational constraints, the Consumer Financial Protection Bureau has discontinued its use of the GovDelivery email service on Tuesday, January 20, 2026. After that date, subscribers to the HMDA mailing list will no longer receive email notifications. Visit our HMDA News and Updates webpage to ensure you continue to have access to timely information.

- [HMDA News and Updates](https://ffiec.cfpb.gov/updates-notes)

---
date: 10/06/25
type: release
product: documentation
---
The 2026 Online Filing Instructions Guide (FIG) and 2026 Online Supplemental Guide for Quarterly Filers have been released.

- [2026 Online Filing Instructions Guide (FIG)](https://ffiec.cfpb.gov/documentation/fig/2026/overview)
- [2026 Online Supplemental Guide for Quarterly Filers](https://ffiec.cfpb.gov/documentation/fig/2026/supplemental-guide-for-quaterly-filers)

---
date: 8/14/25
type: correction
product: datasets
---
The Conforming Loan Limit field was incorrectly assigned for the 2024 Snapshot and Dynamic Datasets. This bug has been corrected and the impacted data sets have been republished.

- [HMDA 2024 Snapshot Dataset](https://ffiec.cfpb.gov/data-publication/snapshot-national-loan-level-dataset/2024)
- [HMDA 2024 Dynamic Dataset](https://ffiec.cfpb.gov/data-publication/dynamic-national-loan-level-dataset/2024)
- [HMDA Dataset Filtering tool](https://ffiec.cfpb.gov/data-browser/data/2024)

---
date: 06/24/25
type: release
product: datasets
---
The 2024 national loan-level datasets, disclosure reports, and MSA/MD aggregate reports were released and can be accessed via the Data Publication page. Users can now explore 2024 HMDA data using the Data Browser's dataset filtering tool and maps. The 2023 One Year Dataset and the 2021 Three Year Dataset were also released.

- [Data Publication](https://ffiec.cfpb.gov/data-publication/)
- [Data Browser](https://ffiec.cfpb.gov/data-browser/data/)
- [Maps](https://ffiec.cfpb.gov/data-browser/maps/)

---
date: 04/21/25
type: release
product: tools
---
The Online LAR Formatting tool has been updated for data collected in 2024 and 2025.

- [Online LAR Formatting Tool](https://ffiec.cfpb.gov/tools/online-lar-formatting)

---
date: 03/31/25
type: release
product: mlar
---
On March 31, 2025, the 2024 Modified LAR data was released. A combined file containing all financial institutions' LAR records in a single file is also available for users to download.

- [View the press release](https://www.consumerfinance.gov/about-us/newsroom/2024-hmda-data-on-mortgage-lending-now-available/)

---
date: 12/31/24
type: update
product: documentation
---
The HMDA Ops Team corrected the Online 2025 FIG. We updated version log number 5 with the correct section number, which displays the 2025 revised and new edits.

- [2025 Filing Instructions Guide (FIG)](https://ffiec.cfpb.gov/documentation/fig/2025/overview#changes)

---
date: 10/22/24
type: update
product: tools
---
HMDA Quarterly Graphs have been updated to include data for 2024-Q2.

- [HMDA Quarterly Graphs](https://ffiec.cfpb.gov/data-browser/graphs/quarterly)

---
date: 10/18/24
type: update
product: documentation
---
The HMDA Ops Team made a correction to the Online 2024 FIG. For data field number four, Calendar Quarter, we added the missing footnote two and its link. We also added the missing link to the Online Supplemental Guide for Quarterly Filers for 2024. Additionally, we updated the Online FIG 2024 and added footnote two to the footnotes section.

- [2024 Filing Instructions Guide (FIG)](https://ffiec.cfpb.gov/documentation/fig/2024/overview)

---
date: 09/20/24
type: release
product: documentation
---
The 2025 Online Filing Instructions Guide (FIG) and 2025 Online Supplemental Guide for Quarterly Filers have been released.

- [2025 Online Filing Instructions Guide (FIG)](https://ffiec.cfpb.gov/documentation/fig/2025/overview)
- [2025 Online Supplemental Guide for Quarterly Filers](https://ffiec.cfpb.gov/documentation/fig/2025/supplemental-guide-for-quarterly-filers)

---
date: 07/29/24
type: update
product: tools
---
HMDA Quarterly Graphs have been updated to include data for 2024-Q1.

- [HMDA Quarterly Graphs](https://ffiec.cfpb.gov/data-browser/graphs/quarterly)

---
date: 07/11/24
type: release
product: datasets
---
The 2023 national loan-level datasets, disclosure reports, and MSA/MD aggregate reports were released and can be accessed via the Data Publication page. Users can now explore 2023 HMDA data using the Data Browser's dataset filtering tool and maps. The 2022 One Year Dataset and the 2020 Three Year Dataset were also released.

- [Data Publication](https://ffiec.cfpb.gov/data-publication/)
- [Data Browser](https://ffiec.cfpb.gov/data-browser/data/)
- [Maps](https://ffiec.cfpb.gov/data-browser/maps/)

---
date: 03/25/24
type: release
product: mlar
---
On March 25, 2024, the 2023 Modified LAR data was released. A combined file containing all financial institutions' LAR records in a single file is also available for users to download.

- [View the press release.](https://www.consumerfinance.gov/about-us/newsroom/2023-hmda-data-on-mortgage-lending-now-available/)

---
date: 2/16/24
type: correction
product: filing
---
V695 was corrected on the HMDA Filing Platform to only allow numeric values for Mortgage Loan Originator NMLSR Identifier (Field 95), unless filers are reporting 'NA' or 'Exempt', to conform to the language in the Filing Instructions Guide.

- [V695 Edit Description](https://ffiec.cfpb.gov/documentation/fig/2023/overview#table6-V695)

---
date: 2/15/24
type: update
product: tools
---
HMDA Quarterly Graphs have been updated to include data for 2023-Q3. Graphs can now be filtered by loan purpose.

- [HMDA Quarterly Graphs](https://ffiec.cfpb.gov/data-browser/graphs/quarterly)

---
date: 12/15/23
type: release
product: HMDA Filing
---
The HMDA Platform has partnered with Login.gov to introduce multifactor authentication (MFA) to the HMDA Platform. When logging into the HMDA Platform, users will now see an option to login with Login.gov. Selecting that option will allow HMDA filers to enable MFA on their HMDA platform accounts. While this feature is optional for the upcoming filing season, it will be required for all accounts beginning in 2025.

- [What is Login.gov?](https://login.gov/what-is-login/)

---
date: 11/08/23
type: update
product: documentation
---
The 2024 Filing Instructions Guide (FIG) was updated to include a minor correction to validity edit V720, a language change to quality edit Q660, and the inclusion of the validity edit V660 in the New and Revised Edits table.

- [2024 Filing Instructions Guide (FIG)](https://files.ffiec.cfpb.gov/documentation/2024-hmda-fig.pdf)

---
date: 10/24/23
type: update
product: tools
---
HMDA Quarterly Graphs have been updated to include data for 2023-Q2.

- [HMDA Quarterly Graphs](https://ffiec.cfpb.gov/data-browser/graphs/quarterly)

---
date: 09/07/23
type: release
product: documentation
---
The 2024 Filing Instructions Guide (FIG) and 2024 Supplemental Guide for Quarterly Filers have been released.

- [2024 Filing Instructions Guide (FIG)](https://files.ffiec.cfpb.gov/documentation/2024-hmda-fig.pdf)
- [2024 Supplemental Guide for Quarterly Filers](https://files.ffiec.cfpb.gov/documentation/supplemental-guide-for-quarterly-filers-for-2024.pdf)

---
date: 07/14/23
type: update
product: tools
---
HMDA Quarterly Graphs have been updated to include data for 2023-Q1.

- [HMDA Quarterly Graphs](https://ffiec.cfpb.gov/data-browser/graphs/quarterly)

---
date: 06/29/23
type: release
product: datasets
---
The 2022 national loan-level datasets, disclosure reports, and MSA/MD aggregate reports were released and can be accessed via the Data Publications page. Users can now explore 2022 HMDA data using the Data Browser's dataset filtering tool and maps.

- [Data Publications](https://ffiec.cfpb.gov/data-publication/)
- [Data Browser](https://ffiec.cfpb.gov/data-browser/data/)
- [Maps](https://ffiec.cfpb.gov/data-browser/maps/)

---
date: 06/01/23
type: release
product: documentation
---
A new and enhanced HMDA documentation page has been released! In addition to an improved visual design, financial institutions now have the ability to search the consolidated documentation and API documentation has been integrated.

- [Visit the redesigned page here.](https://ffiec.cfpb.gov/documentation/)

---
date: 05/15/23
type: release
product: tools
---
The Online LAR Formatting tool was released. Financial institutions, typically those with smaller loan volumes, can use the online tool to create an electronic file to submit to the HMDA Platform

- [Online LAR Formatting Tool.](https://ffiec.cfpb.gov/tools/online-lar-formatting)

---
date: 04/14/23
type: update
product: tools
---
Starting on or after April 24, 2023, the CFPB will begin relying on data from ICE Mortgage Technology to calculate APORs. This update is related to the rate spread calculator.

- [View the press release.](https://www.consumerfinance.gov/about-us/newsroom/cfpb-announces-revised-methodology-for-determining-average-prime-offer-rates/)

---
date: 03/20/23
type: release
product: mlar
---
On March 20, 2023, the 2022 Modified LAR data was released. A combined file containing all financial institutions' LAR records in a single file is also available for users to download.

- [View the press release.](https://www.consumerfinance.gov/about-us/newsroom/2022-hmda-data-on-mortgage-lending-now-available/)

---
date: 02/13/23
type: correction
product: filing
---
The HMDA Ops team discovered a bug in which filers were unable to view their IRS reports upon submission. This bug has been remediated and filers should be able to view their IRS report when selecting “View Completed Filing” on the HMDA Platform.

---
date: 01/19/23
type: update
product: tools
---
HMDA Quarterly Graphs have been updated to include data for 2022-Q3

- [HMDA Quarterly Graphs](https://ffiec.cfpb.gov/data-browser/graphs/quarterly)

---
date: 11/04/2022
type: update
product: documentation
---
Direct access to the IRS reports and Modified LAR is being depreciated as of Dec 23. These files may instead be accessed through the HMDA File Service.

- [HMDA File Service Documentation](https://cfpb.github.io/hmda-platform/#hmda-file-serving)

---
date: 10/04/22
type: correction
product: tools
---
The addition of 2022-Q2 data on the evening of October 3rd resulted in a data error in the 2022-Q1 data displayed in the graphs. The data for HMDA Quarterly Graphs for 2022-Q1 have now been corrected.

- [HMDA Quarterly Graphs](https://ffiec.cfpb.gov/data-browser/graphs/quarterly)

---
date: 10/03/22
type: update
product: tools
---
HMDA Quarterly Graphs have been updated to include data for 2022-Q2

- [HMDA Quarterly Graphs](https://ffiec.cfpb.gov/data-browser/graphs/quarterly)

---
date: 09/06/22
type: release
product: documentation
---
The 2023 Filing Instructions Guide (FIG) and 2023 Supplemental Guide for Quarterly Filers have been released.

- [2023 Filing Instructions Guide (FIG)](https://files.ffiec.cfpb.gov/documentation/2023-hmda-fig.pdf)
- [2023 Supplemental Guide for Quarterly Filers](https://files.ffiec.cfpb.gov/documentation/supplemental-guide-for-quarterly-filers-for-2023.pdf)

---
date: 08/29/22
type: release
product: tools
---
HMDA Quarterly Graphs, a tool to visualize quarterly lending trends, was released.

- [HMDA Quarterly Graphs](https://ffiec.cfpb.gov/data-browser/graphs/quarterly)

---
date: 08/25/22
type: release
product: datasets
---
Three Year National Loan-Level datasets (2017) were released.

- [Three Year National Loan-Level Dataset](https://ffiec.cfpb.gov/data-publication/three-year-national-loan-level-dataset/2017)

---
date: 07/22/22
type: correction
product: tools
---
Two sets of APORs were published for the week of 7/11/2022 for fixed rate loans with terms of 9 to 12 years and adjustable rate loans with terms of 9 to 50 years. The first set was published on 7/8/2022 and was incorporated into the Bureau’s rate spread calculator until 7/15/2022. The second set was briefly incorporated into the Bureau’s rate spread calculator from 7/15/2022 until 7/21/2022, when the first set of APORs was reincorporated. Both sets of APORs are available below.

- [APOR Table - 7.11.22](https://files.ffiec.cfpb.gov/apor/7_11_2022_APOR_tables.csv)

---
date: 06/16/22
type: release
product: datasets
---
One Year National Loan-Level (2019, 2020) and Three Year National Loan-Level (2018) datasets were released.

- [One Year National Loan-Level Dataset](https://ffiec.cfpb.gov/data-publication/one-year-national-loan-level-dataset/2020)
- [Three Year National Loan-Level Dataset](https://ffiec.cfpb.gov/data-publication/three-year-national-loan-level-dataset/2018)

---
date: 06/16/22
type: release
product: datasets
---
Disclosure Reports, MSA/MD Aggregate Reports, Snapshot National Loan-Level dataset, and Dynamic National Loan-Level dataset for 2021 were released.

- [HMDA Data Publications](https://ffiec.cfpb.gov/data-publication/)

---
date: 03/31/22
type: release
product: mlar
---
On March 23, 2022, the 2021 Modified LAR data was released.

- [View the press release.](https://www.consumerfinance.gov/about-us/newsroom/2021-hmda-data-on-mortgage-lending-now-available)

---
date: 02/10/22
type: correction
product: filing
---
Edit V719 has been added to check the format of the financial institution name in the transmittal sheet. It should be alphanumeric, and not just numeric. Additionally, a new Automated Underwriting System (AUS) value (Internal Proprietary System) has been added based on previous HMDA year inputs in the AUS free form text field. The edit V696 has been updated to include this new value. As well, a parser check has been added that explains when dates are in an invalid format.

---
date: 10/20/21
type: update
product: documentation
---
The Filing Instructions Guide (FIG) for data collected in 2022 has been updated with guidance for edits V720-2, V721-2, and Q657.

- [2022 Filing Instructions Guide (FIG)](https://files.ffiec.cfpb.gov/documentation/2022-hmda-fig.pdf)

---
date: 10/11/21
type: update
product: documentation
---
The HMDA API documentation has been updated to provide users more information about the Check Digit tool error response messaging for batch uploads during generate and validate processing.

- [HMDA API Documentation](https://cfpb.github.io/hmda-platform/)

---
date: 09/10/21
type: release
product: documentation
---
The 2022 Filing Instructions Guide (FIG) and 2022 Supplemental Guide for Quarterly Filers have been released.

- [2022 Filing Instructions Guide (FIG)](https://files.ffiec.cfpb.gov/documentation/2022-hmda-fig.pdf)
- [2022 Supplemental Guide for Quarterly Filers](https://files.ffiec.cfpb.gov/documentation/supplemental-guide-for-quarterly-filers-for-2022.pdf)

---
date: 08/10/21
type: release
product: datasets
---
The ARID2017 to LEI Reference Table has been released. This provides a mapping of 2017 Agency Code and Respondent IDs (ARID2017) to their current LEIs.

- [HMDA Snapshot Datasets](https://ffiec.cfpb.gov/data-publication/snapshot-national-loan-level-dataset/2020)

---
date: 07/01/21
type: correction
product: datasets
---
A small number of entries reported a 'city' field column  which contained unescaped commas in the 2020 Snapshot Transmittal Sheet CSV file. We made the appropriate updates to the file to resolve this issue to prevent any parsing inconsistencies.

---
date: 07/01/21
type: correction
product: datasets
---
The LEI column header was incorrectly named 'upper' in the Reporter Panel file. We have corrected this so the column header displays the correct header name 'lei'.

---
date: 06/29/21
type: correction
product: reports
---
Aggregate Report "Applications by Median Age of Homes" has been regenerated for 2020 and 2019 in order to address an error in the data format, which was causing the UI to crash.

- [HMDA Aggregate Reports](https://ffiec.cfpb.gov/data-publication/aggregate-reports/)

---
date: 06/17/21
type: release
product: datasets
---
Disclosure Reports, MSA/MD Aggregate Reports, Snapshot National Loan-Level dataset, and Dynamic National Loan-Level dataset for 2020 were released.

- [HMDA Data Publications](https://ffiec.cfpb.gov/data-publication/)

---
date: 06/17/21
type: update
product: datasets
---
Links to Dynamic Dataset files for 2018+ have been updated to point to compressed (.zip) files instead of raw text files.

---
date: 04/29/21
type: update
product: documentation
---
The HMDA API documentation has been updated to provide users more information about our endpoints and the Filing process. Additionally, the styling of the page has been better aligned with the Filing platform.

- [HMDA API Documentation](https://cfpb.github.io/hmda-platform/)

---
date: 04/07/21
type: correction
product: mlar
---
County level census data was missing from modified LAR records in the 2018 and 2019 data. This census information, primarily related to MSAs and small counties, was added to the records and the modified LARs were regenerated.

---
date: 04/07/21
type: correction
product: mlar
---
The Tract MSA Income field was incorrectly displaying percentage fields with truncated decimals. We have corrected this so that the field now correctly displays decimal information.

---
date: 04/07/21
type: correction
product: mlar
---
Some LARs were assigned an incorrect conforming loan limit status and were not correctly regenerated after the associated code fixes were made. These LARs have been regenerated.

---
date: 04/07/21
type: update
product: mlar
---
The column headers of the 2018 and 2019 modified LARs were reordered and some were renamed for consistency across years. The record_identifier data field was removed and the activity_year data field was added. 

---
date: 03/31/21
type: release
product: mlar
---
On March 31, 2021, the 2020 Modified LAR data was released.

- [View the press release.](https://www.consumerfinance.gov/about-us/newsroom/2020-hmda-data-on-mortgage-lending-now-available)

---
date: 02/23/21
type: correction
product: tools
---
Two sets of APORs were published for the week of 7/20/2020 for fixed rate loans with terms of 13 to 22 years. The first set was published on 7/16/2020 and was briefly incorporated into the Bureau’s rate spread calculator. The second set was published on 7/20/2020 and was substituted for the first in the Bureau’s rate spread calculator. Both sets of APORs are available below.

- [APOR Table - 7.20.20](https://files.consumerfinance.gov/hmda/7_20_2020_APORs_table.csv)

---
date: 11/20/20
type: update
product: documentation
---
The Filing Instructions Guide (FIG) for the year 2021 has been updated.

---
date: 09/11/20
type: update
product: documentation
---
Provide links for Panel schema, Panel field definitions, and the 2017 FIG.

---
date: 08/21/20
type: release
product: documentation
---
The Filing Instructions Guide (FIG) and the Supplemental Guide for Quarterly Filers for the year 2021 have been released.

---
date: 08/03/20
type: release
product: documentation
---
Documentation for running the HMDA Frontend in a development environment has been released.

---
date: 07/30/20
type: update
product: tools
---
The Data Browser for the year 2018 has been updated with corrected per County counts.

---
date: 07/08/20
type: update
product: mlar
---
The Modified LAR for the year 2019 have the 'with Header' option re-enabled.

---
date: 07/01/20
type: release
product: documentation
---
Documentation for the 2020 Loan/Application Register Formatting Tool (LARFT) has been released.

---
date: 06/24/20
type: release
product: datasets
---
The National Loan-Level Dataset for the year 2019 has been released.

---
date: 06/24/20
type: release
product: reports
---
The MSA/MD Aggregate Reports and Disclosure Reports for the year 2019 have been released.

---
date: 06/22/20
type: release
product: tools
---
The Data Browser for the year 2019 has been released.

---
date: 06/18/20
type: update
product: documentation
---
The closing dates for 2020 Quarterly Filing periods have been updated.

---
date: 05/19/20
type: release
product: documentation
---
The Data Browser documentation for the year 2017 has been updated with definitions and descriptions of Filters, as well as data structure differences when compared to 2018.

---
date: 05/14/20
type: update
product: documentation
---
The Disclosure Reports page was updated with improved guidance for finding your Insitutions Register Summary (IRS).

---
date: 04/22/20
type: update
product: mlar
---
The Modified LAR for the year 2019 temporarily have the 'with Header' option disabled.

---
date: 03/26/20
type: release
product: mlar
---
The Modified LAR for the year 2019 have been released.

---
date: 03/09/20
type: update
product: documentation
---
The Documentation for the year 2018 has been updated to fix broken links.

---
date: 02/20/20
type: update
product: tools
---
The 2017 File Format Verification Tool (FFVT) has been removed.  Filing of 2017 HMDA Data is closed.

---
date: 02/12/20
type: release
product: datasets
---
The Dynamic National Loan-Level Dataset for the year 2017 was released.

---
date: 01/10/20
type: update
product: tools
---
The 2017 Loan Application Register Formatting Tool (LARFT) has been removed.  Filing of 2017 HMDA Data is closed.

---
date: 01/02/20
type: update
product: tools
---
The Platform for the year 2017 is closed. Filing of 2017 HMDA Data is no longer possible.

---
date: 11/14/19
type: release
product: tools
---
The Data Browser now supports filtering of datasets by Institution (LEI).

---
date: 11/14/19
type: release
product: documentation
---
The Documentation for 2020 Annual and Quarterly filing deadlines has been released.
