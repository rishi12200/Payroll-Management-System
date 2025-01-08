import React, { useState, useEffect, useMemo, useCallback } from "react"
import { DataTable } from "@/components/ui/data-table"
import { Employee } from "@/types/employee"
import { getEmployeeColumns } from "./employeeColumns"
import axios from "axios"

const EmployeeTable = () => {
  const [employeeData, setEmployeeData] = useState<Employee[]>([])

  useEffect(() => {
    // Fetch employee data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/employees")
        setEmployeeData(response.data)
      } catch (error) {
        console.error("Error fetching employee data:", error)
      }
    }
    fetchData()
  }, [])

  const handleEdit = (updatedEmployee: Employee) => {
    setEmployeeData((prevData) =>
      prevData.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    )
  }

  const handleDelete = (id: string) => {
    setEmployeeData((prevData) => prevData.filter((employee) => employee.id !== id))
  }

  const updateRowData = (updatedEmployee: Employee) => {
    setEmployeeData((prevData) =>
      prevData.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    )
  }

  const onDelete = useCallback((bankAccount: any) => {
    alert('onDelete');
    // deleteMutation.mutate(bankAccount.id, {
    //   onSuccess: () => {
    //     toast({ description: 'Bank account was deleted successfully.' });
    //   },
    //   onError: () => {
    //     toast({
    //       variant: 'destructive',
    //       title: 'Uh Oh! Something went wrong!',
    //       description: 'There was a problem with your request.',
    //     });
    //   },
    // });
  }, []);


  const onEdit = useCallback((bankAccount: any) => {
    alert('onEdit');

    //setSelectedBankAccount(bankAccount);
    //setIsDialogOpen(true);
  }, []);

  const columns = useMemo(() => getEmployeeColumns({ onEdit, onDelete }), []);


  return (
    <div>
      <DataTable
columns={columns}        
data={employeeData}
      />
    </div>
  )
}

export default EmployeeTable
