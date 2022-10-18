# HMDA Quarterly Graphs - Frequently Asked Questions

The Quarterly Graphs display an aggregated view of quarterly filers for the current filing year.  

## What are the qualifications of a quarterly filer?

A financial institution is required to report quarterly HMDA data if it reported a combined total of at least 60,000 applications and covered loans, excluding purchased covered loans, for the preceding calendar year. Institutions file quarterly data three times a year, with quarter four data being reported in the following year’s annual submission. 

## How were institutions chosen to be displayed in the quarterly filing graphs?

The institutions displayed are eligible for quarterly filing for the current year. Only the current year’s eligibility is considered when determining the list of institutions displayed in these quarterly graphs, meaning a previously eligible quarterly filer would be excluded if they do not qualify for the current year. In addition to the current year’s quarterly data, users can view three years of data for the institutions. The data in each graph is based on the same set of institutions.   

## How do I view a list of quarterly filers?

View a list of quarterly filers by navigating to the “Filer Info” tab.  

<img alt='Graphs Section Selector' className='widthOriginal' src='https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/graphs/section-selector.png'>
 
Users can view the filer name, LEI, regulatory agency, and LAR counts for the previous three years. 
 
## How can I sort the quarterly filer list?

By default, the quarterly filer list is sorted alphabetically by Agency and Institution, respectively. The sort order is reflected in the direction of the arrow adjacent to the field name. An up arrow indicates an ascending sort (e.g. A to Z, least to highest) and a down arrow indicates the opposite (e.g. Z to A, highest to least).
<br/>
<img alt='Sort Order' className='widthOriginal' src='https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/graphs/sort-1-order.png'>

 
You can remove any of the applied sort criteria by clicking the `x` icon within the corresponding label.
<br/>
<img alt='Sort Remove' className='widthOriginal' src='https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/graphs/sort-2-remove.png'>

Sort direction is controlled by selecting the column header of a field. A double-sided arrow indicates that a column is not currently sorted.
<br/>
<img alt='Sort Direction' src='https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/graphs/sort-3-direction.png'>

To change the primary sort criteria:

- Remove any secondary sort criteria by selecting the associated `x` of the sort labels
- In the quarterly filer table, select the column header of the field you wish to sort by
- Click the column header again to change the sort direction

To change the sort direction of an already applied sort criteria:

- Select on the column header of the field 
- Observe that the arrow icon adjusts to reflect the newly reversed sort direction

To add additional sort criteria:

- Hold the shift key and select the desired column headers
- Observe that the sort criteria shown above the data table reflect the order in which sort criteria are applied
 

## How are loans sorted into quarters?

Loans are grouped by quarter based on their Final Action Taken date. 

![Quarter Final Action Dates](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/graphs/quarter-final-action-dates.png)

Quarterly Filing - Action Taken Dates 

- Quarter 1: January 1 - March 31 
- Quarter 2: April 1 - June 30 
- Quarter 3: July 1 - September 30 
- Quarter 4: October 1 - December 31

## What categories of graphs can I choose from?

You can select from 21 graphs from the following categories: 

- Combined loan-to-value ratio 
- Credit score 
- Debt-to-income ratio 
- Denial rates 
- Interest rates  
- Loan & application counts 
- Total loan costs

## How do I view a specific time period of quarterly filing?

Select your desired range from the “Filing Period Range” drop down. You can choose from any quarter in the past three years up until the latest quarter of data published. 

![Filter by Filing Period](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/graphs/period-filter-1.png)

To return to viewing all the available quarters, select “Show All Quarters”. 

![Clear Filing Period Filter](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/graphs/period-filter-2.png)
 
## How do I remove or add specific lines on the graph?

You can customize which lines are shown on the graph by selecting within the legend.

![Graph Key](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/graphs/series-selector-1.png)

For example, selecting ‘Conventional Conforming’ and ‘Conventional Non-Conforming' will deactivate those lines on the graph and only display the other four options (FHA, HELOC, RHS/FSA, & VA). When a line is deactivated, its name in the legend will turn gray and the line will disappear from the graph display. 

![Hide Data Series Example](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/graphs/series-selector-2.png)

To reactivate the deactivated lines, select them and they will be re-displayed on the graph. 

![Show Data Series Example](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/graphs/series-selector-3.png)

