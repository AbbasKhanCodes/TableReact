import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const defaultData = [
  { id: 1, name: "Abbas", age: 25, role: "Developer" },
  { id: 2, name: "Sara", age: 28, role: "Designer" },
  { id: 3, name: "Ali", age: 22, role: "Tester" },
];

// Second table data with 3 columns
const secondTableData = [
  {
    id: 1,
    project: "Website Redesign",
    status: "In Progress",
    deadline: "2023-12-15",
  },
  { id: 2, project: "Mobile App", status: "Completed", deadline: "2023-10-30" },
  {
    id: 3,
    project: "E-commerce Platform",
    status: "Planning",
    deadline: "2024-02-28",
  },
  {
    id: 4,
    project: "CRM Integration",
    status: "In Progress",
    deadline: "2023-11-20",
  },
];

function TableComponent() {
  // First table state
  const [data, setData] = useState(() => [...defaultData]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  // Second table state
  const [secondData, setSecondData] = useState(() => [...secondTableData]);
  const [secondRowSelection, setSecondRowSelection] = useState({});
  const [secondGlobalFilter, setSecondGlobalFilter] = useState("");

  // First table - Get the selected row IDs
  const selectedRowIds = useMemo(() => {
    const ids = Object.keys(rowSelection).map((index) => {
      // Convert the index to a number and get the corresponding row's ID
      return data[parseInt(index)].id;
    });

    return ids;
  }, [rowSelection, data]);

  // Second table - Get the selected row IDs
  const secondSelectedRowIds = useMemo(() => {
    const ids = Object.keys(secondRowSelection).map((index) => {
      // Convert the index to a number and get the corresponding row's ID
      return secondData[parseInt(index)].id;
    });

    return ids;
  }, [secondRowSelection, secondData]);

  // First table - Function to clear all selections
  const clearSelections = () => {
    setRowSelection({});
  };

  // Second table - Function to clear all selections
  const clearSecondSelections = () => {
    setSecondRowSelection({});
  };

  // First table - Function to handle row selection change
  const handleRowSelectionChange = (updatedRowSelection) => {
    setRowSelection(updatedRowSelection);
  };

  // Second table - Function to handle row selection change
  const handleSecondRowSelectionChange = (updatedRowSelection) => {
    setSecondRowSelection(updatedRowSelection);
  };

  // First table columns
  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          title="Select all rows"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <span className="text-blue-600 font-bold">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("age", {
      header: "Age",
      cell: (info) => <span className="text-green-600">{info.getValue()}</span>,
    }),
    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => (
        <span className="text-purple-600">{info.getValue()}</span>
      ),
    }),
  ];

  // Second table columns
  const secondColumns = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          title="Select all rows"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    columnHelper.accessor("project", {
      header: "Project",
      cell: (info) => (
        <span className="text-blue-600 font-bold">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();
        let statusClass = "text-gray-500";
        if (status === "In Progress") statusClass = "text-orange-500";
        if (status === "Completed") statusClass = "text-green-500";
        if (status === "Planning") statusClass = "text-blue-500";
        return <span className={statusClass}>{status}</span>;
      },
    }),
    columnHelper.accessor("deadline", {
      header: "Deadline",
      cell: (info) => (
        <span className="text-purple-600">{info.getValue()}</span>
      ),
    }),
  ];

  // First table - Handle search input change
  const handleSearchChange = (e) => {
    setGlobalFilter(e.target.value);
  };

  // Second table - Handle search input change
  const handleSecondSearchChange = (e) => {
    setSecondGlobalFilter(e.target.value);
  };

  // First table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      globalFilter,
    },
    onRowSelectionChange: handleRowSelectionChange,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Second table instance
  const secondTable = useReactTable({
    data: secondData,
    columns: secondColumns,
    state: {
      rowSelection: secondRowSelection,
      globalFilter: secondGlobalFilter,
    },
    onRowSelectionChange: handleSecondRowSelectionChange,
    onGlobalFilterChange: setSecondGlobalFilter,
    globalFilterFn: "includesString",
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-5 font-sans">
      {/* First Table */}
      <h2 className="text-blue-500 mb-5 text-xl font-semibold">
        Employee Data Table
      </h2>
      <p className="mb-5 text-gray-600">
        Use the search box to filter the table. Select rows by checking the
        checkboxes. The selected row IDs will be displayed below the table.
      </p>

      {/* First Table Search Input */}
      <div className="mb-5 flex items-center gap-2.5 max-w-md">
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={handleSearchChange}
          placeholder="Search employees..."
          className="p-2.5 text-sm border border-gray-300 rounded-md w-full shadow-sm outline-none transition-colors"
        />
        {globalFilter && (
          <button
            onClick={() => setGlobalFilter("")}
            className="bg-blue-500 text-white border-none rounded-md py-2.5 px-3 cursor-pointer text-sm font-bold shadow-sm"
          >
            Clear
          </button>
        )}
      </div>

      {/* First Table Search results count */}
      {globalFilter && (
        <div className="mb-2.5 text-sm text-gray-600">
          Found {table.getRowModel().rows.length} result
          {table.getRowModel().rows.length !== 1 ? "s" : ""} for "{globalFilter}
          "
        </div>
      )}

      {/* First Table */}
      <table className="w-full border-separate border-spacing-0 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-3 text-left text-sm font-semibold"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-8 px-4 text-gray-600"
              >
                No results found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`${
                  row.getIsSelected() ? "bg-blue-50" : "bg-white"
                } border-b border-gray-100 transition-colors hover:bg-gray-50`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3 text-sm text-gray-800">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* First Table Selection Info */}
      <div className="mt-5 text-sm text-gray-700 mb-10">
        <div className="flex items-center justify-between">
          <div>
            Selected Employees:{" "}
            <strong>{Object.keys(rowSelection).length}</strong>
          </div>
          {selectedRowIds.length > 0 && (
            <button
              onClick={clearSelections}
              className="bg-red-500 text-white border-none rounded px-2.5 py-1 cursor-pointer text-xs font-bold"
            >
              Clear Selections
            </button>
          )}
        </div>

        {selectedRowIds.length > 0 && (
          <div className="mt-2.5">
            <div>Selected Employees:</div>
            <div className="mt-1 p-2.5 bg-gray-100 rounded flex flex-wrap gap-2.5">
              {Object.keys(rowSelection).map((index) => {
                const row = data[parseInt(index)];
                return (
                  <span
                    key={row.id}
                    className="bg-blue-500 text-white px-2.5 py-1 rounded text-xs flex flex-col gap-0.5"
                  >
                    <strong>ID: {row.id}</strong>
                    <small>Name: {row.name}</small>
                    <small>Role: {row.role}</small>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Second Table */}
      <h2 className="text-blue-500 mb-5 text-xl font-semibold">
        Projects Data Table
      </h2>
      <p className="mb-5 text-gray-600">
        Use the search box to filter the projects table. Select rows by checking
        the checkboxes. The selected project IDs will be displayed below the
        table.
      </p>

      {/* Second Table Search Input */}
      <div className="mb-5 flex items-center gap-2.5 max-w-md">
        <input
          type="text"
          value={secondGlobalFilter ?? ""}
          onChange={handleSecondSearchChange}
          placeholder="Search projects..."
          className="p-2.5 text-sm border border-gray-300 rounded-md w-full shadow-sm outline-none transition-colors"
        />
        {secondGlobalFilter && (
          <button
            onClick={() => setSecondGlobalFilter("")}
            className="bg-blue-500 text-white border-none rounded-md py-2.5 px-3 cursor-pointer text-sm font-bold shadow-sm"
          >
            Clear
          </button>
        )}
      </div>

      {/* Second Table Search results count */}
      {secondGlobalFilter && (
        <div className="mb-2.5 text-sm text-gray-600">
          Found {secondTable.getRowModel().rows.length} result
          {secondTable.getRowModel().rows.length !== 1 ? "s" : ""} for "
          {secondGlobalFilter}"
        </div>
      )}

      {/* Second Table */}
      <table className="w-full border-separate border-spacing-0 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          {secondTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-3 text-left text-sm font-semibold"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {secondTable.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={secondColumns.length}
                className="text-center py-8 px-4 text-gray-600"
              >
                No results found
              </td>
            </tr>
          ) : (
            secondTable.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`${
                  row.getIsSelected() ? "bg-blue-50" : "bg-white"
                } border-b border-gray-100 transition-colors hover:bg-gray-50`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3 text-sm text-gray-800">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Second Table Selection Info */}
      <div className="mt-5 text-sm text-gray-700">
        <div className="flex items-center justify-between">
          <div>
            Selected Projects:{" "}
            <strong>{Object.keys(secondRowSelection).length}</strong>
          </div>
          {secondSelectedRowIds.length > 0 && (
            <button
              onClick={clearSecondSelections}
              className="bg-red-500 text-white border-none rounded px-2.5 py-1 cursor-pointer text-xs font-bold"
            >
              Clear Selections
            </button>
          )}
        </div>

        {secondSelectedRowIds.length > 0 && (
          <div className="mt-2.5">
            <div>Selected Projects:</div>
            <div className="mt-1 p-2.5 bg-gray-100 rounded flex flex-wrap gap-2.5">
              {Object.keys(secondRowSelection).map((index) => {
                const row = secondData[parseInt(index)];
                return (
                  <span
                    key={row.id}
                    className="bg-blue-500 text-white px-2.5 py-1 rounded text-xs flex flex-col gap-0.5"
                  >
                    <strong>ID: {row.id}</strong>
                    <small>Project: {row.project}</small>
                    <small>Status: {row.status}</small>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TableComponent;
