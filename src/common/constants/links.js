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
      { name: 'Datasets', href: '/data-browser/data/' },
      { name: 'Maps', href: '/data-browser/maps/' },
      { name: 'Graphs', href: '/data-browser/graphs/quarterly/' },
    ]
  },
  { name: 'Data Publication', href: '', 
    submenu: [
      { name: 'Overview', href: '/data-publication/' },
      { name: 'Dynamic Datasets' },
      { name: 'Modified LAR', href: '/data-publication/modified-lar/' },
      { name: 'Dynamic Dataset', href: '/data-publication/dynamic-national-loan-level-dataset/' },
      { name: 'Static Datasets' },
      { name: 'Snapshot Datasets', href: '/data-publication/snapshot-national-loan-level-dataset/' },
      { name: 'One-Year Datasets', href: '/data-publication/one-year-national-loan-level-dataset/' },
      { name: 'Three-Year Datasets', href: '/data-publication/three-year-national-loan-level-dataset/' },
      { name: 'MSA/MD Datasets', href: '/data-publication/aggregate-reports/' },
      { name: 'Disclosure Reports', href: '/data-publication/disclosure-reports/' },
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
      { name: 'Developer APIs', href: '/documentation/category/developer-apis' },
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