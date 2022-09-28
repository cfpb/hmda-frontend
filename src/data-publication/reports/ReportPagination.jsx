import { useCallback, useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate'
import LoadingIcon from '../../common/LoadingIcon'
import './ReportPagination.css'

export const TABLES_PER_PAGE = 1000
const PAGINATION_LOWER_LIMIT = 2000

// Using react-paginate to improve performance for large reports
// https://www.npmjs.com/package/react-paginate
export const ReportPagination = ({
  currentPage,
  isBottom,      // Provide extra space above Pagination?
  isPageLoading, // Display loading indicator?
  isVisible,     // Display Pagination?
  onPageChange,
  pageCount=0,
}) => {
  if (!isVisible) return null

  let cname = 'ReportPagination'
  if (isBottom) cname += ' bottom'

  return (
    <div className={cname}>
      <ReactPaginate
        className='react-paginate'
        activeClassName='react-paginate-active'
        nextLabel='>>'
        previousLabel='<<'
        onPageChange={onPageChange}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        forcePage={currentPage}
      />
      {isPageLoading && <LoadingIcon />}
    </div>
  )
}


export const usePagination = ({ data, renderFn, itemsPerPage = TABLES_PER_PAGE }) => {
  const [currentItems, setCurrentItems] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isPageLoading, setPageLoading] = useState(true)
  const timeout = useRef(null)

  const pageCount = Math.ceil(data.length / itemsPerPage)
  const isVisible =
    data &&
    data.length &&
    data.length >= PAGINATION_LOWER_LIMIT &&
    pageCount > 1

  // Initial page items
  useEffect(() => {
    if (!data) return null
    setCurrentItems(renderFn(data.slice(0, itemsPerPage)))
    setPageLoading(false)
  }, [data])

  // Event handler that will display a loading icon near the PaginationController
  // while the new page items are being rendered.
  const handlePageChange = useCallback(
    event => {
      const newOffset = (event.selected * itemsPerPage) % data.length
      setCurrentPage(parseInt(event.selected))
      setPageLoading(true)

      // Defer rendering of data tables to allow us to display the loading indicator
      if (timeout.current) clearInterval(timeout.current)
      timeout.current = setTimeout(() => {
        setCurrentItems(
          renderFn(data?.slice(newOffset, newOffset + itemsPerPage))
        )
        setPageLoading(false)
      }, 0)
    },
    [
      data,
      setCurrentPage,
      setPageLoading,
      setCurrentItems,
      renderFn,
      itemsPerPage,
    ]
  )

  return {
    currentItems,
    currentPage,
    handlePageChange,
    isVisible,
    pageCount,
    isPageLoading,
  }
}