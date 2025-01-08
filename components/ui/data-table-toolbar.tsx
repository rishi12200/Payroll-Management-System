"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "./button"
import { Input } from "./input"
import { DataTableViewOptions } from "./data-table-view-options"

import { designations, statuses} from "./data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="mt-5">
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter based on name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-1/3 lg:1/3"
        />
       {/* {table.getColumn("email") && (
          <DataTableFacetedFilter
            column={table.getColumn("email")}
            title="email"
            options={emails}
          />
        )}
        {table.getColumn("phone") && (
          <DataTableFacetedFilter
            column={table.getColumn("phone")}
            title="phone"
            options={phones}
          />
        )}*/}
        {table.getColumn("designation") && (
          <DataTableFacetedFilter
            column={table.getColumn("designation")}
            title="Designation"
            options={designations}
          />
        )}
      {/*  {
        table.getColumn("joiningdate") && (
          <DataTableFacetedFilter
            column={table.getColumn("joiningdate")}
            title="Joining Date"
            options={joiningdates}
          />
        )
      }*/}
      {
      table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
    </div>
  )
}