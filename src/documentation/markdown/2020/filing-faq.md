## HMDA Filing Frequently Asked Questions

### Account Registration

**What information do I need to provide to register my financial institution?**
To register your financial institution on the HMDA platform institutions you will need to provide your institution name, LEI (legal entity identifier), tax ID number, email domain (example: cfpb.gov), and agency code. Registration is a two-step process. You must create a filer account **and** register your institution in the system. You can register your financial institution here: https://hmdahelp.consumerfinance.gov/accounthelp/. Do not use a personal email to register for an account. The HMDA platform is designed to authenticate users based upon a financial institution’s registered domain email. If you do not have a financial institution domain email , contact HMDA Help.

**What is a Legal Entity Identifier (LEI)?**
Every institution that files a HMDA submission will be required to obtain a LEI for their submission whether they are exempt or not. The Global LEI Foundation website provides a list of LEI issuing organizations at https://www.gleif.org/en/about-lei/get-an-lei-find-lei-issuing-organizations. A financial institution may obtain a LEI, for HMDA reporting purposes, from any one of the issuing organizations listed on the web site. For general information on the “LEI,” see section 5.2 of the HMDA Small Entity Compliance Guide, and Regulation C, 12 CFR §§ 1003.4(a)(1)(i)(A), effective January 1, 2018, and 1003.5(a)(3)(vii), effective January 1, 2019.

**What is my agency code?**
Institutions should provide one of the following agency codes: 
1 - Office of the Comptroller of the Currency (OCC)
2 - Federal Reserve System (FRS)
3 - Federal Deposit Insurance Corporation (FDIC)
5 - National Credit Union Administration (NCUA)
7 - United States Department of Housing and Urban Development (HUD)
9 - Consumer Financial Protection Bureau (CFPB)

Non-depository institutions that are not affiliated with a depository institution should select 7 - HUD. Do not select 9 - CFPB unless your institution is regulated by the CFPB or affiliated with an institution regulated by the CFPB.

### Filing Preparation

**How can I test my file before submitting it to HMDA?**
You can submit test data to the Bureau via the Beta submission platform found here: https://ffiec.beta.cfpb.gov/. The Beta submission platform gives you an opportunity to review and resolve edits as well as identify formatting errors prior to the official filing period. Data submitted to the Beta submission platform is not retained by the Bureau, or any other regulatory agency.

**What tools can I use to help prepare my file for submission?**
You can use the **Filing Instructions Guide (FIG)** for the applicable year you are filing data for. Filing Instructions Guides for each year can be found on the home page of https://ffiec.cfpb.gov/, under the “Help For Filers” section. 

+ LAR File Format: **Section 3.3 of the FIG** provides filers with the proper steps to format your LAR File. An example of a correctly formatted file can be found here: https://github.com/cfpb/hmda-platform/blob/master/data/2019/clean_test_files/bank_1/clean_file_100_rows_Bank1.txt.

+ Data Fields: **Section 3.4 of the FIG** includes all acceptable values and exemption codes for the various data fields. **Sections 4.2.1 and 4.2.2 of the FIG** detail data specifications for each field.

+ Edits: Syntactical, Validity, Quality, and Macro quality edits can be found in **Section 5.3 of the FIG**.  

The **LAR Formatting Tool** assists institutions that are not using their own vendor software in formatting their LAR files correctly. In order to successfully use the tool, Excel macros need to be enabled; please work with your IT department if this is not the case. Additionally, institutions should take note of the annotations that appear when hovering over each cell. These annotations describe what values can be included in each cell. The first tab of the tool entitled “Resources” gives instructions on use.  

The **File Format Verification Tool** is a resource for testing whether your file meets certain formatting requirements specified in the HMDA FIG, specifically that the file
- is pipe-delimited;
- has the proper number of data fields; and
- has data fields formatted as integers, where necessary.
The FFVT does not allow you to submit HMDA data. Additionally, there is a unique File Format Verification Tool for each HMDA data collection year, so please select the relevant year before uploading a file.  

The **Rate Spread calculator** allows institutions to enter their loan data manually, or upload a CSV file of loan information that will help calculate the rate spread.  

The **Check Digit tool** can be used to either generate check digits or validate ULIs. 


**I’m having issues when I try to upload my file, what should I do?**
If you are having issues uploading a new file and are receiving errors from a previous upload, please refresh the page, log out, clear your browser’s cache (clear your browser’s history), and log back in, and upload your file again. Additionally, if you are using Internet Explorer, we have found that filers have fewer browser caching issues using Google Chrome. The time to upload may vary depending on the size of your institution’s LAR(s).  In some cases, very large files can take a day to fully load.  Be sure to allocate enough time for the upload process to complete prior to the filing deadline.  Do not refresh or close the browser window while the file is uploading. If you continue to experience timeouts or other upload errors, we would recommend the following URLs are whitelisted in your DLP to allow for transfer of HMDA files.
 - ffiec.cfpb.gov
 - ffiec-auth.cfpb.gov
 - ffiec-api.cfpb.gov
 - ffiec.beta.cfpb.gov


### Submission

**When is the filing period?**
The filing period is between January 1 and March 1 of each year.  The HMDA platform for each filing period opens January 1st.  The submission deadline is March 1st.  

**How do I know my file was submitted?**
Upon signing and submitting your file, an email confirming your submission will be sent to the email address on file. Additionally, when you log into your account, you should see a message stating:
"Your submission has been accepted. This completes your HMDA filing process for this year. If you need to upload a new HMDA file, the previously completed filing will not be overridden until all edits have been cleared and verified, and the new file has been submitted." 
Below that message is a button that says 'View Completed Filing'. Select that and you will see the date and timestamp your file was accepted along with a receipt number for the submission. 

**When can I submit my file?**
To test your HMDA data, the beta platform will be open throughout the year. Visit https://ffiec.beta.cfpb.gov/ to test your HMDA data.
Annual HMDA data submissions for the 2019 filing year are accepted January 1 - March 1, 2020. Quarterly HMDA data submissions are separated into three quarters. Quarter 1 filing period: April 1 - May 30, 2020; Quarter 2 filing period: July 1 - August 29, 2020; Quarter 3 filing period: October 1 - November 29, 2020.

**Should I file quarterly?**
Beginning January 1, 2020, the 2015 HMDA Final Rule requires quarterly reporting for financial institutions that reported a combined total of at least 60,000 applications and covered loans, excluding purchased covered loans, for the preceding calendar year. Thus, in addition to their annual data submission, these larger-volume reporters will submit HMDA data for each of the first three quarters of the year on a quarterly basis. Further information can be found in Regulation C, 12 CFR 1003.5(a)(1)(ii). 



### Resubmissions

**I need to resubmit my data, what do I do?**
In order to resubmit, please log into the HMDA Platform. The corrected file that you upload will overwrite the old file. 

**I missed the annual filing period deadline and am submitting my file late. Who do I need to notify?**
If you wish to explain the circumstances surrounding a late submission, contact your federal HMDA supervisory agency.



### Miscellaneous 

**What steps should I take on the Co-Applicant Credit Score and Co-Applicant Credit Scoring Model when there is no co-applicant?**
If the Action Taken is 4, 5, or 6, an institution should report 8888 in the Credit Score of Co-Applicant or Co-Borrower data field and 9 in the Co-Applicant or Co-Borrower, Name and Version of Credit Scoring Model data field, regardless of whether there is a Co-Applicant for the record(s).
