import{O as reactExports,s as getDefaultExportFromCjs,E as jsxRuntimeExports,z as iconSprite,o as commonjsRequire,G as ordinal,aB as useHistory,aC as useLocation,S as Switch,j as Route,c as LoadingIcon}from"./index-BJB5pQPx.js";import{M as Markdown}from"./index-PLK3kmO8.js";import{B as Buffer}from"./index-CgqXENQe.js";function useRemoteMarkdown(a,f={}){const[m,s]=reactExports.useState(f.defaultData),[h,p]=reactExports.useState(!1),[g,v]=reactExports.useState(null),{forceFetch:l}=f,u=l||window.location.host.indexOf("localhost")<0;return reactExports.useEffect(()=>{u&&(p(!0),v(null),fetch(a).then(i=>i.ok?i.text():Promise.reject(i)).then(i=>{f.transformReceive?s(f.transformReceive(i)):s(i),p(!1)}).catch(i=>{const{status:n,statusText:t}=i;p(!1),v(f.errorMsg||`Error: ${n} - ${t}`)}))},[]),[m,h,g]}const defaultChangeLog=`---
date: 07/31/26
type: announcement
product: tools
---
For 2024 data and later, the Institutions API will be populated with data from the HMDA Transmittal Sheet, instead of the HMDA Panel. This change was made to ensure that data provided by the Institution API are current since the HMDA Panel was discontinued. 

The HMDA Panel contained more fields than the HMDA Transmittal Sheet. Fields not available from the HMDA Transmittal Sheet will return as default empty values. Data from 2023 and earlier is populated from the HMDA Panel and all fields in the API are used where data was relevant and available. 

For more details about the Institutions API see the [developer documentation](https://ffiec.cfpb.gov/documentation/api/institutions-api/#search-for-an-institution-by-lei).

For more detailed information on HMDA Filers see the [HMDA Lender File](https://www.philadelphiafed.org/surveys-and-data/consumer-finance-data/home-mortgage-disclosure-act-lender-file).

### API Documentation 

This API is used to fetch information for a particular institution by the institution's LEI. 
 
Beginning with the data for 2024, the data source is populated by the HMDA Transmittal Sheet. Fields not found in the HMDA Transmittal Sheet will return as default empty values.  

The following fields will always return the value "-1": \`institutionType\`, \`rssd\`, \`parent.idRssd\`, \`assets\`, \`otherLenderCode\`, \`topHolder.idRssd\`.

The following fields will always return an empty string: \`institutionId2017\`, \`parent.name\`, \`topHolder.name\`.

Data from 2023 and earlier is populated from the HMDA Panel and all fields in the API are used where data was relevant and available.

---
date: 06/23/26
type: release
product: datasets
---
The 2025 national loan-level datasets, disclosure reports, and MSA/MD aggregate reports were released and can be accessed via the Data Publication page. Users can now explore 2025 HMDA data using the Data Browser's dataset filtering tool and maps. The 2024 One Year Dataset and the 2022 Three Year Dataset were also released.

- [Data Publication](https://ffiec.cfpb.gov/data-publication/)
- [Data Browser](https://ffiec.cfpb.gov/data-browser/data/)
- [Maps](https://ffiec.cfpb.gov/data-browser/maps/)

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
Downloadable [modified LAR files](https://ffiec.cfpb.gov/data-publication/modified-lar/2025) have been updated to use \`.txt\` instead of \`.csv\` file extensions to align with their content. Users wanting to open these files in spreadsheet editors like Excel can [refer to our documentation](https://ffiec.cfpb.gov/documentation/publications/modified-lar/resources/mlar-with-excel). Additionally, the 2017 modified LAR file names have been updated to include the RSSD ID of the institution. 

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
- **\`No associated institutions\` message:** If you login to the HMDA Platform and receive a message stating \`No associated institutions\`, please send an email to [hmdahelp@cfpb.gov](mailto:hmdahelp@cfpb.gov).  HMDA Help can assist you with adding your institution to your account, so you are able to complete your filing.
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
`,PRODUCT_NAMES={mlar:"Modified LAR",datasets:"National Datasets",reports:"Reports",documentation:"Documentation",tools:"HMDA Tools",filing:"HMDA Filing"},PRODUCTS=Object.keys(PRODUCT_NAMES),CATEGORIES={correction:{order:4},update:{order:3},release:{order:2},announcement:{order:1}},PUB_CHANGELOG_URL="https://raw.githubusercontent.com/cfpb/hmda-frontend/ddbb20a9ac84fddbfebb682c645e5fe72800ca84/src/updates-notes/change-log.md",DEFAULT_FILTERS={type:[],product:[],keywords:[]},FILTER_OPTIONS={PRODUCT:PRODUCTS.map(a=>({value:a,type:"product"})),TYPE:Object.keys(CATEGORIES).sort((a,f)=>CATEGORIES[a].order-CATEGORIES[f].order).map(a=>({value:a,type:"type"}))};var mark$2={exports:{}};/*!***************************************************
* mark.js v8.11.1
* https://markjs.io/
* Copyright (c) 2014–2018, Julian Kühnel
* Released under the MIT license https://git.io/vwTVl
*****************************************************/var mark$1=mark$2.exports,hasRequiredMark$1;function requireMark$1(){return hasRequiredMark$1||(hasRequiredMark$1=1,function(a,f){(function(m,s){a.exports=s()})(mark$1,function(){var m=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(u){return typeof u}:function(u){return u&&typeof Symbol=="function"&&u.constructor===Symbol&&u!==Symbol.prototype?"symbol":typeof u},s=function(u,i){if(!(u instanceof i))throw new TypeError("Cannot call a class as a function")},h=function(){function u(i,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(i,o.key,o)}}return function(i,n,t){return n&&u(i.prototype,n),t&&u(i,t),i}}(),p=Object.assign||function(u){for(var i=1;i<arguments.length;i++){var n=arguments[i];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(u[t]=n[t])}return u},g=function(){function u(i){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],o=arguments.length>3&&arguments[3]!==void 0?arguments[3]:5e3;s(this,u),this.ctx=i,this.iframes=n,this.exclude=t,this.iframesTimeout=o}return h(u,[{key:"getContexts",value:function(){var n=void 0,t=[];return typeof this.ctx>"u"||!this.ctx?n=[]:NodeList.prototype.isPrototypeOf(this.ctx)?n=Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?n=this.ctx:typeof this.ctx=="string"?n=Array.prototype.slice.call(document.querySelectorAll(this.ctx)):n=[this.ctx],n.forEach(function(o){var c=t.filter(function(y){return y.contains(o)}).length>0;t.indexOf(o)===-1&&!c&&t.push(o)}),t}},{key:"getIframeContents",value:function(n,t){var o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(){},c=void 0;try{var y=n.contentWindow;if(c=y.document,!y||!c)throw new Error("iframe inaccessible")}catch{o()}c&&t(c)}},{key:"isIframeBlank",value:function(n){var t="about:blank",o=n.getAttribute("src").trim(),c=n.contentWindow.location.href;return c===t&&o!==t&&o}},{key:"observeIframeLoad",value:function(n,t,o){var c=this,y=!1,E=null,R=function C(){if(!y){y=!0,clearTimeout(E);try{c.isIframeBlank(n)||(n.removeEventListener("load",C),c.getIframeContents(n,t,o))}catch{o()}}};n.addEventListener("load",R),E=setTimeout(R,this.iframesTimeout)}},{key:"onIframeReady",value:function(n,t,o){try{n.contentWindow.document.readyState==="complete"?this.isIframeBlank(n)?this.observeIframeLoad(n,t,o):this.getIframeContents(n,t,o):this.observeIframeLoad(n,t,o)}catch{o()}}},{key:"waitForIframes",value:function(n,t){var o=this,c=0;this.forEachIframe(n,function(){return!0},function(y){c++,o.waitForIframes(y.querySelector("html"),function(){--c||t()})},function(y){y||t()})}},{key:"forEachIframe",value:function(n,t,o){var c=this,y=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},E=n.querySelectorAll("iframe"),R=E.length,C=0;E=Array.prototype.slice.call(E);var O=function(){--R<=0&&y(C)};R||O(),E.forEach(function(j){u.matches(j,c.exclude)?O():c.onIframeReady(j,function(N){t(j)&&(C++,o(N)),O()},O)})}},{key:"createIterator",value:function(n,t,o){return document.createNodeIterator(n,t,o,!1)}},{key:"createInstanceOnIframe",value:function(n){return new u(n.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(n,t,o){var c=n.compareDocumentPosition(o),y=Node.DOCUMENT_POSITION_PRECEDING;if(c&y)if(t!==null){var E=t.compareDocumentPosition(o),R=Node.DOCUMENT_POSITION_FOLLOWING;if(E&R)return!0}else return!0;return!1}},{key:"getIteratorNode",value:function(n){var t=n.previousNode(),o=void 0;return t===null?o=n.nextNode():o=n.nextNode()&&n.nextNode(),{prevNode:t,node:o}}},{key:"checkIframeFilter",value:function(n,t,o,c){var y=!1,E=!1;return c.forEach(function(R,C){R.val===o&&(y=C,E=R.handled)}),this.compareNodeIframe(n,t,o)?(y===!1&&!E?c.push({val:o,handled:!0}):y!==!1&&!E&&(c[y].handled=!0),!0):(y===!1&&c.push({val:o,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(n,t,o,c){var y=this;n.forEach(function(E){E.handled||y.getIframeContents(E.val,function(R){y.createInstanceOnIframe(R).forEachNode(t,o,c)})})}},{key:"iterateThroughNodes",value:function(n,t,o,c,y){for(var E=this,R=this.createIterator(t,n,c),C=[],O=[],j=void 0,N=void 0,H=function(){var G=E.getIteratorNode(R);return N=G.prevNode,j=G.node,j};H();)this.iframes&&this.forEachIframe(t,function(B){return E.checkIframeFilter(j,N,B,C)},function(B){E.createInstanceOnIframe(B).forEachNode(n,function(G){return O.push(G)},c)}),O.push(j);O.forEach(function(B){o(B)}),this.iframes&&this.handleOpenIframes(C,n,o,c),y()}},{key:"forEachNode",value:function(n,t,o){var c=this,y=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},E=this.getContexts(),R=E.length;R||y(),E.forEach(function(C){var O=function(){c.iterateThroughNodes(n,C,t,o,function(){--R<=0&&y()})};c.iframes?c.waitForIframes(C,O):O()})}}],[{key:"matches",value:function(n,t){var o=typeof t=="string"?[t]:t,c=n.matches||n.matchesSelector||n.msMatchesSelector||n.mozMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector;if(c){var y=!1;return o.every(function(E){return c.call(n,E)?(y=!0,!1):!0}),y}else return!1}}]),u}(),v=function(){function u(i){s(this,u),this.ctx=i,this.ie=!1;var n=window.navigator.userAgent;(n.indexOf("MSIE")>-1||n.indexOf("Trident")>-1)&&(this.ie=!0)}return h(u,[{key:"log",value:function(n){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"debug",o=this.opt.log;this.opt.debug&&(typeof o>"u"?"undefined":m(o))==="object"&&typeof o[t]=="function"&&o[t]("mark.js: "+n)}},{key:"escapeStr",value:function(n){return n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(n){return this.opt.wildcards!=="disabled"&&(n=this.setupWildcardsRegExp(n)),n=this.escapeStr(n),Object.keys(this.opt.synonyms).length&&(n=this.createSynonymsRegExp(n)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(n=this.setupIgnoreJoinersRegExp(n)),this.opt.diacritics&&(n=this.createDiacriticsRegExp(n)),n=this.createMergedBlanksRegExp(n),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(n=this.createJoinersRegExp(n)),this.opt.wildcards!=="disabled"&&(n=this.createWildcardsRegExp(n)),n=this.createAccuracyRegExp(n),n}},{key:"createSynonymsRegExp",value:function(n){var t=this.opt.synonyms,o=this.opt.caseSensitive?"":"i",c=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var y in t)if(t.hasOwnProperty(y)){var E=t[y],R=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(y):this.escapeStr(y),C=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(E):this.escapeStr(E);R!==""&&C!==""&&(n=n.replace(new RegExp("("+this.escapeStr(R)+"|"+this.escapeStr(C)+")","gm"+o),c+("("+this.processSynomyms(R)+"|")+(this.processSynomyms(C)+")")+c))}return n}},{key:"processSynomyms",value:function(n){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(n=this.setupIgnoreJoinersRegExp(n)),n}},{key:"setupWildcardsRegExp",value:function(n){return n=n.replace(/(?:\\)*\?/g,function(t){return t.charAt(0)==="\\"?"?":""}),n.replace(/(?:\\)*\*/g,function(t){return t.charAt(0)==="\\"?"*":""})}},{key:"createWildcardsRegExp",value:function(n){var t=this.opt.wildcards==="withSpaces";return n.replace(/\u0001/g,t?"[\\S\\s]?":"\\S?").replace(/\u0002/g,t?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(n){return n.replace(/[^(|)\\]/g,function(t,o,c){var y=c.charAt(o+1);return/[(|)\\]/.test(y)||y===""?t:t+"\0"})}},{key:"createJoinersRegExp",value:function(n){var t=[],o=this.opt.ignorePunctuation;return Array.isArray(o)&&o.length&&t.push(this.escapeStr(o.join(""))),this.opt.ignoreJoiners&&t.push("\\u00ad\\u200b\\u200c\\u200d"),t.length?n.split(/\u0000+/).join("["+t.join("")+"]*"):n}},{key:"createDiacriticsRegExp",value:function(n){var t=this.opt.caseSensitive?"":"i",o=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],c=[];return n.split("").forEach(function(y){o.every(function(E){if(E.indexOf(y)!==-1){if(c.indexOf(E)>-1)return!1;n=n.replace(new RegExp("["+E+"]","gm"+t),"["+E+"]"),c.push(E)}return!0})}),n}},{key:"createMergedBlanksRegExp",value:function(n){return n.replace(/[\s]+/gmi,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(n){var t=this,o="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿",c=this.opt.accuracy,y=typeof c=="string"?c:c.value,E=typeof c=="string"?[]:c.limiters,R="";switch(E.forEach(function(C){R+="|"+t.escapeStr(C)}),y){case"partially":default:return"()("+n+")";case"complementary":return R="\\s"+(R||this.escapeStr(o)),"()([^"+R+"]*"+n+"[^"+R+"]*)";case"exactly":return"(^|\\s"+R+")("+n+")(?=$|\\s"+R+")"}}},{key:"getSeparatedKeywords",value:function(n){var t=this,o=[];return n.forEach(function(c){t.opt.separateWordSearch?c.split(" ").forEach(function(y){y.trim()&&o.indexOf(y)===-1&&o.push(y)}):c.trim()&&o.indexOf(c)===-1&&o.push(c)}),{keywords:o.sort(function(c,y){return y.length-c.length}),length:o.length}}},{key:"isNumeric",value:function(n){return Number(parseFloat(n))==n}},{key:"checkRanges",value:function(n){var t=this;if(!Array.isArray(n)||Object.prototype.toString.call(n[0])!=="[object Object]")return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(n),[];var o=[],c=0;return n.sort(function(y,E){return y.start-E.start}).forEach(function(y){var E=t.callNoMatchOnInvalidRanges(y,c),R=E.start,C=E.end,O=E.valid;O&&(y.start=R,y.length=C-R,o.push(y),c=C)}),o}},{key:"callNoMatchOnInvalidRanges",value:function(n,t){var o=void 0,c=void 0,y=!1;return n&&typeof n.start<"u"?(o=parseInt(n.start,10),c=o+parseInt(n.length,10),this.isNumeric(n.start)&&this.isNumeric(n.length)&&c-t>0&&c-o>0?y=!0:(this.log("Ignoring invalid or overlapping range: "+(""+JSON.stringify(n))),this.opt.noMatch(n))):(this.log("Ignoring invalid range: "+JSON.stringify(n)),this.opt.noMatch(n)),{start:o,end:c,valid:y}}},{key:"checkWhitespaceRanges",value:function(n,t,o){var c=void 0,y=!0,E=o.length,R=t-E,C=parseInt(n.start,10)-R;return C=C>E?E:C,c=C+parseInt(n.length,10),c>E&&(c=E,this.log("End range automatically set to the max value of "+E)),C<0||c-C<0||C>E||c>E?(y=!1,this.log("Invalid range: "+JSON.stringify(n)),this.opt.noMatch(n)):o.substring(C,c).replace(/\s+/g,"")===""&&(y=!1,this.log("Skipping whitespace only range: "+JSON.stringify(n)),this.opt.noMatch(n)),{start:C,end:c,valid:y}}},{key:"getTextNodes",value:function(n){var t=this,o="",c=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(y){c.push({start:o.length,end:(o+=y.textContent).length,node:y})},function(y){return t.matchesExclude(y.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){n({value:o,nodes:c})})}},{key:"matchesExclude",value:function(n){return g.matches(n,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(n,t,o){var c=this.opt.element?this.opt.element:"mark",y=n.splitText(t),E=y.splitText(o-t),R=document.createElement(c);return R.setAttribute("data-markjs","true"),this.opt.className&&R.setAttribute("class",this.opt.className),R.textContent=y.textContent,y.parentNode.replaceChild(R,y),E}},{key:"wrapRangeInMappedTextNode",value:function(n,t,o,c,y){var E=this;n.nodes.every(function(R,C){var O=n.nodes[C+1];if(typeof O>"u"||O.start>t){if(!c(R.node))return!1;var j=t-R.start,N=(o>R.end?R.end:o)-R.start,H=n.value.substr(0,R.start),B=n.value.substr(N+R.start);if(R.node=E.wrapRangeInTextNode(R.node,j,N),n.value=H+B,n.nodes.forEach(function(G,$){$>=C&&(n.nodes[$].start>0&&$!==C&&(n.nodes[$].start-=N),n.nodes[$].end-=N)}),o-=N,y(R.node.previousSibling,R.start),o>R.end)t=R.end;else return!1}return!0})}},{key:"wrapMatches",value:function(n,t,o,c,y){var E=this,R=t===0?0:t+1;this.getTextNodes(function(C){C.nodes.forEach(function(O){O=O.node;for(var j=void 0;(j=n.exec(O.textContent))!==null&&j[R]!=="";)if(o(j[R],O)){var N=j.index;if(R!==0)for(var H=1;H<R;H++)N+=j[H].length;O=E.wrapRangeInTextNode(O,N,N+j[R].length),c(O.previousSibling),n.lastIndex=0}}),y()})}},{key:"wrapMatchesAcrossElements",value:function(n,t,o,c,y){var E=this,R=t===0?0:t+1;this.getTextNodes(function(C){for(var O=void 0;(O=n.exec(C.value))!==null&&O[R]!=="";){var j=O.index;if(R!==0)for(var N=1;N<R;N++)j+=O[N].length;var H=j+O[R].length;E.wrapRangeInMappedTextNode(C,j,H,function(B){return o(O[R],B)},function(B,G){n.lastIndex=G,c(B)})}y()})}},{key:"wrapRangeFromIndex",value:function(n,t,o,c){var y=this;this.getTextNodes(function(E){var R=E.value.length;n.forEach(function(C,O){var j=y.checkWhitespaceRanges(C,R,E.value),N=j.start,H=j.end,B=j.valid;B&&y.wrapRangeInMappedTextNode(E,N,H,function(G){return t(G,C,E.value.substring(N,H),O)},function(G){o(G,C)})}),c()})}},{key:"unwrapMatches",value:function(n){for(var t=n.parentNode,o=document.createDocumentFragment();n.firstChild;)o.appendChild(n.removeChild(n.firstChild));t.replaceChild(o,n),this.ie?this.normalizeTextNode(t):t.normalize()}},{key:"normalizeTextNode",value:function(n){if(n){if(n.nodeType===3)for(;n.nextSibling&&n.nextSibling.nodeType===3;)n.nodeValue+=n.nextSibling.nodeValue,n.parentNode.removeChild(n.nextSibling);else this.normalizeTextNode(n.firstChild);this.normalizeTextNode(n.nextSibling)}}},{key:"markRegExp",value:function(n,t){var o=this;this.opt=t,this.log('Searching with expression "'+n+'"');var c=0,y="wrapMatches",E=function(C){c++,o.opt.each(C)};this.opt.acrossElements&&(y="wrapMatchesAcrossElements"),this[y](n,this.opt.ignoreGroups,function(R,C){return o.opt.filter(C,R,c)},E,function(){c===0&&o.opt.noMatch(n),o.opt.done(c)})}},{key:"mark",value:function(n,t){var o=this;this.opt=t;var c=0,y="wrapMatches",E=this.getSeparatedKeywords(typeof n=="string"?[n]:n),R=E.keywords,C=E.length,O=this.opt.caseSensitive?"":"i",j=function N(H){var B=new RegExp(o.createRegExp(H),"gm"+O),G=0;o.log('Searching with expression "'+B+'"'),o[y](B,1,function($,X){return o.opt.filter(X,H,c,G)},function($){G++,c++,o.opt.each($)},function(){G===0&&o.opt.noMatch(H),R[C-1]===H?o.opt.done(c):N(R[R.indexOf(H)+1])})};this.opt.acrossElements&&(y="wrapMatchesAcrossElements"),C===0?this.opt.done(c):j(R[0])}},{key:"markRanges",value:function(n,t){var o=this;this.opt=t;var c=0,y=this.checkRanges(n);y&&y.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(y)),this.wrapRangeFromIndex(y,function(E,R,C,O){return o.opt.filter(E,R,C,O)},function(E,R){c++,o.opt.each(E,R)},function(){o.opt.done(c)})):this.opt.done(c)}},{key:"unmark",value:function(n){var t=this;this.opt=n;var o=this.opt.element?this.opt.element:"*";o+="[data-markjs]",this.opt.className&&(o+="."+this.opt.className),this.log('Removal selector "'+o+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(c){t.unwrapMatches(c)},function(c){var y=g.matches(c,o),E=t.matchesExclude(c);return!y||E?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:"opt",set:function(n){this._opt=p({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},n)},get:function(){return this._opt}},{key:"iterator",get:function(){return new g(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),u}();function l(u){var i=this,n=new v(u);return this.mark=function(t,o){return n.mark(t,o),i},this.markRegExp=function(t,o){return n.markRegExp(t,o),i},this.markRanges=function(t,o){return n.markRanges(t,o),i},this.unmark=function(t){return n.unmark(t),i},this}return l})}(mark$2)),mark$2.exports}var markExports=requireMark$1();const Mark=getDefaultExportFromCjs(markExports),MAX_HEIGHT=400;function ExpandableDescription({description:a,highlightWords:f=[]}){const m=reactExports.useRef(null),[s,h]=reactExports.useState(!1),[p,g]=reactExports.useState(!1);reactExports.useEffect(()=>{if(m.current){const l=m.current.scrollHeight;g(l>MAX_HEIGHT)}},[a]),reactExports.useEffect(()=>{if(m.current){const l=new Mark(m.current);l.unmark(),(f==null?void 0:f.length)>0&&l.mark(f,{className:"highlighted",separateWordSearch:!0})}},[f,a]);const v=()=>{h(!s)};return jsxRuntimeExports.jsxs("div",{className:"expandable-description-wrapper",children:[jsxRuntimeExports.jsx("div",{ref:m,className:`expandable-description-content ${s?"expanded":"collapsed"} ${p?"needs-expansion":""}`,style:!s&&p?{maxHeight:`${MAX_HEIGHT}px`}:void 0,children:jsxRuntimeExports.jsx(Markdown,{children:a})}),p&&jsxRuntimeExports.jsx("button",{className:"usa-button usa-button--outline read-more-button",onClick:v,type:"button","aria-expanded":s,children:s?"Read less":"Read more"})]})}function FilterResetButton({onClick:a}){return jsxRuntimeExports.jsx("button",{className:"reset-filters",onClick:a,type:"button",children:"Reset All Filters"})}function ChangeLogTable({data:a={},products:f=PRODUCT_NAMES,filter:m,changeLog:s}){const h=reactExports.useMemo(()=>Object.keys(s).map(u=>s[u].length).reduce((u,i)=>u+i,0),[s]),p=Object.keys(m.filters).some(u=>m.filters[u].length),v=Object.keys(a).map((u,i)=>{const n=a[u];return!n||!n.length?null:n.map((t,o)=>jsxRuntimeExports.jsx(Row,{item:t,products:f,filter:m},`clt-row-${i}col-${o}`))}).flat().filter(u=>u),l=!v.length;return jsxRuntimeExports.jsxs("div",{id:"ChangeLogTable",children:[jsxRuntimeExports.jsx("div",{id:"ChangeLogTableTop"}),jsxRuntimeExports.jsx(ResultCount,{count:v.length,total:h,hide:!p}),jsxRuntimeExports.jsx(EmptyState,{clear:m.clear,isEmpty:l}),v]})}function ResultCount({count:a,total:f,hide:m}){return m?null:jsxRuntimeExports.jsxs("div",{className:"result-count",children:[jsxRuntimeExports.jsxs("h3",{className:"header",children:[jsxRuntimeExports.jsx("svg",{className:"filtersIcon","aria-hidden":"true",focusable:"false",role:"img",children:jsxRuntimeExports.jsx("use",{href:`${iconSprite}#filters`})}),"Filtered results"]}),jsxRuntimeExports.jsxs("div",{className:"body",children:["Showing ",jsxRuntimeExports.jsx("span",{className:"highlight",children:a})," out of"," ",jsxRuntimeExports.jsx("span",{className:"highlight",children:f})," entries"]})]})}function EmptyState({clear:a,isEmpty:f}){return f?jsxRuntimeExports.jsxs("div",{className:"empty-state",children:[jsxRuntimeExports.jsx("span",{role:"img","aria-label":"warning sign",children:"⚠️"})," ","No matches found.",jsxRuntimeExports.jsx(FilterResetButton,{onClick:()=>a()})]}):null}function Row({item:a,filter:f,products:m}){const s="change-row split",h=`product ${a.product}${f.filters.product.indexOf(a.product)>-1?" selected":""}`,p=()=>f.toggle("type",a.type),g=()=>f.toggle("product",a.product);return jsxRuntimeExports.jsxs("div",{className:s,id:a.slug,children:[jsxRuntimeExports.jsx(Column,{className:h,value:m[a.product],onClick:g}),jsxRuntimeExports.jsx(Column,{className:"changeType",children:jsxRuntimeExports.jsx("button",{className:`pill type ${a.type}`,onClick:p,type:"button",children:jsxRuntimeExports.jsx("div",{className:"text",children:a.type})})}),jsxRuntimeExports.jsx(Column,{className:"date",children:jsxRuntimeExports.jsx("a",{href:`#${a.slug}`,children:a.changeDateOrdinal})}),jsxRuntimeExports.jsx(Column,{className:"description",children:jsxRuntimeExports.jsx(ExpandableDescription,{description:a.description,highlightWords:f.filters.keywords})})]})}function Column({value:a,onClick:f=()=>null,className:m,children:s}){return m.indexOf("product")>-1?jsxRuntimeExports.jsx("button",{onClick:f,className:`column ${m}`,type:"button",children:a||s}):jsxRuntimeExports.jsx("div",{onClick:f,className:`column ${m}`,children:a||s})}const spyGlass="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20880.6%201200'%20class='cf-icon-svg'%3e%3cpath%20d='M860.1%20879.2L645.7%20664.8c90.8-136.8%2076-323-44.6-443.5-137.5-137.5-360.5-137.5-498%200s-137.5%20360.5%200%20498c118.5%20118.4%20303.9%20137%20443.5%2044.6L761%20978.3c27.3%2027.3%2071.7%2027.3%2099%200s27.4-71.8.1-99.1zm-508-116.9C191.4%20762%2061.3%20631.5%2061.6%20470.8c.3-160.7%20130.8-290.8%20291.5-290.5s290.8%20130.8%20290.5%20291.5c-.2%20118.2-71.9%20224.6-181.5%20269.1-34.9%2014.2-72.3%2021.5-110%2021.4z'%3e%3c/path%3e%3c/svg%3e";function FilterBar({productOptions:a,typeOptions:f,filter:m}){const s=m.filters.keywords?m.filters.keywords.join(" "):"",[h,p]=reactExports.useState(!1),g=()=>{p(!h)};return jsxRuntimeExports.jsx("div",{id:"filter-bar",children:jsxRuntimeExports.jsxs("div",{className:`filter-wrapper split ${h?"expanded":""}`,children:[jsxRuntimeExports.jsxs("h4",{className:"filter-title",onClick:g,children:[jsxRuntimeExports.jsx("svg",{className:"filterIcon","aria-hidden":"true",focusable:"false",role:"img",children:jsxRuntimeExports.jsx("use",{href:`${iconSprite}#filter_alt`})}),jsxRuntimeExports.jsx("span",{children:"Filter by:"})]}),jsxRuntimeExports.jsx(FilterColumn,{name:"type",heading:"Type",options:f,filter:m}),jsxRuntimeExports.jsx(FilterColumn,{name:"product",heading:"Product",options:a,filter:m}),jsxRuntimeExports.jsxs("div",{className:"search-wrapper",children:[jsxRuntimeExports.jsx(SearchField,{id:"search-input",value:s,label:"Description",onChange:v=>{m.add("keywords",v.target.value),document.getElementById("ChangeLogTableTop").scrollIntoView()},onClear:()=>m.clear("keywords")}),jsxRuntimeExports.jsx(FilterResetButton,{onClick:()=>m.clear()})]})]})})}function SearchField({id:a,label:f,value:m,onChange:s,placeholder:h="Search",onClear:p}){return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment,{children:[jsxRuntimeExports.jsx("h3",{children:jsxRuntimeExports.jsx("label",{htmlFor:a,children:f})}),jsxRuntimeExports.jsxs("div",{className:"text-input",children:[jsxRuntimeExports.jsx("span",{className:"icon",children:jsxRuntimeExports.jsx("img",{src:spyGlass,alt:"Magnifying glass"})}),jsxRuntimeExports.jsxs("div",{className:"search-input-wrapper",children:[jsxRuntimeExports.jsx("input",{id:a,type:"text",value:m,onChange:s,placeholder:h}),jsxRuntimeExports.jsx("button",{type:"button",className:"clear-text",onClick:p,children:"x"})]})]})]})}function FilterColumn({name:a,options:f,heading:m,filter:s}){return jsxRuntimeExports.jsxs("div",{className:`pills-wrapper ${a}`,children:[jsxRuntimeExports.jsx("h3",{children:m}),jsxRuntimeExports.jsx("div",{className:"pills split columns",children:f.map((h,p)=>jsxRuntimeExports.jsx(FilterPill,{option:h,filter:s},`${h.type}-${p}`))})]})}function FilterPill({option:a,filter:f}){const{type:m,value:s}=a,{toggle:h,filters:p}=f,g=`pill-${m}-${s}`,v=m==="product"?PRODUCT_NAMES:null,l=p[a.type].indexOf(a.value)>-1?"selected":"",[u,i]=reactExports.useState(!1);return reactExports.useEffect(()=>{window.scrollTo(0,0)},[]),reactExports.useEffect(()=>{u&&(document.getElementById("focus-on-filter-bar").scrollIntoView(),i(!1))},[u]),jsxRuntimeExports.jsxs("button",{id:g,type:"button",className:`pill ${m} ${s} ${l}`,onClick:()=>{h(m,s),i(!u)},children:[jsxRuntimeExports.jsx("span",{className:"icon",children:l?"✓":"+"}),jsxRuntimeExports.jsx("div",{className:"text",children:v?v[s]:s})]})}var empty_1,hasRequiredEmpty;function requireEmpty(){if(hasRequiredEmpty)return empty_1;hasRequiredEmpty=1;var a=null;return empty_1=a,empty_1}var kindOf,hasRequiredKindOf;function requireKindOf(){if(hasRequiredKindOf)return kindOf;hasRequiredKindOf=1;var a=Object.prototype.toString;kindOf=function(n){if(n===void 0)return"undefined";if(n===null)return"null";var t=typeof n;if(t==="boolean")return"boolean";if(t==="string")return"string";if(t==="number")return"number";if(t==="symbol")return"symbol";if(t==="function")return g(n)?"generatorfunction":"function";if(m(n))return"array";if(u(n))return"buffer";if(l(n))return"arguments";if(h(n))return"date";if(s(n))return"error";if(p(n))return"regexp";switch(f(n)){case"Symbol":return"symbol";case"Promise":return"promise";case"WeakMap":return"weakmap";case"WeakSet":return"weakset";case"Map":return"map";case"Set":return"set";case"Int8Array":return"int8array";case"Uint8Array":return"uint8array";case"Uint8ClampedArray":return"uint8clampedarray";case"Int16Array":return"int16array";case"Uint16Array":return"uint16array";case"Int32Array":return"int32array";case"Uint32Array":return"uint32array";case"Float32Array":return"float32array";case"Float64Array":return"float64array"}if(v(n))return"generator";switch(t=a.call(n),t){case"[object Object]":return"object";case"[object Map Iterator]":return"mapiterator";case"[object Set Iterator]":return"setiterator";case"[object String Iterator]":return"stringiterator";case"[object Array Iterator]":return"arrayiterator"}return t.slice(8,-1).toLowerCase().replace(/\s/g,"")};function f(i){return typeof i.constructor=="function"?i.constructor.name:null}function m(i){return Array.isArray?Array.isArray(i):i instanceof Array}function s(i){return i instanceof Error||typeof i.message=="string"&&i.constructor&&typeof i.constructor.stackTraceLimit=="number"}function h(i){return i instanceof Date?!0:typeof i.toDateString=="function"&&typeof i.getDate=="function"&&typeof i.setDate=="function"}function p(i){return i instanceof RegExp?!0:typeof i.flags=="string"&&typeof i.ignoreCase=="boolean"&&typeof i.multiline=="boolean"&&typeof i.global=="boolean"}function g(i,n){return f(i)==="GeneratorFunction"}function v(i){return typeof i.throw=="function"&&typeof i.return=="function"&&typeof i.next=="function"}function l(i){try{if(typeof i.length=="number"&&typeof i.callee=="function")return!0}catch(n){if(n.message.indexOf("callee")!==-1)return!0}return!1}function u(i){return i.constructor&&typeof i.constructor.isBuffer=="function"?i.constructor.isBuffer(i):!1}return kindOf}/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */var isExtendable,hasRequiredIsExtendable;function requireIsExtendable(){return hasRequiredIsExtendable||(hasRequiredIsExtendable=1,isExtendable=function(f){return typeof f<"u"&&f!==null&&(typeof f=="object"||typeof f=="function")}),isExtendable}var extendShallow,hasRequiredExtendShallow;function requireExtendShallow(){if(hasRequiredExtendShallow)return extendShallow;hasRequiredExtendShallow=1;var a=requireIsExtendable();extendShallow=function(h){a(h)||(h={});for(var p=arguments.length,g=1;g<p;g++){var v=arguments[g];a(v)&&f(h,v)}return h};function f(s,h){for(var p in h)m(h,p)&&(s[p]=h[p])}function m(s,h){return Object.prototype.hasOwnProperty.call(s,h)}return extendShallow}var sectionMatter,hasRequiredSectionMatter;function requireSectionMatter(){if(hasRequiredSectionMatter)return sectionMatter;hasRequiredSectionMatter=1;var a=requireKindOf(),f=requireExtendShallow();sectionMatter=function(l,u){typeof u=="function"&&(u={parse:u});var i=s(l),n={section_delimiter:"---",parse:g},t=f({},n,u),o=t.section_delimiter,c=i.content.split(/\r?\n/),y=null,E=p(),R=[],C=[];function O($){i.content=$,y=[],R=[]}function j($){C.length&&(E.key=h(C[0],o),E.content=$,t.parse(E,y),y.push(E),E=p(),R=[],C=[])}for(var N=0;N<c.length;N++){var H=c[N],B=C.length,G=H.trim();if(m(G,o)){if(G.length===3&&N!==0){if(B===0||B===2){R.push(H);continue}C.push(G),E.data=R.join(`
`),R=[];continue}y===null&&O(R.join(`
`)),B===2&&j(R.join(`
`)),C.push(G);continue}R.push(H)}return y===null?O(R.join(`
`)):j(R.join(`
`)),i.sections=y,i};function m(l,u){return!(l.slice(0,u.length)!==u||l.charAt(u.length+1)===u.slice(-1))}function s(l){if(a(l)!=="object"&&(l={content:l}),typeof l.content!="string"&&!v(l.content))throw new TypeError("expected a buffer or string");return l.content=l.content.toString(),l.sections=[],l}function h(l,u){return l?l.slice(u.length).trim():""}function p(){return{key:"",data:"",content:""}}function g(l){return l}function v(l){return l&&l.constructor&&typeof l.constructor.isBuffer=="function"?l.constructor.isBuffer(l):!1}return sectionMatter}var engines={exports:{}},jsYaml$1={},loader={},common={},hasRequiredCommon;function requireCommon(){if(hasRequiredCommon)return common;hasRequiredCommon=1;function a(g){return typeof g>"u"||g===null}function f(g){return typeof g=="object"&&g!==null}function m(g){return Array.isArray(g)?g:a(g)?[]:[g]}function s(g,v){var l,u,i,n;if(v)for(n=Object.keys(v),l=0,u=n.length;l<u;l+=1)i=n[l],g[i]=v[i];return g}function h(g,v){var l="",u;for(u=0;u<v;u+=1)l+=g;return l}function p(g){return g===0&&Number.NEGATIVE_INFINITY===1/g}return common.isNothing=a,common.isObject=f,common.toArray=m,common.repeat=h,common.isNegativeZero=p,common.extend=s,common}var exception,hasRequiredException;function requireException(){if(hasRequiredException)return exception;hasRequiredException=1;function a(f,m){Error.call(this),this.name="YAMLException",this.reason=f,this.mark=m,this.message=(this.reason||"(unknown reason)")+(this.mark?" "+this.mark.toString():""),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}return a.prototype=Object.create(Error.prototype),a.prototype.constructor=a,a.prototype.toString=function(m){var s=this.name+": ";return s+=this.reason||"(unknown reason)",!m&&this.mark&&(s+=" "+this.mark.toString()),s},exception=a,exception}var mark,hasRequiredMark;function requireMark(){if(hasRequiredMark)return mark;hasRequiredMark=1;var a=requireCommon();function f(m,s,h,p,g){this.name=m,this.buffer=s,this.position=h,this.line=p,this.column=g}return f.prototype.getSnippet=function(s,h){var p,g,v,l,u;if(!this.buffer)return null;for(s=s||4,h=h||75,p="",g=this.position;g>0&&`\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(g-1))===-1;)if(g-=1,this.position-g>h/2-1){p=" ... ",g+=5;break}for(v="",l=this.position;l<this.buffer.length&&`\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(l))===-1;)if(l+=1,l-this.position>h/2-1){v=" ... ",l-=5;break}return u=this.buffer.slice(g,l),a.repeat(" ",s)+p+u+v+`
`+a.repeat(" ",s+this.position-g+p.length)+"^"},f.prototype.toString=function(s){var h,p="";return this.name&&(p+='in "'+this.name+'" '),p+="at line "+(this.line+1)+", column "+(this.column+1),s||(h=this.getSnippet(),h&&(p+=`:
`+h)),p},mark=f,mark}var type,hasRequiredType;function requireType(){if(hasRequiredType)return type;hasRequiredType=1;var a=requireException(),f=["kind","resolve","construct","instanceOf","predicate","represent","defaultStyle","styleAliases"],m=["scalar","sequence","mapping"];function s(p){var g={};return p!==null&&Object.keys(p).forEach(function(v){p[v].forEach(function(l){g[String(l)]=v})}),g}function h(p,g){if(g=g||{},Object.keys(g).forEach(function(v){if(f.indexOf(v)===-1)throw new a('Unknown option "'+v+'" is met in definition of "'+p+'" YAML type.')}),this.tag=p,this.kind=g.kind||null,this.resolve=g.resolve||function(){return!0},this.construct=g.construct||function(v){return v},this.instanceOf=g.instanceOf||null,this.predicate=g.predicate||null,this.represent=g.represent||null,this.defaultStyle=g.defaultStyle||null,this.styleAliases=s(g.styleAliases||null),m.indexOf(this.kind)===-1)throw new a('Unknown kind "'+this.kind+'" is specified for "'+p+'" YAML type.')}return type=h,type}var schema,hasRequiredSchema;function requireSchema(){if(hasRequiredSchema)return schema;hasRequiredSchema=1;var a=requireCommon(),f=requireException(),m=requireType();function s(g,v,l){var u=[];return g.include.forEach(function(i){l=s(i,v,l)}),g[v].forEach(function(i){l.forEach(function(n,t){n.tag===i.tag&&n.kind===i.kind&&u.push(t)}),l.push(i)}),l.filter(function(i,n){return u.indexOf(n)===-1})}function h(){var g={scalar:{},sequence:{},mapping:{},fallback:{}},v,l;function u(i){g[i.kind][i.tag]=g.fallback[i.tag]=i}for(v=0,l=arguments.length;v<l;v+=1)arguments[v].forEach(u);return g}function p(g){this.include=g.include||[],this.implicit=g.implicit||[],this.explicit=g.explicit||[],this.implicit.forEach(function(v){if(v.loadKind&&v.loadKind!=="scalar")throw new f("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.")}),this.compiledImplicit=s(this,"implicit",[]),this.compiledExplicit=s(this,"explicit",[]),this.compiledTypeMap=h(this.compiledImplicit,this.compiledExplicit)}return p.DEFAULT=null,p.create=function(){var v,l;switch(arguments.length){case 1:v=p.DEFAULT,l=arguments[0];break;case 2:v=arguments[0],l=arguments[1];break;default:throw new f("Wrong number of arguments for Schema.create function")}if(v=a.toArray(v),l=a.toArray(l),!v.every(function(u){return u instanceof p}))throw new f("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");if(!l.every(function(u){return u instanceof m}))throw new f("Specified list of YAML types (or a single Type object) contains a non-Type object.");return new p({include:v,explicit:l})},schema=p,schema}var str,hasRequiredStr;function requireStr(){if(hasRequiredStr)return str;hasRequiredStr=1;var a=requireType();return str=new a("tag:yaml.org,2002:str",{kind:"scalar",construct:function(f){return f!==null?f:""}}),str}var seq,hasRequiredSeq;function requireSeq(){if(hasRequiredSeq)return seq;hasRequiredSeq=1;var a=requireType();return seq=new a("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(f){return f!==null?f:[]}}),seq}var map,hasRequiredMap;function requireMap(){if(hasRequiredMap)return map;hasRequiredMap=1;var a=requireType();return map=new a("tag:yaml.org,2002:map",{kind:"mapping",construct:function(f){return f!==null?f:{}}}),map}var failsafe,hasRequiredFailsafe;function requireFailsafe(){if(hasRequiredFailsafe)return failsafe;hasRequiredFailsafe=1;var a=requireSchema();return failsafe=new a({explicit:[requireStr(),requireSeq(),requireMap()]}),failsafe}var _null,hasRequired_null;function require_null(){if(hasRequired_null)return _null;hasRequired_null=1;var a=requireType();function f(h){if(h===null)return!0;var p=h.length;return p===1&&h==="~"||p===4&&(h==="null"||h==="Null"||h==="NULL")}function m(){return null}function s(h){return h===null}return _null=new a("tag:yaml.org,2002:null",{kind:"scalar",resolve:f,construct:m,predicate:s,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"}},defaultStyle:"lowercase"}),_null}var bool,hasRequiredBool;function requireBool(){if(hasRequiredBool)return bool;hasRequiredBool=1;var a=requireType();function f(h){if(h===null)return!1;var p=h.length;return p===4&&(h==="true"||h==="True"||h==="TRUE")||p===5&&(h==="false"||h==="False"||h==="FALSE")}function m(h){return h==="true"||h==="True"||h==="TRUE"}function s(h){return Object.prototype.toString.call(h)==="[object Boolean]"}return bool=new a("tag:yaml.org,2002:bool",{kind:"scalar",resolve:f,construct:m,predicate:s,represent:{lowercase:function(h){return h?"true":"false"},uppercase:function(h){return h?"TRUE":"FALSE"},camelcase:function(h){return h?"True":"False"}},defaultStyle:"lowercase"}),bool}var int,hasRequiredInt;function requireInt(){if(hasRequiredInt)return int;hasRequiredInt=1;var a=requireCommon(),f=requireType();function m(l){return 48<=l&&l<=57||65<=l&&l<=70||97<=l&&l<=102}function s(l){return 48<=l&&l<=55}function h(l){return 48<=l&&l<=57}function p(l){if(l===null)return!1;var u=l.length,i=0,n=!1,t;if(!u)return!1;if(t=l[i],(t==="-"||t==="+")&&(t=l[++i]),t==="0"){if(i+1===u)return!0;if(t=l[++i],t==="b"){for(i++;i<u;i++)if(t=l[i],t!=="_"){if(t!=="0"&&t!=="1")return!1;n=!0}return n&&t!=="_"}if(t==="x"){for(i++;i<u;i++)if(t=l[i],t!=="_"){if(!m(l.charCodeAt(i)))return!1;n=!0}return n&&t!=="_"}for(;i<u;i++)if(t=l[i],t!=="_"){if(!s(l.charCodeAt(i)))return!1;n=!0}return n&&t!=="_"}if(t==="_")return!1;for(;i<u;i++)if(t=l[i],t!=="_"){if(t===":")break;if(!h(l.charCodeAt(i)))return!1;n=!0}return!n||t==="_"?!1:t!==":"?!0:/^(:[0-5]?[0-9])+$/.test(l.slice(i))}function g(l){var u=l,i=1,n,t,o=[];return u.indexOf("_")!==-1&&(u=u.replace(/_/g,"")),n=u[0],(n==="-"||n==="+")&&(n==="-"&&(i=-1),u=u.slice(1),n=u[0]),u==="0"?0:n==="0"?u[1]==="b"?i*parseInt(u.slice(2),2):u[1]==="x"?i*parseInt(u,16):i*parseInt(u,8):u.indexOf(":")!==-1?(u.split(":").forEach(function(c){o.unshift(parseInt(c,10))}),u=0,t=1,o.forEach(function(c){u+=c*t,t*=60}),i*u):i*parseInt(u,10)}function v(l){return Object.prototype.toString.call(l)==="[object Number]"&&l%1===0&&!a.isNegativeZero(l)}return int=new f("tag:yaml.org,2002:int",{kind:"scalar",resolve:p,construct:g,predicate:v,represent:{binary:function(l){return l>=0?"0b"+l.toString(2):"-0b"+l.toString(2).slice(1)},octal:function(l){return l>=0?"0"+l.toString(8):"-0"+l.toString(8).slice(1)},decimal:function(l){return l.toString(10)},hexadecimal:function(l){return l>=0?"0x"+l.toString(16).toUpperCase():"-0x"+l.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),int}var float,hasRequiredFloat;function requireFloat(){if(hasRequiredFloat)return float;hasRequiredFloat=1;var a=requireCommon(),f=requireType(),m=new RegExp("^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function s(l){return!(l===null||!m.test(l)||l[l.length-1]==="_")}function h(l){var u,i,n,t;return u=l.replace(/_/g,"").toLowerCase(),i=u[0]==="-"?-1:1,t=[],"+-".indexOf(u[0])>=0&&(u=u.slice(1)),u===".inf"?i===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:u===".nan"?NaN:u.indexOf(":")>=0?(u.split(":").forEach(function(o){t.unshift(parseFloat(o,10))}),u=0,n=1,t.forEach(function(o){u+=o*n,n*=60}),i*u):i*parseFloat(u,10)}var p=/^[-+]?[0-9]+e/;function g(l,u){var i;if(isNaN(l))switch(u){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===l)switch(u){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===l)switch(u){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(a.isNegativeZero(l))return"-0.0";return i=l.toString(10),p.test(i)?i.replace("e",".e"):i}function v(l){return Object.prototype.toString.call(l)==="[object Number]"&&(l%1!==0||a.isNegativeZero(l))}return float=new f("tag:yaml.org,2002:float",{kind:"scalar",resolve:s,construct:h,predicate:v,represent:g,defaultStyle:"lowercase"}),float}var json,hasRequiredJson;function requireJson(){if(hasRequiredJson)return json;hasRequiredJson=1;var a=requireSchema();return json=new a({include:[requireFailsafe()],implicit:[require_null(),requireBool(),requireInt(),requireFloat()]}),json}var core,hasRequiredCore;function requireCore(){if(hasRequiredCore)return core;hasRequiredCore=1;var a=requireSchema();return core=new a({include:[requireJson()]}),core}var timestamp,hasRequiredTimestamp;function requireTimestamp(){if(hasRequiredTimestamp)return timestamp;hasRequiredTimestamp=1;var a=requireType(),f=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),m=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function s(g){return g===null?!1:f.exec(g)!==null||m.exec(g)!==null}function h(g){var v,l,u,i,n,t,o,c=0,y=null,E,R,C;if(v=f.exec(g),v===null&&(v=m.exec(g)),v===null)throw new Error("Date resolve error");if(l=+v[1],u=+v[2]-1,i=+v[3],!v[4])return new Date(Date.UTC(l,u,i));if(n=+v[4],t=+v[5],o=+v[6],v[7]){for(c=v[7].slice(0,3);c.length<3;)c+="0";c=+c}return v[9]&&(E=+v[10],R=+(v[11]||0),y=(E*60+R)*6e4,v[9]==="-"&&(y=-y)),C=new Date(Date.UTC(l,u,i,n,t,o,c)),y&&C.setTime(C.getTime()-y),C}function p(g){return g.toISOString()}return timestamp=new a("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:s,construct:h,instanceOf:Date,represent:p}),timestamp}var merge,hasRequiredMerge;function requireMerge(){if(hasRequiredMerge)return merge;hasRequiredMerge=1;var a=requireType();function f(m){return m==="<<"||m===null}return merge=new a("tag:yaml.org,2002:merge",{kind:"scalar",resolve:f}),merge}var binary,hasRequiredBinary;function requireBinary(){if(hasRequiredBinary)return binary;hasRequiredBinary=1;var a;try{var f=commonjsRequire;a=f("buffer").Buffer}catch{}var m=requireType(),s=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function h(l){if(l===null)return!1;var u,i,n=0,t=l.length,o=s;for(i=0;i<t;i++)if(u=o.indexOf(l.charAt(i)),!(u>64)){if(u<0)return!1;n+=6}return n%8===0}function p(l){var u,i,n=l.replace(/[\r\n=]/g,""),t=n.length,o=s,c=0,y=[];for(u=0;u<t;u++)u%4===0&&u&&(y.push(c>>16&255),y.push(c>>8&255),y.push(c&255)),c=c<<6|o.indexOf(n.charAt(u));return i=t%4*6,i===0?(y.push(c>>16&255),y.push(c>>8&255),y.push(c&255)):i===18?(y.push(c>>10&255),y.push(c>>2&255)):i===12&&y.push(c>>4&255),a?a.from?a.from(y):new a(y):y}function g(l){var u="",i=0,n,t,o=l.length,c=s;for(n=0;n<o;n++)n%3===0&&n&&(u+=c[i>>18&63],u+=c[i>>12&63],u+=c[i>>6&63],u+=c[i&63]),i=(i<<8)+l[n];return t=o%3,t===0?(u+=c[i>>18&63],u+=c[i>>12&63],u+=c[i>>6&63],u+=c[i&63]):t===2?(u+=c[i>>10&63],u+=c[i>>4&63],u+=c[i<<2&63],u+=c[64]):t===1&&(u+=c[i>>2&63],u+=c[i<<4&63],u+=c[64],u+=c[64]),u}function v(l){return a&&a.isBuffer(l)}return binary=new m("tag:yaml.org,2002:binary",{kind:"scalar",resolve:h,construct:p,predicate:v,represent:g}),binary}var omap,hasRequiredOmap;function requireOmap(){if(hasRequiredOmap)return omap;hasRequiredOmap=1;var a=requireType(),f=Object.prototype.hasOwnProperty,m=Object.prototype.toString;function s(p){if(p===null)return!0;var g={},v,l,u,i,n,t=p;for(v=0,l=t.length;v<l;v+=1){if(u=t[v],n=!1,m.call(u)!=="[object Object]")return!1;for(i in u)if(f.call(u,i))if(!n)n=!0;else return!1;if(!n||f.call(g,i))return!1;Object.defineProperty(g,i,{value:!0})}return!0}function h(p){return p!==null?p:[]}return omap=new a("tag:yaml.org,2002:omap",{kind:"sequence",resolve:s,construct:h}),omap}var pairs,hasRequiredPairs;function requirePairs(){if(hasRequiredPairs)return pairs;hasRequiredPairs=1;var a=requireType(),f=Object.prototype.toString;function m(h){if(h===null)return!0;var p,g,v,l,u,i=h;for(u=new Array(i.length),p=0,g=i.length;p<g;p+=1){if(v=i[p],f.call(v)!=="[object Object]"||(l=Object.keys(v),l.length!==1))return!1;u[p]=[l[0],v[l[0]]]}return!0}function s(h){if(h===null)return[];var p,g,v,l,u,i=h;for(u=new Array(i.length),p=0,g=i.length;p<g;p+=1)v=i[p],l=Object.keys(v),u[p]=[l[0],v[l[0]]];return u}return pairs=new a("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:m,construct:s}),pairs}var set,hasRequiredSet;function requireSet(){if(hasRequiredSet)return set;hasRequiredSet=1;var a=requireType(),f=Object.prototype.hasOwnProperty;function m(h){if(h===null)return!0;var p,g=h;for(p in g)if(f.call(g,p)&&g[p]!==null)return!1;return!0}function s(h){return h!==null?h:{}}return set=new a("tag:yaml.org,2002:set",{kind:"mapping",resolve:m,construct:s}),set}var default_safe,hasRequiredDefault_safe;function requireDefault_safe(){if(hasRequiredDefault_safe)return default_safe;hasRequiredDefault_safe=1;var a=requireSchema();return default_safe=new a({include:[requireCore()],implicit:[requireTimestamp(),requireMerge()],explicit:[requireBinary(),requireOmap(),requirePairs(),requireSet()]}),default_safe}var _undefined,hasRequired_undefined;function require_undefined(){if(hasRequired_undefined)return _undefined;hasRequired_undefined=1;var a=requireType();function f(){return!0}function m(){}function s(){return""}function h(p){return typeof p>"u"}return _undefined=new a("tag:yaml.org,2002:js/undefined",{kind:"scalar",resolve:f,construct:m,predicate:h,represent:s}),_undefined}var regexp,hasRequiredRegexp;function requireRegexp(){if(hasRequiredRegexp)return regexp;hasRequiredRegexp=1;var a=requireType();function f(p){if(p===null||p.length===0)return!1;var g=p,v=/\/([gim]*)$/.exec(p),l="";return!(g[0]==="/"&&(v&&(l=v[1]),l.length>3||g[g.length-l.length-1]!=="/"))}function m(p){var g=p,v=/\/([gim]*)$/.exec(p),l="";return g[0]==="/"&&(v&&(l=v[1]),g=g.slice(1,g.length-l.length-1)),new RegExp(g,l)}function s(p){var g="/"+p.source+"/";return p.global&&(g+="g"),p.multiline&&(g+="m"),p.ignoreCase&&(g+="i"),g}function h(p){return Object.prototype.toString.call(p)==="[object RegExp]"}return regexp=new a("tag:yaml.org,2002:js/regexp",{kind:"scalar",resolve:f,construct:m,predicate:h,represent:s}),regexp}var _function,hasRequired_function;function require_function(){if(hasRequired_function)return _function;hasRequired_function=1;var a;try{var f=commonjsRequire;a=f("esprima")}catch{typeof window<"u"&&(a=window.esprima)}var m=requireType();function s(v){if(v===null)return!1;try{var l="("+v+")",u=a.parse(l,{range:!0});return!(u.type!=="Program"||u.body.length!==1||u.body[0].type!=="ExpressionStatement"||u.body[0].expression.type!=="ArrowFunctionExpression"&&u.body[0].expression.type!=="FunctionExpression")}catch{return!1}}function h(v){var l="("+v+")",u=a.parse(l,{range:!0}),i=[],n;if(u.type!=="Program"||u.body.length!==1||u.body[0].type!=="ExpressionStatement"||u.body[0].expression.type!=="ArrowFunctionExpression"&&u.body[0].expression.type!=="FunctionExpression")throw new Error("Failed to resolve function");return u.body[0].expression.params.forEach(function(t){i.push(t.name)}),n=u.body[0].expression.body.range,u.body[0].expression.body.type==="BlockStatement"?new Function(i,l.slice(n[0]+1,n[1]-1)):new Function(i,"return "+l.slice(n[0],n[1]))}function p(v){return v.toString()}function g(v){return Object.prototype.toString.call(v)==="[object Function]"}return _function=new m("tag:yaml.org,2002:js/function",{kind:"scalar",resolve:s,construct:h,predicate:g,represent:p}),_function}var default_full,hasRequiredDefault_full;function requireDefault_full(){if(hasRequiredDefault_full)return default_full;hasRequiredDefault_full=1;var a=requireSchema();return default_full=a.DEFAULT=new a({include:[requireDefault_safe()],explicit:[require_undefined(),requireRegexp(),require_function()]}),default_full}var hasRequiredLoader;function requireLoader(){if(hasRequiredLoader)return loader;hasRequiredLoader=1;var a=requireCommon(),f=requireException(),m=requireMark(),s=requireDefault_safe(),h=requireDefault_full(),p=Object.prototype.hasOwnProperty,g=1,v=2,l=3,u=4,i=1,n=2,t=3,o=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,c=/[\x85\u2028\u2029]/,y=/[,\[\]\{\}]/,E=/^(?:!|!!|![a-z\-]+!)$/i,R=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function C(e){return Object.prototype.toString.call(e)}function O(e){return e===10||e===13}function j(e){return e===9||e===32}function N(e){return e===9||e===32||e===10||e===13}function H(e){return e===44||e===91||e===93||e===123||e===125}function B(e){var x;return 48<=e&&e<=57?e-48:(x=e|32,97<=x&&x<=102?x-97+10:-1)}function G(e){return e===120?2:e===117?4:e===85?8:0}function $(e){return 48<=e&&e<=57?e-48:-1}function X(e){return e===48?"\0":e===97?"\x07":e===98?"\b":e===116||e===9?"	":e===110?`
`:e===118?"\v":e===102?"\f":e===114?"\r":e===101?"\x1B":e===32?" ":e===34?'"':e===47?"/":e===92?"\\":e===78?"":e===95?" ":e===76?"\u2028":e===80?"\u2029":""}function se(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function ue(e,x,A){x==="__proto__"?Object.defineProperty(e,x,{configurable:!0,enumerable:!0,writable:!0,value:A}):e[x]=A}for(var ie=new Array(256),U=new Array(256),V=0;V<256;V++)ie[V]=X(V)?1:0,U[V]=X(V);function be(e,x){this.input=e,this.filename=x.filename||null,this.schema=x.schema||h,this.onWarning=x.onWarning||null,this.legacy=x.legacy||!1,this.json=x.json||!1,this.listener=x.listener||null,this.maxTotalMergeKeys=typeof x.maxTotalMergeKeys=="number"?x.maxTotalMergeKeys:1e4,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.totalMergeKeys=0,this.documents=[]}function ae(e,x){return new f(x,new m(e.filename,e.input,e.position,e.line,e.position-e.lineStart))}function k(e,x){throw ae(e,x)}function z(e,x){e.onWarning&&e.onWarning.call(null,ae(e,x))}var Z={YAML:function(x,A,M){var T,r,d;x.version!==null&&k(x,"duplication of %YAML directive"),M.length!==1&&k(x,"YAML directive accepts exactly one argument"),T=/^([0-9]+)\.([0-9]+)$/.exec(M[0]),T===null&&k(x,"ill-formed argument of the YAML directive"),r=parseInt(T[1],10),d=parseInt(T[2],10),r!==1&&k(x,"unacceptable YAML version of the document"),x.version=M[0],x.checkLineBreaks=d<2,d!==1&&d!==2&&z(x,"unsupported YAML version of the document")},TAG:function(x,A,M){var T,r;M.length!==2&&k(x,"TAG directive accepts exactly two arguments"),T=M[0],r=M[1],E.test(T)||k(x,"ill-formed tag handle (first argument) of the TAG directive"),p.call(x.tagMap,T)&&k(x,'there is a previously declared suffix for "'+T+'" tag handle'),R.test(r)||k(x,"ill-formed tag prefix (second argument) of the TAG directive"),x.tagMap[T]=r}};function Q(e,x,A,M){var T,r,d,b;if(x<A){if(b=e.input.slice(x,A),M)for(T=0,r=b.length;T<r;T+=1)d=b.charCodeAt(T),d===9||32<=d&&d<=1114111||k(e,"expected valid JSON character");else o.test(b)&&k(e,"the stream contains non-printable characters");e.result+=b}}function ee(e,x,A,M){var T,r,d,b;for(a.isObject(A)||k(e,"cannot merge mappings; the provided source object is unacceptable"),T=Object.keys(A),d=0,b=T.length;d<b;d+=1)r=T[d],e.maxTotalMergeKeys!==-1&&++e.totalMergeKeys>e.maxTotalMergeKeys&&k(e,"merge keys exceeded maxTotalMergeKeys ("+e.maxTotalMergeKeys+")"),p.call(x,r)||(ue(x,r,A[r]),M[r]=!0)}function J(e,x,A,M,T,r,d,b){var w,F;if(Array.isArray(T))for(T=Array.prototype.slice.call(T),w=0,F=T.length;w<F;w+=1)Array.isArray(T[w])&&k(e,"nested arrays are not supported inside keys"),typeof T=="object"&&C(T[w])==="[object Object]"&&(T[w]="[object Object]");if(typeof T=="object"&&C(T)==="[object Object]"&&(T="[object Object]"),T=String(T),x===null&&(x={}),M==="tag:yaml.org,2002:merge")if(Array.isArray(r))for(w=0,F=r.length;w<F;w+=1)ee(e,x,r[w],A);else ee(e,x,r,A);else!e.json&&!p.call(A,T)&&p.call(x,T)&&(e.line=d||e.line,e.position=b||e.position,k(e,"duplicated mapping key")),ue(x,T,r),delete A[T];return x}function oe(e){var x;x=e.input.charCodeAt(e.position),x===10?e.position++:x===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):k(e,"a line break is expected"),e.line+=1,e.lineStart=e.position}function Y(e,x,A){for(var M=0,T=e.input.charCodeAt(e.position);T!==0;){for(;j(T);)T=e.input.charCodeAt(++e.position);if(x&&T===35)do T=e.input.charCodeAt(++e.position);while(T!==10&&T!==13&&T!==0);if(O(T))for(oe(e),T=e.input.charCodeAt(e.position),M++,e.lineIndent=0;T===32;)e.lineIndent++,T=e.input.charCodeAt(++e.position);else break}return A!==-1&&M!==0&&e.lineIndent<A&&z(e,"deficient indentation"),M}function ne(e){var x=e.position,A;return A=e.input.charCodeAt(x),!!((A===45||A===46)&&A===e.input.charCodeAt(x+1)&&A===e.input.charCodeAt(x+2)&&(x+=3,A=e.input.charCodeAt(x),A===0||N(A)))}function re(e,x){x===1?e.result+=" ":x>1&&(e.result+=a.repeat(`
`,x-1))}function le(e,x,A){var M,T,r,d,b,w,F,I,S=e.kind,q=e.result,D;if(D=e.input.charCodeAt(e.position),N(D)||H(D)||D===35||D===38||D===42||D===33||D===124||D===62||D===39||D===34||D===37||D===64||D===96||(D===63||D===45)&&(T=e.input.charCodeAt(e.position+1),N(T)||A&&H(T)))return!1;for(e.kind="scalar",e.result="",r=d=e.position,b=!1;D!==0;){if(D===58){if(T=e.input.charCodeAt(e.position+1),N(T)||A&&H(T))break}else if(D===35){if(M=e.input.charCodeAt(e.position-1),N(M))break}else{if(e.position===e.lineStart&&ne(e)||A&&H(D))break;if(O(D))if(w=e.line,F=e.lineStart,I=e.lineIndent,Y(e,!1,-1),e.lineIndent>=x){b=!0,D=e.input.charCodeAt(e.position);continue}else{e.position=d,e.line=w,e.lineStart=F,e.lineIndent=I;break}}b&&(Q(e,r,d,!1),re(e,e.line-w),r=d=e.position,b=!1),j(D)||(d=e.position+1),D=e.input.charCodeAt(++e.position)}return Q(e,r,d,!1),e.result?!0:(e.kind=S,e.result=q,!1)}function ce(e,x){var A,M,T;if(A=e.input.charCodeAt(e.position),A!==39)return!1;for(e.kind="scalar",e.result="",e.position++,M=T=e.position;(A=e.input.charCodeAt(e.position))!==0;)if(A===39)if(Q(e,M,e.position,!0),A=e.input.charCodeAt(++e.position),A===39)M=e.position,e.position++,T=e.position;else return!0;else O(A)?(Q(e,M,T,!0),re(e,Y(e,!1,x)),M=T=e.position):e.position===e.lineStart&&ne(e)?k(e,"unexpected end of the document within a single quoted scalar"):(e.position++,T=e.position);k(e,"unexpected end of the stream within a single quoted scalar")}function fe(e,x){var A,M,T,r,d,b;if(b=e.input.charCodeAt(e.position),b!==34)return!1;for(e.kind="scalar",e.result="",e.position++,A=M=e.position;(b=e.input.charCodeAt(e.position))!==0;){if(b===34)return Q(e,A,e.position,!0),e.position++,!0;if(b===92){if(Q(e,A,e.position,!0),b=e.input.charCodeAt(++e.position),O(b))Y(e,!1,x);else if(b<256&&ie[b])e.result+=U[b],e.position++;else if((d=G(b))>0){for(T=d,r=0;T>0;T--)b=e.input.charCodeAt(++e.position),(d=B(b))>=0?r=(r<<4)+d:k(e,"expected hexadecimal character");e.result+=se(r),e.position++}else k(e,"unknown escape sequence");A=M=e.position}else O(b)?(Q(e,A,M,!0),re(e,Y(e,!1,x)),A=M=e.position):e.position===e.lineStart&&ne(e)?k(e,"unexpected end of the document within a double quoted scalar"):(e.position++,M=e.position)}k(e,"unexpected end of the stream within a double quoted scalar")}function de(e,x){var A=!0,M,T=e.tag,r,d=e.anchor,b,w,F,I,S,q={},D,_,P,L;if(L=e.input.charCodeAt(e.position),L===91)w=93,S=!1,r=[];else if(L===123)w=125,S=!0,r={};else return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=r),L=e.input.charCodeAt(++e.position);L!==0;){if(Y(e,!0,x),L=e.input.charCodeAt(e.position),L===w)return e.position++,e.tag=T,e.anchor=d,e.kind=S?"mapping":"sequence",e.result=r,!0;A||k(e,"missed comma between flow collection entries"),_=D=P=null,F=I=!1,L===63&&(b=e.input.charCodeAt(e.position+1),N(b)&&(F=I=!0,e.position++,Y(e,!0,x))),M=e.line,K(e,x,g,!1,!0),_=e.tag,D=e.result,Y(e,!0,x),L=e.input.charCodeAt(e.position),(I||e.line===M)&&L===58&&(F=!0,L=e.input.charCodeAt(++e.position),Y(e,!0,x),K(e,x,g,!1,!0),P=e.result),S?J(e,r,q,_,D,P):F?r.push(J(e,null,q,_,D,P)):r.push(D),Y(e,!0,x),L=e.input.charCodeAt(e.position),L===44?(A=!0,L=e.input.charCodeAt(++e.position)):A=!1}k(e,"unexpected end of the stream within a flow collection")}function te(e,x){var A,M,T=i,r=!1,d=!1,b=x,w=0,F=!1,I,S;if(S=e.input.charCodeAt(e.position),S===124)M=!1;else if(S===62)M=!0;else return!1;for(e.kind="scalar",e.result="";S!==0;)if(S=e.input.charCodeAt(++e.position),S===43||S===45)i===T?T=S===43?t:n:k(e,"repeat of a chomping mode identifier");else if((I=$(S))>=0)I===0?k(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):d?k(e,"repeat of an indentation width identifier"):(b=x+I-1,d=!0);else break;if(j(S)){do S=e.input.charCodeAt(++e.position);while(j(S));if(S===35)do S=e.input.charCodeAt(++e.position);while(!O(S)&&S!==0)}for(;S!==0;){for(oe(e),e.lineIndent=0,S=e.input.charCodeAt(e.position);(!d||e.lineIndent<b)&&S===32;)e.lineIndent++,S=e.input.charCodeAt(++e.position);if(!d&&e.lineIndent>b&&(b=e.lineIndent),O(S)){w++;continue}if(e.lineIndent<b){T===t?e.result+=a.repeat(`
`,r?1+w:w):T===i&&r&&(e.result+=`
`);break}for(M?j(S)?(F=!0,e.result+=a.repeat(`
`,r?1+w:w)):F?(F=!1,e.result+=a.repeat(`
`,w+1)):w===0?r&&(e.result+=" "):e.result+=a.repeat(`
`,w):e.result+=a.repeat(`
`,r?1+w:w),r=!0,d=!0,w=0,A=e.position;!O(S)&&S!==0;)S=e.input.charCodeAt(++e.position);Q(e,A,e.position,!1)}return!0}function pe(e,x){var A,M=e.tag,T=e.anchor,r=[],d,b=!1,w;for(e.anchor!==null&&(e.anchorMap[e.anchor]=r),w=e.input.charCodeAt(e.position);w!==0&&!(w!==45||(d=e.input.charCodeAt(e.position+1),!N(d)));){if(b=!0,e.position++,Y(e,!0,-1)&&e.lineIndent<=x){r.push(null),w=e.input.charCodeAt(e.position);continue}if(A=e.line,K(e,x,l,!1,!0),r.push(e.result),Y(e,!0,-1),w=e.input.charCodeAt(e.position),(e.line===A||e.lineIndent>x)&&w!==0)k(e,"bad indentation of a sequence entry");else if(e.lineIndent<x)break}return b?(e.tag=M,e.anchor=T,e.kind="sequence",e.result=r,!0):!1}function we(e,x,A){var M,T,r,d,b=e.tag,w=e.anchor,F={},I={},S=null,q=null,D=null,_=!1,P=!1,L;for(e.anchor!==null&&(e.anchorMap[e.anchor]=F),L=e.input.charCodeAt(e.position);L!==0;){if(M=e.input.charCodeAt(e.position+1),r=e.line,d=e.position,(L===63||L===58)&&N(M))L===63?(_&&(J(e,F,I,S,q,null),S=q=D=null),P=!0,_=!0,T=!0):_?(_=!1,T=!0):k(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,L=M;else if(K(e,A,v,!1,!0))if(e.line===r){for(L=e.input.charCodeAt(e.position);j(L);)L=e.input.charCodeAt(++e.position);if(L===58)L=e.input.charCodeAt(++e.position),N(L)||k(e,"a whitespace character is expected after the key-value separator within a block mapping"),_&&(J(e,F,I,S,q,null),S=q=D=null),P=!0,_=!1,T=!1,S=e.tag,q=e.result;else if(P)k(e,"can not read an implicit mapping pair; a colon is missed");else return e.tag=b,e.anchor=w,!0}else if(P)k(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return e.tag=b,e.anchor=w,!0;else break;if((e.line===r||e.lineIndent>x)&&(K(e,x,u,!0,T)&&(_?q=e.result:D=e.result),_||(J(e,F,I,S,q,D,r,d),S=q=D=null),Y(e,!0,-1),L=e.input.charCodeAt(e.position)),e.lineIndent>x&&L!==0)k(e,"bad indentation of a mapping entry");else if(e.lineIndent<x)break}return _&&J(e,F,I,S,q,null),P&&(e.tag=b,e.anchor=w,e.kind="mapping",e.result=F),P}function he(e){var x,A=!1,M=!1,T,r,d;if(d=e.input.charCodeAt(e.position),d!==33)return!1;if(e.tag!==null&&k(e,"duplication of a tag property"),d=e.input.charCodeAt(++e.position),d===60?(A=!0,d=e.input.charCodeAt(++e.position)):d===33?(M=!0,T="!!",d=e.input.charCodeAt(++e.position)):T="!",x=e.position,A){do d=e.input.charCodeAt(++e.position);while(d!==0&&d!==62);e.position<e.length?(r=e.input.slice(x,e.position),d=e.input.charCodeAt(++e.position)):k(e,"unexpected end of the stream within a verbatim tag")}else{for(;d!==0&&!N(d);)d===33&&(M?k(e,"tag suffix cannot contain exclamation marks"):(T=e.input.slice(x-1,e.position+1),E.test(T)||k(e,"named tag handle cannot contain such characters"),M=!0,x=e.position+1)),d=e.input.charCodeAt(++e.position);r=e.input.slice(x,e.position),y.test(r)&&k(e,"tag suffix cannot contain flow indicator characters")}return r&&!R.test(r)&&k(e,"tag name cannot contain such characters: "+r),A?e.tag=r:p.call(e.tagMap,T)?e.tag=e.tagMap[T]+r:T==="!"?e.tag="!"+r:T==="!!"?e.tag="tag:yaml.org,2002:"+r:k(e,'undeclared tag handle "'+T+'"'),!0}function me(e){var x,A;if(A=e.input.charCodeAt(e.position),A!==38)return!1;for(e.anchor!==null&&k(e,"duplication of an anchor property"),A=e.input.charCodeAt(++e.position),x=e.position;A!==0&&!N(A)&&!H(A);)A=e.input.charCodeAt(++e.position);return e.position===x&&k(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(x,e.position),!0}function Ae(e){var x,A,M;if(M=e.input.charCodeAt(e.position),M!==42)return!1;for(M=e.input.charCodeAt(++e.position),x=e.position;M!==0&&!N(M)&&!H(M);)M=e.input.charCodeAt(++e.position);return e.position===x&&k(e,"name of an alias node must contain at least one character"),A=e.input.slice(x,e.position),p.call(e.anchorMap,A)||k(e,'unidentified alias "'+A+'"'),e.result=e.anchorMap[A],Y(e,!0,-1),!0}function K(e,x,A,M,T){var r,d,b,w=1,F=!1,I=!1,S,q,D,_,P;if(e.listener!==null&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,r=d=b=u===A||l===A,M&&Y(e,!0,-1)&&(F=!0,e.lineIndent>x?w=1:e.lineIndent===x?w=0:e.lineIndent<x&&(w=-1)),w===1)for(;he(e)||me(e);)Y(e,!0,-1)?(F=!0,b=r,e.lineIndent>x?w=1:e.lineIndent===x?w=0:e.lineIndent<x&&(w=-1)):b=!1;if(b&&(b=F||T),(w===1||u===A)&&(g===A||v===A?_=x:_=x+1,P=e.position-e.lineStart,w===1?b&&(pe(e,P)||we(e,P,_))||de(e,_)?I=!0:(d&&te(e,_)||ce(e,_)||fe(e,_)?I=!0:Ae(e)?(I=!0,(e.tag!==null||e.anchor!==null)&&k(e,"alias node should not have any properties")):le(e,_,g===A)&&(I=!0,e.tag===null&&(e.tag="?")),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):w===0&&(I=b&&pe(e,P))),e.tag!==null&&e.tag!=="!")if(e.tag==="?"){for(e.result!==null&&e.kind!=="scalar"&&k(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"'),S=0,q=e.implicitTypes.length;S<q;S+=1)if(D=e.implicitTypes[S],D.resolve(e.result)){e.result=D.construct(e.result),e.tag=D.tag,e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);break}}else p.call(e.typeMap[e.kind||"fallback"],e.tag)?(D=e.typeMap[e.kind||"fallback"][e.tag],e.result!==null&&D.kind!==e.kind&&k(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+D.kind+'", not "'+e.kind+'"'),D.resolve(e.result)?(e.result=D.construct(e.result),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):k(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")):k(e,"unknown tag !<"+e.tag+">");return e.listener!==null&&e.listener("close",e),e.tag!==null||e.anchor!==null||I}function Ee(e){var x=e.position,A,M,T,r=!1,d;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap={},e.anchorMap={};(d=e.input.charCodeAt(e.position))!==0&&(Y(e,!0,-1),d=e.input.charCodeAt(e.position),!(e.lineIndent>0||d!==37));){for(r=!0,d=e.input.charCodeAt(++e.position),A=e.position;d!==0&&!N(d);)d=e.input.charCodeAt(++e.position);for(M=e.input.slice(A,e.position),T=[],M.length<1&&k(e,"directive name must not be less than one character in length");d!==0;){for(;j(d);)d=e.input.charCodeAt(++e.position);if(d===35){do d=e.input.charCodeAt(++e.position);while(d!==0&&!O(d));break}if(O(d))break;for(A=e.position;d!==0&&!N(d);)d=e.input.charCodeAt(++e.position);T.push(e.input.slice(A,e.position))}d!==0&&oe(e),p.call(Z,M)?Z[M](e,M,T):z(e,'unknown document directive "'+M+'"')}if(Y(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,Y(e,!0,-1)):r&&k(e,"directives end mark is expected"),K(e,e.lineIndent-1,u,!1,!0),Y(e,!0,-1),e.checkLineBreaks&&c.test(e.input.slice(x,e.position))&&z(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&ne(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,Y(e,!0,-1));return}if(e.position<e.length-1)k(e,"end of the stream or a document separator is expected");else return}function ge(e,x){e=String(e),x=x||{},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));var A=new be(e,x),M=e.indexOf("\0");for(M!==-1&&(A.position=M,k(A,"null byte is not allowed in input")),A.input+="\0";A.input.charCodeAt(A.position)===32;)A.lineIndent+=1,A.position+=1;for(;A.position<A.length-1;)Ee(A);return A.documents}function ye(e,x,A){x!==null&&typeof x=="object"&&typeof A>"u"&&(A=x,x=null);var M=ge(e,A);if(typeof x!="function")return M;for(var T=0,r=M.length;T<r;T+=1)x(M[T])}function xe(e,x){var A=ge(e,x);if(A.length!==0){if(A.length===1)return A[0];throw new f("expected a single document in the stream, but found more")}}function Re(e,x,A){return typeof x=="object"&&x!==null&&typeof A>"u"&&(A=x,x=null),ye(e,x,a.extend({schema:s},A))}function ve(e,x){return xe(e,a.extend({schema:s},x))}return loader.loadAll=ye,loader.load=xe,loader.safeLoadAll=Re,loader.safeLoad=ve,loader}var dumper={},hasRequiredDumper;function requireDumper(){if(hasRequiredDumper)return dumper;hasRequiredDumper=1;var a=requireCommon(),f=requireException(),m=requireDefault_full(),s=requireDefault_safe(),h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,g=9,v=10,l=13,u=32,i=33,n=34,t=35,o=37,c=38,y=39,E=42,R=44,C=45,O=58,j=61,N=62,H=63,B=64,G=91,$=93,X=96,se=123,ue=124,ie=125,U={};U[0]="\\0",U[7]="\\a",U[8]="\\b",U[9]="\\t",U[10]="\\n",U[11]="\\v",U[12]="\\f",U[13]="\\r",U[27]="\\e",U[34]='\\"',U[92]="\\\\",U[133]="\\N",U[160]="\\_",U[8232]="\\L",U[8233]="\\P";var V=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"];function be(r,d){var b,w,F,I,S,q,D;if(d===null)return{};for(b={},w=Object.keys(d),F=0,I=w.length;F<I;F+=1)S=w[F],q=String(d[S]),S.slice(0,2)==="!!"&&(S="tag:yaml.org,2002:"+S.slice(2)),D=r.compiledTypeMap.fallback[S],D&&p.call(D.styleAliases,q)&&(q=D.styleAliases[q]),b[S]=q;return b}function ae(r){var d,b,w;if(d=r.toString(16).toUpperCase(),r<=255)b="x",w=2;else if(r<=65535)b="u",w=4;else if(r<=4294967295)b="U",w=8;else throw new f("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+b+a.repeat("0",w-d.length)+d}function k(r){this.schema=r.schema||m,this.indent=Math.max(1,r.indent||2),this.noArrayIndent=r.noArrayIndent||!1,this.skipInvalid=r.skipInvalid||!1,this.flowLevel=a.isNothing(r.flowLevel)?-1:r.flowLevel,this.styleMap=be(this.schema,r.styles||null),this.sortKeys=r.sortKeys||!1,this.lineWidth=r.lineWidth||80,this.noRefs=r.noRefs||!1,this.noCompatMode=r.noCompatMode||!1,this.condenseFlow=r.condenseFlow||!1,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function z(r,d){for(var b=a.repeat(" ",d),w=0,F=-1,I="",S,q=r.length;w<q;)F=r.indexOf(`
`,w),F===-1?(S=r.slice(w),w=q):(S=r.slice(w,F+1),w=F+1),S.length&&S!==`
`&&(I+=b),I+=S;return I}function Z(r,d){return`
`+a.repeat(" ",r.indent*d)}function Q(r,d){var b,w,F;for(b=0,w=r.implicitTypes.length;b<w;b+=1)if(F=r.implicitTypes[b],F.resolve(d))return!0;return!1}function ee(r){return r===u||r===g}function J(r){return 32<=r&&r<=126||161<=r&&r<=55295&&r!==8232&&r!==8233||57344<=r&&r<=65533&&r!==65279||65536<=r&&r<=1114111}function oe(r){return J(r)&&!ee(r)&&r!==65279&&r!==l&&r!==v}function Y(r,d){return J(r)&&r!==65279&&r!==R&&r!==G&&r!==$&&r!==se&&r!==ie&&r!==O&&(r!==t||d&&oe(d))}function ne(r){return J(r)&&r!==65279&&!ee(r)&&r!==C&&r!==H&&r!==O&&r!==R&&r!==G&&r!==$&&r!==se&&r!==ie&&r!==t&&r!==c&&r!==E&&r!==i&&r!==ue&&r!==j&&r!==N&&r!==y&&r!==n&&r!==o&&r!==B&&r!==X}function re(r){var d=/^\n* /;return d.test(r)}var le=1,ce=2,fe=3,de=4,te=5;function pe(r,d,b,w,F){var I,S,q,D=!1,_=!1,P=w!==-1,L=-1,W=ne(r.charCodeAt(0))&&!ee(r.charCodeAt(r.length-1));if(d)for(I=0;I<r.length;I++){if(S=r.charCodeAt(I),!J(S))return te;q=I>0?r.charCodeAt(I-1):null,W=W&&Y(S,q)}else{for(I=0;I<r.length;I++){if(S=r.charCodeAt(I),S===v)D=!0,P&&(_=_||I-L-1>w&&r[L+1]!==" ",L=I);else if(!J(S))return te;q=I>0?r.charCodeAt(I-1):null,W=W&&Y(S,q)}_=_||P&&I-L-1>w&&r[L+1]!==" "}return!D&&!_?W&&!F(r)?le:ce:b>9&&re(r)?te:_?de:fe}function we(r,d,b,w){r.dump=function(){if(d.length===0)return"''";if(!r.noCompatMode&&V.indexOf(d)!==-1)return"'"+d+"'";var F=r.indent*Math.max(1,b),I=r.lineWidth===-1?-1:Math.max(Math.min(r.lineWidth,40),r.lineWidth-F),S=w||r.flowLevel>-1&&b>=r.flowLevel;function q(D){return Q(r,D)}switch(pe(d,S,r.indent,I,q)){case le:return d;case ce:return"'"+d.replace(/'/g,"''")+"'";case fe:return"|"+he(d,r.indent)+me(z(d,F));case de:return">"+he(d,r.indent)+me(z(Ae(d,I),F));case te:return'"'+Ee(d)+'"';default:throw new f("impossible error: invalid scalar style")}}()}function he(r,d){var b=re(r)?String(d):"",w=r[r.length-1]===`
`,F=w&&(r[r.length-2]===`
`||r===`
`),I=F?"+":w?"":"-";return b+I+`
`}function me(r){return r[r.length-1]===`
`?r.slice(0,-1):r}function Ae(r,d){for(var b=/(\n+)([^\n]*)/g,w=function(){var _=r.indexOf(`
`);return _=_!==-1?_:r.length,b.lastIndex=_,K(r.slice(0,_),d)}(),F=r[0]===`
`||r[0]===" ",I,S;S=b.exec(r);){var q=S[1],D=S[2];I=D[0]===" ",w+=q+(!F&&!I&&D!==""?`
`:"")+K(D,d),F=I}return w}function K(r,d){if(r===""||r[0]===" ")return r;for(var b=/ [^ ]/g,w,F=0,I,S=0,q=0,D="";w=b.exec(r);)q=w.index,q-F>d&&(I=S>F?S:q,D+=`
`+r.slice(F,I),F=I+1),S=q;return D+=`
`,r.length-F>d&&S>F?D+=r.slice(F,S)+`
`+r.slice(S+1):D+=r.slice(F),D.slice(1)}function Ee(r){for(var d="",b,w,F,I=0;I<r.length;I++){if(b=r.charCodeAt(I),b>=55296&&b<=56319&&(w=r.charCodeAt(I+1),w>=56320&&w<=57343)){d+=ae((b-55296)*1024+w-56320+65536),I++;continue}F=U[b],d+=!F&&J(b)?r[I]:F||ae(b)}return d}function ge(r,d,b){var w="",F=r.tag,I,S;for(I=0,S=b.length;I<S;I+=1)e(r,d,b[I],!1,!1)&&(I!==0&&(w+=","+(r.condenseFlow?"":" ")),w+=r.dump);r.tag=F,r.dump="["+w+"]"}function ye(r,d,b,w){var F="",I=r.tag,S,q;for(S=0,q=b.length;S<q;S+=1)e(r,d+1,b[S],!0,!0)&&((!w||S!==0)&&(F+=Z(r,d)),r.dump&&v===r.dump.charCodeAt(0)?F+="-":F+="- ",F+=r.dump);r.tag=I,r.dump=F||"[]"}function xe(r,d,b){var w="",F=r.tag,I=Object.keys(b),S,q,D,_,P;for(S=0,q=I.length;S<q;S+=1)P="",S!==0&&(P+=", "),r.condenseFlow&&(P+='"'),D=I[S],_=b[D],e(r,d,D,!1,!1)&&(r.dump.length>1024&&(P+="? "),P+=r.dump+(r.condenseFlow?'"':"")+":"+(r.condenseFlow?"":" "),e(r,d,_,!1,!1)&&(P+=r.dump,w+=P));r.tag=F,r.dump="{"+w+"}"}function Re(r,d,b,w){var F="",I=r.tag,S=Object.keys(b),q,D,_,P,L,W;if(r.sortKeys===!0)S.sort();else if(typeof r.sortKeys=="function")S.sort(r.sortKeys);else if(r.sortKeys)throw new f("sortKeys must be a boolean or a function");for(q=0,D=S.length;q<D;q+=1)W="",(!w||q!==0)&&(W+=Z(r,d)),_=S[q],P=b[_],e(r,d+1,_,!0,!0,!0)&&(L=r.tag!==null&&r.tag!=="?"||r.dump&&r.dump.length>1024,L&&(r.dump&&v===r.dump.charCodeAt(0)?W+="?":W+="? "),W+=r.dump,L&&(W+=Z(r,d)),e(r,d+1,P,!0,L)&&(r.dump&&v===r.dump.charCodeAt(0)?W+=":":W+=": ",W+=r.dump,F+=W));r.tag=I,r.dump=F||"{}"}function ve(r,d,b){var w,F,I,S,q,D;for(F=b?r.explicitTypes:r.implicitTypes,I=0,S=F.length;I<S;I+=1)if(q=F[I],(q.instanceOf||q.predicate)&&(!q.instanceOf||typeof d=="object"&&d instanceof q.instanceOf)&&(!q.predicate||q.predicate(d))){if(r.tag=b?q.tag:"?",q.represent){if(D=r.styleMap[q.tag]||q.defaultStyle,h.call(q.represent)==="[object Function]")w=q.represent(d,D);else if(p.call(q.represent,D))w=q.represent[D](d,D);else throw new f("!<"+q.tag+'> tag resolver accepts not "'+D+'" style');r.dump=w}return!0}return!1}function e(r,d,b,w,F,I){r.tag=null,r.dump=b,ve(r,b,!1)||ve(r,b,!0);var S=h.call(r.dump);w&&(w=r.flowLevel<0||r.flowLevel>d);var q=S==="[object Object]"||S==="[object Array]",D,_;if(q&&(D=r.duplicates.indexOf(b),_=D!==-1),(r.tag!==null&&r.tag!=="?"||_||r.indent!==2&&d>0)&&(F=!1),_&&r.usedDuplicates[D])r.dump="*ref_"+D;else{if(q&&_&&!r.usedDuplicates[D]&&(r.usedDuplicates[D]=!0),S==="[object Object]")w&&Object.keys(r.dump).length!==0?(Re(r,d,r.dump,F),_&&(r.dump="&ref_"+D+r.dump)):(xe(r,d,r.dump),_&&(r.dump="&ref_"+D+" "+r.dump));else if(S==="[object Array]"){var P=r.noArrayIndent&&d>0?d-1:d;w&&r.dump.length!==0?(ye(r,P,r.dump,F),_&&(r.dump="&ref_"+D+r.dump)):(ge(r,P,r.dump),_&&(r.dump="&ref_"+D+" "+r.dump))}else if(S==="[object String]")r.tag!=="?"&&we(r,r.dump,d,I);else{if(r.skipInvalid)return!1;throw new f("unacceptable kind of an object to dump "+S)}r.tag!==null&&r.tag!=="?"&&(r.dump="!<"+r.tag+"> "+r.dump)}return!0}function x(r,d){var b=[],w=[],F,I;for(A(r,b,w),F=0,I=w.length;F<I;F+=1)d.duplicates.push(b[w[F]]);d.usedDuplicates=new Array(I)}function A(r,d,b){var w,F,I;if(r!==null&&typeof r=="object")if(F=d.indexOf(r),F!==-1)b.indexOf(F)===-1&&b.push(F);else if(d.push(r),Array.isArray(r))for(F=0,I=r.length;F<I;F+=1)A(r[F],d,b);else for(w=Object.keys(r),F=0,I=w.length;F<I;F+=1)A(r[w[F]],d,b)}function M(r,d){d=d||{};var b=new k(d);return b.noRefs||x(r,b),e(b,0,r,!0,!0)?b.dump+`
`:""}function T(r,d){return M(r,a.extend({schema:s},d))}return dumper.dump=M,dumper.safeDump=T,dumper}var hasRequiredJsYaml$1;function requireJsYaml$1(){if(hasRequiredJsYaml$1)return jsYaml$1;hasRequiredJsYaml$1=1;var a=requireLoader(),f=requireDumper();function m(s){return function(){throw new Error("Function "+s+" is deprecated and cannot be used.")}}return jsYaml$1.Type=requireType(),jsYaml$1.Schema=requireSchema(),jsYaml$1.FAILSAFE_SCHEMA=requireFailsafe(),jsYaml$1.JSON_SCHEMA=requireJson(),jsYaml$1.CORE_SCHEMA=requireCore(),jsYaml$1.DEFAULT_SAFE_SCHEMA=requireDefault_safe(),jsYaml$1.DEFAULT_FULL_SCHEMA=requireDefault_full(),jsYaml$1.load=a.load,jsYaml$1.loadAll=a.loadAll,jsYaml$1.safeLoad=a.safeLoad,jsYaml$1.safeLoadAll=a.safeLoadAll,jsYaml$1.dump=f.dump,jsYaml$1.safeDump=f.safeDump,jsYaml$1.YAMLException=requireException(),jsYaml$1.MINIMAL_SCHEMA=requireFailsafe(),jsYaml$1.SAFE_SCHEMA=requireDefault_safe(),jsYaml$1.DEFAULT_SCHEMA=requireDefault_full(),jsYaml$1.scan=m("scan"),jsYaml$1.parse=m("parse"),jsYaml$1.compose=m("compose"),jsYaml$1.addConstructor=m("addConstructor"),jsYaml$1}var jsYaml,hasRequiredJsYaml;function requireJsYaml(){if(hasRequiredJsYaml)return jsYaml;hasRequiredJsYaml=1;var a=requireJsYaml$1();return jsYaml=a,jsYaml}var hasRequiredEngines;function requireEngines(){return hasRequiredEngines||(hasRequiredEngines=1,function(module,exports){const yaml=requireJsYaml(),engines=module.exports;engines.yaml={parse:yaml.safeLoad.bind(yaml),stringify:yaml.safeDump.bind(yaml)},engines.json={parse:JSON.parse.bind(JSON),stringify:function(a,f){const m=Object.assign({replacer:null,space:2},f);return JSON.stringify(a,m.replacer,m.space)}},engines.javascript={parse:function parse(str,options,wrap){try{return wrap!==!1&&(str=`(function() {
return `+str.trim()+`;
}());`),eval(str)||{}}catch(a){if(wrap!==!1&&/(unexpected|identifier)/i.test(a.message))return parse(str,options,!1);throw new SyntaxError(a)}},stringify:function(){throw new Error("stringifying JavaScript is not supported")}}}(engines)),engines.exports}var utils={};/*!
 * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */var stripBomString,hasRequiredStripBomString;function requireStripBomString(){return hasRequiredStripBomString||(hasRequiredStripBomString=1,stripBomString=function(a){return typeof a=="string"&&a.charAt(0)==="\uFEFF"?a.slice(1):a}),stripBomString}var hasRequiredUtils;function requireUtils(){return hasRequiredUtils||(hasRequiredUtils=1,function(a){const f=requireStripBomString(),m=requireKindOf();a.define=function(s,h,p){Reflect.defineProperty(s,h,{enumerable:!1,configurable:!0,writable:!0,value:p})},a.isBuffer=function(s){return m(s)==="buffer"},a.isObject=function(s){return m(s)==="object"},a.toBuffer=function(s){return typeof s=="string"?Buffer.from(s):s},a.toString=function(s){if(a.isBuffer(s))return f(String(s));if(typeof s!="string")throw new TypeError("expected input to be a string or buffer");return f(s)},a.arrayify=function(s){return s?Array.isArray(s)?s:[s]:[]},a.startsWith=function(s,h,p){return typeof p!="number"&&(p=h.length),s.slice(0,p)===h}}(utils)),utils}var defaults,hasRequiredDefaults;function requireDefaults(){if(hasRequiredDefaults)return defaults;hasRequiredDefaults=1;const a=requireEngines(),f=requireUtils();return defaults=function(m){const s=Object.assign({},m);return s.delimiters=f.arrayify(s.delims||s.delimiters||"---"),s.delimiters.length===1&&s.delimiters.push(s.delimiters[0]),s.language=(s.language||s.lang||"yaml").toLowerCase(),s.engines=Object.assign({},a,s.parsers,s.engines),s},defaults}var engine,hasRequiredEngine;function requireEngine(){if(hasRequiredEngine)return engine;hasRequiredEngine=1,engine=function(f,m){let s=m.engines[f]||m.engines[a(f)];if(typeof s>"u")throw new Error('gray-matter engine "'+f+'" is not registered');return typeof s=="function"&&(s={parse:s}),s};function a(f){switch(f.toLowerCase()){case"js":case"javascript":return"javascript";case"coffee":case"coffeescript":case"cson":return"coffee";case"yaml":case"yml":return"yaml";default:return f}}return engine}var stringify,hasRequiredStringify;function requireStringify(){if(hasRequiredStringify)return stringify;hasRequiredStringify=1;const a=requireKindOf(),f=requireEngine(),m=requireDefaults();stringify=function(h,p,g){if(p==null&&g==null)switch(a(h)){case"object":p=h.data,g={};break;case"string":return h;default:throw new TypeError("expected file to be a string or object")}const v=h.content,l=m(g);if(p==null){if(!l.data)return h;p=l.data}const u=h.language||l.language,i=f(u,l);if(typeof i.stringify!="function")throw new TypeError('expected "'+u+'.stringify" to be a function');p=Object.assign({},h.data,p);const n=l.delimiters[0],t=l.delimiters[1],o=i.stringify(p,g).trim();let c="";return o!=="{}"&&(c=s(n)+s(o)+s(t)),typeof h.excerpt=="string"&&h.excerpt!==""&&v.indexOf(h.excerpt.trim())===-1&&(c+=s(h.excerpt)+s(t)),c+s(v)};function s(h){return h.slice(-1)!==`
`?h+`
`:h}return stringify}var excerpt,hasRequiredExcerpt;function requireExcerpt(){if(hasRequiredExcerpt)return excerpt;hasRequiredExcerpt=1;const a=requireDefaults();return excerpt=function(f,m){const s=a(m);if(f.data==null&&(f.data={}),typeof s.excerpt=="function")return s.excerpt(f,s);const h=f.data.excerpt_separator||s.excerpt_separator;if(h==null&&(s.excerpt===!1||s.excerpt==null))return f;const p=typeof s.excerpt=="string"?s.excerpt:h||s.delimiters[0],g=f.content.indexOf(p);return g!==-1&&(f.excerpt=f.content.slice(0,g)),f},excerpt}var toFile,hasRequiredToFile;function requireToFile(){if(hasRequiredToFile)return toFile;hasRequiredToFile=1;const a=requireKindOf(),f=requireStringify(),m=requireUtils();return toFile=function(s){return a(s)!=="object"&&(s={content:s}),a(s.data)!=="object"&&(s.data={}),s.contents&&s.content==null&&(s.content=s.contents),m.define(s,"orig",m.toBuffer(s.content)),m.define(s,"language",s.language||""),m.define(s,"matter",s.matter||""),m.define(s,"stringify",function(h,p){return p&&p.language&&(s.language=p.language),f(s,h,p)}),s.content=m.toString(s.content),s.isEmpty=!1,s.excerpt="",s},toFile}var parse,hasRequiredParse;function requireParse(){if(hasRequiredParse)return parse;hasRequiredParse=1;const a=requireEngine(),f=requireDefaults();return parse=function(m,s,h){const p=f(h),g=a(m,p);if(typeof g.parse!="function")throw new TypeError('expected "'+m+'.parse" to be a function');return g.parse(s,p)},parse}var grayMatter,hasRequiredGrayMatter;function requireGrayMatter(){if(hasRequiredGrayMatter)return grayMatter;hasRequiredGrayMatter=1;const a=requireEmpty(),f=requireSectionMatter(),m=requireDefaults(),s=requireStringify(),h=requireExcerpt(),p=requireEngines(),g=requireToFile(),v=requireParse(),l=requireUtils();function u(n,t){if(n==="")return{data:{},content:n,excerpt:"",orig:n};let o=g(n);const c=u.cache[o.content];if(!t){if(c)return o=Object.assign({},c),o.orig=c.orig,o;u.cache[o.content]=o}return i(o,t)}function i(n,t){const o=m(t),c=o.delimiters[0],y=`
`+o.delimiters[1];let E=n.content;o.language&&(n.language=o.language);const R=c.length;if(!l.startsWith(E,c,R))return h(n,o),n;if(E.charAt(R)===c.slice(-1))return n;E=E.slice(R);const C=E.length,O=u.language(E,o);O.name&&(n.language=O.name,E=E.slice(O.raw.length));let j=E.indexOf(y);return j===-1&&(j=C),n.matter=E.slice(0,j),n.matter.replace(/^\s*#[^\n]+/gm,"").trim()===""?(n.isEmpty=!0,n.empty=n.content,n.data={}):n.data=v(n.language,n.matter,o),j===C?n.content="":(n.content=E.slice(j+y.length),n.content[0]==="\r"&&(n.content=n.content.slice(1)),n.content[0]===`
`&&(n.content=n.content.slice(1))),h(n,o),(o.sections===!0||typeof o.section=="function")&&f(n,o.section),n}return u.engines=p,u.stringify=function(n,t,o){return typeof n=="string"&&(n=u(n,o)),s(n,t,o)},u.read=function(n,t){const o=a.readFileSync(n,"utf8"),c=u(o,t);return c.path=n,c},u.test=function(n,t){return l.startsWith(n,m(t).delimiters[0])},u.language=function(n,t){const c=m(t).delimiters[0];u.test(n)&&(n=n.slice(c.length));const y=n.slice(0,n.search(/\r?\n/));return{raw:y,name:y?y.trim():""}},u.cache={},u.clearCache=function(){u.cache={}},grayMatter=u,grayMatter}var grayMatterExports=requireGrayMatter();const matter=getDefaultExportFromCjs(grayMatterExports);function parseChangeLog(a){return a.split(/(?=---\ndate: )/g).filter(f=>f.includes("date:")).map(f=>{const{data:m,content:s}=matter(f);return{date:m.date,type:m.type,product:m.product,description:s.trim()}})}const normalizeDateForSlug=(a="")=>{const[f="",m="",s=""]=String(a).split("/");if(!f||!m||!s)return"00-00-00";const h=f.padStart(2,"0"),p=m.padStart(2,"0"),g=s.slice(-2).padStart(2,"0");return`${h}-${p}-${g}`},sanitizeSlugPart=(a="")=>String(a).toLowerCase().replace(/[^a-z0-9\s-]/g," ").split(/\s+/).filter(Boolean).join("-"),firstTenWordsForSlug=(a="")=>String(a).toLowerCase().replace(/[^a-z0-9\s-]/g," ").split(/\s+/).filter(Boolean).slice(0,10).join("-")||"post",buildPostSlug=({date:a,type:f,description:m})=>{const s=normalizeDateForSlug(a),h=sanitizeSlugPart(f)||"update",p=firstTenWordsForSlug(m);return`${s}-${h}-${p}`},byType=(a,f)=>!a.type||!f.type||CATEGORIES[a.type]>CATEGORIES[f.type]?0:CATEGORIES[a.type].order>CATEGORIES[f.type].order?1:(CATEGORIES[a.type].order<CATEGORIES[f.type].order,-1),byDate=(a,f)=>new Date(f.date)-new Date(a.date),organizeChangeData=a=>{let f=a&&a.log?a.log:{};f=f.sort(byDate);const m={};return f.forEach(s=>{!s||!s.date||(s.changeDateOrdinal||(s.changeDateOrdinal=ordinal(new Date(s.date||0),{nthDate:!1})),s.slug||(s.slug=buildPostSlug(s)),m[s.date]||(m[s.date]=[]),m[s.date].push({...s}))}),Object.keys(m).forEach(s=>{m[s]=m[s].sort(byType)}),m},defaultState={type:[],product:[],keywords:[]},validParams=Object.keys(defaultState),hasAllWords=(a,f)=>!a||!f||!f.length?!1:f.every(m=>a.toLowerCase().indexOf(m.toLowerCase())>-1);function useChangeLogFilter(a=defaultState){const[f,m]=reactExports.useState(a),s=useHistory(),h=useLocation();reactExports.useEffect(()=>n(h.search),[]),reactExports.useEffect(()=>{const t=h.pathname+i(f)+h.hash,o=h.pathname+h.search+h.hash;t!==o&&s.push(t)},[f]);const p=(t,o)=>{m(t==="keywords"?c=>({...c,[t]:o?o.split(" "):[]}):c=>({...c,[t]:[...c[t],o]}))},g=(t,o)=>{m(c=>({...c,[t]:[...c[t].filter(y=>y!==o)]}))},v=t=>{m(t?o=>({...o,[t]:[]}):a)},l=(t,o)=>{if(f[t].indexOf(o)>-1)return g(t,o);p(t,o)},u=(t={},o=f)=>{const c={...JSON.parse(JSON.stringify(t))};return Object.keys(c).forEach(y=>{if(c[y]&&c[y].length){if(o.keywords.length>0){const E=o.keywords.filter(R=>R).map(R=>R.toLowerCase());c[y]=c[y].filter(R=>hasAllWords(R.description,E))}o.type&&o.type.length>0&&(c[y]=c[y].filter(E=>o.type.indexOf(E.type)>-1)),o.product&&o.product.length>0&&(c[y]=c[y].filter(E=>o.product.indexOf(E.product)>-1))}}),c},i=t=>{const o=Object.keys(defaultState).filter(c=>t[c].length).map(c=>`${c}=${t[c].join(",")}`);return o.length?`?${o.join("&")}`:""},n=t=>{const o=t.replace(/\?/g,"").split("&").reduce((c,y)=>{const[E,R]=y.split("=");return validParams.indexOf(E)>-1&&(c[E]=R.split(",").filter(C=>C)),c},{});Object.keys(o).length&&m({...defaultState,...o})};return{filters:f,add:p,apply:u,clear:v,remove:g,toggle:l,toQueryString:i,fromQueryString:n}}function UpdatesNotes(){const a=useChangeLogFilter(DEFAULT_FILTERS),[f,m]=useRemoteMarkdown(PUB_CHANGELOG_URL,{transformReceive:h=>organizeChangeData({log:parseChangeLog(h)}),defaultData:organizeChangeData({log:parseChangeLog(defaultChangeLog)}),forceFetch:window.Cypress!==void 0}),s="HMDA News and Updates";return reactExports.useEffect(()=>{if(m)return;const h=setTimeout(()=>{const p=decodeURIComponent(window.location.hash.replace(/^#/,""));if(!p)return;const g=document.getElementById(p);g&&g.scrollIntoView({block:"start"})},300);return()=>clearTimeout(h)},[m]),m?jsxRuntimeExports.jsx(LoadingState,{heading:s}):jsxRuntimeExports.jsxs(PageWrapper,{children:[jsxRuntimeExports.jsx("header",{className:"heading",children:jsxRuntimeExports.jsxs("div",{className:"intro",children:[jsxRuntimeExports.jsx("h1",{children:s}),jsxRuntimeExports.jsx("p",{className:"lead",children:"The HMDA data and reports are the most comprehensive publicly available information on mortgage market activity. This page includes all updates related to data products for the HMDA data collected in or after 2017. This includes header changes, data product differences over the years, and release notes."})]})}),jsxRuntimeExports.jsx("a",{id:"focus-on-filter-bar",className:"nav-anchor",role:"note",href:"#focus-on-filter-bar","aria-hidden":"true",tabIndex:"-1",children:"invisible filter anchor"}),jsxRuntimeExports.jsx("h2",{children:"Change Log"}),jsxRuntimeExports.jsxs("div",{className:"changeLog-wrapper",children:[jsxRuntimeExports.jsx(FilterBar,{filter:a,productOptions:FILTER_OPTIONS.PRODUCT,typeOptions:FILTER_OPTIONS.TYPE}),jsxRuntimeExports.jsx(ChangeLogTable,{data:a.apply(f),filter:a,changeLog:f})]})]})}function LoadingState({heading:a}){return jsxRuntimeExports.jsxs(PageWrapper,{children:[jsxRuntimeExports.jsx("h1",{children:a}),jsxRuntimeExports.jsx(LoadingIcon,{})]})}function PageWrapper({children:a}){return jsxRuntimeExports.jsx("div",{id:"UpdatesNotes",className:"full-width",children:a})}function PageRouter(){return jsxRuntimeExports.jsx(Switch,{children:jsxRuntimeExports.jsx(Route,{path:"/updates-notes",component:UpdatesNotes})})}export{PageRouter as default};
