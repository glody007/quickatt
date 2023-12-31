"use client"

import { ColumnDef } from "@tanstack/react-table"
import { motifs } from "@/data/data"
import { Visit } from "@/data/schema"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { format, formatDistance } from "date-fns"
import { formatAccessTime } from "@/lib/utils"

export const columns: ColumnDef<Visit>[] = [
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
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {format(row.getValue("entryTime"), "dd-mm-yyyy")}
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
            {formatAccessTime(row.getValue("entryTime"))}
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
            {formatAccessTime(row.getValue("exitTime"))}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "motif",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Motif" />
    ),
    cell: ({ row }) => {
      const motif = motifs.find(
        (motif) => motif.value === row.getValue("motif")
      )

      if (!motif) {
        return null
      }

      return (
        <div className="flex max-w-[200px] items-center">
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