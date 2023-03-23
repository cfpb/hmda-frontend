export const betaLinks = [
  { name: 'Home', href: '/' },
  { name: 'Filing', href: '/filing' }
]

export const defaultLinks = [
  { name: 'Home', href: '/' },
  { name: 'Filing', href: '/filing' },
  { name: 'Data Browser', href: '',
    submenu: [
      { name: 'Overview', href: '/data-browser/' },
      { name: 'Datasets', href: '/data-browser/data/2021' },
      { name: 'Maps', href: '/data-browser/maps/2021' },
      { name: 'Graphs', href: '/data-browser/graphs/quarterly/' },
    ]
  },
  { name: 'Data Publication', href: '', 
    submenu: [
      { name: '2021', href: '/data-publication/2021' },
      { name: '2020', href: '/data-publication/2020' },
      { name: '2019', href: '/data-publication/2019' },
      { name: '2018', href: '/data-publication/2018' },
    ]
  },
  { name: 'Tools', href: '', 
  submenu: [
    { name: 'Overview', href: '/tools/' },
    { name: 'Rate Spread', href: '/tools/rate-spread' },
    { name: 'LAR Formatting', href: '/tools/lar-formatting' },
    { name: 'File Verification', href: '/tools/file-format-verification' },
    { name: 'Check Digit', href: '/tools/check-digit' },
  ]
  },
  { name: 'Documentation', href: '', 
    submenu: [
      { name: 'FAQs', href: '/documentation/' },
      { name: 'Developer APIs', href: 'https://cfpb.github.io/hmda-platform/#hmda-api-documentation' },
      { name: 'Updates', href: '/updates-notes' },
    ]
  }
]

export const updateFilingLink = (config, links) => {
  return links.map(link => {
    if(link.name !== 'Filing') return link
    link.href = `/filing/${config.defaultDocsPeriod}/`
    return link
  })
}