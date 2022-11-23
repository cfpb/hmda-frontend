import lunr from 'lunr'

const docSlugs = [
  'ad-changes',
  'annual-filing-dates',
  'arid2017-to-lei-schema',
  'data-browser-faq',
  'data-browser-filters',
  'data-browser-graphs-faq',
  'data-browser-maps-faq',
  'data-collection-timelines',
  'derived-data-fields',
  'file-format-verification',
  'filing-faq',
  'identifiers-faq',
  'lar-data-fields',
  'lar-formatting',
  'modified-lar-header',
  'modified-lar-schema',
  'panel-data-fields',
  'public-lar-schema',
  'public-panel-schema',
  'public-ts-schema',
  'quarterly-filing-dates',
  'static-dataset-faq',
  'ts-data-fields',
]

let url = 'http://localhost:3000/markdown'

let data = []
let LUNR_INDEX

export default Promise.all(
  docSlugs.map(slug =>
    fetch(url + `/2022/${slug}.md`)
      .then(res => res.text())
      .then(markdown => {
        let title
        let LUNR_ENTRY = {}

        if (markdown.includes('#')) {
          // Parse H1 from Markdown
          title = markdown
            .match(/#{1}.+(?=\n)/g)[0]
            .replace('#', '')
            .trim()

          // Save entry
          LUNR_ENTRY = {
            title: title,
            slug: slug,
            content: markdown,
          }

          data.push(LUNR_ENTRY)
        } else {
          LUNR_ENTRY = {
            title: slug,
            slug: slug,
            content: markdown,
          }

          data.push(LUNR_ENTRY)
        }
      })
  )
).then(_ => {
  // Build Lunr index
  LUNR_INDEX = lunr(function () {
    this.ref('title')
    this.field('content')
    this.metadataWhitelist = ['position']

    data.forEach(function (doc) {
      this.add(doc)
    }, this)
  })

  return LUNR_INDEX
})
