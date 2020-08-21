import { DOCS_YEARS } from '../common/constants/years'

function isBadYear(year){
  return DOCS_YEARS.indexOf(year) === -1
}

function getMarkdownUrl(year, slug) {
  return `https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/${year}/${slug}.md`
}

export {
  getMarkdownUrl,
  isBadYear
}
