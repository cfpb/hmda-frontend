# Submission test-file (LAR) generator

## Overview

These tools are used to generate the submission files for our Cypress integration tests of the HMDA Platform's Filing process.

## Requirements

1. Install dependencies: `./scripts/lar/setup.sh`
2. Verify the HMDA Platform + Check Digit service are running locally
3. Run commands from `hmda-frontend` root dir

## Running

### Single Year/Quarter

| Description   | Command                                         |
| ------------- | ----------------------------------------------- |
| Usage         | `yarn make-lar <LEI> <YEAR-QUARTER> <NUM_ROWS>` |
| ex. Annual    | `yarn make-lar frontendtestbank9999 2023 10`    |
| ex. Quarterly | `yarn make-lar frontendtestbank9999 2023-Q1 10` |

### All Filing Periods

To generate all annual/quarterly files for given year:
| Description | Command |
|---|---|
|Usage|`./scripts/lar/generateAll.sh <LEI> <YEAR> <NUM_ROWS>` |
|Example| `./scripts/lar/generateAll.sh frontendtestbank9999 2023 10`|

## Output

Produces a syntactically correct LAR file at `/cypress/fixtures/YEAR(-QUARTER?)-LEI-NUM_ROWS.txt`

## FAQ

### How do I get Platform + Check Digit running?

1. If you don't already have OpenJDK v11: `brew install openjdk@11`

2. In your HMDA Platform directory:
   - Terminal 1 (Platform): `env JAVA_OPTS="-Xss256m -Xmx4096m" sbt --java-home ~/homebrew/opt/openjdk@11 "project hmda-platform" "run"`
     - Once the Platform is running you can start CheckDigit
   - Terminal 2 (CheckDigit): `env JAVA_OPTS="-Xss256m -Xmx4096m" sbt --java-home ~/homebrew/opt/openjdk@11 "project check-digit" "run"`
