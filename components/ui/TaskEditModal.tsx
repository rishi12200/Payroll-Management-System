import React from 'react'
import { Employee } from '@/types/employee'

interface TaskEditModalProps {
  task: Employee
  onClose: () => void
  onSave: (updatedEmployee: Employee) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof Employee) => void
}

export const TaskEditModal = ({ task, onClose, onSave, onChange }: TaskEditModalProps) => {
  return (
    <div>
      <h3>Edit Employee</h3>
      <input
        type="text"
        value={task.name}
        onChange={(e) => onChange(e, 'name')}
      />
      <input
        type="text"
        value={task.email}
        onChange={(e) => onChange(e, 'email')}
      />
      <input
        type="text"
        value={task.phone}
        onChange={(e) => onChange(e, 'phone')}
      />
      <button onClick={() => onSave(task)}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  )
}
