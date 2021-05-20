# HMDA Maps - FAQ

## Overview
HMDA Maps provides a way to visually analyze population-density adjusted, geographic distributions for subsets of HMDA Data. It enables side-by-side comparison of aggregated statistics for up to two popular variables. Once you have found your desired data, you can download the raw data as CSV, copy and share the page url, or save the summary report as a PDF. 


## What does each option mean?
| Definition | Screenshot |  
|---|---|
|**YEAR**: The year in which the loan was processed.|![Year Selector](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/maps/maps-year-selection.png)|  
|**MAP LEVEL**: The geographic level at which the HMDA Data is aggregated. | ![Level Selector](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/maps/maps-geography-selection.png) |
|**WHERE & AND**: These filters allow you to narrow the selected data based on <a target="_blank" rel="noopener noreferrer" href="/documentation/2019/data-browser-filters/#action_taken">popular variables</a>. | ![Filters Selector](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/maps/maps-filters.png)  |


## What does the map show?  
The map displays the concentration of loans that match your selected filters, adjusted for population density, across the selected Geography (State or County). Darker colors indicate a higher occurrence rate in that region, while lighter colors indicate a lower occurrence rate.  

![Map](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/maps/maps-map.png)  

The various color palettes (orange, red, purple, green, blue) are used to highlight the fact that the application uses different "bucketing" algorithms in order to display a useful level of color variation on the map, and are not indicative of any interpretation about the outcomes presented.  

![Maps Buckets](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/maps/maps-buckets.png)  
  
  
## What do the data tables show? 
The data tables show the aggregated data for the selected filter variables.  
- When only one filter is selected, you will be presented with a single table that includes a row for each option of the filter.  
- When two filters are selected, another table will be displayed for the secon filter's data.  Additionally, a new set of columns will be included in each table to highlight the intersection between the selected filters.
  
|One Filter|Two Filters|
|---|---|
|![Aggregate Table Single](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/maps/maps-table-1.png)  | ![Aggregate Table Two](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/maps/maps-table-2.png)  |


## How can I save and share my map?
### » Share the URL
The URL will take the visitor directly to the map, and zoom to the selected geography. Users can then print the report, or continue to explore HMDA Data using your selections as a starting point.  

![Map Zoom](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/maps/maps-zoom-share.gif)  

### » Save as PDF
![Maps Save PDF](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/maps/maps-save-pdf.png)
<!-- <div style="border: 0px dotted #ddd; padding: 1em .5em">
  <div style="padding: 0em .25em; padding-bottom: .5em; display: flex; justify-content: space-between; align-items: flex-start;">
    <div style="width: 60%;">
      Use the <code>Print Report</code> button to generate a summary report, complete with cover page, map, and the supporting data in tabular format.
    </div>
    <div><img style="margin: 0 auto; max-width: 250px;" src="../images/maps/maps-data-controls.png" alt="Data Controls"> </div>
  </div> -->
    

## How can I download the raw data used to generate my report?
![Maps Download Data](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/maps/maps-download-data.png)
  <!-- <div style="display: flex; justify-content: space-between;">
    <div style="width: 60%">
      Use the <code>Download Data</code> button.  Similar to the Dataset Filtering tool, Maps uses the Data Browser API to provide a CSV file containing the filtered data presented in the summary report.
    </div>
    <div style="text-align: center"><img style="margin: 0 auto; max-width: 250px;" src="../images/maps/maps-data-controls.png" alt="Data Controls"></div>
  </div> -->


## How do I interact with the map?
| Function | Mouse | Keyboard | Touchpad |
|---|---|---|---|
| - Zoom In<br/>- Zoom Out<br/>- Orient North | <img style="max-height: 85px; margin-left:35%;" src="../images/maps/maps-zoom.png" alt="Zoom Controls" /> | `+`<br/>`-`<br/> `Tab` to highlight the Orient North icon, then press `Enter`| - `pinch`/`scroll`<br/>- `pinch`/`scroll`<br/>- Click `Orient` button |
| - Select a region | Click on map | None? | Click on map |
| - Rotate the map | <img style="max-width: 50px; margin-left:35%;" src="../images/maps/maps-orient.png" alt="Orient North button" /> | None? | Right-click and drag on map |
| - Pan the map | Left-click and drag | Arrow keys | Left-click and drag  |
| <div style='width: 14ch'>- Reset the view</div> | Reload the page | Reload the page | Reload the page |


## Report a bug
  - Please [open an Issue](https://github.com/cfpb/hmda-frontend/issues) that includes a detailed description of the issue you're experiencing, along with the URL.


## Still need help?
  - Please reach out to [HMDA Help](mailto:hmdahelp@cfpb.gov) via email with additional inquiries.
