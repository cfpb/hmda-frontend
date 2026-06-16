import matter from 'gray-matter'

/**
 * Converts the markdown changelog file into an array of
 * objects that mirrors the former JSON changelog file.
 * 
 * @param {String} changelog Markdown changelog
 * @returns Array
 */
export function parseChangeLog(changelog) {
  return changelog
    // The ginormous markdown file is split on "---\ndate:"
    // which is the start of each post's frontmatter
    .split(/(?=---\ndate: )/g)
    .filter((chunk) => chunk.includes('date:'))
    .map((chunk) => {
      const { data, content } = matter(chunk)
      const post = {
        date: data.date,
        type: data.type,
        product: data.product,
        description: content.trim(),
      }
      return post
    })
}
