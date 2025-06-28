// import React, { useEffect } from 'react';
// import { useTable, usePagination } from 'react-table';
// import PropTypes from 'prop-types';

// const ReusableTable = ({
//   columns,
//   data,
//   pageIndex,
//   pageSize,
//   totalCount,
//   totalPages,
//   setPageIndex,
//   setPageSize
// }) => {
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page, // Instead of rows, we'll use page
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize: internalSetPageSize,
//     state: { pageIndex: internalPageIndex, pageSize: internalPageSize }
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex },
//       manualPagination: true, // Use manual pagination
//       pageCount: totalPages,
//     },
//     usePagination
//   );

//   useEffect(() => {
//     gotoPage(pageIndex);
//   }, [pageIndex, gotoPage]);

//   useEffect(() => {
//     internalSetPageSize(pageSize);
//   }, [pageSize, internalSetPageSize]);

//   const onNextPage = () => {
//     setPageIndex(parseInt(pageIndex)+1)
//   };

//   const onPreviousPage = () => {
//     setPageIndex(parseInt(pageIndex)-1)
//   };

//   return (
//     <div>
//       <table {...getTableProps()} className="min-w-full border border-collapse border-gray-300 table-auto">
//         <thead className="bg-gray-200">
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <th
//                   {...column.getHeaderProps()}
//                   className="px-4 py-2 text-sm font-medium text-left text-gray-600 border-b border-gray-300"
//                 >
//                   {column.render('Header')}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
//           {page.map(row => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => (
//                   <td
//                     {...cell.getCellProps()}
//                     className="px-4 py-2 text-sm text-gray-700 border-b border-gray-300"
//                   >
//                     {cell.render('Cell')}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="flex items-center justify-between mt-4">
//         <div>
//           <button
//             onClick={onPreviousPage}
//             disabled={!canPreviousPage}
//             className="px-3 py-1 mr-2 text-white bg-blue-500 rounded-md disabled:opacity-50"
//           >
//             {'<'}
//           </button>
//           <button
//             onClick={onNextPage}
//             disabled={!canNextPage}
//             className="px-3 py-1 mr-2 text-white bg-blue-500 rounded-md disabled:opacity-50"
//           >
//             {'>'}
//           </button>
//         </div>

//         <div className="flex items-center">
//           <span className="text-sm text-gray-700">
//             Page <strong>{pageIndex + 1} of {totalPages}</strong>
//           </span>
//           <span className="ml-4 text-sm text-gray-700">
//             | Go to page: 
//             <input
//               type="number"
//               value={pageIndex + 1}
//               onChange={e => {
//                 const page = e.target.value ? Number(e.target.value) - 1 : 0;
//                 setPageIndex(page);
//                 gotoPage(page);
//               }}
//               className="w-16 ml-2 text-center border rounded-md"
//             />
//           </span>
//         </div>

//         <select
//           value={internalPageSize}
//           onChange={e => {
//             const newSize = Number(e.target.value);
//             setPageSize(newSize);
//             internalSetPageSize(newSize);
//           }}
//           className="p-1 ml-4 border rounded-md"
//         >
//           {[10, 20, 30, 40, 50].map(size => (
//             <option key={size} value={size}>
//               Show {size}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// ReusableTable.propTypes = {
//   columns: PropTypes.array.isRequired,
//   data: PropTypes.array.isRequired,
//   pageIndex: PropTypes.number.isRequired,
//   pageSize: PropTypes.number.isRequired,
//   totalCount: PropTypes.number.isRequired,
//   totalPages: PropTypes.number.isRequired,
//   setPageIndex: PropTypes.func.isRequired,
//   setPageSize: PropTypes.func.isRequired,
// };

// export default ReusableTable;



import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ReusableTable = ({
  columns,
  data,
  pageIndex,
  pageSize,
  totalCount,
  totalPages,
  setPageIndex,
  setPageSize
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data based on search query
  const filteredData = data.filter(row => {
    return columns.some(column => {
      const cellValue = row[column.accessor];
      return cellValue && cellValue.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize: internalSetPageSize,
    state: { pageIndex: internalPageIndex, pageSize: internalPageSize }
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex },
      manualPagination: true,
      pageCount: totalPages,
    },
    usePagination
  );

  useEffect(() => {
    gotoPage(pageIndex);
  }, [pageIndex, gotoPage]);

  useEffect(() => {
    internalSetPageSize(pageSize);
  }, [pageSize, internalSetPageSize]);

  const onNextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  const onPreviousPage = () => {
    setPageIndex(pageIndex - 1);
  };

  const handleExcelExport = () => {
    const ws = utils.json_to_sheet(filteredData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    writeFile(wb, 'table_data.xlsx');
  };

  const handlePDFExport = () => {
    const input = document.getElementById('table-container');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('table_data.pdf');
    });
  };

  const handlePrint = () => {
    const printContents = document.getElementById('table-container').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Table</title></head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const handleCopy = async () => {
    const copyText = filteredData.map(row =>
      columns.map(col => row[col.accessor]).join('\t')
    ).join('\n');
    await navigator.clipboard.writeText(copyText);
    alert('Table copied to clipboard!');
  };

  return (
    <div>
      {/* Search and Export Buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button onClick={handleCopy} className="px-3 py-1 text-white bg-gray-700 rounded">Copy</button>
          <CSVLink data={filteredData} filename="table_data.csv" className="px-3 py-1 text-white bg-green-600 rounded">CSV</CSVLink>
          <button onClick={handleExcelExport} className="px-3 py-1 text-white bg-blue-600 rounded">Excel</button>
          <button onClick={handlePDFExport} className="px-3 py-1 text-white bg-red-600 rounded">PDF</button>
          <button onClick={handlePrint} className="px-3 py-1 text-white bg-purple-600 rounded">Print</button>
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="p-2 border rounded-md"
        />
      </div>

      {/* Table */}
      <div id="table-container">
        <table {...getTableProps()} className="min-w-full border border-collapse border-gray-300 table-auto">
          <thead className="bg-gray-200">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-4 py-2 text-sm font-medium text-left text-gray-600 border-b border-gray-300"
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
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 text-sm text-gray-700 border-b border-gray-300"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div>
          <button
            onClick={onPreviousPage}
            disabled={!canPreviousPage}
            className="px-3 py-1 mr-2 text-white bg-blue-500 rounded-md disabled:opacity-50"
          >
            {'<'}
          </button>
          <button
            onClick={onNextPage}
            disabled={!canNextPage}
            className="px-3 py-1 mr-2 text-white bg-blue-500 rounded-md disabled:opacity-50"
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
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                setPageIndex(page);
                gotoPage(page);
              }}
              className="w-16 ml-2 text-center border rounded-md"
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
          className="p-1 ml-4 border rounded-md"
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
  totalCount: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPageIndex: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
};

export default ReusableTable;

