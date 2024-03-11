import React from 'react'
import Heading from '../../common/Heading.jsx'
import LoadingIcon from '../../common/LoadingIcon.jsx'
import Tables from './tables/index.jsx'
import parse from 'csv-parse'
import fileSaver from 'file-saver'
import { isProd } from '../../common/configUtils'
import {
  buildCSVRowsAggregate1,
  buildCSVRowsAggregate2,
} from './tables/AggregateUtils.js'

import './Report.css'

class Report extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false,
      isLoaded: false,
      report: null,
    }

    this.selectReport = this.selectReport.bind(this)
    this.generateCSV = this.generateCSV.bind(this)
    this.tableRef = React.createRef()
    this.tableTwoRef = React.createRef()
  }

  generateCSV() {
    const report = this.state.report
    let theCSV = '"' + this.makeHeadingText(report) + '"\n'
    const msa = report.msa
      ? `"MSA/MD: ${report.msa.id} - ${report.msa.name}"\n`
      : '"Nationwide"\n'
    theCSV = theCSV + msa
    const institution = report.respondentId
      ? `"Institution: ${report.respondentId} - ${report.institutionName}"\n`
      : ''
    theCSV = theCSV + institution

    if (report.table === 'IRSCSV') {
      theCSV += `Institution: ${this.props.match.params.institutionId}\n`
      theCSV += report.csv
    } else if (
      report.table === '1' &&
      report.msa.id == '99999' &&
      report.type == 'Aggregate'
    ) {
      // Large reports that use pagination need to generate the CSV body from the raw JSON
      const tHeadRows = this.tableRef.current.tHead.rows
      theCSV += this.buildCSVRows(tHeadRows, 'head')
      theCSV += buildCSVRowsAggregate1(this.state.report)
    } else if (
      report.table === '2' &&
      report.msa.id == '99999' &&
      report.type == 'Aggregate'
    ) {
      // Large reports that use pagination need to generate the CSV body from the raw JSON
      const tHeadRows = this.tableRef.current.tHead.rows
      theCSV += this.buildCSVRows(tHeadRows, 'head')
      theCSV += buildCSVRowsAggregate2(this.state.report)
    } else {
      const tHeadRows = this.tableRef.current.tHead.rows
      theCSV = theCSV + this.buildCSVRows(tHeadRows, 'head')

      const tBodyRows = this.tableRef.current.tBodies[0].rows
      theCSV = theCSV + this.buildCSVRows(tBodyRows, 'body')

      if (this.tableTwoRef.current) {
        theCSV = theCSV + '\n\n'
        const tTwoHeadRows = this.tableTwoRef.current.tHead.rows
        theCSV = theCSV + this.buildCSVRows(tTwoHeadRows, 'head')

        const tTwoBodyRows = this.tableTwoRef.current.tBodies[0].rows
        theCSV = theCSV + this.buildCSVRows(tTwoBodyRows, 'body')
      }
    }

    fileSaver.saveAs(
      new Blob([theCSV], { type: 'text/csv;charset=utf-16' }),
      `${this.createFileName(report)}.csv`,
    )
  }

  buildCSVRows(rows, rowType) {
    let theCSVRows = ''
    Array.prototype.forEach.call(rows, (row, rowIndex) => {
      // in a thead, account for the rowSpan by adding an empty cell
      if (rowType === 'head') {
        if (rowIndex !== 0) theCSVRows = theCSVRows + ','
      }
      // loop through the cells
      Array.prototype.forEach.call(row.cells, (cell, cellIndex) => {
        // add the content
        theCSVRows = theCSVRows + '"' + cell.innerHTML + '"'
        if (cell.hasAttribute('colspan')) {
          const spanCount = parseInt(cell.getAttribute('colspan'), 10)
          let i = 0
          for (i; i < spanCount - 1; i++) {
            theCSVRows = theCSVRows + ','
          }
        }
        // last child
        if (row.cells.length - 1 === cellIndex) {
          theCSVRows = theCSVRows + '\n'
        } else {
          theCSVRows = theCSVRows + ','
        }
      })
    })

    return theCSVRows
  }

  createFileName(report) {
    let name = report.table
    if (name === 'IRSCSV') name = 'IRS'
    let filename = `report-${name}`
    if (report.respondentId) {
      filename =
        filename +
        `-${report.respondentId}-${report.institutionName
          .replace(',', '')
          .replace(' ', '')}`
    }
    if (report.msa) {
      filename =
        filename +
        `-${report.msa.id}-${report.msa.name.replace(',', '').replace(' ', '')}`
    }

    return filename
  }

  componentDidMount() {
    const { params } = this.props.match
    let year = params.year
    let msaMdId = params.msaMdId
    let reportId = params.reportId
    let ext = year === '2017' ? '.txt' : '.json'
    const devProd = isProd(window.location.host) ? 'prod' : 'dev'

    if (reportId === 'IRS') ext = '.csv'
    let url = `https://s3.amazonaws.com/cfpb-hmda-public/${devProd}/reports/`
    if (params.stateId) {
      url += `aggregate/${year}/${msaMdId}/${reportId}${ext}`
    } else if (params.institutionId) {
      if (reportId === 'R1') {
        msaMdId = 'nationwide'
        reportId = 'IRS'
      }
      url += `disclosure/${year}/${params.institutionId}/${msaMdId}/${reportId}${ext}`
    } else {
      url += `national/${year}/${reportId}${ext}`
    }
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok.')
        if (ext === '.csv') return response.text()
        return response.json()
      })
      .then((result) => {
        if (ext === '.csv') {
          parse(result, { cast: (v) => v.trim() }, (err, output) => {
            this.setState({
              isLoaded: true,
              report: {
                table: 'IRSCSV',
                csv: result,
                parsed: output,
              },
            })
          })
        } else {
          this.setState({
            isLoaded: true,
            report: result,
          })
        }
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error: true,
        })
      })
  }

  selectReport(report, reportType) {
    /*
      reportType only needed for Table.One
      it renders extra columns for the aggregate version
    */
    /*
      tables 1, 3-2, 11's, 12-2 have 2 tables, so we're going to pass different refs
      https://reactjs.org/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components
      https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509
    */
    const table = report.table
    if (reportType === 'aggregate' && report.year !== '2017') {
      if (table.match(/^1$/))
        return <Tables.Aggregate1 ref={this.tableRef} report={report} />
      if (table.match(/^2$/))
        return <Tables.Aggregate2 ref={this.tableRef} report={report} />
      if (table.match(/^3$/))
        return <Tables.Aggregate3 ref={this.tableRef} report={report} />
      if (table.match(/^4$/))
        return <Tables.Aggregate4 ref={this.tableRef} report={report} />
      if (table.match(/^5$/))
        return <Tables.Aggregate5 ref={this.tableRef} report={report} />
      if (table.match(/^9$/))
        return <Tables.Aggregate9 ref={this.tableRef} report={report} />
      if (table.match(/^i$/i))
        return <Tables.AggregateI ref={this.tableRef} report={report} />
    }
    if (table.match(/^IRSCSV$/))
      return <Tables.IRSCSV ref={this.tableRef} report={report} />
    if (table.match(/^i$/))
      return <Tables.I ref={this.tableRef} report={report} />
    if (table.match(/^1$/))
      return (
        <Tables.One
          ref={this.tableRef}
          reportType={reportType}
          report={report}
        />
      )
    if (table.match(/^2$/))
      return <Tables.Two ref={this.tableRef} report={report} />
    if (table.match(/^3-1$/))
      return <Tables.ThreeOne ref={this.tableRef} report={report} />
    if (table.match(/^3-2$/))
      return (
        <Tables.ThreeTwo
          tableOneRef={this.tableRef}
          tableTwoRef={this.tableTwoRef}
          report={report}
        />
      )
    if (table.match(/^4-/))
      return <Tables.Four ref={this.tableRef} report={report} />
    if (table.match(/^5-/))
      return <Tables.Five ref={this.tableRef} report={report} />
    if (table.match(/^7-/))
      return <Tables.Seven ref={this.tableRef} report={report} />
    if (table.match(/^8-/))
      return <Tables.Eight ref={this.tableRef} report={report} />
    if (table.match(/^9$/))
      return <Tables.Nine ref={this.tableRef} report={report} />
    if (table.match(/^11-/))
      return (
        <Tables.Eleven
          tableOneRef={this.tableRef}
          tableTwoRef={this.tableTwoRef}
          report={report}
        />
      )
    if (table.match(/^12-1$/))
      return <Tables.TwelveOne ref={this.tableRef} report={report} />
    if (table.match(/^12-2$/))
      return (
        <Tables.TwelveTwo
          tableOneRef={this.tableRef}
          tableTwoRef={this.tableTwoRef}
          report={report}
        />
      )

    if (table.match(/^A4/))
      return <Tables.A4 ref={this.tableRef} report={report} />
    if (table.match(/^A/))
      return <Tables.A ref={this.tableRef} report={report} />
    if (table.match(/^B/))
      return <Tables.B ref={this.tableRef} report={report} />
    if (table.match(/^IRS/))
      return <Tables.R ref={this.tableRef} report={report} />
  }

  makeHeadingText(report) {
    if (!report) return null
    const suppressTable = report.year !== '2017'
    const irsCsvYear = this.props.match.params.year
    let table = report.table
    if (table === 'IRSCSV')
      return `Home Mortgage Disclosure Act Institution Register Summary for ${irsCsvYear}`
    if (table === 'IRS') table = 'R1'
    let tableText = suppressTable ? '' : `Table ${table}: `
    return `${tableText}${report.description}${
      table === 'R1' ? '' : `, ${report.year}`
    }`
  }

  render() {
    if (!this.state.isLoaded) return <LoadingIcon />

    if (this.state.error)
      return (
        <div className='Report'>
          <div className='alert alert-error'>
            <div className='alert-body'>
              <h3 className='alert-heading'>No report exists</h3>
              <p className='alert-text'>
                No data that meets the criteria of this table was reported by
                the institution.
              </p>
            </div>
          </div>
        </div>
      )

    let reportType = 'disclosure'
    if (this.props.match.params.stateId) reportType = 'aggregate'

    const report = this.state.report
    const headingText = this.makeHeadingText(report)

    return (
      <div className='Report'>
        <Heading type={3} headingText={headingText}>
          {report.table === 'IRSCSV' ? (
            <p>Institution: {this.props.match.params.institutionId}</p>
          ) : null}
          {report.respondentId ? (
            <p>
              Institution: {report.respondentId} - {report.institutionName}
            </p>
          ) : null}

          {report.msa ? (
            <p>
              MSA/MD: {report.msa.id} - {report.msa.name}
            </p>
          ) : (
            <p>Nationwide</p>
          )}
          <button onClick={this.generateCSV}>Save as CSV</button>
        </Heading>

        {this.selectReport(report, reportType)}
        {report.reportDate ? (
          <p className='report-date'>Report date: {report.reportDate}</p>
        ) : null}
      </div>
    )
  }
}

export default Report
