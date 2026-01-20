export const PRODUCT_NAMES = {
  mlar: 'Modified LAR',
  datasets: 'National Datasets',
  reports: 'Reports',
  documentation: 'Documentation',
  tools: 'HMDA Tools',
  filing: 'HMDA Filing',
}

export const PRODUCTS = Object.keys(PRODUCT_NAMES)

export const CATEGORIES = {
  correction: { order: 4 },
  update: { order: 3 },
  release: { order: 2 },
  announcement: { order: 1 },
}

export const PUB_CHANGELOG_URL =
  'https://raw.githubusercontent.com/cfpb/hmda-frontend/combined/src/updates-notes/change-log-data.json'

export const DEFAULT_FILTERS = {
  type: [],
  product: [],
  keywords: [],
}

export const FILTER_OPTIONS = {
  PRODUCT: PRODUCTS.map((product) => ({
    value: product,
    type: 'product',
  })),

  TYPE: Object.keys(CATEGORIES)
    .sort((a, b) => CATEGORIES[a].order - CATEGORIES[b].order)
    .map((type) => ({
      value: type,
      type: 'type',
    })),
}
