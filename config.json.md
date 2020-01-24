# Front-end Configuration

## Production vs Development Configuration
The configuration file has two top level keys to enable separate configuration of Production and Development environments.
```
{
    "prod": { ... },
    "dev": { ... }
}
```

## Default vs Beta Configuration
Configuration variables for each `default` Environment will live directly nested under the `prod/dev` element.

Each top level Environment (`prod`, `dev`) will have a `beta` key that will house the configuration for it's corresponding `beta` environment.  The keys of the `beta` configuration should mirror those of `default`.
```
{
    "prod": { 
        "announcement": "This is a prod-default Announcement",
        ...
        "beta": {
            "announcement": "This is a prod-beta Announcement",
            ...
        }
    },
    "dev": { 
        "announcement": "This is a dev-default Announcement",
        ...
        "beta": {
            "announcement": "This is a dev-beta Announcement",
            ...
        }
    }
}
```

## Environment Variables

- ### announcement (String)
    Controls the 'Announcement' banner displayed on the landing page for the front-end. (https://ffiec.cfpb.gov)

- ### defaultPeriod (String)
    The filing period which users will be directed to by default when clicking a link that takes them to the Filing app.  

- ### defaultDocsPeriod (String)
    The year that will be highlighted when users click on the DOCUMENTATION link in the page header.

- ### filingPeriods (Array(String))
    An array of filing periods which are accessible by a user of the Filing app.

- ### maintenanceMode (Boolean)
    A flag indicating if the backend is unavailable.  Value `true` will prevent the user from logging in to the Filing app or attempting new account creations.

    NOTE: Setting to `true` will also display a banner on the Filing homepage, mirroring the announcement on the FFIEC landing page.

- ### filingAnnouncement (Object | null)
    Will display a banner across all Filing app pages to inform users of future events, such as scheduled maintenance.  To disable the banner, set the value of this key to `null`.
    ```
    "filingAnnouncement": {
        "title": "Scheduled Maintenance",
        "message": "System maintenance is scheduled for Monday",
        "type": "info"
    }
    ```
    - type
        - "info" -> blue
        - "warning" -> yellow
        - "error" -> red

