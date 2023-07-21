"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Agent } from "@/data/schema"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { DataTableMinimalRowActions } from "./data-table-minimal-row-actions"

export const minimalColumns: ColumnDef<Agent>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      )
    },
  },  
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <>
          <DataTableMinimalRowActions row={row} />
        </>
      )
    },
  },
]