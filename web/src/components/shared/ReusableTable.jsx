import React, { useEffect } from 'react';
import { useTable, usePagination } from 'react-table';
import PropTypes from 'prop-types';

const ReusableTable = ({
  columns,
  data,
  pageIndex,
  pageSize,
  totalPages,
  setPageIndex,
  setPageSize
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    gotoPage,
    setPageSize: internalSetPageSize,
    state: { pageIndex: internalPageIndex, pageSize: internalPageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex },
      manualPagination: true,
      pageCount: totalPages,
    },
    usePagination
  );

  // Prevent infinite loop
  useEffect(() => {
    if (internalPageIndex !== pageIndex) {
      gotoPage(pageIndex);
    }
  }, [pageIndex, gotoPage, internalPageIndex]);

  useEffect(() => {
    internalSetPageSize(pageSize);
  }, [pageSize, internalSetPageSize]);

  const onNextPage = () => {
    if (pageIndex < totalPages - 1) {
      setPageIndex(pageIndex + 1);
    }
  };

  const onPreviousPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  return (
    <div>
      <table {...getTableProps()} className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  key={column.id}
                  className="px-4 py-2 border-b border-gray-300 text-left text-sm font-medium text-gray-600"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className="px-4 py-2 border-b border-gray-300 text-sm text-gray-700"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <button
            onClick={onPreviousPage}
            disabled={!canPreviousPage}
            className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2 disabled:opacity-50"
          >
            {'<'}
          </button>
          <button
            onClick={onNextPage}
            disabled={!canNextPage}
            className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2 disabled:opacity-50"
          >
            {'>'}
          </button>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-700">
            Page <strong>{pageIndex + 1} of {totalPages}</strong>
          </span>
          <span className="ml-4 text-sm text-gray-700">
            | Go to page: 
            <input
              type="number"
              value={pageIndex + 1}
              onChange={e => {
                let page = Number(e.target.value) - 1;
                if (page < 0 || page >= totalPages) return;
                setPageIndex(page);
                gotoPage(page);
              }}
              className="ml-2 border rounded-md w-16 text-center"
            />
          </span>
        </div>

        <select
          value={internalPageSize}
          onChange={e => {
            const newSize = Number(e.target.value);
            setPageSize(newSize);
            internalSetPageSize(newSize);
          }}
          className="ml-4 border rounded-md p-1"
        >
          {[10, 20, 30, 40, 50].map(size => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPageIndex: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
};

export default ReusableTable;

