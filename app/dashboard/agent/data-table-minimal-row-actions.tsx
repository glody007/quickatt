"use client"

import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableMinimalRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <div className="flex items-center">
      <Button variant="ghost" className="h-8">
        <Eye className="h-4 w-4 text-green-500"/>
      </Button>
    </div>
  )
}