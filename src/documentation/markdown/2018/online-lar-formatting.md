# HMDA's Online LAR Formatting Tool

## Interaction Guide

### File Actions

Import or export your LAR data.

- **Upload**: Work with an existing pipe-delimited LAR file.
- **Download**: Create a [LAR file](#lar-file-output) based on the currently saved LAR data.
- **Reset**: Start fresh by erasing all LAR data.

![File Actions](https://github.com/cfpb/hmda-frontend/raw/master/src/documentation/markdown/images/larft/file_actions.png)

### Saved Records

Review your existing records. This section also allows you to search by text content or filter which columns are displayed, helping to focus your data reviews. Clicking on a row will populate it's data in the [Editor](#editing-a-row) to allow modification.

- **Transmittal Sheet**: Institution information
- **Loan/Application Records**: Application information

![Saved Records](https://github.com/cfpb/hmda-frontend/raw/master/src/documentation/markdown/images/larft/saved_records_populated.png)

### Editing a Row

Edit the currently selected row. Use the `New Row` button to start a new record.

![Editing Row](https://github.com/cfpb/hmda-frontend/raw/master/src/documentation/markdown/images/larft/editing_section.png)

### Row Actions

Manage the persistence of the current row.

- **Save/Update**: Create/Modify the currently selected row.
- **Delete**: Remove the selected row from [`Saved Records`](#saved-records)
- **New Row**: Clears the [Editor](#editing-a-row) in preparation for entry of a new record.
- **Clipboard Copy/Paste**: Quickly import/export a single row's data.

![Row Actions](https://github.com/cfpb/hmda-frontend/raw/master/src/documentation/markdown/images/larft/row_actions_update.png)

### Search/Filter fields

- Use the `Search` box to find rows that contain the provided text (case insensitive).
- Use the `Filter` box to restrict which LAR fields are displayed.

![Search Results](https://github.com/cfpb/hmda-frontend/raw/master/src/documentation/markdown/images/larft/saved_records_searching.png)

### Editing a Record

#### Editing status

The heading of the [Editor](#editing-a-row) will remind you whether you are:

- Creating or Updating the current [Editor](#editing-a-row) row
  - ex. `Creating a new LAR Row`
  - ex. `Updating LAR Row 1`
- Working with TS vs LAR
  - ex. `Creating a new LAR Row`
  - ex. `Creating Transmittal Sheet`

#### Parsed Values

Edit the selected row with guided enumerations, examples, and field descriptions. Changes are not persisted until you click [`Save/Update`](#row-actions).

- **Enumerations**: Drop-down menus for enumerated values (i.e. Loan Type).
- **NA/Exempt**: Buttons for easy exception inputs.
- **Dates**: Date-picker with easily readable date format. Values are automatically converted between the display-format and the lar-format (yyyymmdd).
- **Field details**: View description, enumerations, and examples.

![Parsed Values](https://github.com/cfpb/hmda-frontend/raw/master/src/documentation/markdown/images/larft/parsed_multi_select.png)

![Field Details](https://github.com/cfpb/hmda-frontend/raw/master/src/documentation/markdown/images/larft/parsed_field_details.png)

#### Pipe-Delimited Values

Edit the selected row as if you were directly in the LAR file. Changes are not persisted until you click [`Save/Update`](#row-actions).

- **Clipboard Copy/Paste**: Easily import/export data between applications.
- **Linking with Parsed Values**: Selecting a field in the text area will highlight the same field in [`Parsed Values`](#parsed-values) to make editing data easier with the guided enumerations, examples, and field descriptions.

![Pipe-Delimited Values](https://github.com/cfpb/hmda-frontend/raw/master/src/documentation/markdown/images/larft/piped.png)

#### Please Review

If there are records in an uploaded LAR file that we could not reliably parse, you will see the following.
![Please review](https://github.com/cfpb/hmda-frontend/raw/master/src/documentation/markdown/images/larft/saved_records_unparsable.png)

## Creating a LAR file from scratch

### Create a Transmittal Sheet (TS) row
  - Scroll down to the [Editor](#editing-a-row) which should show `Creating Transmittal Sheet`. The `Record Identifier` is already set for you
  - Fill out your Insitution's information
  - Click [`Save Row`](#row-actions)
  - You will see your TS in the [`Saved Records`](#saved-records) section.
  - Note: There is only one TS per LAR file.
  - Now you can begin creating `Loan/Application Register (LAR)` rows.

### Create a Loan/Application Register (LAR) row
  - Click the [`New Row`](#row-actions) button to remove any previously entered data.
  - The `Record Identifier` is automatically set for you.
  - Use the [`Parsed Values`](#parsed-values) view for easier data input.
  - Use the [`Pipe-Delimited Values`](#pipe-delimited-values) for quick row navigation and data scanning.
  - Click [`Save Row`](#row-actions) to store this Loan/Application's data.
  - Saved rows are listed in the [`Saved Records`](#saved-records) section.

### Edit a row
  - Selecting a record from the [`Saved Records`](#saved-records) will populate that row's data in the [`Editing`](#editing-a-record) section of the app.
    - [`Parsed Values`](#parsed-values) provides examples of field inputs, field and input descriptions, and easy selectors for enumerated fields.
    - [`Pipe-Delimited Values`](#pipe-delimited-values) provides the row's raw text, as it will appear in your downloaded LAR file.
      - Clicking in a field will highlight that value in the [`Parsed Values`](#parsed-values) section for quick editing.
  - Use the [`Editing`](#editing-a-record) section to make your required modifications.
  - Click the [`Update Row`](#row-actions) button to save your changes.

### Delete a row
  - Selecting a record in [`Saved Records`](#saved-records) will populate that row's data in the [`Editing`](#editing-a-record) section of the app.
  - Click the [`Delete`](#row-actions) button to remove the selected row.
  - You will be prompted to confirm this action.

### Download your LAR file
  - Use the [`Download File`](#file-actions) button to download a pipe-delimited, UTF-8 encoded, `.txt` file containing the TS and LAR data shown in the [`Saved Records`](#saved-records) section. Unsaved data entered in the [`Editing`](#editing-a-record) section is not included in the downloaded LAR file.
  - The file is saved to your browser's default download directory.
  - The data is now formatted into a pipe-delimited text file ([as shown below](#lar-file-output)) and ready to be submitted to the HMDA Platform.

## Editing an existing LAR file

### Upload your file
Use the [`Upload File`](#file-actions) button to select your file. All processing is done in your browser, no data is sent to the CFPB.

Note: Rows without a valid `Record Identifier` are filtered out during data parsing and presented in a [`Records for review`](#please-review) section. You should review and correct these records.

### Search the TS/LAR data
Use the [`Saved Records`](#saved-records) area to find records relevant to your focus.

  - You can search the text of your file using the `Search TS` and `Search LAR` boxes.
  - You can filter which fields are shown using the `Filter columns/Filter by label` boxes.

### Edit a row
Selecting a record in [`Saved Records`](#saved-records) will populate that row's data in the [`Editing`](#editing-a-record) section of the app.

  - [`Parsed Values`](#parsed-values) provides examples of field inputs, field and input descriptions, and easy selectors for enumerated fields.
  - [`Pipe-Delimited Values`](#pipe-delimited-values) provides the row's raw text, as it will appear in your downloaded LAR file.
    - Clicking in a field will highlight that value in the [`Parsed Values`](#parsed-values) section for quick editing.

### Save changes
After making your changes, use the [`Download File`](#file-actions) button to download your LAR file.

The data is now formatted into a pipe-delimited text file ([as shown below](#lar-file-output)) and ready to be submitted to the HMDA Platform.

## LAR File Output

The LARFT produces pipe-delimited, UTF-8 encoded LAR files. Files contain at least 1 TS and 1 LAR row.

**Note**: Aside from the `Record Identifier`, data uploaded to the LARFT is **not** checked for validity. You can submit your file on the [HMDA Beta Platform](https://ffiec.beta.cfpb.gov) to test for Edits.

Example output:

![LAR file content](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/larft/Text_file_sample.png)

## Frequently Asked Questions

The Frequently Asked Questions are available at https://ffiec.cfpb.gov/documentation/2021/faqs/

## HMDA Help

Technical questions about reporting HMDA data collected in or after 2017 should be directed to [hmdahelp@cfpb.gov](mailto:hmdahelp@cfpb.gov).
