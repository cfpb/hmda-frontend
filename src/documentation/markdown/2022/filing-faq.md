# HMDA Filing - Frequently Asked Questions

## Account Registration

### How do I register my financial institution?
To register your financial institution on the <a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/filing">HMDA Filing Platform</a> you will need to provide your institution name, <a target="_blank" rel="noopener noreferrer" href="http://ffiec.cfpb.gov/documentation/2021/filing-faq#what-is-a-legal-entity-identifier-lei">LEI (Legal Entity Identifier)</a>, tax ID number, email domain (example: cfpb.gov), and agency code. Registration is a two-step process. You must create a filer account **and** register your institution in the system. You can register your financial institution here: https://hmdahelp.consumerfinance.gov/accounthelp/. Do not use a personal email address to register for an account. The <a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/filing">HMDA Filing Platform</a> is designed to authenticate users based upon a financial institution’s registered email domain. If you do not have an email address within your financial institution's email domain, [contact HMDA Help](mailto:hmdahelp@cfpb.gov).

### What is a Legal Entity Identifier (LEI)?
Every institution that files a HMDA submission will be required to obtain a LEI for their submission whether they are exempt or not. The website for the <a target="_blank" rel="noopener noreferrer" href="https://www.gleif.org/">Global LEI Foundation (GLEIF)</a> provides a list of LEI issuing organizations at https://www.gleif.org/en/about-lei/get-an-lei-find-lei-issuing-organizations. A financial institution may obtain an LEI, for HMDA reporting purposes, from any one of the issuing organizations listed on the website. For general information on the “LEI,” see section 5.2 of the <a target="_blank" rel="noopener noreferrer" href="https://files.consumerfinance.gov/f/documents/cfpb_hmda_small-entity-compliance-guide.pdf">HMDA Small Entity Compliance Guide</a>, and <a target="_blank" rel="noopener noreferrer" href="https://www.consumerfinance.gov/rules-policy/regulations/1003/4/#a-1-i-A">Regulation C, 12 CFR §§ 1003.4(a)(1)(i)(A)</a>, effective January 1, 2018, and <a target="_blank" rel="noopener noreferrer" href="https://www.consumerfinance.gov/rules-policy/regulations/1003/5/#a-3-vii">1003.5(a)(3)(vii)</a>, effective January 1, 2019.

### What is my agency code?
Institutions should provide one of the following agency codes:  
  
- 1 - Office of the Comptroller of the Currency (OCC)  
- 2 - Federal Reserve System (FRS)  
- 3 - Federal Deposit Insurance Corporation (FDIC)  
- 5 - National Credit Union Administration (NCUA)  
- 7 - United States Department of Housing and Urban Development (HUD)  
- 9 - Consumer Financial Protection Bureau (CFPB)

| Tips |
|--|
| ▸ Select `7 - HUD` for non-depository institutions that are not affiliated with a depository institution. |
| ▸ Do not select `9 - CFPB` unless your institution is regulated by the CFPB or affiliated with an institution regulated by the CFPB. |

## Filing Preparation

