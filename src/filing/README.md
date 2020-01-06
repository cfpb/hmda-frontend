# HMDA Platform UI

### This project is a work in progress.

Information and code contained in this repository should be considered provisional and a work in progress, and not the final implementation for the HMDA Platform UI, unless otherwise indicated.

## Introduction to HMDA

For more information on HMDA, checkout the [About HMDA page](http://www.consumerfinance.gov/data-research/hmda/learn-more) on the CFPB website.

## The Platform UI

This section of the repo contains the code for the entirety of the HMDA filing front-end, working directly with the [HMDA platform back-end](https://github.com/cfpb/hmda-platform). The various parts of the platform UI are:

_All pages, expect the home page, require authentication._

- `/filing/<filingPeriod>/` - home page
  - provides general information about the HMDA filing process and requirements
- `/filing/<filingPeriod/institutions/` - institutions listing
  - displays all institutions for which a filer has access to file
- `/filing/<filingPeriod>/<institutionId>/upload` - file upload form for a specific institution and filing period
- `/filing/<filingPeriod>/<institutionId>/syntacticalvalidity` - displays the list of all syntactical and validity edits the exist in the uploaded file
- `/filing/<filingPeriod>/<institutionId>/quality` - displays the list of all quality edits the exist in the uploaded file and allows for verification
- `/filing/<filingPeriod>/<institutionId>/macro` - displays the list of all macro edits the exist in the uploaded file and allows for verification
- `/filing/<filingPeriod>/<institutionId>/summary` - displays the Institution Register Summary (IRS), the validation summary (an overall summary of the submission), and allows for signing of the submission.
