"use client"; // Mark this component as a Client Component

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { EmployeeForm } from "./EmployeeForm";
import { EmployeeTable } from "./EmployeeTable";
import { Button } from "@/components/ui/button";
import Dashboard from "./Dashboard"; // Update path as needed

import { downloadCSV } from "@/app/(main)/employees/downloadCSV"; // Adjust path based on your file structure
import { downloadPDF } from "@/app/(main)/employees/downloadPDF"; // Adjust path based on your file structure

export default function TaskPage() {
  const [tasks, setTasks] = useState<any[]>([]); // Manage employee data state
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    salary: "",
    joiningdate: "",
    status: "Active",
    designation: "",
  });
  const [editEmployee, setEditEmployee] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // State to store metrics for the dashboard
  const [employeeMetrics, setEmployeeMetrics] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    newJoiners: 0,
  });

  // Fetch employee data
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/employees");
      const employees = response.data;

      // Update tasks state
      setTasks(employees);

      // Calculate and update metrics for the dashboard
      const totalEmployees = employees.length;
      const activeEmployees = employees.filter((emp: any) => emp.status === "Active").length;
      const inactiveEmployees = employees.filter((emp: any) => emp.status === "Inactive").length;

      // Calculate new joiners (e.g., joined in the last 30 days)
      const currentDate = new Date();
      const newJoiners = employees.filter((emp: any) => {
        const joiningDate = new Date(emp.joiningdate);
        const cutoffDate = new Date("2023-07-10");
        return joiningDate > cutoffDate; // Employees joining strictly after 10th July, 2023
      }).length;

      setEmployeeMetrics({
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        newJoiners,
      });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  // CRUD Operations
  const handleAddEmployee = async (employeeData: any) => {
    try {
      const response = await axios.post("http://localhost:3000/api/employees", employeeData);
      if (response.status === 201) {
        fetchTasks(); // Refresh data
        setShowModal(false);
      }
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  };

  const handleUpdateEmployee = async (employeeData: any) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/employees?id=${employeeData.id}`, employeeData);
      if (response.status === 200) {
        alert("Employee updated successfully!");
        fetchTasks(); // Refresh data
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Failed to update employee:", error);
      alert("Failed to update employee.");
    }
  };

  const onDelete = useCallback(async (employeeDetail: any) => {
    try {
      await axios.delete(`http://localhost:3000/api/employees?id=${employeeDetail.id}`);
      alert("Employee was deleted successfully.");
      fetchTasks(); // Refresh data
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }, []);

  const onEdit = useCallback((employeeDetail: any) => {
    setEditEmployee(employeeDetail);
    setShowEditModal(true);
  }, []);

  useEffect(() => {
    fetchTasks(); // Fetch data on component mount
  }, []);

  const ExportDropdown: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown((prev) => !prev);

    const handleExport = (type: string) => {
      if (type === "csv") {
        downloadCSV(tasks);
      } else if (type === "pdf") {
        downloadPDF(tasks);
      }
    };

    return (
      <div>
        <Button onClick={toggleDropdown}>Export Data</Button>
        {showDropdown && (
          <select id="exportDropdown" onChange={(e) => handleExport(e.target.value)} defaultValue="">
            <option value="">Select</option>
            <option value="csv">Export as CSV</option>
            <option value="pdf">Export as PDF</option>
          </select>
        )}
      </div>
    );
  };

  return (
    <>


      {/* Main Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Employee Management</h2>
          <div className="flex items-center space-x-2">
            <ExportDropdown />
            <Button onClick={() => setShowModal(true)}>Add Employee</Button>
          </div>
        </div>
      {/* Dashboard */}
      <Dashboard
        totalEmployees={employeeMetrics.totalEmployees}
        activeEmployees={employeeMetrics.activeEmployees}
        inactiveEmployees={employeeMetrics.inactiveEmployees}
        newJoiners={employeeMetrics.newJoiners}
      />
        {/* Employee Table */}
        <EmployeeTable data={tasks} onEdit={onEdit} onDelete={onDelete} />

        {/* Modal for Add/Edit Employee */}
        {(showModal || showEditModal) && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl font-bold mb-4">
                {showEditModal ? "Edit Employee" : "Add New Employee"}
              </h2>
              <EmployeeForm
                employee={editEmployee}
                onSave={showEditModal ? handleUpdateEmployee : handleAddEmployee}
                onCancel={() => {
                  setShowModal(false);
                  setShowEditModal(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
