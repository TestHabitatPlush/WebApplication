import React, { useMemo, useEffect } from "react";
import { useTable } from "react-table";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ReusableTable = ({
  columns = [],
  data = [],
  fullData = [],
  pageIndex,
  pageSize,
  totalCount, // kept for compatibility
  totalPages, // kept for compatibility
  setPageIndex,
  setPageSize,
  onSearchChange,
  searchValue = "",
  fileName = "table-data",
  onVisibleCountChange,
}) => {
  const safeData = Array.isArray(data) ? data : [];
  const safeFullData = Array.isArray(fullData) ? fullData : [];

  /*
    We decide which base data to use.
    If fullData is supplied -> it is the real source.
    Otherwise fallback to data.
  */
  const baseData = safeFullData.length ? safeFullData : safeData;

  /* ---------------- internal search (fallback) ---------------- */
  const displayData = useMemo(() => {
    if (!searchValue) return baseData;

    const q = searchValue.toLowerCase();

    return baseData.filter((row) =>
      columns
        .filter((c) => c.accessor)
        .some((c) =>
          String(row?.[c.accessor] ?? "")
            .toLowerCase()
            .includes(q)
        )
    );
  }, [baseData, searchValue, columns]);

  /* ✅ notify parent about visible (filtered) count */
  useEffect(() => {
    if (typeof onVisibleCountChange === "function") {
      onVisibleCountChange(displayData.length);
    }
  }, [displayData.length, onVisibleCountChange]);

  /* ---------------- pagination ---------------- */

  const computedTotalPages =
    Math.ceil(displayData.length / pageSize) || 1;

  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return displayData.slice(start, end);
  }, [displayData, pageIndex, pageSize]);

  const dataWithSlNo = useMemo(() => {
    return paginatedData.map((row, i) => ({
      ...row,
      slNo: pageIndex * pageSize + i + 1,
    }));
  }, [paginatedData, pageIndex, pageSize]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: dataWithSlNo,
  });

  /* ---------------- Copy / PDF / Print ---------------- */

  const handleCopy = () => {
    if (!Array.isArray(displayData) || !columns.length) return;

    const headers = columns
      .filter((c) => c.accessor)
      .map((c) => c.Header);

    const body = displayData.map((row, index) =>
      columns
        .filter((c) => c.accessor)
        .map((c) => {
          if (c.accessor === "slNo") return index + 1;
          return row?.[c.accessor] ?? "";
        })
        .join("\t")
    );

    const text = [headers.join("\t"), ...body].join("\n");
    navigator.clipboard.writeText(text);
  };

  const handlePdf = () => {
    if (!Array.isArray(displayData) || !columns.length) return;

    const doc = new jsPDF();

    const headers = columns
      .filter((c) => c.accessor)
      .map((c) => c.Header);

    const body = displayData.map((row, index) =>
      columns
        .filter((c) => c.accessor)
        .map((c) => {
          if (c.accessor === "slNo") return index + 1;
          return row?.[c.accessor] ?? "";
        })
    );

    autoTable(doc, {
      head: [headers],
      body,
    });

    doc.save(`${fileName}.pdf`);
  };

  const handlePrint = () => {
    if (!Array.isArray(displayData) || !columns.length) return;

    const headers = columns
      .filter((c) => c.accessor)
      .map((c) => `<th>${c.Header}</th>`)
      .join("");

    const rowsHtml = displayData
      .map(
        (row, index) =>
          `<tr>
            ${columns
              .filter((c) => c.accessor)
              .map((c) => {
                if (c.accessor === "slNo")
                  return `<td>${index + 1}</td>`;
                return `<td>${row?.[c.accessor] ?? ""}</td>`;
              })
              .join("")}
          </tr>`
      )
      .join("");

    const html = `
      <html>
        <head><title>${fileName}</title></head>
        <body>
          <table border="1" style="border-collapse:collapse;width:100%">
            <thead><tr>${headers}</tr></thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </body>
      </html>
    `;

    const win = window.open("", "", "height=700,width=900");
    win.document.write(html);
    win.document.close();
    win.print();
  };

  /* ---------------- pagination controls ---------------- */

  const onNextPage = () => {
    if (pageIndex + 1 < computedTotalPages) {
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
      <div className="flex items-center justify-between mb-3">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => {
            onSearchChange?.(e.target.value);
            setPageIndex(0);
          }}
          className="px-3 py-2 border rounded w-72"
        />

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1 text-white bg-gray-600 rounded"
          >
            Copy
          </button>
          <button
            onClick={handlePrint}
            className="px-3 py-1 text-white bg-blue-600 rounded"
          >
            Print
          </button>
          <button
            onClick={handlePdf}
            className="px-3 py-1 text-white bg-red-600 rounded"
          >
            PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full border border-collapse border-gray-300 table-auto"
        >
          <thead className="bg-gray-200">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-4 py-2 text-sm font-medium text-left text-gray-600 border-b border-gray-300"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 text-sm text-gray-700 border-b border-gray-300"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}

            {!rows.length && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div>
          <button
            onClick={onPreviousPage}
            disabled={pageIndex === 0}
            className="px-3 py-1 mr-2 text-white bg-blue-500 rounded-md disabled:opacity-50"
          >
            {"<"}
          </button>

          <button
            onClick={onNextPage}
            disabled={pageIndex + 1 >= computedTotalPages}
            className="px-3 py-1 text-white bg-blue-500 rounded-md disabled:opacity-50"
          >
            {">"}
          </button>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-700">
            Page <strong>{pageIndex + 1}</strong> of {computedTotalPages}
          </span>

          <span className="ml-4 text-sm text-gray-700">
            | Go to page:
            <input
              type="number"
              min={1}
              max={computedTotalPages}
              value={pageIndex + 1}
              onChange={(e) => {
                const p = Number(e.target.value) - 1;
                if (p >= 0 && p < computedTotalPages) setPageIndex(p);
              }}
              className="w-16 ml-2 text-center border rounded-md"
            />
          </span>
        </div>

        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageIndex(0);
          }}
          className="p-1 ml-4 border rounded-md"
        >
          {[10, 20, 30, 40, 50].map((size) => (
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
  data: PropTypes.array,
  fullData: PropTypes.array,
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalCount: PropTypes.number,
  totalPages: PropTypes.number,
  setPageIndex: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func,
  searchValue: PropTypes.string,
  fileName: PropTypes.string,
  onVisibleCountChange: PropTypes.func,
};

export default ReusableTable;