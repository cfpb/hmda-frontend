const slugMap = {
  2017: {},
  2018: {
    'lar-data-fields': 'LAR_data_fields.md',
    'data-browser-filters': 'data_browser_filters.md',
    'derived-data-fields': 'derived_data_fields.md',
    'faq': 'FAQ.md',
    'ad-changes': 'ad_changes.md',
    'public-lar-schema': 'public_lar_schema.md',
    'public-panel-schema': 'public_panel_schema.md',
    'public-ts-schema': 'public_ts_schema.md',
    'ts-data-fields': 'ts_data_fields.md',
    'panel-data-fields': 'panel_data_fields.md'
  },
  2019: {},
  2020: {}
}

function slugToMarkdown(year, slug) {
  const slugs = slugMap[year]
  return slugs && slugs[slug]
}

function getAllSlugsPerYear(year) {
  const slugs = slugMap[year]
  return slugs && Object.keys(slugs)
}

function isBadSlug(year, slug){
  return !slugToMarkdown(year, slug)
}

function isBadYear(year){
  return !slugMap[year]
}

function getMarkdownUrl(year, slug) {
  return `https://raw.githubusercontent.com/cfpb/hmda-documentation/master/markdown/${year}/${slugToMarkdown(year, slug)}`
}

export {
  getMarkdownUrl,
  isBadSlug,
  isBadYear,
  getAllSlugsPerYear
}
