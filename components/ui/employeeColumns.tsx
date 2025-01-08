import { useState, useEffect, useMemo, useCallback } from "react";
import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "./data-table-row-actions";
import { Checkbox } from "./checkbox";
import { taskSchema } from "./schema";
import { Employee } from "@/types/employee";
import { DataTableColumnHeader } from "./data-table-column-header";
import { designations,statuses } from "./data";

interface EmployeeColumnsProps {
  onEdit: (bankAccount: any) => void;
  onDelete: (bankAccount: any) => void;
}

export const getEmployeeColumns = ({ onEdit, onDelete }: EmployeeColumnsProps): ColumnDef<any>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Emp ID" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center w-auto text-xs sm:text-sm md:text-base">
          {row.index + 1}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        const name = row.getValue("name") as string;
        const dynamicWidth = Math.min(Math.max(name.length * 8, 64), 128); // Calculate width
        return (
          <div
            className="flex items-center justify-start"
            style={{ width: `${dynamicWidth}px` }}
          >
            {name}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => {
        const email = row.getValue("email") as string;
        const dynamicWidth = Math.min(Math.max(email.length * 8, 128), 256); // Calculate width
        return (
          <div
            className="flex items-center justify-start"
            style={{ width: `${dynamicWidth}px` }}
          >
            {email}
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
      ),
      cell: ({ row }) => {
        const phone = row.getValue("phone") as string;
        const dynamicWidth = Math.min(Math.max(phone.length * 8, 96), 128); // Calculate width
        return (
          <div
            className="flex items-center justify-start"
            style={{ width: `${dynamicWidth}px` }}
          >
            {phone}
          </div>
        );
      },
    },
    {
      accessorKey: "designation",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Designation" />
      ),
      cell: ({ row }) => {
        const designation = designations.find(
          (designation) => designation.value === row.getValue("designation")
        )
  
        if (!designation) {
          return null
        }
  
        return (
          <div className="flex items-center">
            {designation.icon && (
              <designation.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span>{designation.label}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "joiningdate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Joining Date" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center w-36 text-xs sm:text-sm md:text-base">
          {row.getValue("joiningdate")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = statuses.find(
          (status) => status.value === row.getValue("status")
        )
  
        if (!status) {
          return null
        }
  
        return (
          <div className="flex w-[100px] items-center">
            {status.icon && (
              <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span>{status.label}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-center w-24">
          <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ),
    },
  ];
};
