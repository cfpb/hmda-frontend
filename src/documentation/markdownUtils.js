const slugs = ['2017', '2018', '2019', '2020']

function isBadYear(year){
  return slugs.indexOf(year) === -1
}

function getMarkdownUrl(year, slug) {
  return `https://raw.githubusercontent.com/cfpb/hmda-frontend/master/src/documentation/markdown/${year}/${slug}.md`
}

export {
  getMarkdownUrl,
  isBadYear
}
