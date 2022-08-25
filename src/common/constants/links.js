export const betaLinks = [
  { name: 'Home', href: '/' },
  { name: 'Filing', href: '/filing' }
]

export const defaultLinks = [
  { name: 'Home', href: '/' },
  { name: 'Filing', href: '/filing' },
  { name: 'Data Browser', href: '/data-browser/' },
  { name: 'Data Publication', href: '/data-publication/' },
  { name: 'Tools', href: '/tools/' },
  { name: 'Documentation', href: '/documentation/' },
  { name: 'Updates', href: '/updates-notes' },
]

export const updateFilingLink = (config, links) => {
  return links.map(link => {
    if(link.name !== 'Filing') return link
    link.href = `/filing/${config.defaultDocsPeriod}/`
    return link
  })
}