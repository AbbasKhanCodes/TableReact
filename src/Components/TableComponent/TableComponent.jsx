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
        <span style={{ color: "blue", fontWeight: "bold" }}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("age", {
      header: "Age",
      cell: (info) => <span style={{ color: "green" }}>{info.getValue()}</span>,
    }),
    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => (
        <span style={{ color: "purple" }}>{info.getValue()}</span>
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
        <span style={{ color: "blue", fontWeight: "bold" }}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();
        let color = "gray";
        if (status === "In Progress") color = "orange";
        if (status === "Completed") color = "green";
        if (status === "Planning") color = "blue";
        return <span style={{ color }}>{status}</span>;
      },
    }),
    columnHelper.accessor("deadline", {
      header: "Deadline",
      cell: (info) => (
        <span style={{ color: "purple" }}>{info.getValue()}</span>
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
    <div style={{ padding: "20px", fontFamily: "Segoe UI, sans-serif" }}>
      {/* First Table */}
      <h2 style={{ color: "#4A90E2", marginBottom: "20px" }}>
        Employee Data Table
      </h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Use the search box to filter the table. Select rows by checking the
        checkboxes. The selected row IDs will be displayed below the table.
      </p>

      {/* First Table Search Input */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={handleSearchChange}
          placeholder="Search employees..."
          style={{
            padding: "10px 12px",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            width: "100%",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            outline: "none",
            transition: "border-color 0.3s",
          }}
        />
        {globalFilter && (
          <button
            onClick={() => setGlobalFilter("")}
            style={{
              backgroundColor: "#4A90E2",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "10px 12px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* First Table Search results count */}
      {globalFilter && (
        <div style={{ marginBottom: "10px", fontSize: "14px", color: "#666" }}>
          Found {table.getRowModel().rows.length} result
          {table.getRowModel().rows.length !== 1 ? "s" : ""} for "{globalFilter}
          "
        </div>
      )}

      {/* First Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead style={{ backgroundColor: "#4A90E2", color: "white" }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
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
                style={{
                  textAlign: "center",
                  padding: "30px",
                  color: "#666",
                }}
              >
                No results found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                style={{
                  background: row.getIsSelected() ? "#e6f7ff" : "#fff",
                  borderBottom: "1px solid #f0f0f0",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9f9f9")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = row.getIsSelected()
                    ? "#e6f7ff"
                    : "#fff")
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      padding: "12px 16px",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* First Table Selection Info */}
      <div
        style={{
          marginTop: "20px",
          fontSize: "14px",
          color: "#555",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            Selected Employees:{" "}
            <strong>{Object.keys(rowSelection).length}</strong>
          </div>
          {selectedRowIds.length > 0 && (
            <button
              onClick={clearSelections}
              style={{
                backgroundColor: "#ff4d4f",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Clear Selections
            </button>
          )}
        </div>

        {selectedRowIds.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            <div>Selected Employees:</div>
            <div
              style={{
                marginTop: "5px",
                padding: "10px",
                backgroundColor: "#f5f5f5",
                borderRadius: "5px",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {Object.keys(rowSelection).map((index) => {
                const row = data[parseInt(index)];
                return (
                  <span
                    key={row.id}
                    style={{
                      backgroundColor: "#4A90E2",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "3px",
                    }}
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
      <h2 style={{ color: "#4A90E2", marginBottom: "20px" }}>
        Projects Data Table
      </h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Use the search box to filter the projects table. Select rows by checking
        the checkboxes. The selected project IDs will be displayed below the
        table.
      </p>

      {/* Second Table Search Input */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        <input
          type="text"
          value={secondGlobalFilter ?? ""}
          onChange={handleSecondSearchChange}
          placeholder="Search projects..."
          style={{
            padding: "10px 12px",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            width: "100%",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            outline: "none",
            transition: "border-color 0.3s",
          }}
        />
        {secondGlobalFilter && (
          <button
            onClick={() => setSecondGlobalFilter("")}
            style={{
              backgroundColor: "#4A90E2",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "10px 12px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Second Table Search results count */}
      {secondGlobalFilter && (
        <div style={{ marginBottom: "10px", fontSize: "14px", color: "#666" }}>
          Found {secondTable.getRowModel().rows.length} result
          {secondTable.getRowModel().rows.length !== 1 ? "s" : ""} for "
          {secondGlobalFilter}"
        </div>
      )}

      {/* Second Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead style={{ backgroundColor: "#4A90E2", color: "white" }}>
          {secondTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
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
                style={{
                  textAlign: "center",
                  padding: "30px",
                  color: "#666",
                }}
              >
                No results found
              </td>
            </tr>
          ) : (
            secondTable.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                style={{
                  background: row.getIsSelected() ? "#e6f7ff" : "#fff",
                  borderBottom: "1px solid #f0f0f0",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9f9f9")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = row.getIsSelected()
                    ? "#e6f7ff"
                    : "#fff")
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      padding: "12px 16px",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Second Table Selection Info */}
      <div style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            Selected Projects:{" "}
            <strong>{Object.keys(secondRowSelection).length}</strong>
          </div>
          {secondSelectedRowIds.length > 0 && (
            <button
              onClick={clearSecondSelections}
              style={{
                backgroundColor: "#ff4d4f",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Clear Selections
            </button>
          )}
        </div>

        {secondSelectedRowIds.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            <div>Selected Projects:</div>
            <div
              style={{
                marginTop: "5px",
                padding: "10px",
                backgroundColor: "#f5f5f5",
                borderRadius: "5px",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {Object.keys(secondRowSelection).map((index) => {
                const row = secondData[parseInt(index)];
                return (
                  <span
                    key={row.id}
                    style={{
                      backgroundColor: "#4A90E2",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "3px",
                    }}
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
