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

// Copied from markdown-to-jsx
function slugify(str) {
  return str
    .replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, 'a')
    .replace(/[çÇ]/g, 'c')
    .replace(/[ðÐ]/g, 'd')
    .replace(/[ÈÉÊËéèêë]/g, 'e')
    .replace(/[ÏïÎîÍíÌì]/g, 'i')
    .replace(/[Ññ]/g, 'n')
    .replace(/[øØœŒÕõÔôÓóÒò]/g, 'o')
    .replace(/[ÜüÛûÚúÙù]/g, 'u')
    .replace(/[ŸÿÝý]/g, 'y')
    .replace(/[^a-z0-9- ]/gi, '')
    .replace(/ /gi, '-')
    .toLowerCase();
}

// Directly updates DOM elements href
export const generateSelfLink = a => {
  // Generate self-link
  a.href = a.href.replace('self', '#' + slugify(a.innerText))

  // Clean up the parent ID of the <h3> so TOC linking works
  const parentId = a.parentElement.id
  a.parentElement.id = parentId.replace('self', '')
}

export {
  getMarkdownUrl,
  isBadYear,
  slugify
}
