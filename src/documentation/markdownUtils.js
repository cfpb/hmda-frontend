import { DOCS_YEARS } from '../common/constants/years'

function isBadYear(year) {
  return DOCS_YEARS.indexOf(year) === -1
}

function getMarkdownUrl(year, slug) {
  const localOrRemoteUrl =
    window.location.hostname.indexOf('localhost') > -1
      ? window.location.origin
      : 'https://raw.githubusercontent.com/cfpb/hmda-frontend/1339-olarft/src/documentation'

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
    .toLowerCase()
}

/**
 * Function used in tableOfContents component - removes last #, removes certain special characters and replaces spaces with dashes
 * @param {String} id header/sub-header from markdown files - specifically h2/h3
 * @returns string which is used for HTML ID mapping
 */
const removeHashAndReplace = id => {
  let parsedString = id
    .replace(/[#\/'’">(),.?&]/g, '')
    .trim()
    .replace(/[\s]/g, '-')
    .toLowerCase()
  return parsedString
}

/**
 * Function used to parse array of H2s from markdown and remove the two hashes
 * @param {Array} ArrayOfHeaders
 * @returns
 */
const removeTwoHashes = ArrayOfHeaders => {
  return ArrayOfHeaders.filter(x => x.match(/^#{2,3}\s/)).map(h =>
    h.includes('##') ? h.replace('##', '').trim() : ''
  )
}

/**
 * Function used to update developer headers and make them readable for table of content sidebar
 *
 * Developer header example: [derived\_msa-md] (#derived_msa-md)
 *
 * Output from example: derived_msa-md
 * @param {String} devHeader captures the developer header
 * @param {String} orginalHeading used to create the correct depth
 * @returns {Object} {title: String, id: String, depth: Number}
 */
const parseDeveloperHeader = (devHeader, orginalHeading) => {
  const title = devHeader.includes('\\')
    ? devHeader.replace(/\\/g, '') // removes backslash
    : devHeader

  const id = slugify(title)

  const depth = !orginalHeading.includes('#') ? 1 : 2

  return { title, id, depth }
}

/**
 * Function used to update headers by keeping original header or removing one #
 * @param {String} heading h2 or h3 from markdown
 * @returns {Object} {title: String, id: String, depth: Number}
 */
const parseStandardHeader = heading => {
  let title = heading.replace('#', '').trim()

  let depth = !heading.includes('#') ? 1 : 2

  let id = removeHashAndReplace(heading)

  return { title, id, depth }
}

// Directly updates DOM elements href
const updateSelfLinks = a => {
  // Generate self-link
  a.href = a.href.replace('self', '#' + slugify(a.innerText))

  // Clean up the parent ID of the <h3> so TOC linking works
  const parentId = a.parentElement.id
  a.parentElement.id = parentId.replace('self', '')
}

export {
  getMarkdownUrl,
  isBadYear,
  slugify,
  removeHashAndReplace,
  removeTwoHashes,
  parseDeveloperHeader,
  parseStandardHeader,
  updateSelfLinks,
}
