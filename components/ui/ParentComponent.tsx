/*"use client";

import React, { useState } from "react";
import { Row } from "@tanstack/react-table";
import { DataTableRowActions } from "@/components/ui/data-table-row-actions";
import { faker } from "@faker-js/faker";

interface Task {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  joiningdate: string;
  department: string;
}

// Generate initial fake data
const generateTasks = (count: number): Task[] => {
  const emails = ["john.doe@example.com", "jane.doe@example.com", "user.one@example.com"];
  const phones = ["123-456-7890", "987-654-3210", "555-555-5555"];
  const statuses = ["Active", "Inactive", "On Leave"];
  const joiningdates = ["2023-01-01", "2023-06-15", "2024-02-10"];
  const departments = ["HR", "Engineering", "Marketing", "Sales"];

  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    name: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
    email: faker.helpers.arrayElement(emails),
    phone: faker.helpers.arrayElement(phones),
    status: faker.helpers.arrayElement(statuses),
    joiningdate: faker.helpers.arrayElement(joiningdates),
    department: faker.helpers.arrayElement(departments),
  }));
};

const ParentComponent = () => {
  const [tasks, setTasks] = useState<Task[]>(generateTasks(5)); // Generate 5 initial tasks

  const handleDelete = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id: string, updatedData: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedData : task))
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Employee Directory</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Joining Date</th>
            <th className="border border-gray-300 p-2">Department</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const row: Row<Task> = { original: task } as Row<Task>; // Mock Row object
            return (
              <tr key={task.id}>
                <td className="border border-gray-300 p-2">{task.name}</td>
                <td className="border border-gray-300 p-2">{task.email}</td>
                <td className="border border-gray-300 p-2">{task.phone}</td>
                <td className="border border-gray-300 p-2">{task.status}</td>
                <td className="border border-gray-300 p-2">{task.joiningdate}</td>
                <td className="border border-gray-300 p-2">{task.department}</td>
                <td className="border border-gray-300 p-2">
                  <DataTableRowActions
                    row={row}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ParentComponent;
*/