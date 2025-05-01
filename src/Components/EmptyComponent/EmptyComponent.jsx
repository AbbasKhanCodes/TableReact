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

function EmptyComponent() {
  const [data, setData] = useState(() => [...defaultData]);
  const [rowSelection, setRowSelection] = useState({});

  // Get the selected row IDs
  const selectedRowIds = useMemo(() => {
    const ids = Object.keys(rowSelection).map((index) => {
      // Convert the index to a number and get the corresponding row's ID
      return data[parseInt(index)].id;
    });

    // Log the selected IDs whenever they change
    if (ids.length > 0) {
      console.log("Selected IDs:", ids);
    }

    return ids;
  }, [rowSelection, data]);

  // Function to clear all selections
  const clearSelections = () => {
    setRowSelection({});
  };

  // Function to handle row selection change
  const handleRowSelectionChange = (updatedRowSelection) => {
    setRowSelection(updatedRowSelection);

    // Get the full data of selected rows
    const selectedRows = Object.keys(updatedRowSelection).map(
      (index) => data[parseInt(index)]
    );

    if (selectedRows.length > 0) {
      console.log("Selected row data:", selectedRows);
    }
  };

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

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: handleRowSelectionChange,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Segoe UI, sans-serif" }}>
      <h2 style={{ color: "#4A90E2", marginBottom: "20px" }}>
        Data Table with Row Selection
      </h2>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Select rows by checking the checkboxes. The selected row IDs will be
        displayed below the table.
      </p>
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
          {table.getRowModel().rows.map((row) => (
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
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            Selected Rows: <strong>{Object.keys(rowSelection).length}</strong>
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
            <div>Selected IDs:</div>
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
    </div>
  );
}

export default EmptyComponent;
