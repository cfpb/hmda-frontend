# HMDA LAR Formatting Tool - Instructions

## Creating a LAR file from scratch
 
- Creating a Transmittal Sheet (TS) row
  - Click the `Clear` button to remove any previously entered data
  - Ensure the `Record Identifier` is set to `2 - LAR`
  - You will see `Creating Transmittal Sheet` if this is a new TS, `Updating Transmittal Sheet` if editing.
  - The `Record Identifier` is already set for you
  - Fill out your Insitution's information
  - Click `Save Row`
  - You will see your TS in the `Saved Records` sections
  - There is only one TS per LAR file.  Creating a new TS will overwrite any existing TS.
  - Now you can begin creating `Loan/Application Register (LAR)` rows.
- Creating a Loan/Application Register (LAR) row
  - Click the `Clear` button to remove any previously entered data.
  - Ensure the `Record Identifier` is set to `2 - LAR`
  - Use the `Parsed Values` view for easier data input.
  - Use the `Pipe-Delimited Values` for quick row navigation and data scanning.
  - Click `Save Row` to store this Loan/Application's data.
  - Saved rows are listed in the `Saved Records` section. 
- Editing data
  - Selecting a record in `Saved Records` will populate that row's data in the `Editing LAR/TS Row` section of the app.
    - `Parsed Values` provides examples of field inputs, field and input descriptions, and easy selectors for enumerated fields.
    - `Pipe-Delimited Values` provides the row's raw text, as it will appear in your downloaded LAR file.
      - Clicking in a field will highlight that value in the `Parsed Values` section for quick editing.
  - Use the `Editing LAR/TS Row` section to make your required modifications.
  - Click the `Update Row...` button to persist your changes.
- Deleting a row
  - Selecting a record in `Saved Records` will populate that row's data in the `Editing LAR/TS Row` section of the app.
  - Click the `Delete Row...` button to remove the selected row.
- Downloading the LAR file
  - Use the `Download File` button to download a pipe-delimited, UTF-8 encoded, `.txt` file containing the TS and LAR data shown in the `Saved Records` section.  Unsaved data entered in the `Editing LAR/TS Row` section is not included in the downloaded LAR file. 
  - The file is saved to your browser's default download directory as `LarFile.txt` or `LarFile(#).txt`.
  - The data is now formatted into a pipe-delimited text file (as shown below) and ready to be submitted to the HMDA Platform. Prior to submission, the file format can be verified by the **File Format Verification Tool**.  
![](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/larft/Text_file_sample.png)
  
# Editing an existing LAR file
 
- Use the `Upload File` button to select your file.  All processing is done in your browser, no data is sent to the CFPB. 
  - Rows without a valid `Record Identifier` are filtered out during data parsing and in a `Please review your file` section.  You should review these records and update them if appropriate. 
- Use the `Saved Records` area to find records relevant to your focus.  
  - You can search the text of your file using the `Search TS/LAR` boxes.  
  - You can filter which fields are shown using the `Filter columns/Filter by label` boxes.
- Selecting a record in `Saved Records` will populate that row's data in the `Editing LAR/TS Row` section of the app
  - `Parsed Values` provides examples of field inputs, field and input descriptions, and easy selectors for enumerated fields.
  - `Pipe-Delimited Values` provides the row's raw text, as it will appear in your downloaded LAR file.
    - Clicking in a field will highlight that value in the `Parsed Values` section for quick editing.
- After making your changes, use the `Download File` button to create and download your LAR file.
- The data is now formatted into a pipe-delimited text file (as shown below) and ready to be submitted to the HMDA Platform. Prior to submission, the file format can be verified by the **File Format Verification Tool**.  
![](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/larft/Text_file_sample.png)
  

## Frequently Asked Questions
The Frequently Asked Questions are available at https://ffiec.cfpb.gov/documentation/2021/faqs/


## HMDA Help
Technical questions about reporting HMDA data collected in or after 2017 should be directed to hmdahelp@cfpb.gov.