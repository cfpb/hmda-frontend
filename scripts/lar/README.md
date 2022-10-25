# Generate Annual LAR file for Large Filer
 
## Requirements
- Node
- Axios: `yarn add axios`
- Locally running check-digit service. In your HMDA Platform directory:
  - Terminal 1: `env JAVA_OPTS="-Xss256m -Xmx4096m" sbt --java-home /Users/<your user name>/homebrew/opt/openjdk@11 "project hmda-platform" "run"`
  - Terminal 2: `env JAVA_OPTS="-Xss256m -Xmx4096m" sbt --java-home /Users/<your user name>/homebrew/opt/openjdk@11 "project check-digit" "run"`

## Restrictions
Due to [Node filesize limits](https://stackoverflow.com/questions/68230031/cannot-create-a-string-longer-than-0x1fffffe8-characters-in-json-parse), we max out around 500K records (512MB).
  

## Running
```
node ./generate_lar_file.js <LEI> <YEAR> <NUM_ROWS>
```

## Output
Produces a syntactically correct LAR file at `/cypress/fixtures/<YEAR>-<LEI>-<NUM_ROWS>.txt`