Removing series lines will also update the columns in the table that is displayed below the graph. 

## How can I share a specific graph?

Selecting “Share Graph” on the top right of the graph will copy a link to the graph you are currently viewing. The link will preserve your selections for the Filing Period Range filters and the series lines that are currently displayed. You can then paste the link to your desired location.  

<img alt='Share Graph' className='widthOriginal' src='https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/graphs/share-graph-1.png'>
<br/>
<img alt='Share Graph Clicked' className='widthOriginal' src='https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/graphs/share-graph-2.png'>
## How can I download a screenshot of the graph I am viewing?

Select the three horizontal lines on the top right of the graph to display a list of options. You can download an image of the graph by using any of the four options indicated below. You can choose between a PNG, JPEG, PDF, or SVG file formats. 

<img alt='Export Graph Image' className='widthOriginal' src='https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/graphs/export-image-1.png'>
Selecting one of the options will download the file to your computer. 

<img alt='Download Graph Image' className='widthOriginal' src='https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/graphs/export-image-2.png'>

## How can I download the data that the graph is displaying?

Select the three horizontal lines on the top right of the graph to display a list of options. You can download the data displayed in either a CSV or XLS format.  

<img alt='Export Graph Data' className='widthOriginal' src='https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/graphs/export-data-1.png'>

The data that will be in the CSV or XLS is the same data that is displayed in the table below the graph. 

<img alt='Graph Data Table' className='widthOriginal' src='https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/images/graphs/export-data-2.png'>
 
## Can I review the underlying loan level quarterly data?

To protect borrow privacy, the underlying loan and institution level data is not displayed. When the annual data for the institutions is released the following year, it will be in accordance with the [Data Disclosure Policy](https://files.consumerfinance.gov/f/documents/HMDA_Data_Disclosure_Policy_Guidance.Executive_Summary.FINAL.12212018.pdf).

## Learn more about the different loan types

<a href="https://www.consumerfinance.gov/owning-a-home/loan-options/conventional-loans/" target="_blank">Conventional Conforming</a>
Conforming loans have maximum loan amounts that are set by the government.

<a href="https://www.consumerfinance.gov/owning-a-home/loan-options/conventional-loans/" target="_blank">Conventional Non-Conforming</a>
Non-conforming loans are less standardized. Eligibility, pricing, and features can vary widely by lender, so it’s particularly important to shop around and compare several offers.

<a href="https://www.consumerfinance.gov/owning-a-home/loan-options/fha-loans/" target="_blank">Federal Housing Administration (FHA)</a>
FHA are loans from private lenders that are regulated. The FHA doesn’t lend the money directly–private lenders do.

<a href="https://www.consumerfinance.gov/ask-cfpb/my-lender-offered-me-a-home-equity-line-of-credit-heloc-what-is-a-heloc-en-107/?_gl=1*922b9v*_ga*MTQ3Njg0MzQyOS4xNjY2MDE5NDc5*_ga_DBYJL30CHS*MTY2NjAyMjE2My4yLjEuMTY2NjAyMjg0OC4wLjAuMA.." target="_blank">Home Equity Line of Credit (HELOC)</a>
A home equity line of credit (HELOC) is an “open-end” line of credit that allows you to borrow repeatedly against your home equity.

<a href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-usda-rural-housing-service-loan-en-114/" target="_blank">Rural Housing Service (RHS)</a>
RHS offers mortgage programs that can help low- to moderate-income rural residents purchase, construct, and repair homes.

<a href="https://www.fsa.usda.gov/programs-and-services/farm-loan-programs/index" target="_blank">Farm Service Agency (FSA)</a>
FSA are loans to help farmers and ranchers get the financing they need to start, expand or maintain a family farm.

<a href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-va-loan-en-113/" target="_blank">Veterans Affairs (VA)</a>
VA offers loan programs to help servicemembers, veterans, and their families buy homes.

## How often will the quarterly graphs be updated?

The graphs are updated with the latest data at the conclusion of each quarterly filing period, including the late submission period. A calendar of quarterly filing periods can be found in the [Quarterly Filing documentation](https://ffiec.cfpb.gov/documentation/2022/quarterly-filing-dates/). 
<br/>
<br/>
<br/>
Additional questions or feedback can be sent to <a href="mailto:hmdahelp@cfpb.gov">hmdahelp@cfpb.gov</a>. 