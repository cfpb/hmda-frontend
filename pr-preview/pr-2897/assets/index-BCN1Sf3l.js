import{Q as reactExports,t as getDefaultExportFromCjs,F as jsxRuntimeExports,C as iconSprite,o as commonjsRequire,J as ordinal,aC as useHistory,aD as useLocation,S as Switch,j as Route,c as LoadingIcon}from"./index-Bq7cYcib.js";import{M as Markdown}from"./index-Dycuf6nL.js";import{B as Buffer}from"./index-CgqXENQe.js";function useRemoteMarkdown(a,f={}){const[m,s]=reactExports.useState(f.defaultData),[h,d]=reactExports.useState(!1),[g,b]=reactExports.useState(null),{forceFetch:l}=f,u=l||window.location.host.indexOf("localhost")<0;return reactExports.useEffect(()=>{u&&(d(!0),b(null),fetch(a).then(i=>i.ok?i.text():Promise.reject(i)).then(i=>{f.transformReceive?s(f.transformReceive(i)):s(i),d(!1)}).catch(i=>{const{status:t,statusText:r}=i;d(!1),b(f.errorMsg||`Error: ${t} - ${r}`)}))},[]),[m,h,g]}const defaultChangeLog=`---
date: 11/18/26
type: release
product: documentation
---
On November 18, 2026, the CFPB released the [2027 Online Filing Instructions Guide (FIG)](https://ffiec.cfpb.gov/documentation/fig/2027/overview), the [Online Supplemental Guide for Quarterly Filers for 2027](https://ffiec.cfpb.gov/documentation/fig/2027/supplemental-guide-for-quarterly-filers), and the [HMDA Beta Platform](https://ffiec.beta.cfpb.gov/) for data collected in 2027.

The [2027 Beta Platform](https://ffiec.beta.cfpb.gov/) is for testing purposes only and the CFPB will continue to add functionality.

Additional information can be found in HMDA's [Login.gov Quick Reference Guide](https://ffiec.cfpb.gov/documentation/faq/login-gov-quick-reference), [Data Collection Timelines](https://ffiec.cfpb.gov/documentation/faq/data-collection-timelines), and [Frequently Asked Questions](https://ffiec.cfpb.gov/documentation/category/frequently-asked-questions).

For questions and feedback regarding these releases, contact <HMDAHelp@cfpb.gov> or visit [hmdahelp.consumerfinance.gov](https://hmdahelp.consumerfinance.gov/).

---
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
- [2026 Online Supplemental Guide for Quarterly Filers](https://ffiec.cfpb.gov/documentation/fig/2026/supplemental-guide-for-quarterly-filers)

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
`,PRODUCT_NAMES={mlar:"Modified LAR",datasets:"National Datasets",reports:"Reports",documentation:"Documentation",tools:"HMDA Tools",filing:"HMDA Filing"},PRODUCTS=Object.keys(PRODUCT_NAMES),CATEGORIES={correction:{order:4},update:{order:3},release:{order:2},announcement:{order:1}},PUB_CHANGELOG_URL="https://raw.githubusercontent.com/cfpb/hmda-frontend/fb4be3590b1f98ad61568e707098fae8028b7bbf/src/updates-notes/change-log.md",DEFAULT_FILTERS={type:[],product:[],keywords:[]},FILTER_OPTIONS={PRODUCT:PRODUCTS.map(a=>({value:a,type:"product"})),TYPE:Object.keys(CATEGORIES).sort((a,f)=>CATEGORIES[a].order-CATEGORIES[f].order).map(a=>({value:a,type:"type"}))};var mark$2={exports:{}};/*!***************************************************
* mark.js v8.11.1
* https://markjs.io/
* Copyright (c) 2014–2018, Julian Kühnel
* Released under the MIT license https://git.io/vwTVl
*****************************************************/var mark$1=mark$2.exports,hasRequiredMark$1;function requireMark$1(){return hasRequiredMark$1||(hasRequiredMark$1=1,function(a,f){(function(m,s){a.exports=s()})(mark$1,function(){var m=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(u){return typeof u}:function(u){return u&&typeof Symbol=="function"&&u.constructor===Symbol&&u!==Symbol.prototype?"symbol":typeof u},s=function(u,i){if(!(u instanceof i))throw new TypeError("Cannot call a class as a function")},h=function(){function u(i,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(i,o.key,o)}}return function(i,t,r){return t&&u(i.prototype,t),r&&u(i,r),i}}(),d=Object.assign||function(u){for(var i=1;i<arguments.length;i++){var t=arguments[i];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(u[r]=t[r])}return u},g=function(){function u(i){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0,r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],o=arguments.length>3&&arguments[3]!==void 0?arguments[3]:5e3;s(this,u),this.ctx=i,this.iframes=t,this.exclude=r,this.iframesTimeout=o}return h(u,[{key:"getContexts",value:function(){var t=void 0,r=[];return typeof this.ctx>"u"||!this.ctx?t=[]:NodeList.prototype.isPrototypeOf(this.ctx)?t=Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?t=this.ctx:typeof this.ctx=="string"?t=Array.prototype.slice.call(document.querySelectorAll(this.ctx)):t=[this.ctx],t.forEach(function(o){var c=r.filter(function(v){return v.contains(o)}).length>0;r.indexOf(o)===-1&&!c&&r.push(o)}),r}},{key:"getIframeContents",value:function(t,r){var o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(){},c=void 0;try{var v=t.contentWindow;if(c=v.document,!v||!c)throw new Error("iframe inaccessible")}catch{o()}c&&r(c)}},{key:"isIframeBlank",value:function(t){var r="about:blank",o=t.getAttribute("src").trim(),c=t.contentWindow.location.href;return c===r&&o!==r&&o}},{key:"observeIframeLoad",value:function(t,r,o){var c=this,v=!1,R=null,S=function I(){if(!v){v=!0,clearTimeout(R);try{c.isIframeBlank(t)||(t.removeEventListener("load",I),c.getIframeContents(t,r,o))}catch{o()}}};t.addEventListener("load",S),R=setTimeout(S,this.iframesTimeout)}},{key:"onIframeReady",value:function(t,r,o){try{t.contentWindow.document.readyState==="complete"?this.isIframeBlank(t)?this.observeIframeLoad(t,r,o):this.getIframeContents(t,r,o):this.observeIframeLoad(t,r,o)}catch{o()}}},{key:"waitForIframes",value:function(t,r){var o=this,c=0;this.forEachIframe(t,function(){return!0},function(v){c++,o.waitForIframes(v.querySelector("html"),function(){--c||r()})},function(v){v||r()})}},{key:"forEachIframe",value:function(t,r,o){var c=this,v=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},R=t.querySelectorAll("iframe"),S=R.length,I=0;R=Array.prototype.slice.call(R);var O=function(){--S<=0&&v(I)};S||O(),R.forEach(function(_){u.matches(_,c.exclude)?O():c.onIframeReady(_,function(j){r(_)&&(I++,o(j)),O()},O)})}},{key:"createIterator",value:function(t,r,o){return document.createNodeIterator(t,r,o,!1)}},{key:"createInstanceOnIframe",value:function(t){return new u(t.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(t,r,o){var c=t.compareDocumentPosition(o),v=Node.DOCUMENT_POSITION_PRECEDING;if(c&v)if(r!==null){var R=r.compareDocumentPosition(o),S=Node.DOCUMENT_POSITION_FOLLOWING;if(R&S)return!0}else return!0;return!1}},{key:"getIteratorNode",value:function(t){var r=t.previousNode(),o=void 0;return r===null?o=t.nextNode():o=t.nextNode()&&t.nextNode(),{prevNode:r,node:o}}},{key:"checkIframeFilter",value:function(t,r,o,c){var v=!1,R=!1;return c.forEach(function(S,I){S.val===o&&(v=I,R=S.handled)}),this.compareNodeIframe(t,r,o)?(v===!1&&!R?c.push({val:o,handled:!0}):v!==!1&&!R&&(c[v].handled=!0),!0):(v===!1&&c.push({val:o,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(t,r,o,c){var v=this;t.forEach(function(R){R.handled||v.getIframeContents(R.val,function(S){v.createInstanceOnIframe(S).forEachNode(r,o,c)})})}},{key:"iterateThroughNodes",value:function(t,r,o,c,v){for(var R=this,S=this.createIterator(r,t,c),I=[],O=[],_=void 0,j=void 0,P=function(){var G=R.getIteratorNode(S);return j=G.prevNode,_=G.node,_};P();)this.iframes&&this.forEachIframe(r,function(B){return R.checkIframeFilter(_,j,B,I)},function(B){R.createInstanceOnIframe(B).forEachNode(t,function(G){return O.push(G)},c)}),O.push(_);O.forEach(function(B){o(B)}),this.iframes&&this.handleOpenIframes(I,t,o,c),v()}},{key:"forEachNode",value:function(t,r,o){var c=this,v=arguments.length>3&&arguments[3]!==void 0?arguments[3]:function(){},R=this.getContexts(),S=R.length;S||v(),R.forEach(function(I){var O=function(){c.iterateThroughNodes(t,I,r,o,function(){--S<=0&&v()})};c.iframes?c.waitForIframes(I,O):O()})}}],[{key:"matches",value:function(t,r){var o=typeof r=="string"?[r]:r,c=t.matches||t.matchesSelector||t.msMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.webkitMatchesSelector;if(c){var v=!1;return o.every(function(R){return c.call(t,R)?(v=!0,!1):!0}),v}else return!1}}]),u}(),b=function(){function u(i){s(this,u),this.ctx=i,this.ie=!1;var t=window.navigator.userAgent;(t.indexOf("MSIE")>-1||t.indexOf("Trident")>-1)&&(this.ie=!0)}return h(u,[{key:"log",value:function(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"debug",o=this.opt.log;this.opt.debug&&(typeof o>"u"?"undefined":m(o))==="object"&&typeof o[r]=="function"&&o[r]("mark.js: "+t)}},{key:"escapeStr",value:function(t){return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(t){return this.opt.wildcards!=="disabled"&&(t=this.setupWildcardsRegExp(t)),t=this.escapeStr(t),Object.keys(this.opt.synonyms).length&&(t=this.createSynonymsRegExp(t)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(t=this.setupIgnoreJoinersRegExp(t)),this.opt.diacritics&&(t=this.createDiacriticsRegExp(t)),t=this.createMergedBlanksRegExp(t),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(t=this.createJoinersRegExp(t)),this.opt.wildcards!=="disabled"&&(t=this.createWildcardsRegExp(t)),t=this.createAccuracyRegExp(t),t}},{key:"createSynonymsRegExp",value:function(t){var r=this.opt.synonyms,o=this.opt.caseSensitive?"":"i",c=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var v in r)if(r.hasOwnProperty(v)){var R=r[v],S=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(v):this.escapeStr(v),I=this.opt.wildcards!=="disabled"?this.setupWildcardsRegExp(R):this.escapeStr(R);S!==""&&I!==""&&(t=t.replace(new RegExp("("+this.escapeStr(S)+"|"+this.escapeStr(I)+")","gm"+o),c+("("+this.processSynomyms(S)+"|")+(this.processSynomyms(I)+")")+c))}return t}},{key:"processSynomyms",value:function(t){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(t=this.setupIgnoreJoinersRegExp(t)),t}},{key:"setupWildcardsRegExp",value:function(t){return t=t.replace(/(?:\\)*\?/g,function(r){return r.charAt(0)==="\\"?"?":""}),t.replace(/(?:\\)*\*/g,function(r){return r.charAt(0)==="\\"?"*":""})}},{key:"createWildcardsRegExp",value:function(t){var r=this.opt.wildcards==="withSpaces";return t.replace(/\u0001/g,r?"[\\S\\s]?":"\\S?").replace(/\u0002/g,r?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(t){return t.replace(/[^(|)\\]/g,function(r,o,c){var v=c.charAt(o+1);return/[(|)\\]/.test(v)||v===""?r:r+"\0"})}},{key:"createJoinersRegExp",value:function(t){var r=[],o=this.opt.ignorePunctuation;return Array.isArray(o)&&o.length&&r.push(this.escapeStr(o.join(""))),this.opt.ignoreJoiners&&r.push("\\u00ad\\u200b\\u200c\\u200d"),r.length?t.split(/\u0000+/).join("["+r.join("")+"]*"):t}},{key:"createDiacriticsRegExp",value:function(t){var r=this.opt.caseSensitive?"":"i",o=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],c=[];return t.split("").forEach(function(v){o.every(function(R){if(R.indexOf(v)!==-1){if(c.indexOf(R)>-1)return!1;t=t.replace(new RegExp("["+R+"]","gm"+r),"["+R+"]"),c.push(R)}return!0})}),t}},{key:"createMergedBlanksRegExp",value:function(t){return t.replace(/[\s]+/gmi,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(t){var r=this,o="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿",c=this.opt.accuracy,v=typeof c=="string"?c:c.value,R=typeof c=="string"?[]:c.limiters,S="";switch(R.forEach(function(I){S+="|"+r.escapeStr(I)}),v){case"partially":default:return"()("+t+")";case"complementary":return S="\\s"+(S||this.escapeStr(o)),"()([^"+S+"]*"+t+"[^"+S+"]*)";case"exactly":return"(^|\\s"+S+")("+t+")(?=$|\\s"+S+")"}}},{key:"getSeparatedKeywords",value:function(t){var r=this,o=[];return t.forEach(function(c){r.opt.separateWordSearch?c.split(" ").forEach(function(v){v.trim()&&o.indexOf(v)===-1&&o.push(v)}):c.trim()&&o.indexOf(c)===-1&&o.push(c)}),{keywords:o.sort(function(c,v){return v.length-c.length}),length:o.length}}},{key:"isNumeric",value:function(t){return Number(parseFloat(t))==t}},{key:"checkRanges",value:function(t){var r=this;if(!Array.isArray(t)||Object.prototype.toString.call(t[0])!=="[object Object]")return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(t),[];var o=[],c=0;return t.sort(function(v,R){return v.start-R.start}).forEach(function(v){var R=r.callNoMatchOnInvalidRanges(v,c),S=R.start,I=R.end,O=R.valid;O&&(v.start=S,v.length=I-S,o.push(v),c=I)}),o}},{key:"callNoMatchOnInvalidRanges",value:function(t,r){var o=void 0,c=void 0,v=!1;return t&&typeof t.start<"u"?(o=parseInt(t.start,10),c=o+parseInt(t.length,10),this.isNumeric(t.start)&&this.isNumeric(t.length)&&c-r>0&&c-o>0?v=!0:(this.log("Ignoring invalid or overlapping range: "+(""+JSON.stringify(t))),this.opt.noMatch(t))):(this.log("Ignoring invalid range: "+JSON.stringify(t)),this.opt.noMatch(t)),{start:o,end:c,valid:v}}},{key:"checkWhitespaceRanges",value:function(t,r,o){var c=void 0,v=!0,R=o.length,S=r-R,I=parseInt(t.start,10)-S;return I=I>R?R:I,c=I+parseInt(t.length,10),c>R&&(c=R,this.log("End range automatically set to the max value of "+R)),I<0||c-I<0||I>R||c>R?(v=!1,this.log("Invalid range: "+JSON.stringify(t)),this.opt.noMatch(t)):o.substring(I,c).replace(/\s+/g,"")===""&&(v=!1,this.log("Skipping whitespace only range: "+JSON.stringify(t)),this.opt.noMatch(t)),{start:I,end:c,valid:v}}},{key:"getTextNodes",value:function(t){var r=this,o="",c=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(v){c.push({start:o.length,end:(o+=v.textContent).length,node:v})},function(v){return r.matchesExclude(v.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){t({value:o,nodes:c})})}},{key:"matchesExclude",value:function(t){return g.matches(t,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(t,r,o){var c=this.opt.element?this.opt.element:"mark",v=t.splitText(r),R=v.splitText(o-r),S=document.createElement(c);return S.setAttribute("data-markjs","true"),this.opt.className&&S.setAttribute("class",this.opt.className),S.textContent=v.textContent,v.parentNode.replaceChild(S,v),R}},{key:"wrapRangeInMappedTextNode",value:function(t,r,o,c,v){var R=this;t.nodes.every(function(S,I){var O=t.nodes[I+1];if(typeof O>"u"||O.start>r){if(!c(S.node))return!1;var _=r-S.start,j=(o>S.end?S.end:o)-S.start,P=t.value.substr(0,S.start),B=t.value.substr(j+S.start);if(S.node=R.wrapRangeInTextNode(S.node,_,j),t.value=P+B,t.nodes.forEach(function(G,$){$>=I&&(t.nodes[$].start>0&&$!==I&&(t.nodes[$].start-=j),t.nodes[$].end-=j)}),o-=j,v(S.node.previousSibling,S.start),o>S.end)r=S.end;else return!1}return!0})}},{key:"wrapMatches",value:function(t,r,o,c,v){var R=this,S=r===0?0:r+1;this.getTextNodes(function(I){I.nodes.forEach(function(O){O=O.node;for(var _=void 0;(_=t.exec(O.textContent))!==null&&_[S]!=="";)if(o(_[S],O)){var j=_.index;if(S!==0)for(var P=1;P<S;P++)j+=_[P].length;O=R.wrapRangeInTextNode(O,j,j+_[S].length),c(O.previousSibling),t.lastIndex=0}}),v()})}},{key:"wrapMatchesAcrossElements",value:function(t,r,o,c,v){var R=this,S=r===0?0:r+1;this.getTextNodes(function(I){for(var O=void 0;(O=t.exec(I.value))!==null&&O[S]!=="";){var _=O.index;if(S!==0)for(var j=1;j<S;j++)_+=O[j].length;var P=_+O[S].length;R.wrapRangeInMappedTextNode(I,_,P,function(B){return o(O[S],B)},function(B,G){t.lastIndex=G,c(B)})}v()})}},{key:"wrapRangeFromIndex",value:function(t,r,o,c){var v=this;this.getTextNodes(function(R){var S=R.value.length;t.forEach(function(I,O){var _=v.checkWhitespaceRanges(I,S,R.value),j=_.start,P=_.end,B=_.valid;B&&v.wrapRangeInMappedTextNode(R,j,P,function(G){return r(G,I,R.value.substring(j,P),O)},function(G){o(G,I)})}),c()})}},{key:"unwrapMatches",value:function(t){for(var r=t.parentNode,o=document.createDocumentFragment();t.firstChild;)o.appendChild(t.removeChild(t.firstChild));r.replaceChild(o,t),this.ie?this.normalizeTextNode(r):r.normalize()}},{key:"normalizeTextNode",value:function(t){if(t){if(t.nodeType===3)for(;t.nextSibling&&t.nextSibling.nodeType===3;)t.nodeValue+=t.nextSibling.nodeValue,t.parentNode.removeChild(t.nextSibling);else this.normalizeTextNode(t.firstChild);this.normalizeTextNode(t.nextSibling)}}},{key:"markRegExp",value:function(t,r){var o=this;this.opt=r,this.log('Searching with expression "'+t+'"');var c=0,v="wrapMatches",R=function(I){c++,o.opt.each(I)};this.opt.acrossElements&&(v="wrapMatchesAcrossElements"),this[v](t,this.opt.ignoreGroups,function(S,I){return o.opt.filter(I,S,c)},R,function(){c===0&&o.opt.noMatch(t),o.opt.done(c)})}},{key:"mark",value:function(t,r){var o=this;this.opt=r;var c=0,v="wrapMatches",R=this.getSeparatedKeywords(typeof t=="string"?[t]:t),S=R.keywords,I=R.length,O=this.opt.caseSensitive?"":"i",_=function j(P){var B=new RegExp(o.createRegExp(P),"gm"+O),G=0;o.log('Searching with expression "'+B+'"'),o[v](B,1,function($,ee){return o.opt.filter(ee,P,c,G)},function($){G++,c++,o.opt.each($)},function(){G===0&&o.opt.noMatch(P),S[I-1]===P?o.opt.done(c):j(S[S.indexOf(P)+1])})};this.opt.acrossElements&&(v="wrapMatchesAcrossElements"),I===0?this.opt.done(c):_(S[0])}},{key:"markRanges",value:function(t,r){var o=this;this.opt=r;var c=0,v=this.checkRanges(t);v&&v.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(v)),this.wrapRangeFromIndex(v,function(R,S,I,O){return o.opt.filter(R,S,I,O)},function(R,S){c++,o.opt.each(R,S)},function(){o.opt.done(c)})):this.opt.done(c)}},{key:"unmark",value:function(t){var r=this;this.opt=t;var o=this.opt.element?this.opt.element:"*";o+="[data-markjs]",this.opt.className&&(o+="."+this.opt.className),this.log('Removal selector "'+o+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(c){r.unwrapMatches(c)},function(c){var v=g.matches(c,o),R=r.matchesExclude(c);return!v||R?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:"opt",set:function(t){this._opt=d({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},t)},get:function(){return this._opt}},{key:"iterator",get:function(){return new g(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),u}();function l(u){var i=this,t=new b(u);return this.mark=function(r,o){return t.mark(r,o),i},this.markRegExp=function(r,o){return t.markRegExp(r,o),i},this.markRanges=function(r,o){return t.markRanges(r,o),i},this.unmark=function(r){return t.unmark(r),i},this}return l})}(mark$2)),mark$2.exports}var markExports=requireMark$1();const Mark=getDefaultExportFromCjs(markExports),MAX_HEIGHT=400;function ExpandableDescription({description:a,highlightWords:f=[]}){const m=reactExports.useRef(null),[s,h]=reactExports.useState(!1),[d,g]=reactExports.useState(!1);reactExports.useEffect(()=>{if(m.current){const l=m.current.scrollHeight;g(l>MAX_HEIGHT)}},[a]),reactExports.useEffect(()=>{if(m.current){const l=new Mark(m.current);l.unmark(),(f==null?void 0:f.length)>0&&l.mark(f,{className:"highlighted",separateWordSearch:!0})}},[f,a]);const b=()=>{h(!s)};return jsxRuntimeExports.jsxs("div",{className:"expandable-description-wrapper",children:[jsxRuntimeExports.jsx("div",{ref:m,className:`expandable-description-content ${s?"expanded":"collapsed"} ${d?"needs-expansion":""}`,style:!s&&d?{maxHeight:`${MAX_HEIGHT}px`}:void 0,children:jsxRuntimeExports.jsx(Markdown,{children:a})}),d&&jsxRuntimeExports.jsx("button",{className:"usa-button usa-button--outline read-more-button",onClick:b,type:"button","aria-expanded":s,children:s?"Read less":"Read more"})]})}function FilterResetButton({onClick:a}){return jsxRuntimeExports.jsx("button",{className:"reset-filters",onClick:a,type:"button",children:"Reset All Filters"})}function ChangeLogTable({data:a={},products:f=PRODUCT_NAMES,filter:m,changeLog:s}){const h=reactExports.useMemo(()=>Object.keys(s).map(u=>s[u].length).reduce((u,i)=>u+i,0),[s]),d=Object.keys(m.filters).some(u=>m.filters[u].length),b=Object.keys(a).map((u,i)=>{const t=a[u];return!t||!t.length?null:t.map((r,o)=>jsxRuntimeExports.jsx(Row,{item:r,products:f,filter:m},`clt-row-${i}col-${o}`))}).flat().filter(u=>u),l=!b.length;return jsxRuntimeExports.jsxs("div",{id:"ChangeLogTable",children:[jsxRuntimeExports.jsx("div",{id:"ChangeLogTableTop"}),jsxRuntimeExports.jsx(ResultCount,{count:b.length,total:h,hide:!d}),jsxRuntimeExports.jsx(EmptyState,{clear:m.clear,isEmpty:l}),b]})}function ResultCount({count:a,total:f,hide:m}){return m?null:jsxRuntimeExports.jsxs("div",{className:"result-count",children:[jsxRuntimeExports.jsxs("h3",{className:"header",children:[jsxRuntimeExports.jsx("svg",{className:"filtersIcon","aria-hidden":"true",focusable:"false",role:"img",children:jsxRuntimeExports.jsx("use",{href:`${iconSprite}#filters`})}),"Filtered results"]}),jsxRuntimeExports.jsxs("div",{className:"body",children:["Showing ",jsxRuntimeExports.jsx("span",{className:"highlight",children:a})," out of"," ",jsxRuntimeExports.jsx("span",{className:"highlight",children:f})," entries"]})]})}function EmptyState({clear:a,isEmpty:f}){return f?jsxRuntimeExports.jsxs("div",{className:"empty-state",children:[jsxRuntimeExports.jsx("span",{role:"img","aria-label":"warning sign",children:"⚠️"})," ","No matches found.",jsxRuntimeExports.jsx(FilterResetButton,{onClick:()=>a()})]}):null}function Row({item:a,filter:f,products:m}){const s="change-row split",h=`product ${a.product}${f.filters.product.indexOf(a.product)>-1?" selected":""}`,d=()=>f.toggle("type",a.type),g=()=>f.toggle("product",a.product);return jsxRuntimeExports.jsxs("div",{className:s,id:a.slug,children:[jsxRuntimeExports.jsx(Column,{className:h,value:m[a.product],onClick:g}),jsxRuntimeExports.jsx(Column,{className:"changeType",children:jsxRuntimeExports.jsx("button",{className:`pill type ${a.type}`,onClick:d,type:"button",children:jsxRuntimeExports.jsx("div",{className:"text",children:a.type})})}),jsxRuntimeExports.jsx(Column,{className:"date",children:jsxRuntimeExports.jsx("a",{href:`#${a.slug}`,children:a.changeDateOrdinal})}),jsxRuntimeExports.jsx(Column,{className:"description",children:jsxRuntimeExports.jsx(ExpandableDescription,{description:a.description,highlightWords:f.filters.keywords})})]})}function Column({value:a,onClick:f=()=>null,className:m,children:s}){return m.indexOf("product")>-1?jsxRuntimeExports.jsx("button",{onClick:f,className:`column ${m}`,type:"button",children:a||s}):jsxRuntimeExports.jsx("div",{onClick:f,className:`column ${m}`,children:a||s})}const spyGlass="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20880.6%201200'%20class='cf-icon-svg'%3e%3cpath%20d='M860.1%20879.2L645.7%20664.8c90.8-136.8%2076-323-44.6-443.5-137.5-137.5-360.5-137.5-498%200s-137.5%20360.5%200%20498c118.5%20118.4%20303.9%20137%20443.5%2044.6L761%20978.3c27.3%2027.3%2071.7%2027.3%2099%200s27.4-71.8.1-99.1zm-508-116.9C191.4%20762%2061.3%20631.5%2061.6%20470.8c.3-160.7%20130.8-290.8%20291.5-290.5s290.8%20130.8%20290.5%20291.5c-.2%20118.2-71.9%20224.6-181.5%20269.1-34.9%2014.2-72.3%2021.5-110%2021.4z'%3e%3c/path%3e%3c/svg%3e";function FilterBar({productOptions:a,typeOptions:f,filter:m}){const s=m.filters.keywords?m.filters.keywords.join(" "):"",[h,d]=reactExports.useState(!1),g=()=>{d(!h)};return jsxRuntimeExports.jsx("div",{id:"filter-bar",children:jsxRuntimeExports.jsxs("div",{className:`filter-wrapper split ${h?"expanded":""}`,children:[jsxRuntimeExports.jsxs("h4",{className:"filter-title",onClick:g,children:[jsxRuntimeExports.jsx("svg",{className:"filterIcon","aria-hidden":"true",focusable:"false",role:"img",children:jsxRuntimeExports.jsx("use",{href:`${iconSprite}#filter_alt`})}),jsxRuntimeExports.jsx("span",{children:"Filter by:"})]}),jsxRuntimeExports.jsx(FilterColumn,{name:"type",heading:"Type",options:f,filter:m}),jsxRuntimeExports.jsx(FilterColumn,{name:"product",heading:"Product",options:a,filter:m}),jsxRuntimeExports.jsxs("div",{className:"search-wrapper",children:[jsxRuntimeExports.jsx(SearchField,{id:"search-input",value:s,label:"Description",onChange:b=>{m.add("keywords",b.target.value),document.getElementById("ChangeLogTableTop").scrollIntoView()},onClear:()=>m.clear("keywords")}),jsxRuntimeExports.jsx(FilterResetButton,{onClick:()=>m.clear()})]})]})})}function SearchField({id:a,label:f,value:m,onChange:s,placeholder:h="Search",onClear:d}){return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment,{children:[jsxRuntimeExports.jsx("h3",{children:jsxRuntimeExports.jsx("label",{htmlFor:a,children:f})}),jsxRuntimeExports.jsxs("div",{className:"text-input",children:[jsxRuntimeExports.jsx("span",{className:"icon",children:jsxRuntimeExports.jsx("img",{src:spyGlass,alt:"Magnifying glass"})}),jsxRuntimeExports.jsxs("div",{className:"search-input-wrapper",children:[jsxRuntimeExports.jsx("input",{id:a,type:"text",value:m,onChange:s,placeholder:h}),jsxRuntimeExports.jsx("button",{type:"button",className:"clear-text",onClick:d,children:"x"})]})]})]})}function FilterColumn({name:a,options:f,heading:m,filter:s}){return jsxRuntimeExports.jsxs("div",{className:`pills-wrapper ${a}`,children:[jsxRuntimeExports.jsx("h3",{children:m}),jsxRuntimeExports.jsx("div",{className:"pills split columns",children:f.map((h,d)=>jsxRuntimeExports.jsx(FilterPill,{option:h,filter:s},`${h.type}-${d}`))})]})}function FilterPill({option:a,filter:f}){const{type:m,value:s}=a,{toggle:h,filters:d}=f,g=`pill-${m}-${s}`,b=m==="product"?PRODUCT_NAMES:null,l=d[a.type].indexOf(a.value)>-1?"selected":"",[u,i]=reactExports.useState(!1);return reactExports.useEffect(()=>{window.scrollTo(0,0)},[]),reactExports.useEffect(()=>{u&&(document.getElementById("focus-on-filter-bar").scrollIntoView(),i(!1))},[u]),jsxRuntimeExports.jsxs("button",{id:g,type:"button",className:`pill ${m} ${s} ${l}`,onClick:()=>{h(m,s),i(!u)},children:[jsxRuntimeExports.jsx("span",{className:"icon",children:l?"✓":"+"}),jsxRuntimeExports.jsx("div",{className:"text",children:b?b[s]:s})]})}var empty_1,hasRequiredEmpty;function requireEmpty(){if(hasRequiredEmpty)return empty_1;hasRequiredEmpty=1;var a=null;return empty_1=a,empty_1}var kindOf,hasRequiredKindOf;function requireKindOf(){if(hasRequiredKindOf)return kindOf;hasRequiredKindOf=1;var a=Object.prototype.toString;kindOf=function(t){if(t===void 0)return"undefined";if(t===null)return"null";var r=typeof t;if(r==="boolean")return"boolean";if(r==="string")return"string";if(r==="number")return"number";if(r==="symbol")return"symbol";if(r==="function")return g(t)?"generatorfunction":"function";if(m(t))return"array";if(u(t))return"buffer";if(l(t))return"arguments";if(h(t))return"date";if(s(t))return"error";if(d(t))return"regexp";switch(f(t)){case"Symbol":return"symbol";case"Promise":return"promise";case"WeakMap":return"weakmap";case"WeakSet":return"weakset";case"Map":return"map";case"Set":return"set";case"Int8Array":return"int8array";case"Uint8Array":return"uint8array";case"Uint8ClampedArray":return"uint8clampedarray";case"Int16Array":return"int16array";case"Uint16Array":return"uint16array";case"Int32Array":return"int32array";case"Uint32Array":return"uint32array";case"Float32Array":return"float32array";case"Float64Array":return"float64array"}if(b(t))return"generator";switch(r=a.call(t),r){case"[object Object]":return"object";case"[object Map Iterator]":return"mapiterator";case"[object Set Iterator]":return"setiterator";case"[object String Iterator]":return"stringiterator";case"[object Array Iterator]":return"arrayiterator"}return r.slice(8,-1).toLowerCase().replace(/\s/g,"")};function f(i){return typeof i.constructor=="function"?i.constructor.name:null}function m(i){return Array.isArray?Array.isArray(i):i instanceof Array}function s(i){return i instanceof Error||typeof i.message=="string"&&i.constructor&&typeof i.constructor.stackTraceLimit=="number"}function h(i){return i instanceof Date?!0:typeof i.toDateString=="function"&&typeof i.getDate=="function"&&typeof i.setDate=="function"}function d(i){return i instanceof RegExp?!0:typeof i.flags=="string"&&typeof i.ignoreCase=="boolean"&&typeof i.multiline=="boolean"&&typeof i.global=="boolean"}function g(i,t){return f(i)==="GeneratorFunction"}function b(i){return typeof i.throw=="function"&&typeof i.return=="function"&&typeof i.next=="function"}function l(i){try{if(typeof i.length=="number"&&typeof i.callee=="function")return!0}catch(t){if(t.message.indexOf("callee")!==-1)return!0}return!1}function u(i){return i.constructor&&typeof i.constructor.isBuffer=="function"?i.constructor.isBuffer(i):!1}return kindOf}/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */var isExtendable,hasRequiredIsExtendable;function requireIsExtendable(){return hasRequiredIsExtendable||(hasRequiredIsExtendable=1,isExtendable=function(f){return typeof f<"u"&&f!==null&&(typeof f=="object"||typeof f=="function")}),isExtendable}var extendShallow,hasRequiredExtendShallow;function requireExtendShallow(){if(hasRequiredExtendShallow)return extendShallow;hasRequiredExtendShallow=1;var a=requireIsExtendable();extendShallow=function(h){a(h)||(h={});for(var d=arguments.length,g=1;g<d;g++){var b=arguments[g];a(b)&&f(h,b)}return h};function f(s,h){for(var d in h)m(h,d)&&(s[d]=h[d])}function m(s,h){return Object.prototype.hasOwnProperty.call(s,h)}return extendShallow}var sectionMatter,hasRequiredSectionMatter;function requireSectionMatter(){if(hasRequiredSectionMatter)return sectionMatter;hasRequiredSectionMatter=1;var a=requireKindOf(),f=requireExtendShallow();sectionMatter=function(l,u){typeof u=="function"&&(u={parse:u});var i=s(l),t={section_delimiter:"---",parse:g},r=f({},t,u),o=r.section_delimiter,c=i.content.split(/\r?\n/),v=null,R=d(),S=[],I=[];function O($){i.content=$,v=[],S=[]}function _($){I.length&&(R.key=h(I[0],o),R.content=$,r.parse(R,v),v.push(R),R=d(),S=[],I=[])}for(var j=0;j<c.length;j++){var P=c[j],B=I.length,G=P.trim();if(m(G,o)){if(G.length===3&&j!==0){if(B===0||B===2){S.push(P);continue}I.push(G),R.data=S.join(`
`),S=[];continue}v===null&&O(S.join(`
`)),B===2&&_(S.join(`
`)),I.push(G);continue}S.push(P)}return v===null?O(S.join(`
`)):_(S.join(`
`)),i.sections=v,i};function m(l,u){return!(l.slice(0,u.length)!==u||l.charAt(u.length+1)===u.slice(-1))}function s(l){if(a(l)!=="object"&&(l={content:l}),typeof l.content!="string"&&!b(l.content))throw new TypeError("expected a buffer or string");return l.content=l.content.toString(),l.sections=[],l}function h(l,u){return l?l.slice(u.length).trim():""}function d(){return{key:"",data:"",content:""}}function g(l){return l}function b(l){return l&&l.constructor&&typeof l.constructor.isBuffer=="function"?l.constructor.isBuffer(l):!1}return sectionMatter}var engines={exports:{}},jsYaml$1={},loader={},common={},hasRequiredCommon;function requireCommon(){if(hasRequiredCommon)return common;hasRequiredCommon=1;function a(g){return typeof g>"u"||g===null}function f(g){return typeof g=="object"&&g!==null}function m(g){return Array.isArray(g)?g:a(g)?[]:[g]}function s(g,b){var l,u,i,t;if(b)for(t=Object.keys(b),l=0,u=t.length;l<u;l+=1)i=t[l],g[i]=b[i];return g}function h(g,b){var l="",u;for(u=0;u<b;u+=1)l+=g;return l}function d(g){return g===0&&Number.NEGATIVE_INFINITY===1/g}return common.isNothing=a,common.isObject=f,common.toArray=m,common.repeat=h,common.isNegativeZero=d,common.extend=s,common}var exception,hasRequiredException;function requireException(){if(hasRequiredException)return exception;hasRequiredException=1;function a(f,m){Error.call(this),this.name="YAMLException",this.reason=f,this.mark=m,this.message=(this.reason||"(unknown reason)")+(this.mark?" "+this.mark.toString():""),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}return a.prototype=Object.create(Error.prototype),a.prototype.constructor=a,a.prototype.toString=function(m){var s=this.name+": ";return s+=this.reason||"(unknown reason)",!m&&this.mark&&(s+=" "+this.mark.toString()),s},exception=a,exception}var mark,hasRequiredMark;function requireMark(){if(hasRequiredMark)return mark;hasRequiredMark=1;var a=requireCommon();function f(m,s,h,d,g){this.name=m,this.buffer=s,this.position=h,this.line=d,this.column=g}return f.prototype.getSnippet=function(s,h){var d,g,b,l,u;if(!this.buffer)return null;for(s=s||4,h=h||75,d="",g=this.position;g>0&&`\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(g-1))===-1;)if(g-=1,this.position-g>h/2-1){d=" ... ",g+=5;break}for(b="",l=this.position;l<this.buffer.length&&`\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(l))===-1;)if(l+=1,l-this.position>h/2-1){b=" ... ",l-=5;break}return u=this.buffer.slice(g,l),a.repeat(" ",s)+d+u+b+`
`+a.repeat(" ",s+this.position-g+d.length)+"^"},f.prototype.toString=function(s){var h,d="";return this.name&&(d+='in "'+this.name+'" '),d+="at line "+(this.line+1)+", column "+(this.column+1),s||(h=this.getSnippet(),h&&(d+=`:
`+h)),d},mark=f,mark}var type,hasRequiredType;function requireType(){if(hasRequiredType)return type;hasRequiredType=1;var a=requireException(),f=["kind","resolve","construct","instanceOf","predicate","represent","defaultStyle","styleAliases"],m=["scalar","sequence","mapping"];function s(d){var g={};return d!==null&&Object.keys(d).forEach(function(b){d[b].forEach(function(l){g[String(l)]=b})}),g}function h(d,g){if(g=g||{},Object.keys(g).forEach(function(b){if(f.indexOf(b)===-1)throw new a('Unknown option "'+b+'" is met in definition of "'+d+'" YAML type.')}),this.tag=d,this.kind=g.kind||null,this.resolve=g.resolve||function(){return!0},this.construct=g.construct||function(b){return b},this.instanceOf=g.instanceOf||null,this.predicate=g.predicate||null,this.represent=g.represent||null,this.defaultStyle=g.defaultStyle||null,this.styleAliases=s(g.styleAliases||null),m.indexOf(this.kind)===-1)throw new a('Unknown kind "'+this.kind+'" is specified for "'+d+'" YAML type.')}return type=h,type}var schema,hasRequiredSchema;function requireSchema(){if(hasRequiredSchema)return schema;hasRequiredSchema=1;var a=requireCommon(),f=requireException(),m=requireType();function s(g,b,l){var u=[];return g.include.forEach(function(i){l=s(i,b,l)}),g[b].forEach(function(i){l.forEach(function(t,r){t.tag===i.tag&&t.kind===i.kind&&u.push(r)}),l.push(i)}),l.filter(function(i,t){return u.indexOf(t)===-1})}function h(){var g={scalar:{},sequence:{},mapping:{},fallback:{}},b,l;function u(i){g[i.kind][i.tag]=g.fallback[i.tag]=i}for(b=0,l=arguments.length;b<l;b+=1)arguments[b].forEach(u);return g}function d(g){this.include=g.include||[],this.implicit=g.implicit||[],this.explicit=g.explicit||[],this.implicit.forEach(function(b){if(b.loadKind&&b.loadKind!=="scalar")throw new f("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.")}),this.compiledImplicit=s(this,"implicit",[]),this.compiledExplicit=s(this,"explicit",[]),this.compiledTypeMap=h(this.compiledImplicit,this.compiledExplicit)}return d.DEFAULT=null,d.create=function(){var b,l;switch(arguments.length){case 1:b=d.DEFAULT,l=arguments[0];break;case 2:b=arguments[0],l=arguments[1];break;default:throw new f("Wrong number of arguments for Schema.create function")}if(b=a.toArray(b),l=a.toArray(l),!b.every(function(u){return u instanceof d}))throw new f("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");if(!l.every(function(u){return u instanceof m}))throw new f("Specified list of YAML types (or a single Type object) contains a non-Type object.");return new d({include:b,explicit:l})},schema=d,schema}var str,hasRequiredStr;function requireStr(){if(hasRequiredStr)return str;hasRequiredStr=1;var a=requireType();return str=new a("tag:yaml.org,2002:str",{kind:"scalar",construct:function(f){return f!==null?f:""}}),str}var seq,hasRequiredSeq;function requireSeq(){if(hasRequiredSeq)return seq;hasRequiredSeq=1;var a=requireType();return seq=new a("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(f){return f!==null?f:[]}}),seq}var map,hasRequiredMap;function requireMap(){if(hasRequiredMap)return map;hasRequiredMap=1;var a=requireType();return map=new a("tag:yaml.org,2002:map",{kind:"mapping",construct:function(f){return f!==null?f:{}}}),map}var failsafe,hasRequiredFailsafe;function requireFailsafe(){if(hasRequiredFailsafe)return failsafe;hasRequiredFailsafe=1;var a=requireSchema();return failsafe=new a({explicit:[requireStr(),requireSeq(),requireMap()]}),failsafe}var _null,hasRequired_null;function require_null(){if(hasRequired_null)return _null;hasRequired_null=1;var a=requireType();function f(h){if(h===null)return!0;var d=h.length;return d===1&&h==="~"||d===4&&(h==="null"||h==="Null"||h==="NULL")}function m(){return null}function s(h){return h===null}return _null=new a("tag:yaml.org,2002:null",{kind:"scalar",resolve:f,construct:m,predicate:s,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"}},defaultStyle:"lowercase"}),_null}var bool,hasRequiredBool;function requireBool(){if(hasRequiredBool)return bool;hasRequiredBool=1;var a=requireType();function f(h){if(h===null)return!1;var d=h.length;return d===4&&(h==="true"||h==="True"||h==="TRUE")||d===5&&(h==="false"||h==="False"||h==="FALSE")}function m(h){return h==="true"||h==="True"||h==="TRUE"}function s(h){return Object.prototype.toString.call(h)==="[object Boolean]"}return bool=new a("tag:yaml.org,2002:bool",{kind:"scalar",resolve:f,construct:m,predicate:s,represent:{lowercase:function(h){return h?"true":"false"},uppercase:function(h){return h?"TRUE":"FALSE"},camelcase:function(h){return h?"True":"False"}},defaultStyle:"lowercase"}),bool}var int,hasRequiredInt;function requireInt(){if(hasRequiredInt)return int;hasRequiredInt=1;var a=requireCommon(),f=requireType();function m(l){return 48<=l&&l<=57||65<=l&&l<=70||97<=l&&l<=102}function s(l){return 48<=l&&l<=55}function h(l){return 48<=l&&l<=57}function d(l){if(l===null)return!1;var u=l.length,i=0,t=!1,r;if(!u)return!1;if(r=l[i],(r==="-"||r==="+")&&(r=l[++i]),r==="0"){if(i+1===u)return!0;if(r=l[++i],r==="b"){for(i++;i<u;i++)if(r=l[i],r!=="_"){if(r!=="0"&&r!=="1")return!1;t=!0}return t&&r!=="_"}if(r==="x"){for(i++;i<u;i++)if(r=l[i],r!=="_"){if(!m(l.charCodeAt(i)))return!1;t=!0}return t&&r!=="_"}for(;i<u;i++)if(r=l[i],r!=="_"){if(!s(l.charCodeAt(i)))return!1;t=!0}return t&&r!=="_"}if(r==="_")return!1;for(;i<u;i++)if(r=l[i],r!=="_"){if(r===":")break;if(!h(l.charCodeAt(i)))return!1;t=!0}return!t||r==="_"?!1:r!==":"?!0:/^(:[0-5]?[0-9])+$/.test(l.slice(i))}function g(l){var u=l,i=1,t,r,o=[];return u.indexOf("_")!==-1&&(u=u.replace(/_/g,"")),t=u[0],(t==="-"||t==="+")&&(t==="-"&&(i=-1),u=u.slice(1),t=u[0]),u==="0"?0:t==="0"?u[1]==="b"?i*parseInt(u.slice(2),2):u[1]==="x"?i*parseInt(u,16):i*parseInt(u,8):u.indexOf(":")!==-1?(u.split(":").forEach(function(c){o.unshift(parseInt(c,10))}),u=0,r=1,o.forEach(function(c){u+=c*r,r*=60}),i*u):i*parseInt(u,10)}function b(l){return Object.prototype.toString.call(l)==="[object Number]"&&l%1===0&&!a.isNegativeZero(l)}return int=new f("tag:yaml.org,2002:int",{kind:"scalar",resolve:d,construct:g,predicate:b,represent:{binary:function(l){return l>=0?"0b"+l.toString(2):"-0b"+l.toString(2).slice(1)},octal:function(l){return l>=0?"0"+l.toString(8):"-0"+l.toString(8).slice(1)},decimal:function(l){return l.toString(10)},hexadecimal:function(l){return l>=0?"0x"+l.toString(16).toUpperCase():"-0x"+l.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),int}var float,hasRequiredFloat;function requireFloat(){if(hasRequiredFloat)return float;hasRequiredFloat=1;var a=requireCommon(),f=requireType(),m=new RegExp("^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function s(l){return!(l===null||!m.test(l)||l[l.length-1]==="_")}function h(l){var u,i,t,r;return u=l.replace(/_/g,"").toLowerCase(),i=u[0]==="-"?-1:1,r=[],"+-".indexOf(u[0])>=0&&(u=u.slice(1)),u===".inf"?i===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:u===".nan"?NaN:u.indexOf(":")>=0?(u.split(":").forEach(function(o){r.unshift(parseFloat(o,10))}),u=0,t=1,r.forEach(function(o){u+=o*t,t*=60}),i*u):i*parseFloat(u,10)}var d=/^[-+]?[0-9]+e/;function g(l,u){var i;if(isNaN(l))switch(u){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===l)switch(u){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===l)switch(u){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(a.isNegativeZero(l))return"-0.0";return i=l.toString(10),d.test(i)?i.replace("e",".e"):i}function b(l){return Object.prototype.toString.call(l)==="[object Number]"&&(l%1!==0||a.isNegativeZero(l))}return float=new f("tag:yaml.org,2002:float",{kind:"scalar",resolve:s,construct:h,predicate:b,represent:g,defaultStyle:"lowercase"}),float}var json,hasRequiredJson;function requireJson(){if(hasRequiredJson)return json;hasRequiredJson=1;var a=requireSchema();return json=new a({include:[requireFailsafe()],implicit:[require_null(),requireBool(),requireInt(),requireFloat()]}),json}var core,hasRequiredCore;function requireCore(){if(hasRequiredCore)return core;hasRequiredCore=1;var a=requireSchema();return core=new a({include:[requireJson()]}),core}var timestamp,hasRequiredTimestamp;function requireTimestamp(){if(hasRequiredTimestamp)return timestamp;hasRequiredTimestamp=1;var a=requireType(),f=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),m=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function s(g){return g===null?!1:f.exec(g)!==null||m.exec(g)!==null}function h(g){var b,l,u,i,t,r,o,c=0,v=null,R,S,I;if(b=f.exec(g),b===null&&(b=m.exec(g)),b===null)throw new Error("Date resolve error");if(l=+b[1],u=+b[2]-1,i=+b[3],!b[4])return new Date(Date.UTC(l,u,i));if(t=+b[4],r=+b[5],o=+b[6],b[7]){for(c=b[7].slice(0,3);c.length<3;)c+="0";c=+c}return b[9]&&(R=+b[10],S=+(b[11]||0),v=(R*60+S)*6e4,b[9]==="-"&&(v=-v)),I=new Date(Date.UTC(l,u,i,t,r,o,c)),v&&I.setTime(I.getTime()-v),I}function d(g){return g.toISOString()}return timestamp=new a("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:s,construct:h,instanceOf:Date,represent:d}),timestamp}var merge,hasRequiredMerge;function requireMerge(){if(hasRequiredMerge)return merge;hasRequiredMerge=1;var a=requireType();function f(m){return m==="<<"||m===null}return merge=new a("tag:yaml.org,2002:merge",{kind:"scalar",resolve:f}),merge}var binary,hasRequiredBinary;function requireBinary(){if(hasRequiredBinary)return binary;hasRequiredBinary=1;var a;try{var f=commonjsRequire;a=f("buffer").Buffer}catch{}var m=requireType(),s=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function h(l){if(l===null)return!1;var u,i,t=0,r=l.length,o=s;for(i=0;i<r;i++)if(u=o.indexOf(l.charAt(i)),!(u>64)){if(u<0)return!1;t+=6}return t%8===0}function d(l){var u,i,t=l.replace(/[\r\n=]/g,""),r=t.length,o=s,c=0,v=[];for(u=0;u<r;u++)u%4===0&&u&&(v.push(c>>16&255),v.push(c>>8&255),v.push(c&255)),c=c<<6|o.indexOf(t.charAt(u));return i=r%4*6,i===0?(v.push(c>>16&255),v.push(c>>8&255),v.push(c&255)):i===18?(v.push(c>>10&255),v.push(c>>2&255)):i===12&&v.push(c>>4&255),a?a.from?a.from(v):new a(v):v}function g(l){var u="",i=0,t,r,o=l.length,c=s;for(t=0;t<o;t++)t%3===0&&t&&(u+=c[i>>18&63],u+=c[i>>12&63],u+=c[i>>6&63],u+=c[i&63]),i=(i<<8)+l[t];return r=o%3,r===0?(u+=c[i>>18&63],u+=c[i>>12&63],u+=c[i>>6&63],u+=c[i&63]):r===2?(u+=c[i>>10&63],u+=c[i>>4&63],u+=c[i<<2&63],u+=c[64]):r===1&&(u+=c[i>>2&63],u+=c[i<<4&63],u+=c[64],u+=c[64]),u}function b(l){return a&&a.isBuffer(l)}return binary=new m("tag:yaml.org,2002:binary",{kind:"scalar",resolve:h,construct:d,predicate:b,represent:g}),binary}var omap,hasRequiredOmap;function requireOmap(){if(hasRequiredOmap)return omap;hasRequiredOmap=1;var a=requireType(),f=Object.prototype.hasOwnProperty,m=Object.prototype.toString;function s(d){if(d===null)return!0;var g={},b,l,u,i,t,r=d;for(b=0,l=r.length;b<l;b+=1){if(u=r[b],t=!1,m.call(u)!=="[object Object]")return!1;for(i in u)if(f.call(u,i))if(!t)t=!0;else return!1;if(!t||f.call(g,i))return!1;Object.defineProperty(g,i,{value:!0})}return!0}function h(d){return d!==null?d:[]}return omap=new a("tag:yaml.org,2002:omap",{kind:"sequence",resolve:s,construct:h}),omap}var pairs,hasRequiredPairs;function requirePairs(){if(hasRequiredPairs)return pairs;hasRequiredPairs=1;var a=requireType(),f=Object.prototype.toString;function m(h){if(h===null)return!0;var d,g,b,l,u,i=h;for(u=new Array(i.length),d=0,g=i.length;d<g;d+=1){if(b=i[d],f.call(b)!=="[object Object]"||(l=Object.keys(b),l.length!==1))return!1;u[d]=[l[0],b[l[0]]]}return!0}function s(h){if(h===null)return[];var d,g,b,l,u,i=h;for(u=new Array(i.length),d=0,g=i.length;d<g;d+=1)b=i[d],l=Object.keys(b),u[d]=[l[0],b[l[0]]];return u}return pairs=new a("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:m,construct:s}),pairs}var set,hasRequiredSet;function requireSet(){if(hasRequiredSet)return set;hasRequiredSet=1;var a=requireType(),f=Object.prototype.hasOwnProperty;function m(h){if(h===null)return!0;var d,g=h;for(d in g)if(f.call(g,d)&&g[d]!==null)return!1;return!0}function s(h){return h!==null?h:{}}return set=new a("tag:yaml.org,2002:set",{kind:"mapping",resolve:m,construct:s}),set}var default_safe,hasRequiredDefault_safe;function requireDefault_safe(){if(hasRequiredDefault_safe)return default_safe;hasRequiredDefault_safe=1;var a=requireSchema();return default_safe=new a({include:[requireCore()],implicit:[requireTimestamp(),requireMerge()],explicit:[requireBinary(),requireOmap(),requirePairs(),requireSet()]}),default_safe}var _undefined,hasRequired_undefined;function require_undefined(){if(hasRequired_undefined)return _undefined;hasRequired_undefined=1;var a=requireType();function f(){return!0}function m(){}function s(){return""}function h(d){return typeof d>"u"}return _undefined=new a("tag:yaml.org,2002:js/undefined",{kind:"scalar",resolve:f,construct:m,predicate:h,represent:s}),_undefined}var regexp,hasRequiredRegexp;function requireRegexp(){if(hasRequiredRegexp)return regexp;hasRequiredRegexp=1;var a=requireType();function f(d){if(d===null||d.length===0)return!1;var g=d,b=/\/([gim]*)$/.exec(d),l="";return!(g[0]==="/"&&(b&&(l=b[1]),l.length>3||g[g.length-l.length-1]!=="/"))}function m(d){var g=d,b=/\/([gim]*)$/.exec(d),l="";return g[0]==="/"&&(b&&(l=b[1]),g=g.slice(1,g.length-l.length-1)),new RegExp(g,l)}function s(d){var g="/"+d.source+"/";return d.global&&(g+="g"),d.multiline&&(g+="m"),d.ignoreCase&&(g+="i"),g}function h(d){return Object.prototype.toString.call(d)==="[object RegExp]"}return regexp=new a("tag:yaml.org,2002:js/regexp",{kind:"scalar",resolve:f,construct:m,predicate:h,represent:s}),regexp}var _function,hasRequired_function;function require_function(){if(hasRequired_function)return _function;hasRequired_function=1;var a;try{var f=commonjsRequire;a=f("esprima")}catch{typeof window<"u"&&(a=window.esprima)}var m=requireType();function s(b){if(b===null)return!1;try{var l="("+b+")",u=a.parse(l,{range:!0});return!(u.type!=="Program"||u.body.length!==1||u.body[0].type!=="ExpressionStatement"||u.body[0].expression.type!=="ArrowFunctionExpression"&&u.body[0].expression.type!=="FunctionExpression")}catch{return!1}}function h(b){var l="("+b+")",u=a.parse(l,{range:!0}),i=[],t;if(u.type!=="Program"||u.body.length!==1||u.body[0].type!=="ExpressionStatement"||u.body[0].expression.type!=="ArrowFunctionExpression"&&u.body[0].expression.type!=="FunctionExpression")throw new Error("Failed to resolve function");return u.body[0].expression.params.forEach(function(r){i.push(r.name)}),t=u.body[0].expression.body.range,u.body[0].expression.body.type==="BlockStatement"?new Function(i,l.slice(t[0]+1,t[1]-1)):new Function(i,"return "+l.slice(t[0],t[1]))}function d(b){return b.toString()}function g(b){return Object.prototype.toString.call(b)==="[object Function]"}return _function=new m("tag:yaml.org,2002:js/function",{kind:"scalar",resolve:s,construct:h,predicate:g,represent:d}),_function}var default_full,hasRequiredDefault_full;function requireDefault_full(){if(hasRequiredDefault_full)return default_full;hasRequiredDefault_full=1;var a=requireSchema();return default_full=a.DEFAULT=new a({include:[requireDefault_safe()],explicit:[require_undefined(),requireRegexp(),require_function()]}),default_full}var hasRequiredLoader;function requireLoader(){if(hasRequiredLoader)return loader;hasRequiredLoader=1;var a=requireCommon(),f=requireException(),m=requireMark(),s=requireDefault_safe(),h=requireDefault_full(),d=Object.prototype.hasOwnProperty,g=1,b=2,l=3,u=4,i=1,t=2,r=3,o=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,c=/[\x85\u2028\u2029]/,v=/[,\[\]\{\}]/,R=/^(?:!|!!|![a-z\-]+!)$/i,S=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function I(e){return Object.prototype.toString.call(e)}function O(e){return e===10||e===13}function _(e){return e===9||e===32}function j(e){return e===9||e===32||e===10||e===13}function P(e){return e===44||e===91||e===93||e===123||e===125}function B(e){var x;return 48<=e&&e<=57?e-48:(x=e|32,97<=x&&x<=102?x-97+10:-1)}function G(e){return e===120?2:e===117?4:e===85?8:0}function $(e){return 48<=e&&e<=57?e-48:-1}function ee(e){return e===48?"\0":e===97?"\x07":e===98?"\b":e===116||e===9?"	":e===110?`
`:e===118?"\v":e===102?"\f":e===114?"\r":e===101?"\x1B":e===32?" ":e===34?'"':e===47?"/":e===92?"\\":e===78?"":e===95?" ":e===76?"\u2028":e===80?"\u2029":""}function ue(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function le(e,x,E){x==="__proto__"?Object.defineProperty(e,x,{configurable:!0,enumerable:!0,writable:!0,value:E}):e[x]=E}for(var oe=new Array(256),U=new Array(256),K=0;K<256;K++)oe[K]=ee(K)?1:0,U[K]=ee(K);function we(e,x){this.input=e,this.filename=x.filename||null,this.schema=x.schema||h,this.onWarning=x.onWarning||null,this.legacy=x.legacy||!1,this.json=x.json||!1,this.listener=x.listener||null,this.maxTotalMergeKeys=typeof x.maxTotalMergeKeys=="number"?x.maxTotalMergeKeys:1e4,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.totalMergeKeys=0,this.documents=[]}function se(e,x){return new f(x,new m(e.filename,e.input,e.position,e.line,e.position-e.lineStart))}function k(e,x){throw se(e,x)}function X(e,x){e.onWarning&&e.onWarning.call(null,se(e,x))}var ne={YAML:function(x,E,M){var n,p,y;x.version!==null&&k(x,"duplication of %YAML directive"),M.length!==1&&k(x,"YAML directive accepts exactly one argument"),n=/^([0-9]+)\.([0-9]+)$/.exec(M[0]),n===null&&k(x,"ill-formed argument of the YAML directive"),p=parseInt(n[1],10),y=parseInt(n[2],10),p!==1&&k(x,"unacceptable YAML version of the document"),x.version=M[0],x.checkLineBreaks=y<2,y!==1&&y!==2&&X(x,"unsupported YAML version of the document")},TAG:function(x,E,M){var n,p;M.length!==2&&k(x,"TAG directive accepts exactly two arguments"),n=M[0],p=M[1],R.test(n)||k(x,"ill-formed tag handle (first argument) of the TAG directive"),d.call(x.tagMap,n)&&k(x,'there is a previously declared suffix for "'+n+'" tag handle'),S.test(p)||k(x,"ill-formed tag prefix (second argument) of the TAG directive"),x.tagMap[n]=p}};function Q(e,x,E,M){var n,p,y,A;if(x<E){if(A=e.input.slice(x,E),M)for(n=0,p=A.length;n<p;n+=1)y=A.charCodeAt(n),y===9||32<=y&&y<=1114111||k(e,"expected valid JSON character");else o.test(A)&&k(e,"the stream contains non-printable characters");e.result+=A}}function te(e){e.totalMergeKeys+=1,e.maxTotalMergeKeys!==-1&&e.totalMergeKeys>e.maxTotalMergeKeys&&k(e,"merge keys exceeded maxTotalMergeKeys ("+e.maxTotalMergeKeys+")")}function W(e,x,E,M){var n,p,y,A;for(a.isObject(E)||k(e,"cannot merge mappings; the provided source object is unacceptable"),te(e),n=Object.keys(E),y=0,A=n.length;y<A;y+=1)p=n[y],te(e),d.call(x,p)||(le(x,p,E[p]),M[p]=!0)}function V(e,x,E,M,n,p,y,A){var w,F;if(Array.isArray(n))for(n=Array.prototype.slice.call(n),w=0,F=n.length;w<F;w+=1)Array.isArray(n[w])&&k(e,"nested arrays are not supported inside keys"),typeof n=="object"&&I(n[w])==="[object Object]"&&(n[w]="[object Object]");if(typeof n=="object"&&I(n)==="[object Object]"&&(n="[object Object]"),n=String(n),x===null&&(x={}),M==="tag:yaml.org,2002:merge")if(Array.isArray(p))for(p.length>100&&k(e,"abnormal merge sequence size"),w=0,F=p.length;w<F;w+=1)W(e,x,p[w],E);else W(e,x,p,E);else!e.json&&!d.call(E,n)&&d.call(x,n)&&(e.line=y||e.line,e.position=A||e.position,k(e,"duplicated mapping key")),le(x,n,p),delete E[n];return x}function re(e){var x;x=e.input.charCodeAt(e.position),x===10?e.position++:x===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):k(e,"a line break is expected"),e.line+=1,e.lineStart=e.position}function Y(e,x,E){for(var M=0,n=e.input.charCodeAt(e.position);n!==0;){for(;_(n);)n=e.input.charCodeAt(++e.position);if(x&&n===35)do n=e.input.charCodeAt(++e.position);while(n!==10&&n!==13&&n!==0);if(O(n))for(re(e),n=e.input.charCodeAt(e.position),M++,e.lineIndent=0;n===32;)e.lineIndent++,n=e.input.charCodeAt(++e.position);else break}return E!==-1&&M!==0&&e.lineIndent<E&&X(e,"deficient indentation"),M}function Z(e){var x=e.position,E;return E=e.input.charCodeAt(x),!!((E===45||E===46)&&E===e.input.charCodeAt(x+1)&&E===e.input.charCodeAt(x+2)&&(x+=3,E=e.input.charCodeAt(x),E===0||j(E)))}function ie(e,x){x===1?e.result+=" ":x>1&&(e.result+=a.repeat(`
`,x-1))}function ce(e,x,E){var M,n,p,y,A,w,F,D,T=e.kind,q=e.result,C;if(C=e.input.charCodeAt(e.position),j(C)||P(C)||C===35||C===38||C===42||C===33||C===124||C===62||C===39||C===34||C===37||C===64||C===96||(C===63||C===45)&&(n=e.input.charCodeAt(e.position+1),j(n)||E&&P(n)))return!1;for(e.kind="scalar",e.result="",p=y=e.position,A=!1;C!==0;){if(C===58){if(n=e.input.charCodeAt(e.position+1),j(n)||E&&P(n))break}else if(C===35){if(M=e.input.charCodeAt(e.position-1),j(M))break}else{if(e.position===e.lineStart&&Z(e)||E&&P(C))break;if(O(C))if(w=e.line,F=e.lineStart,D=e.lineIndent,Y(e,!1,-1),e.lineIndent>=x){A=!0,C=e.input.charCodeAt(e.position);continue}else{e.position=y,e.line=w,e.lineStart=F,e.lineIndent=D;break}}A&&(Q(e,p,y,!1),ie(e,e.line-w),p=y=e.position,A=!1),_(C)||(y=e.position+1),C=e.input.charCodeAt(++e.position)}return Q(e,p,y,!1),e.result?!0:(e.kind=T,e.result=q,!1)}function fe(e,x){var E,M,n;if(E=e.input.charCodeAt(e.position),E!==39)return!1;for(e.kind="scalar",e.result="",e.position++,M=n=e.position;(E=e.input.charCodeAt(e.position))!==0;)if(E===39)if(Q(e,M,e.position,!0),E=e.input.charCodeAt(++e.position),E===39)M=e.position,e.position++,n=e.position;else return!0;else O(E)?(Q(e,M,n,!0),ie(e,Y(e,!1,x)),M=n=e.position):e.position===e.lineStart&&Z(e)?k(e,"unexpected end of the document within a single quoted scalar"):(e.position++,n=e.position);k(e,"unexpected end of the stream within a single quoted scalar")}function de(e,x){var E,M,n,p,y,A;if(A=e.input.charCodeAt(e.position),A!==34)return!1;for(e.kind="scalar",e.result="",e.position++,E=M=e.position;(A=e.input.charCodeAt(e.position))!==0;){if(A===34)return Q(e,E,e.position,!0),e.position++,!0;if(A===92){if(Q(e,E,e.position,!0),A=e.input.charCodeAt(++e.position),O(A))Y(e,!1,x);else if(A<256&&oe[A])e.result+=U[A],e.position++;else if((y=G(A))>0){for(n=y,p=0;n>0;n--)A=e.input.charCodeAt(++e.position),(y=B(A))>=0?p=(p<<4)+y:k(e,"expected hexadecimal character");e.result+=ue(p),e.position++}else k(e,"unknown escape sequence");E=M=e.position}else O(A)?(Q(e,E,M,!0),ie(e,Y(e,!1,x)),E=M=e.position):e.position===e.lineStart&&Z(e)?k(e,"unexpected end of the document within a double quoted scalar"):(e.position++,M=e.position)}k(e,"unexpected end of the stream within a double quoted scalar")}function ae(e,x){var E=!0,M,n=e.tag,p,y=e.anchor,A,w,F,D,T,q={},C,L,H,N;if(N=e.input.charCodeAt(e.position),N===91)w=93,T=!1,p=[];else if(N===123)w=125,T=!0,p={};else return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=p),N=e.input.charCodeAt(++e.position);N!==0;){if(Y(e,!0,x),N=e.input.charCodeAt(e.position),N===w)return e.position++,e.tag=n,e.anchor=y,e.kind=T?"mapping":"sequence",e.result=p,!0;E||k(e,"missed comma between flow collection entries"),L=C=H=null,F=D=!1,N===63&&(A=e.input.charCodeAt(e.position+1),j(A)&&(F=D=!0,e.position++,Y(e,!0,x))),M=e.line,z(e,x,g,!1,!0),L=e.tag,C=e.result,Y(e,!0,x),N=e.input.charCodeAt(e.position),(D||e.line===M)&&N===58&&(F=!0,N=e.input.charCodeAt(++e.position),Y(e,!0,x),z(e,x,g,!1,!0),H=e.result),T?V(e,p,q,L,C,H):F?p.push(V(e,null,q,L,C,H)):p.push(C),Y(e,!0,x),N=e.input.charCodeAt(e.position),N===44?(E=!0,N=e.input.charCodeAt(++e.position)):E=!1}k(e,"unexpected end of the stream within a flow collection")}function Ae(e,x){var E,M,n=i,p=!1,y=!1,A=x,w=0,F=!1,D,T;if(T=e.input.charCodeAt(e.position),T===124)M=!1;else if(T===62)M=!0;else return!1;for(e.kind="scalar",e.result="";T!==0;)if(T=e.input.charCodeAt(++e.position),T===43||T===45)i===n?n=T===43?r:t:k(e,"repeat of a chomping mode identifier");else if((D=$(T))>=0)D===0?k(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):y?k(e,"repeat of an indentation width identifier"):(A=x+D-1,y=!0);else break;if(_(T)){do T=e.input.charCodeAt(++e.position);while(_(T));if(T===35)do T=e.input.charCodeAt(++e.position);while(!O(T)&&T!==0)}for(;T!==0;){for(re(e),e.lineIndent=0,T=e.input.charCodeAt(e.position);(!y||e.lineIndent<A)&&T===32;)e.lineIndent++,T=e.input.charCodeAt(++e.position);if(!y&&e.lineIndent>A&&(A=e.lineIndent),O(T)){w++;continue}if(e.lineIndent<A){n===r?e.result+=a.repeat(`
`,p?1+w:w):n===i&&p&&(e.result+=`
`);break}for(M?_(T)?(F=!0,e.result+=a.repeat(`
`,p?1+w:w)):F?(F=!1,e.result+=a.repeat(`
`,w+1)):w===0?p&&(e.result+=" "):e.result+=a.repeat(`
`,w):e.result+=a.repeat(`
`,p?1+w:w),p=!0,y=!0,w=0,E=e.position;!O(T)&&T!==0;)T=e.input.charCodeAt(++e.position);Q(e,E,e.position,!1)}return!0}function pe(e,x){var E,M=e.tag,n=e.anchor,p=[],y,A=!1,w;for(e.anchor!==null&&(e.anchorMap[e.anchor]=p),w=e.input.charCodeAt(e.position);w!==0&&!(w!==45||(y=e.input.charCodeAt(e.position+1),!j(y)));){if(A=!0,e.position++,Y(e,!0,-1)&&e.lineIndent<=x){p.push(null),w=e.input.charCodeAt(e.position);continue}if(E=e.line,z(e,x,l,!1,!0),p.push(e.result),Y(e,!0,-1),w=e.input.charCodeAt(e.position),(e.line===E||e.lineIndent>x)&&w!==0)k(e,"bad indentation of a sequence entry");else if(e.lineIndent<x)break}return A?(e.tag=M,e.anchor=n,e.kind="sequence",e.result=p,!0):!1}function he(e,x,E){var M,n,p,y,A=e.tag,w=e.anchor,F={},D={},T=null,q=null,C=null,L=!1,H=!1,N;for(e.anchor!==null&&(e.anchorMap[e.anchor]=F),N=e.input.charCodeAt(e.position);N!==0;){if(M=e.input.charCodeAt(e.position+1),p=e.line,y=e.position,(N===63||N===58)&&j(M))N===63?(L&&(V(e,F,D,T,q,null),T=q=C=null),H=!0,L=!0,n=!0):L?(L=!1,n=!0):k(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,N=M;else if(z(e,E,b,!1,!0))if(e.line===p){for(N=e.input.charCodeAt(e.position);_(N);)N=e.input.charCodeAt(++e.position);if(N===58)N=e.input.charCodeAt(++e.position),j(N)||k(e,"a whitespace character is expected after the key-value separator within a block mapping"),L&&(V(e,F,D,T,q,null),T=q=C=null),H=!0,L=!1,n=!1,T=e.tag,q=e.result;else if(H)k(e,"can not read an implicit mapping pair; a colon is missed");else return e.tag=A,e.anchor=w,!0}else if(H)k(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return e.tag=A,e.anchor=w,!0;else break;if((e.line===p||e.lineIndent>x)&&(z(e,x,u,!0,n)&&(L?q=e.result:C=e.result),L||(V(e,F,D,T,q,C,p,y),T=q=C=null),Y(e,!0,-1),N=e.input.charCodeAt(e.position)),e.lineIndent>x&&N!==0)k(e,"bad indentation of a mapping entry");else if(e.lineIndent<x)break}return L&&V(e,F,D,T,q,null),H&&(e.tag=A,e.anchor=w,e.kind="mapping",e.result=F),H}function me(e){var x,E=!1,M=!1,n,p,y;if(y=e.input.charCodeAt(e.position),y!==33)return!1;if(e.tag!==null&&k(e,"duplication of a tag property"),y=e.input.charCodeAt(++e.position),y===60?(E=!0,y=e.input.charCodeAt(++e.position)):y===33?(M=!0,n="!!",y=e.input.charCodeAt(++e.position)):n="!",x=e.position,E){do y=e.input.charCodeAt(++e.position);while(y!==0&&y!==62);e.position<e.length?(p=e.input.slice(x,e.position),y=e.input.charCodeAt(++e.position)):k(e,"unexpected end of the stream within a verbatim tag")}else{for(;y!==0&&!j(y);)y===33&&(M?k(e,"tag suffix cannot contain exclamation marks"):(n=e.input.slice(x-1,e.position+1),R.test(n)||k(e,"named tag handle cannot contain such characters"),M=!0,x=e.position+1)),y=e.input.charCodeAt(++e.position);p=e.input.slice(x,e.position),v.test(p)&&k(e,"tag suffix cannot contain flow indicator characters")}return p&&!S.test(p)&&k(e,"tag name cannot contain such characters: "+p),E?e.tag=p:d.call(e.tagMap,n)?e.tag=e.tagMap[n]+p:n==="!"?e.tag="!"+p:n==="!!"?e.tag="tag:yaml.org,2002:"+p:k(e,'undeclared tag handle "'+n+'"'),!0}function Ee(e){var x,E;if(E=e.input.charCodeAt(e.position),E!==38)return!1;for(e.anchor!==null&&k(e,"duplication of an anchor property"),E=e.input.charCodeAt(++e.position),x=e.position;E!==0&&!j(E)&&!P(E);)E=e.input.charCodeAt(++e.position);return e.position===x&&k(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(x,e.position),!0}function ge(e){var x,E,M;if(M=e.input.charCodeAt(e.position),M!==42)return!1;for(M=e.input.charCodeAt(++e.position),x=e.position;M!==0&&!j(M)&&!P(M);)M=e.input.charCodeAt(++e.position);return e.position===x&&k(e,"name of an alias node must contain at least one character"),E=e.input.slice(x,e.position),d.call(e.anchorMap,E)||k(e,'unidentified alias "'+E+'"'),e.result=e.anchorMap[E],Y(e,!0,-1),!0}function z(e,x,E,M,n){var p,y,A,w=1,F=!1,D=!1,T,q,C,L,H;if(e.listener!==null&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,p=y=A=u===E||l===E,M&&Y(e,!0,-1)&&(F=!0,e.lineIndent>x?w=1:e.lineIndent===x?w=0:e.lineIndent<x&&(w=-1)),w===1)for(;me(e)||Ee(e);)Y(e,!0,-1)?(F=!0,A=p,e.lineIndent>x?w=1:e.lineIndent===x?w=0:e.lineIndent<x&&(w=-1)):A=!1;if(A&&(A=F||n),(w===1||u===E)&&(g===E||b===E?L=x:L=x+1,H=e.position-e.lineStart,w===1?A&&(pe(e,H)||he(e,H,L))||ae(e,L)?D=!0:(y&&Ae(e,L)||fe(e,L)||de(e,L)?D=!0:ge(e)?(D=!0,(e.tag!==null||e.anchor!==null)&&k(e,"alias node should not have any properties")):ce(e,L,g===E)&&(D=!0,e.tag===null&&(e.tag="?")),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):w===0&&(D=A&&pe(e,H))),e.tag!==null&&e.tag!=="!")if(e.tag==="?"){for(e.result!==null&&e.kind!=="scalar"&&k(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"'),T=0,q=e.implicitTypes.length;T<q;T+=1)if(C=e.implicitTypes[T],C.resolve(e.result)){e.result=C.construct(e.result),e.tag=C.tag,e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);break}}else d.call(e.typeMap[e.kind||"fallback"],e.tag)?(C=e.typeMap[e.kind||"fallback"][e.tag],e.result!==null&&C.kind!==e.kind&&k(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+C.kind+'", not "'+e.kind+'"'),C.resolve(e.result)?(e.result=C.construct(e.result),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):k(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")):k(e,"unknown tag !<"+e.tag+">");return e.listener!==null&&e.listener("close",e),e.tag!==null||e.anchor!==null||D}function Re(e){var x=e.position,E,M,n,p=!1,y;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap={},e.anchorMap={};(y=e.input.charCodeAt(e.position))!==0&&(Y(e,!0,-1),y=e.input.charCodeAt(e.position),!(e.lineIndent>0||y!==37));){for(p=!0,y=e.input.charCodeAt(++e.position),E=e.position;y!==0&&!j(y);)y=e.input.charCodeAt(++e.position);for(M=e.input.slice(E,e.position),n=[],M.length<1&&k(e,"directive name must not be less than one character in length");y!==0;){for(;_(y);)y=e.input.charCodeAt(++e.position);if(y===35){do y=e.input.charCodeAt(++e.position);while(y!==0&&!O(y));break}if(O(y))break;for(E=e.position;y!==0&&!j(y);)y=e.input.charCodeAt(++e.position);n.push(e.input.slice(E,e.position))}y!==0&&re(e),d.call(ne,M)?ne[M](e,M,n):X(e,'unknown document directive "'+M+'"')}if(Y(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,Y(e,!0,-1)):p&&k(e,"directives end mark is expected"),z(e,e.lineIndent-1,u,!1,!0),Y(e,!0,-1),e.checkLineBreaks&&c.test(e.input.slice(x,e.position))&&X(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&Z(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,Y(e,!0,-1));return}if(e.position<e.length-1)k(e,"end of the stream or a document separator is expected");else return}function ye(e,x){e=String(e),x=x||{},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));var E=new we(e,x),M=e.indexOf("\0");for(M!==-1&&(E.position=M,k(E,"null byte is not allowed in input")),E.input+="\0";E.input.charCodeAt(E.position)===32;)E.lineIndent+=1,E.position+=1;for(;E.position<E.length-1;)Re(E);return E.documents}function xe(e,x,E){x!==null&&typeof x=="object"&&typeof E>"u"&&(E=x,x=null);var M=ye(e,E);if(typeof x!="function")return M;for(var n=0,p=M.length;n<p;n+=1)x(M[n])}function ve(e,x){var E=ye(e,x);if(E.length!==0){if(E.length===1)return E[0];throw new f("expected a single document in the stream, but found more")}}function be(e,x,E){return typeof x=="object"&&x!==null&&typeof E>"u"&&(E=x,x=null),xe(e,x,a.extend({schema:s},E))}function J(e,x){return ve(e,a.extend({schema:s},x))}return loader.loadAll=xe,loader.load=ve,loader.safeLoadAll=be,loader.safeLoad=J,loader}var dumper={},hasRequiredDumper;function requireDumper(){if(hasRequiredDumper)return dumper;hasRequiredDumper=1;var a=requireCommon(),f=requireException(),m=requireDefault_full(),s=requireDefault_safe(),h=Object.prototype.toString,d=Object.prototype.hasOwnProperty,g=9,b=10,l=13,u=32,i=33,t=34,r=35,o=37,c=38,v=39,R=42,S=44,I=45,O=58,_=61,j=62,P=63,B=64,G=91,$=93,ee=96,ue=123,le=124,oe=125,U={};U[0]="\\0",U[7]="\\a",U[8]="\\b",U[9]="\\t",U[10]="\\n",U[11]="\\v",U[12]="\\f",U[13]="\\r",U[27]="\\e",U[34]='\\"',U[92]="\\\\",U[133]="\\N",U[160]="\\_",U[8232]="\\L",U[8233]="\\P";var K=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"];function we(n,p){var y,A,w,F,D,T,q;if(p===null)return{};for(y={},A=Object.keys(p),w=0,F=A.length;w<F;w+=1)D=A[w],T=String(p[D]),D.slice(0,2)==="!!"&&(D="tag:yaml.org,2002:"+D.slice(2)),q=n.compiledTypeMap.fallback[D],q&&d.call(q.styleAliases,T)&&(T=q.styleAliases[T]),y[D]=T;return y}function se(n){var p,y,A;if(p=n.toString(16).toUpperCase(),n<=255)y="x",A=2;else if(n<=65535)y="u",A=4;else if(n<=4294967295)y="U",A=8;else throw new f("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+y+a.repeat("0",A-p.length)+p}function k(n){this.schema=n.schema||m,this.indent=Math.max(1,n.indent||2),this.noArrayIndent=n.noArrayIndent||!1,this.skipInvalid=n.skipInvalid||!1,this.flowLevel=a.isNothing(n.flowLevel)?-1:n.flowLevel,this.styleMap=we(this.schema,n.styles||null),this.sortKeys=n.sortKeys||!1,this.lineWidth=n.lineWidth||80,this.noRefs=n.noRefs||!1,this.noCompatMode=n.noCompatMode||!1,this.condenseFlow=n.condenseFlow||!1,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function X(n,p){for(var y=a.repeat(" ",p),A=0,w=-1,F="",D,T=n.length;A<T;)w=n.indexOf(`
`,A),w===-1?(D=n.slice(A),A=T):(D=n.slice(A,w+1),A=w+1),D.length&&D!==`
`&&(F+=y),F+=D;return F}function ne(n,p){return`
`+a.repeat(" ",n.indent*p)}function Q(n,p){var y,A,w;for(y=0,A=n.implicitTypes.length;y<A;y+=1)if(w=n.implicitTypes[y],w.resolve(p))return!0;return!1}function te(n){return n===u||n===g}function W(n){return 32<=n&&n<=126||161<=n&&n<=55295&&n!==8232&&n!==8233||57344<=n&&n<=65533&&n!==65279||65536<=n&&n<=1114111}function V(n){return W(n)&&!te(n)&&n!==65279&&n!==l&&n!==b}function re(n,p){return W(n)&&n!==65279&&n!==S&&n!==G&&n!==$&&n!==ue&&n!==oe&&n!==O&&(n!==r||p&&V(p))}function Y(n){return W(n)&&n!==65279&&!te(n)&&n!==I&&n!==P&&n!==O&&n!==S&&n!==G&&n!==$&&n!==ue&&n!==oe&&n!==r&&n!==c&&n!==R&&n!==i&&n!==le&&n!==_&&n!==j&&n!==v&&n!==t&&n!==o&&n!==B&&n!==ee}function Z(n){var p=/^\n* /;return p.test(n)}var ie=1,ce=2,fe=3,de=4,ae=5;function Ae(n,p,y,A,w){var F,D,T,q=!1,C=!1,L=A!==-1,H=-1,N=Y(n.charCodeAt(0))&&!te(n.charCodeAt(n.length-1));if(p)for(F=0;F<n.length;F++){if(D=n.charCodeAt(F),!W(D))return ae;T=F>0?n.charCodeAt(F-1):null,N=N&&re(D,T)}else{for(F=0;F<n.length;F++){if(D=n.charCodeAt(F),D===b)q=!0,L&&(C=C||F-H-1>A&&n[H+1]!==" ",H=F);else if(!W(D))return ae;T=F>0?n.charCodeAt(F-1):null,N=N&&re(D,T)}C=C||L&&F-H-1>A&&n[H+1]!==" "}return!q&&!C?N&&!w(n)?ie:ce:y>9&&Z(n)?ae:C?de:fe}function pe(n,p,y,A){n.dump=function(){if(p.length===0)return"''";if(!n.noCompatMode&&K.indexOf(p)!==-1)return"'"+p+"'";var w=n.indent*Math.max(1,y),F=n.lineWidth===-1?-1:Math.max(Math.min(n.lineWidth,40),n.lineWidth-w),D=A||n.flowLevel>-1&&y>=n.flowLevel;function T(q){return Q(n,q)}switch(Ae(p,D,n.indent,F,T)){case ie:return p;case ce:return"'"+p.replace(/'/g,"''")+"'";case fe:return"|"+he(p,n.indent)+me(X(p,w));case de:return">"+he(p,n.indent)+me(X(Ee(p,F),w));case ae:return'"'+z(p)+'"';default:throw new f("impossible error: invalid scalar style")}}()}function he(n,p){var y=Z(n)?String(p):"",A=n[n.length-1]===`
`,w=A&&(n[n.length-2]===`
`||n===`
`),F=w?"+":A?"":"-";return y+F+`
`}function me(n){return n[n.length-1]===`
`?n.slice(0,-1):n}function Ee(n,p){for(var y=/(\n+)([^\n]*)/g,A=function(){var C=n.indexOf(`
`);return C=C!==-1?C:n.length,y.lastIndex=C,ge(n.slice(0,C),p)}(),w=n[0]===`
`||n[0]===" ",F,D;D=y.exec(n);){var T=D[1],q=D[2];F=q[0]===" ",A+=T+(!w&&!F&&q!==""?`
`:"")+ge(q,p),w=F}return A}function ge(n,p){if(n===""||n[0]===" ")return n;for(var y=/ [^ ]/g,A,w=0,F,D=0,T=0,q="";A=y.exec(n);)T=A.index,T-w>p&&(F=D>w?D:T,q+=`
`+n.slice(w,F),w=F+1),D=T;return q+=`
`,n.length-w>p&&D>w?q+=n.slice(w,D)+`
`+n.slice(D+1):q+=n.slice(w),q.slice(1)}function z(n){for(var p="",y,A,w,F=0;F<n.length;F++){if(y=n.charCodeAt(F),y>=55296&&y<=56319&&(A=n.charCodeAt(F+1),A>=56320&&A<=57343)){p+=se((y-55296)*1024+A-56320+65536),F++;continue}w=U[y],p+=!w&&W(y)?n[F]:w||se(y)}return p}function Re(n,p,y){var A="",w=n.tag,F,D;for(F=0,D=y.length;F<D;F+=1)J(n,p,y[F],!1,!1)&&(F!==0&&(A+=","+(n.condenseFlow?"":" ")),A+=n.dump);n.tag=w,n.dump="["+A+"]"}function ye(n,p,y,A){var w="",F=n.tag,D,T;for(D=0,T=y.length;D<T;D+=1)J(n,p+1,y[D],!0,!0)&&((!A||D!==0)&&(w+=ne(n,p)),n.dump&&b===n.dump.charCodeAt(0)?w+="-":w+="- ",w+=n.dump);n.tag=F,n.dump=w||"[]"}function xe(n,p,y){var A="",w=n.tag,F=Object.keys(y),D,T,q,C,L;for(D=0,T=F.length;D<T;D+=1)L="",D!==0&&(L+=", "),n.condenseFlow&&(L+='"'),q=F[D],C=y[q],J(n,p,q,!1,!1)&&(n.dump.length>1024&&(L+="? "),L+=n.dump+(n.condenseFlow?'"':"")+":"+(n.condenseFlow?"":" "),J(n,p,C,!1,!1)&&(L+=n.dump,A+=L));n.tag=w,n.dump="{"+A+"}"}function ve(n,p,y,A){var w="",F=n.tag,D=Object.keys(y),T,q,C,L,H,N;if(n.sortKeys===!0)D.sort();else if(typeof n.sortKeys=="function")D.sort(n.sortKeys);else if(n.sortKeys)throw new f("sortKeys must be a boolean or a function");for(T=0,q=D.length;T<q;T+=1)N="",(!A||T!==0)&&(N+=ne(n,p)),C=D[T],L=y[C],J(n,p+1,C,!0,!0,!0)&&(H=n.tag!==null&&n.tag!=="?"||n.dump&&n.dump.length>1024,H&&(n.dump&&b===n.dump.charCodeAt(0)?N+="?":N+="? "),N+=n.dump,H&&(N+=ne(n,p)),J(n,p+1,L,!0,H)&&(n.dump&&b===n.dump.charCodeAt(0)?N+=":":N+=": ",N+=n.dump,w+=N));n.tag=F,n.dump=w||"{}"}function be(n,p,y){var A,w,F,D,T,q;for(w=y?n.explicitTypes:n.implicitTypes,F=0,D=w.length;F<D;F+=1)if(T=w[F],(T.instanceOf||T.predicate)&&(!T.instanceOf||typeof p=="object"&&p instanceof T.instanceOf)&&(!T.predicate||T.predicate(p))){if(n.tag=y?T.tag:"?",T.represent){if(q=n.styleMap[T.tag]||T.defaultStyle,h.call(T.represent)==="[object Function]")A=T.represent(p,q);else if(d.call(T.represent,q))A=T.represent[q](p,q);else throw new f("!<"+T.tag+'> tag resolver accepts not "'+q+'" style');n.dump=A}return!0}return!1}function J(n,p,y,A,w,F){n.tag=null,n.dump=y,be(n,y,!1)||be(n,y,!0);var D=h.call(n.dump);A&&(A=n.flowLevel<0||n.flowLevel>p);var T=D==="[object Object]"||D==="[object Array]",q,C;if(T&&(q=n.duplicates.indexOf(y),C=q!==-1),(n.tag!==null&&n.tag!=="?"||C||n.indent!==2&&p>0)&&(w=!1),C&&n.usedDuplicates[q])n.dump="*ref_"+q;else{if(T&&C&&!n.usedDuplicates[q]&&(n.usedDuplicates[q]=!0),D==="[object Object]")A&&Object.keys(n.dump).length!==0?(ve(n,p,n.dump,w),C&&(n.dump="&ref_"+q+n.dump)):(xe(n,p,n.dump),C&&(n.dump="&ref_"+q+" "+n.dump));else if(D==="[object Array]"){var L=n.noArrayIndent&&p>0?p-1:p;A&&n.dump.length!==0?(ye(n,L,n.dump,w),C&&(n.dump="&ref_"+q+n.dump)):(Re(n,L,n.dump),C&&(n.dump="&ref_"+q+" "+n.dump))}else if(D==="[object String]")n.tag!=="?"&&pe(n,n.dump,p,F);else{if(n.skipInvalid)return!1;throw new f("unacceptable kind of an object to dump "+D)}n.tag!==null&&n.tag!=="?"&&(n.dump="!<"+n.tag+"> "+n.dump)}return!0}function e(n,p){var y=[],A=[],w,F;for(x(n,y,A),w=0,F=A.length;w<F;w+=1)p.duplicates.push(y[A[w]]);p.usedDuplicates=new Array(F)}function x(n,p,y){var A,w,F;if(n!==null&&typeof n=="object")if(w=p.indexOf(n),w!==-1)y.indexOf(w)===-1&&y.push(w);else if(p.push(n),Array.isArray(n))for(w=0,F=n.length;w<F;w+=1)x(n[w],p,y);else for(A=Object.keys(n),w=0,F=A.length;w<F;w+=1)x(n[A[w]],p,y)}function E(n,p){p=p||{};var y=new k(p);return y.noRefs||e(n,y),J(y,0,n,!0,!0)?y.dump+`
`:""}function M(n,p){return E(n,a.extend({schema:s},p))}return dumper.dump=E,dumper.safeDump=M,dumper}var hasRequiredJsYaml$1;function requireJsYaml$1(){if(hasRequiredJsYaml$1)return jsYaml$1;hasRequiredJsYaml$1=1;var a=requireLoader(),f=requireDumper();function m(s){return function(){throw new Error("Function "+s+" is deprecated and cannot be used.")}}return jsYaml$1.Type=requireType(),jsYaml$1.Schema=requireSchema(),jsYaml$1.FAILSAFE_SCHEMA=requireFailsafe(),jsYaml$1.JSON_SCHEMA=requireJson(),jsYaml$1.CORE_SCHEMA=requireCore(),jsYaml$1.DEFAULT_SAFE_SCHEMA=requireDefault_safe(),jsYaml$1.DEFAULT_FULL_SCHEMA=requireDefault_full(),jsYaml$1.load=a.load,jsYaml$1.loadAll=a.loadAll,jsYaml$1.safeLoad=a.safeLoad,jsYaml$1.safeLoadAll=a.safeLoadAll,jsYaml$1.dump=f.dump,jsYaml$1.safeDump=f.safeDump,jsYaml$1.YAMLException=requireException(),jsYaml$1.MINIMAL_SCHEMA=requireFailsafe(),jsYaml$1.SAFE_SCHEMA=requireDefault_safe(),jsYaml$1.DEFAULT_SCHEMA=requireDefault_full(),jsYaml$1.scan=m("scan"),jsYaml$1.parse=m("parse"),jsYaml$1.compose=m("compose"),jsYaml$1.addConstructor=m("addConstructor"),jsYaml$1}var jsYaml,hasRequiredJsYaml;function requireJsYaml(){if(hasRequiredJsYaml)return jsYaml;hasRequiredJsYaml=1;var a=requireJsYaml$1();return jsYaml=a,jsYaml}var hasRequiredEngines;function requireEngines(){return hasRequiredEngines||(hasRequiredEngines=1,function(module,exports){const yaml=requireJsYaml(),engines=module.exports;engines.yaml={parse:yaml.safeLoad.bind(yaml),stringify:yaml.safeDump.bind(yaml)},engines.json={parse:JSON.parse.bind(JSON),stringify:function(a,f){const m=Object.assign({replacer:null,space:2},f);return JSON.stringify(a,m.replacer,m.space)}},engines.javascript={parse:function parse(str,options,wrap){try{return wrap!==!1&&(str=`(function() {
return `+str.trim()+`;
}());`),eval(str)||{}}catch(a){if(wrap!==!1&&/(unexpected|identifier)/i.test(a.message))return parse(str,options,!1);throw new SyntaxError(a)}},stringify:function(){throw new Error("stringifying JavaScript is not supported")}}}(engines)),engines.exports}var utils={};/*!
 * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */var stripBomString,hasRequiredStripBomString;function requireStripBomString(){return hasRequiredStripBomString||(hasRequiredStripBomString=1,stripBomString=function(a){return typeof a=="string"&&a.charAt(0)==="\uFEFF"?a.slice(1):a}),stripBomString}var hasRequiredUtils;function requireUtils(){return hasRequiredUtils||(hasRequiredUtils=1,function(a){const f=requireStripBomString(),m=requireKindOf();a.define=function(s,h,d){Reflect.defineProperty(s,h,{enumerable:!1,configurable:!0,writable:!0,value:d})},a.isBuffer=function(s){return m(s)==="buffer"},a.isObject=function(s){return m(s)==="object"},a.toBuffer=function(s){return typeof s=="string"?Buffer.from(s):s},a.toString=function(s){if(a.isBuffer(s))return f(String(s));if(typeof s!="string")throw new TypeError("expected input to be a string or buffer");return f(s)},a.arrayify=function(s){return s?Array.isArray(s)?s:[s]:[]},a.startsWith=function(s,h,d){return typeof d!="number"&&(d=h.length),s.slice(0,d)===h}}(utils)),utils}var defaults,hasRequiredDefaults;function requireDefaults(){if(hasRequiredDefaults)return defaults;hasRequiredDefaults=1;const a=requireEngines(),f=requireUtils();return defaults=function(m){const s=Object.assign({},m);return s.delimiters=f.arrayify(s.delims||s.delimiters||"---"),s.delimiters.length===1&&s.delimiters.push(s.delimiters[0]),s.language=(s.language||s.lang||"yaml").toLowerCase(),s.engines=Object.assign({},a,s.parsers,s.engines),s},defaults}var engine,hasRequiredEngine;function requireEngine(){if(hasRequiredEngine)return engine;hasRequiredEngine=1,engine=function(f,m){let s=m.engines[f]||m.engines[a(f)];if(typeof s>"u")throw new Error('gray-matter engine "'+f+'" is not registered');return typeof s=="function"&&(s={parse:s}),s};function a(f){switch(f.toLowerCase()){case"js":case"javascript":return"javascript";case"coffee":case"coffeescript":case"cson":return"coffee";case"yaml":case"yml":return"yaml";default:return f}}return engine}var stringify,hasRequiredStringify;function requireStringify(){if(hasRequiredStringify)return stringify;hasRequiredStringify=1;const a=requireKindOf(),f=requireEngine(),m=requireDefaults();stringify=function(h,d,g){if(d==null&&g==null)switch(a(h)){case"object":d=h.data,g={};break;case"string":return h;default:throw new TypeError("expected file to be a string or object")}const b=h.content,l=m(g);if(d==null){if(!l.data)return h;d=l.data}const u=h.language||l.language,i=f(u,l);if(typeof i.stringify!="function")throw new TypeError('expected "'+u+'.stringify" to be a function');d=Object.assign({},h.data,d);const t=l.delimiters[0],r=l.delimiters[1],o=i.stringify(d,g).trim();let c="";return o!=="{}"&&(c=s(t)+s(o)+s(r)),typeof h.excerpt=="string"&&h.excerpt!==""&&b.indexOf(h.excerpt.trim())===-1&&(c+=s(h.excerpt)+s(r)),c+s(b)};function s(h){return h.slice(-1)!==`
`?h+`
`:h}return stringify}var excerpt,hasRequiredExcerpt;function requireExcerpt(){if(hasRequiredExcerpt)return excerpt;hasRequiredExcerpt=1;const a=requireDefaults();return excerpt=function(f,m){const s=a(m);if(f.data==null&&(f.data={}),typeof s.excerpt=="function")return s.excerpt(f,s);const h=f.data.excerpt_separator||s.excerpt_separator;if(h==null&&(s.excerpt===!1||s.excerpt==null))return f;const d=typeof s.excerpt=="string"?s.excerpt:h||s.delimiters[0],g=f.content.indexOf(d);return g!==-1&&(f.excerpt=f.content.slice(0,g)),f},excerpt}var toFile,hasRequiredToFile;function requireToFile(){if(hasRequiredToFile)return toFile;hasRequiredToFile=1;const a=requireKindOf(),f=requireStringify(),m=requireUtils();return toFile=function(s){return a(s)!=="object"&&(s={content:s}),a(s.data)!=="object"&&(s.data={}),s.contents&&s.content==null&&(s.content=s.contents),m.define(s,"orig",m.toBuffer(s.content)),m.define(s,"language",s.language||""),m.define(s,"matter",s.matter||""),m.define(s,"stringify",function(h,d){return d&&d.language&&(s.language=d.language),f(s,h,d)}),s.content=m.toString(s.content),s.isEmpty=!1,s.excerpt="",s},toFile}var parse,hasRequiredParse;function requireParse(){if(hasRequiredParse)return parse;hasRequiredParse=1;const a=requireEngine(),f=requireDefaults();return parse=function(m,s,h){const d=f(h),g=a(m,d);if(typeof g.parse!="function")throw new TypeError('expected "'+m+'.parse" to be a function');return g.parse(s,d)},parse}var grayMatter,hasRequiredGrayMatter;function requireGrayMatter(){if(hasRequiredGrayMatter)return grayMatter;hasRequiredGrayMatter=1;const a=requireEmpty(),f=requireSectionMatter(),m=requireDefaults(),s=requireStringify(),h=requireExcerpt(),d=requireEngines(),g=requireToFile(),b=requireParse(),l=requireUtils();function u(t,r){if(t==="")return{data:{},content:t,excerpt:"",orig:t};let o=g(t);const c=u.cache[o.content];if(!r){if(c)return o=Object.assign({},c),o.orig=c.orig,o;u.cache[o.content]=o}return i(o,r)}function i(t,r){const o=m(r),c=o.delimiters[0],v=`
`+o.delimiters[1];let R=t.content;o.language&&(t.language=o.language);const S=c.length;if(!l.startsWith(R,c,S))return h(t,o),t;if(R.charAt(S)===c.slice(-1))return t;R=R.slice(S);const I=R.length,O=u.language(R,o);O.name&&(t.language=O.name,R=R.slice(O.raw.length));let _=R.indexOf(v);return _===-1&&(_=I),t.matter=R.slice(0,_),t.matter.replace(/^\s*#[^\n]+/gm,"").trim()===""?(t.isEmpty=!0,t.empty=t.content,t.data={}):t.data=b(t.language,t.matter,o),_===I?t.content="":(t.content=R.slice(_+v.length),t.content[0]==="\r"&&(t.content=t.content.slice(1)),t.content[0]===`
`&&(t.content=t.content.slice(1))),h(t,o),(o.sections===!0||typeof o.section=="function")&&f(t,o.section),t}return u.engines=d,u.stringify=function(t,r,o){return typeof t=="string"&&(t=u(t,o)),s(t,r,o)},u.read=function(t,r){const o=a.readFileSync(t,"utf8"),c=u(o,r);return c.path=t,c},u.test=function(t,r){return l.startsWith(t,m(r).delimiters[0])},u.language=function(t,r){const c=m(r).delimiters[0];u.test(t)&&(t=t.slice(c.length));const v=t.slice(0,t.search(/\r?\n/));return{raw:v,name:v?v.trim():""}},u.cache={},u.clearCache=function(){u.cache={}},grayMatter=u,grayMatter}var grayMatterExports=requireGrayMatter();const matter=getDefaultExportFromCjs(grayMatterExports);function parseChangeLog(a){return a.split(/(?=---\ndate: )/g).filter(f=>f.includes("date:")).map(f=>{const{data:m,content:s}=matter(f);return{date:m.date,type:m.type,product:m.product,description:s.trim()}})}const normalizeDateForSlug=(a="")=>{const[f="",m="",s=""]=String(a).split("/");if(!f||!m||!s)return"00-00-00";const h=f.padStart(2,"0"),d=m.padStart(2,"0"),g=s.slice(-2).padStart(2,"0");return`${h}-${d}-${g}`},sanitizeSlugPart=(a="")=>String(a).toLowerCase().replace(/[^a-z0-9\s-]/g," ").split(/\s+/).filter(Boolean).join("-"),firstTenWordsForSlug=(a="")=>String(a).toLowerCase().replace(/[^a-z0-9\s-]/g," ").split(/\s+/).filter(Boolean).slice(0,10).join("-")||"post",buildPostSlug=({date:a,type:f,description:m})=>{const s=normalizeDateForSlug(a),h=sanitizeSlugPart(f)||"update",d=firstTenWordsForSlug(m);return`${s}-${h}-${d}`},byType=(a,f)=>!a.type||!f.type||CATEGORIES[a.type]>CATEGORIES[f.type]?0:CATEGORIES[a.type].order>CATEGORIES[f.type].order?1:(CATEGORIES[a.type].order<CATEGORIES[f.type].order,-1),byDate=(a,f)=>new Date(f.date)-new Date(a.date),organizeChangeData=a=>{let f=a&&a.log?a.log:{};f=f.sort(byDate);const m={};return f.forEach(s=>{!s||!s.date||(s.changeDateOrdinal||(s.changeDateOrdinal=ordinal(new Date(s.date||0),{nthDate:!1})),s.slug||(s.slug=buildPostSlug(s)),m[s.date]||(m[s.date]=[]),m[s.date].push({...s}))}),Object.keys(m).forEach(s=>{m[s]=m[s].sort(byType)}),m},defaultState={type:[],product:[],keywords:[]},validParams=Object.keys(defaultState),hasAllWords=(a,f)=>!a||!f||!f.length?!1:f.every(m=>a.toLowerCase().indexOf(m.toLowerCase())>-1);function useChangeLogFilter(a=defaultState){const[f,m]=reactExports.useState(a),s=useHistory(),h=useLocation();reactExports.useEffect(()=>t(h.search),[]),reactExports.useEffect(()=>{const r=h.pathname+i(f)+h.hash,o=h.pathname+h.search+h.hash;r!==o&&s.push(r)},[f]);const d=(r,o)=>{m(r==="keywords"?c=>({...c,[r]:o?o.split(" "):[]}):c=>({...c,[r]:[...c[r],o]}))},g=(r,o)=>{m(c=>({...c,[r]:[...c[r].filter(v=>v!==o)]}))},b=r=>{m(r?o=>({...o,[r]:[]}):a)},l=(r,o)=>{if(f[r].indexOf(o)>-1)return g(r,o);d(r,o)},u=(r={},o=f)=>{const c={...JSON.parse(JSON.stringify(r))};return Object.keys(c).forEach(v=>{if(c[v]&&c[v].length){if(o.keywords.length>0){const R=o.keywords.filter(S=>S).map(S=>S.toLowerCase());c[v]=c[v].filter(S=>hasAllWords(S.description,R))}o.type&&o.type.length>0&&(c[v]=c[v].filter(R=>o.type.indexOf(R.type)>-1)),o.product&&o.product.length>0&&(c[v]=c[v].filter(R=>o.product.indexOf(R.product)>-1))}}),c},i=r=>{const o=Object.keys(defaultState).filter(c=>r[c].length).map(c=>`${c}=${r[c].join(",")}`);return o.length?`?${o.join("&")}`:""},t=r=>{const o=r.replace(/\?/g,"").split("&").reduce((c,v)=>{const[R,S]=v.split("=");return validParams.indexOf(R)>-1&&(c[R]=S.split(",").filter(I=>I)),c},{});Object.keys(o).length&&m({...defaultState,...o})};return{filters:f,add:d,apply:u,clear:b,remove:g,toggle:l,toQueryString:i,fromQueryString:t}}function UpdatesNotes(){const a=useChangeLogFilter(DEFAULT_FILTERS),[f,m]=useRemoteMarkdown(PUB_CHANGELOG_URL,{transformReceive:h=>organizeChangeData({log:parseChangeLog(h)}),defaultData:organizeChangeData({log:parseChangeLog(defaultChangeLog)}),forceFetch:window.Cypress!==void 0}),s="HMDA News and Updates";return reactExports.useEffect(()=>{if(m)return;const h=setTimeout(()=>{const d=decodeURIComponent(window.location.hash.replace(/^#/,""));if(!d)return;const g=document.getElementById(d);g&&g.scrollIntoView({block:"start"})},300);return()=>clearTimeout(h)},[m]),m?jsxRuntimeExports.jsx(LoadingState,{heading:s}):jsxRuntimeExports.jsxs(PageWrapper,{children:[jsxRuntimeExports.jsx("header",{className:"heading",children:jsxRuntimeExports.jsxs("div",{className:"intro",children:[jsxRuntimeExports.jsx("h1",{children:s}),jsxRuntimeExports.jsx("p",{className:"lead",children:"The HMDA data and reports are the most comprehensive publicly available information on mortgage market activity. This page includes all updates related to data products for the HMDA data collected in or after 2017. This includes header changes, data product differences over the years, and release notes."})]})}),jsxRuntimeExports.jsx("a",{id:"focus-on-filter-bar",className:"nav-anchor",role:"note",href:"#focus-on-filter-bar","aria-hidden":"true",tabIndex:"-1",children:"invisible filter anchor"}),jsxRuntimeExports.jsx("h2",{children:"Change Log"}),jsxRuntimeExports.jsxs("div",{className:"changeLog-wrapper",children:[jsxRuntimeExports.jsx(FilterBar,{filter:a,productOptions:FILTER_OPTIONS.PRODUCT,typeOptions:FILTER_OPTIONS.TYPE}),jsxRuntimeExports.jsx(ChangeLogTable,{data:a.apply(f),filter:a,changeLog:f})]})]})}function LoadingState({heading:a}){return jsxRuntimeExports.jsxs(PageWrapper,{children:[jsxRuntimeExports.jsx("h1",{children:a}),jsxRuntimeExports.jsx(LoadingIcon,{})]})}function PageWrapper({children:a}){return jsxRuntimeExports.jsx("div",{id:"UpdatesNotes",className:"full-width",children:a})}function PageRouter(){return jsxRuntimeExports.jsx(Switch,{children:jsxRuntimeExports.jsx(Route,{path:"/updates-notes",component:UpdatesNotes})})}export{PageRouter as default};
