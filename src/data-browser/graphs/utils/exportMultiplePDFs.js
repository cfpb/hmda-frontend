import jsPDF from 'jspdf'
import * as htmlToImage from 'html-to-image'

/**
 *  function which provides the ability to save charts to a pdf
 *
 *  @see jsPDF https://www.npmjs.com/package/jspdf
 *  @see html-to-image https://www.npmjs.com/package/html-to-image
 *  @see article https://ramonak.io/posts/highcharts-react-pdf
 *
 *  <Highcharts /> component needs to be wrapped with a div with it's className as "export-charts" to correctly download charts to a pdf
 *
 */

export async function exportMultipleChartsToPdf() {
  const doc = new jsPDF('p', 'pt', 'letter')

  const elements = document.getElementsByClassName('export-charts')

  await createPdf({ doc, elements })

  doc.save(`charts.pdf`)
}

async function createPdf({ doc, elements }) {
  const padding = 10
  const marginTop = 20
  let top = marginTop

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i]
    // Converts HTML Element to a PNG
    const imgData = await htmlToImage.toPng(el)

    let elHeight = el.offsetHeight
    let elWidth = el.offsetWidth

    const pdfWidth = doc.internal.pageSize.getWidth()

    // Resizes image width if it exceeds pdf width
    if (elWidth > pdfWidth) {
      const ratio = pdfWidth / elWidth
      elHeight = elHeight * ratio - padding * 2
      elWidth = elWidth * ratio - padding * 2
    }

    const pdfHeight = doc.internal.pageSize.getHeight()

    // Generates new pdf page if image height is larger then pdf height
    if (top + elHeight > pdfHeight) {
      doc.addPage()
      top = marginTop
    }

    doc.addImage(imgData, 'PNG', padding, top, elWidth, elHeight, `image${i}`)
    top += elHeight + marginTop
  }
}
