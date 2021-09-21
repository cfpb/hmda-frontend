import { DOCS_YEARS } from '../common/constants/years'

function isBadYear(year){
  return DOCS_YEARS.indexOf(year) === -1
}

function getMarkdownUrl(year, slug) {
  const localOrRemoteUrl =
    window.location.hostname.indexOf("localhost") > -1
      ? window.location.origin
      : "https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation"
      
  return `${localOrRemoteUrl}/markdown/${year}/${slug}.md`
}

export {
  getMarkdownUrl,
  isBadYear
}
