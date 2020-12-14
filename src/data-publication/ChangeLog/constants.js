export const PRODUCT_NAMES = {
  mlar: 'Modified LAR',
  datasets: 'Datasets',
  reports: 'Reports',
  documentation: 'Documentation',
  tools: 'HMDA Tools',
}


export const PRODUCTS = Object.keys(PRODUCT_NAMES)


export const CATEGORIES = {
  correction: { order: 1 },
  update: { order: 2 },
  release: { order: 3 },
  notice: { order: 4 },
}


export const PUB_CHANGELOG_URL =
  'https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/data-publication/ChangeLog/change-log-data.json'


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

  TYPE: Object.keys(CATEGORIES).map((type) => ({
    value: type,
    type: 'type',
  })),
}
