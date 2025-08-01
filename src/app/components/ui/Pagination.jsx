"use client";

import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Pagination({
  totalItems,
  itemsPerPage = 6,
  currentPage = 1,
  onPageChange,
  maxPageNumbers = 5,
  className = "",
  showItemCount = true,
  showItemsPerPageSelect = false,
  onItemsPerPageChange = null,
  itemsPerPageOptions = [6, 12, 24, 48],
}) {
  const [pageNumbers, setPageNumbers] = useState([]);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate visible page numbers
  useEffect(() => {
    let pages = [];

    if (totalPages <= maxPageNumbers) {
      // Show all pages if total pages is less than max page numbers
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Calculate range of pages to show
      let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
      let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

      // Adjust if we're near the end
      if (endPage - startPage + 1 < maxPageNumbers) {
        startPage = Math.max(1, endPage - maxPageNumbers + 1);
      }

      // Generate page numbers
      pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );

      // Add first page and ellipsis if needed
      if (startPage > 1) {
        pages = [1, startPage > 2 ? "..." : 2, ...pages.slice(1)];
      }

      // Add last page and ellipsis if needed
      if (endPage < totalPages) {
        pages = [
          ...pages,
          endPage < totalPages - 1 ? "..." : totalPages - 1,
          totalPages,
        ].filter((value, index, self) => self.indexOf(value) === index);
      }
    }

    setPageNumbers(pages);
  }, [currentPage, totalPages, maxPageNumbers]);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    if (onItemsPerPageChange) {
      const newItemsPerPage = parseInt(e.target.value);
      onItemsPerPageChange(newItemsPerPage);

      // Adjust current page to maintain approximate position in results
      const firstItemIndex = (currentPage - 1) * itemsPerPage;
      const newPage = Math.floor(firstItemIndex / newItemsPerPage) + 1;
      onPageChange(newPage);
    }
  };

  // Calculate item range being displayed
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

  if (totalPages <= 1 && !showItemsPerPageSelect) return null;

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
    >
      {/* Left side: Item count and items per page selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Item count display */}
        {showItemCount && totalItems > 0 && (
          <div className="text-brand text-sm">
            Showing {startItem}-{endItem} of {totalItems} items
          </div>
        )}

        {/* Items per page selector */}
        {showItemsPerPageSelect && onItemsPerPageChange && (
          <div className="flex items-center gap-1">
            <label
              htmlFor="itemsPerPage"
              className="text-brand text-sm whitespace-nowrap"
            >
              Items per page:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="text-white rounded-tl-xl rounded-br-xl px-2 py-1 text-sm border bg-[#876F4E] focus:outline-none focus:ring-2 focus:ring-[#876F4E]"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right side: Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          {/* Previous button */}
          <motion.button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-tl-xl rounded-br-xl flex items-center justify-center border border-[#876F4E] text-brand hover:bg-[#876F4E] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-brand"
            aria-label="Previous page"
            whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
            whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
          >
            <FaChevronLeft size={16} />
          </motion.button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {pageNumbers.map((page, index) =>
              typeof page === "number" ? (
                <motion.button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  className={`min-w-[40px] h-10 rounded-tl-xl rounded-br-xl flex items-center justify-center transition-colors ${
                    currentPage === page
                      ? "bg-[#876F4E] text-white"
                      : "border border-[#876F4E] text-brand hover:bg-[#876F4E] hover:text-white"
                  }`}
                  whileHover={currentPage !== page ? { scale: 1.05 } : {}}
                  whileTap={currentPage !== page ? { scale: 0.95 } : {}}
                >
                  {page}
                </motion.button>
              ) : (
                <span key={index} className="px-1 text-earth-600">
                  {page}
                </span>
              )
            )}
          </div>

          {/* Next button */}
          <motion.button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-tl-xl rounded-br-xl flex items-center justify-center border border-[#876F4E] text-brand hover:bg-[#876F4E] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-brand"
            aria-label="Next page"
            whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
            whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
          >
            <FaChevronRight size={16} />
          </motion.button>
        </div>
      )}
    </div>
  );
}
