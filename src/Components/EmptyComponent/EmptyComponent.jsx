import React, { useState } from "react";
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

  const columns = [
    {
      id: "select",
      header: () => <input type="checkbox" disabled />, // master checkbox logic can be added
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
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Segoe UI, sans-serif" }}>
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

      <div style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
        Selected Rows: <strong>{Object.keys(rowSelection).length}</strong>
      </div>
    </div>
  );
}

export default EmptyComponent;
