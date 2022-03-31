# Generate Annual LAR file for Large Filer
 
## Requirements
- Node
- Locally running check-digit service. 

## Restrictions
Due to [Node filesize limits](https://stackoverflow.com/questions/68230031/cannot-create-a-string-longer-than-0x1fffffe8-characters-in-json-parse), we max out around 500K records (512MB).
  

## Running
```
node ./generate_lar_file.js <LEI> <YEAR> <NUM_ROWS>
```

## Output
Produces a syntactically correct LAR file at `/cypress/fixtures/<YEAR>-<LEI>-<NUM_ROWS>.txt`

## Stats
rows|time|size
---|---|---
1,000,000|34mins|1.04GB