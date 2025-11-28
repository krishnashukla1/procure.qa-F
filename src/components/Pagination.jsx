const Pagination = ({ page, limit, total, onPageChange }) => {
  const calculatedTotalPages = Math.ceil(total / limit)
  const shouldShow = calculatedTotalPages > 1 || page > 1
  if (!shouldShow) return null

  const totalPages = calculatedTotalPages
  const maxVisible = 5 // Show up to 5 pages; adjust as needed
  const startPage = Math.max(1, page - Math.floor(maxVisible / 2))
  const endPage = Math.min(totalPages, startPage + maxVisible - 1)
  const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  const isFirstPage = page === 1
  const isLastPage = page >= totalPages

  return (
    <div className="flex justify-center items-center mt-6 space-x-2 flex-wrap">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={isFirstPage}
        className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer
          ${isFirstPage
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed shadow-none'
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-transparent hover:from-blue-600 hover:to-indigo-700'
          }`}
      >
        <span className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Prev</span>
        </span>
      </button>

      {/* Page Numbers */}
      {startPage > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className="px-3 py-2 rounded-xl font-medium text-sm bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300 hover:from-gray-200 hover:to-gray-300 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
        >
          1
        </button>
      )}
      {startPage > 2 && <span className="px-2 py-2 text-sm text-gray-500">...</span>}

      {visiblePages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ease-in-out shadow-sm hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer border
            ${page === num
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-transparent shadow-lg'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
        >
          {num}
        </button>
      ))}

      {endPage < totalPages - 1 && <span className="px-2 py-2 text-sm text-gray-500">...</span>}
      {endPage < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-2 rounded-xl font-medium text-sm bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300 hover:from-gray-200 hover:to-gray-300 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
        >
          {totalPages}
        </button>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={isLastPage}
        className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer
          ${isLastPage
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed shadow-none'
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-transparent hover:from-blue-600 hover:to-indigo-700'
          }`}
      >
        <span className="flex items-center space-x-1">
          <span>Next</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </button>
    </div>
  )
}

export default Pagination