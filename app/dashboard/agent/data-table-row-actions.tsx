"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { faker } from "@faker-js/faker"


import { agentSchema } from "@/data/schema"
import { Eye } from "lucide-react"
import { DataTable } from "./data-table"
import { titles } from "@/data/data"
import { minimalColumns } from "./minimal-columns"
import { DatePicker } from "@/components/ui/datePicker"
import { Separator } from "@/components/ui/separator"
import { CalendarDateRangePicker } from "@/components/ui/calendarDateRangePicker"
import UserInfo from "@/components/userInfo"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}


// Simulate a database read for entries.
export function getTasks() {
  return Array.from({ length: 100 }, () => ({
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    number: faker.string.uuid(),
    title: faker.helpers.arrayElement(titles).value,
  }))
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = agentSchema.parse(row.original)
  const agents = getTasks()
  return (
    <div className="flex items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="h-8">
            <Eye className="h-4 w-4 text-green-500"/>
          </Button>
        </SheetTrigger>
        <SheetContent className="min-w-[1100px] p-0">
          <div className="flex">
            <div className="min-w-[500px] flex flex-col space-y-4">
              <div className="px-4 pt-4"> 
                <SheetHeader>
                  <div className="flex justify-between items-end">
                    <h2 className="text-2xl text-green-500 font-bold">Furman</h2>
                    <CalendarDateRangePicker />
                  </div>
                </SheetHeader>
              </div>
              <Separator />
              <div className="px-4">
                <UserInfo />
              </div>
            </div>
            <div className="w-[600px] flex flex-col space-y-4 bg-slate-100 h-screen overflow-scroll border-l p-4">
              <SheetHeader>
                <SheetTitle>Employee worked</SheetTitle>
                <SheetDescription>
                  Select a employee for more details.
                </SheetDescription>
              </SheetHeader>
              <DataTable data={agents} columns={minimalColumns} />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}