# HMDA LAR Formatting Tool - Instructions

1. Download the HMDA **LAR Formatting Tool for data collected in or after 2018** by selecting the link located on the Loan/Application Register (LAR) Formatting Tool webpage located at https://ffiec.cfpb.gov/tools/lar-formatting. 

2. **Open** the HMDA LAR Formatting Tool you downloaded; If you are using Microsoft Excel 2002 or 2003, please refer to the instructions at the end of this page on how to enable macros. 
![](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/larft/Resources_page.png)

3. If the message “This file originated from an Internet location and might be unsafe” appears, select the **“Enable Editing”** button.
![](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/larft/Enable_Editing.png)

4. If the message “Macros have been disabled” appears, select the **“Enable Content”** button.
![](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/larft/Macros_enabled.png)

5.	The workbook contains two worksheets, Resources and Data:

      a.	 The **Resources Worksheet** provides information including:
      - Quick Start Guide
      
      - Additional Resources
          - The FFIEC and HUD have published resources for financial institutions required to file HMDA data on the Help for Filers section of the HMDA Homepage located at http://www.ffiec.cfpb.gov/;
          - Information regarding valid values and data format can be found in Section 3.4 of the Filing Instructions Guide for HMDA data collected in or after 2018 located at https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2019-hmda-fig.pdf. 
      
      b.	The **Data Worksheet** is where the data is entered under the appropriate headings in **row 4**.
      - Certain cells in the Data Worksheet provide information regarding what data to enter. Prompts will appear when you select a cell.
      
      - The header row (row 2 and row 4) are locked in order to keep the order of the data fields consistent.
![](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/larft/Annotations.png)

6.	**Enter** the information from what is commonly known as the HMDA transmittal sheet into the respective cells in **row 3** of the Data Worksheet.

       a.	The “LAR File Row” header beginning at cell A1 details the row numbers that correspond to your LAR text file after submitting to the HMDA Platform.

       b.	Do not enter any commas “,” into any of the cells.

       c.	All of the transmittal sheet information entered into row 3, from cell B3 to O3 will be exported into a pipe delimited text file. Any information entered in row 3 after O3 will not be exported.

       d.	The data fields have been formatted to wrap text in the cells, which means that the data in each cell wraps to fit the column width. All the data entered into each individual cell will be exported, even if part of the data is not visible.
 

7.	**Enter** loan level data beginning in **row 5** of the Data Worksheet.
![](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/larft/LAR_Row.png)

      a.	Enter the data consecutively by row. Do not skip any rows.

      b.	Each row should contain information regarding an individual loan.

      c.	Do not enter any commas “,” into any of the cells.

      d.	The format for data fields including a date, such as date application received or date of action, is YYYYMMDD. For example, January 17, 2019 should be reported as 20190117.
      
      e.	Not applicable exempt codes must be entered as ‘NA’, not ‘N/A’, ‘na’, or ‘Na’. Exempt codes must be entered as ‘Exempt’, not ‘EXEMPT’ or ‘exempt’.
      
      f.	Beginning with row 5, all data entered from columns A to DF will be exported into the pipe delimited text file. Any information entered after column DF will not be exported.
      
      g.	The data fields have been formatted to wrap text in the cells, which means that the data in each cell wraps to fit the column width. All the data entered into each individual cell will be exported, even if part of the data is not visible.


8.	When all the data have been entered, select the **“Create LAR File”** button located in cell B1 of the Data Worksheet.
![](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/larft/Create_LAR_File.png)


9.	Enter a new filename and save the file type as **“Text Files”** in the prompt to save the new file.
![](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/larft/Save_Text_File.png)


10.	Select **“Save”** in the message confirming whether the changes to the file should be saved.

      a.	This will save the data into a separate pipe delimited text file.


11.	The data is now formatted into a pipe delimited text file (as shown below) and ready to be submitted to the HMDA Platform. Prior to submission, the file format can be verified by the **File Format Verification Tool**.  
![](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/larft/Text_file_sample.png)

**NOTE:** The HMDA LAR Formatting Tool workbook in which the data was originally entered will not be used during the filing process. This workbook can be saved for your reference.

   To save the data entered in the workbook for future reference:
   - Within the HMDA\_LAR\_Formatting\_Tool workbook, select **“File”**.

   -	Select **“Save As”**.

   -	Enter a new filename and save the file type as **“Excel Macro-Enabled Workbook”** in the prompt to save the file.
![](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/larft/Excel_Macro_Workbook.png)

   -	Select **“OK”** in the privacy warning. 

![](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/larft/Document_Inspector.png)

# Frequently Asked Questions
The Frequently Asked Questions are available at https://ffiec.cfpb.gov/documentation/v2/faqs/


## HMDA Help
Technical questions about reporting HMDA data collected in or after 2017 should be directed to hmdahelp@cfpb.gov.

### Enabling macros for Microsoft Excel 2002 and 2003

If the message “The macro may not be available in this workbook or all macros may be disabled” appears, then the macro settings must be updated.

To enable the HMDA LAR Formatting Tool macro:

1.	Open the HMDA\_LAR\_Formatting\_Tool workbook.

2.	Select **Tools**.

3.	Select **Options**.

4.	Within the Options dialog box, select the **Security** tab.

5.	Select **Macro Security**.

6.	In the Security dialog box, select the **Medium** option.
 
 a. This will allow you to choose which macros to run.

7.	Select **OK** to close the Security dialog box.

8.	Select **OK** to close the Options dialog box.

9.	Return to step 4 in the instructions for the HMDA LAR Formatting Tool.
 

### Transferring existing data from another workbook or Google Sheets web-based spreadsheet program

Data that is saved in another workbook or in Google Sheets™ web-based spreadsheet program may be copied into the LAR Formatting Tool so that the data can be formatted into a pipe delimited text file.
To copy data from external sources into the HMDA LAR Formatting Tool:

1.	Open the workbook or the Google Sheets™ web-based spreadsheet program where the data is stored.
2.	Confirm that the data fields are displayed in the same order as required in Section 3.4, File Specifications, of the applicable Filing Instructions Guide.
3.	Open the HMDA\_LAR\_Formatting\_Tool workbook.

4.	**Copy and paste** the information from the transmittal sheet into **row 3** of the Data Worksheet.
- To preserve the format of the data, please use “Paste > Paste Special > Paste Values” or “Paste > Paste Special > Text.”
- The pasted data fields should align with the headers displayed in **row 2**.

5.	**Copy and paste** the information from the LAR into the Data Worksheet beginning in **row 5**.
-	To preserve the format of the data, please use “Paste > Paste Special > Paste Values” or “Paste > Paste Special > Text.”
- The pasted data fields should align with the headers in **row 4.**
