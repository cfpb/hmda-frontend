# FAQ - Updates and Notes

## What is it?

The [Updates and Notes app](https://ffiec.cfpb.gov/updates-notes) provides a searchable change log of updates, releases, and corrections to published HMDA Data.

## Do content changes require redeployment?

No, just a PR. We fetch [change-log-data.json](https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/updates-notes/change-log-data.json) from Github.

## How do I create a new entries?

Add your update to the [change-log-data.json](./src/updates-notes/change-log-data.json) file.

### Example

```
  {
    "date": "03/10/21",
    "type": "release | update | correction",
    "product": "mlar | datasets | reports | documentation | tools",
    "description": "This example has been created!",
    "url": "https://github.com/cfpb/hmda-frontend/issues/007",
    "links": [
      {"text": "First link", "url": "https://link.url.com" },
      {"text": "A second link", "url": "https://link2.url.com" }
    ]
  },
```

### Fields

- `date`

  - Date the change will go live. Displayed entries are sorted by this date.

- `description`

  - A description of the change.

- `type`

  - `release` - Newly released product or feature
  - `update` - Update to existing product not related to an error
  - `correction` - Modification to existing data to correct an error

    ![Types](./types.png)

- `product`

  - `mlar` - Modified LAR
  - `datasets` - Snapshot/Dynamic Datasets
  - `reports` - Disclosure/Aggregate Reports
  - `documentation` - Documentation pages
  - `tools` - Rate Spread/Check Digit/LARFT/FFVT

- `url`
  - Not currently used but could provide a link to additional info.
- `links`
  - Links to supporting documents or websites
    - `text` - Link text
    - `url` - Link target
