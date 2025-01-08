// EmployeeTable.tsx
import React, { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { getEmployeeColumns } from "@/components/ui/employeeColumns";

type EmployeeTableProps = {
  data: any[];
  onEdit: (employee: any) => void;
  onDelete: (employee: any) => void;
};

export const EmployeeTable = ({ data, onEdit, onDelete }: EmployeeTableProps) => {
  const columns = useMemo(() => getEmployeeColumns({ onEdit, onDelete }), []);

  return <DataTable columns={columns} data={data} />;
};
