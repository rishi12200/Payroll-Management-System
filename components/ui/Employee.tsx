"use client"; // Mark this component as a Client Component

import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogContent, DialogActions, DialogTitle, TextField } from '@mui/material';

export default function EmployeeTable() {
  const [tasks, setTasks] = useState<any[]>([]); // State for tasks (employees)
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null); // State for selected employee for editing
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  // Fetch all tasks (employees) from the API
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/employees");
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  // Handle editing employee
  const handleEditEmployee = async () => {
    if (selectedEmployee) {
      try {
        // Send updated employee data to the backend (API)
        const response = await axios.put(
          `http://localhost:3000/api/employees/${selectedEmployee.id}`,
          selectedEmployee
        );
        if (response.status === 200) {
          fetchTasks(); // Refresh the task list after editing
          setSelectedEmployee(null); // Reset selected employee
          setShowModal(false); // Hide the modal after submission
        }
      } catch (error) {
        console.error("Failed to edit employee:", error);
      }
    }
  };

  // Handle deleting employee
  const handleDeleteEmployee = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/employees/${id}`
      );
      if (response.status === 200) {
        setTasks(tasks.filter((task) => task.id !== id)); // Remove deleted employee from the UI
      }
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks when the component mounts
  }, []);

  return (
    <>
      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.email}</TableCell>
              <TableCell>{task.position}</TableCell>
              <TableCell>{task.salary}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setSelectedEmployee(task);
                    setShowModal(true); // Open the modal with the selected employee data
                  }}
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteEmployee(task.id)}
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for Edit Employee Form */}
      {showModal && (
        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              value={selectedEmployee?.name || ""}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  name: e.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={selectedEmployee?.email || ""}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  email: e.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Position"
              value={selectedEmployee?.position || ""}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  position: e.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Salary"
              value={selectedEmployee?.salary || ""}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  salary: e.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setShowModal(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditEmployee}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