### How can I test my file before submitting it to HMDA?
The Bureau hosts the <a target="_blank" rel="noopener noreferrer" href="https://ffiec.beta.cfpb.gov/">HMDA Beta Filing Platform</a> (https://ffiec.beta.cfpb.gov/) where you can submit HMDA data in a sandboxed environment (a non-production system designed for application testing) prior to the official filing period. This gives you an early opportunity to <a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/documentation/2022/filing-faq#what-tools-can-i-use-to-help-prepare-my-file-for-submission">prepare your data</a>, review and resolve edits, as well as identify and correct formatting errors. **Data submitted to the <a target="_blank" rel="noopener noreferrer" href="https://ffiec.beta.cfpb.gov/">HMDA Beta Filing Platform</a> is not retained by the Bureau, or any other regulatory agency.**


### What tools can I use to help prepare my file for submission?
You can use the <a target="_blank" rel="noopener noreferrer" href="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2021-hmda-fig.pdf">**Filing Instructions Guide (FIG)**</a> applicable to the year you are filing data for. Filing Instructions Guides for each year can be found on the home page of https://ffiec.cfpb.gov/, **under the “Guides for HMDA Filers” section.** 

+ LAR File Format: **Section 3.3 of the FIG** provides filers with the proper steps to format your LAR File. An example of a correctly formatted file can be found here: https://github.com/cfpb/hmda-platform/blob/master/data/2022/yearly/clear_test_files/bank1/Bank1_clean_100_rows.txt.

+ Data Fields: **Section 3.4 of the FIG** includes all acceptable values and exemption codes for the various data fields. **Sections 4.2.1 and 4.2.2 of the FIG** detail data specifications for each field.

+ Edits: Syntactical, Validity, Quality, and Macro quality edits can be found in **Section 5.3 of the FIG**.  

The <a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/tools/lar-formatting">**LAR Formatting Tool**</a> assists institutions that are not using their own vendor software in formatting their LAR files correctly. In order to successfully use the tool, Excel macros need to be enabled; please work with your IT department if this is not the case. Additionally, institutions should take note of the annotations that appear when hovering over each cell. These annotations describe what values can be included in each cell. The first tab of the tool entitled “Resources” gives instructions on use.  

The <a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/tools/file-format-verification">**File Format Verification Tool**</a> is a resource for testing whether your file meets certain formatting requirements specified in the HMDA FIG, specifically that the file

- is pipe-delimited;
- has the proper number of data fields; and
- has data fields formatted as integers, where necessary.

The FFVT does not allow you to submit HMDA data.

The <a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/tools/rate-spread">**Rate Spread calculator**</a> allows institutions to enter their loan data manually, or upload a CSV file of loan information that will help calculate the rate spread.  

The <a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/tools/check-digit">**Check Digit tool**</a> can be used to either generate check digits or validate ULIs. 

### I’m having issues when I try to upload my file, what should I do?
If you are having issues uploading a new file and are receiving errors from a previous upload, please: 

- refresh the page
- log out
- clear your browser’s cache (clear your browser’s history)
- log back in
- upload your file again  

Additionally, if you are using Internet Explorer, we have found that filers have fewer browser caching issues using Google Chrome. The time required to upload may vary depending on the size of your institution’s LAR(s).  In some cases, very large files can take a day to fully upload.  Be sure to allocate enough time for the upload process to complete prior to the filing deadline.  **Do not refresh or close the browser window while the file is uploading**. If you continue to experience timeouts or other upload errors, we recommend ensuring that the following URLs are whitelisted in your digital loss prevention software to allow for the transfer of HMDA files:

 - ffiec.cfpb.gov
 - ffiec.beta.cfpb.gov


## Submission

### When is the filing period?
The **Annual filing** period is between <a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/documentation/2021/annual-filing-dates/">January 1 and March 1</a> of each year.  The <a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/filing">HMDA Filing Platform</a> for each filing period opens January 1st.  The submission deadline is March 1st.  

### How do I know my file was submitted?
Upon signing and submitting your file, an email confirming your submission will be sent to the email address on file. Additionally, when you log into your account, you should see a message stating:
"Your submission has been accepted. This completes your HMDA filing process for this year. If you need to upload a new HMDA file, the previously completed filing will not be overridden until all edits have been cleared and verified, and the new file has been submitted." 
Below that message is a button that says 'View Completed Filing'. Select that and you will see the date and timestamp your file was accepted along with a receipt number for the submission. 

### When can I submit my file?
The <a target="_blank" rel="noopener noreferrer" href="https://ffiec.beta.cfpb.gov/">HMDA Beta Filing Platform</a> is open throughout the year to test your HMDA data.

_Annual HMDA data submissions_ for the filing year are accepted between January 1 – March to be considered timely.
<br/>

![2021 annual filing dates](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/annual_filing.png)  

_Quarterly HMDA data submissions_ are separated into three quarters. 

- Quarter 1 filing period: April 1 - May 30, 2021  
- Quarter 2 filing period: July 1 - August 30, 2021  
- Quarter 3 filing period: October 1 - November 29, 2021  

<br/> 

![2021 quarterly filing dates](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/quarterly_filing_2021.png)

### Should I file quarterly?
Beginning January 1, 2020, the 2015 HMDA Final Rule requires quarterly reporting for financial institutions that reported a combined total of at least 60,000 applications and covered loans, excluding purchased covered loans, for the preceding calendar year. Thus, in addition to their annual data submission, these larger-volume reporters will submit HMDA data for each of the first three quarters of the year on a quarterly basis. Further information can be found in <a target="_blank" rel="noopener noreferrer" href="https://www.consumerfinance.gov/rules-policy/regulations/1003/5/#a-1-ii"><a target="_blank" rel="noopener noreferrer" href="https://www.consumerfinance.gov/rules-policy/regulations/1003/5/#a-1-ii">Regulation C, 12 CFR 1003.5(a)(1)(ii)</a></a>. 

## Resubmissions

### I need to resubmit my data, what do I do?
In order to resubmit, please log into the <a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/filing">HMDA Filing Platform</a>. The corrected file that you upload will overwrite the old file. 

### I missed the annual filing period deadline and am submitting my file late. Who do I need to notify?
If you wish to explain the circumstances surrounding a late submission, contact your federal HMDA supervisory agency.

## Miscellaneous

### What should I record in the Co-Applicant Credit Score and Co-Applicant Credit Scoring Model fields when there is no co-applicant?
If the Action Taken is 4, 5, or 6, an institution should report 8888 in the Credit Score of Co-Applicant or Co-Borrower data field and 9 in the Co-Applicant or Co-Borrower, Name and Version of Credit Scoring Model data field, regardless of whether there is a Co-Applicant for the record(s). 

### I am receiving formatting errors/edits regarding ethnicity and/or race of applicant fields.
Please note that the fields 'Ethnicity of Applicant or Borrower 1-5' and 'Race of Applicant or Borrower 1-5' are for up to 5 ethnicities/races of the first applicant. For any co-applicant ethnicities/races, please enter values in the fields **'Ethnicity of Co-Applicant or Co-Borrower 1-5'** or **'Race of Co-Applicant or Co-Borrower 1-5'**.

### I am receiving validity edits regarding my county codes & census tracts. Can you explain how these fields are derived?
Your county code is a 5 digit number that combines state and county codes. Your census tract should be an 11 digit number. Your census tract combines the 2 digit state, 3 digit county, and 6 digit tract code (with no decimal). The FFIEC census tool and FFIEC geocoder can assist in providing the correct state, county and census tract combinations.  

- <a target="_blank" rel="noopener noreferrer" href="https://www.ffiec.gov/%5C/census/default.aspx">Census Tool</a>  
- <a target="_blank" rel="noopener noreferrer" href="https://geomap.ffiec.gov/FFIECGeocMap/GeocodeMap1.aspx">Geocoder</a>  

For example, in the case of Baldwin County, Alabama, the 2 digit state code would be 01 and the 3 digit county code would be 003. Therefore, the reported county code would be 01003. In the case that the 6 digit tract code selected is 020100, the combined census tract code would be 01003020100.

### What decimal precision is the Loan-to-Value ratio rounded to?
The precision of the calculated LTV should be rounded to match the decimal precision of the CLTV.  

For example, take a calculated LTV (loan amount/property value) of 75.4025 and a reported CLTV of 75. The calculated LTV will round down to 75. In the case that the reported CLTV is 75.4, the calculated LTV will down down to 75.4.  

### Where can I find HMDA data prior to 2017?
Each year thousands of financial institutions report data about mortgages to the public, under the Home Mortgage Disclosure Act (HMDA). We provide the data collected under HMDA from 2007-2017 for download <a target="_blank" rel="noopener noreferrer" href="https://www.consumerfinance.gov/data-research/hmda/historic-data/">here.</a>  

### I have a question that's not covered in the FAQ section, what can I do?
For further questions, please email [hmdahelp@cfpb.gov](mailto:hmdahelp@cfpb.gov). Note that [HMDA Help](mailto:hmdahelp@cfpb.gov) only operates via email.
