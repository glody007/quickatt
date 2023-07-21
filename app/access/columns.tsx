"use client"

import { ColumnDef } from "@tanstack/react-table"
import { motifs } from "@/data/data"
import { Agent } from "@/data/schema"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { format, formatDistance } from "date-fns"

export const columns: ColumnDef<Agent>[] = [
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
    accessorKey: "number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("number")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "entryTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Entry" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {format(row.getValue("entryTime"), "hh:MM")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "exitTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Exit" />
    ),
    cell: ({ row }) => {
      
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {format(row.getValue("exitTime"), "hh:MM")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const motif = motifs.find(
        (motif) => motif.value === row.getValue("motif")
      )

      if (!motif) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {motif.icon && (
            <motif.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{motif.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]