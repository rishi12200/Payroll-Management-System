// EmployeeForm.tsx
/*import React, { useState, useEffect } from "react";

type EmployeeFormProps = {
  employee?: any;
  onSave: (employeeData: any) => void;
  onCancel: () => void;
};

export const EmployeeForm = ({ employee, onSave, onCancel }: EmployeeFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    salary: "",
    joiningdate: "",
    status: "Active",
    designation: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Employee Name"
        className="border p-2 rounded"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="border p-2 rounded"
      />

      <input
        type="number"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        placeholder="Salary"
        className="border p-2 rounded"
      />
      <input
        type="date"
        name="joiningdate"
        value={formData.joiningdate}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="designation"
        value={formData.designation}
        onChange={handleChange}
        placeholder="designation"
        className="border p-2 rounded"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {employee ? "Update" : "Add"} Employee
        </button>
      </div>
    </div>
  );
};
*/

import React, { useState, useEffect } from "react";

type EmployeeFormProps = {
  employee?: any;
  onSave: (employeeData: any) => void;
  onCancel: () => void;
};

export const EmployeeForm = ({ employee, onSave, onCancel }: EmployeeFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
   // position: "",
    salary: "",
    joiningdate: "",
    status: "Active",
    designation: "",
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, phone, salary, joiningdate, designation } = formData;
    let validationErrors: any = {};
    let isValid = true;

    // Check if all fields are filled
    if (!name) {
      validationErrors.name = "Employee Name is required.";
      isValid = false;
    }

    if (!email) {
      validationErrors.email = "Email is required.";
      isValid = false;
    } else {
      // Email validation (basic regex for email format)
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        validationErrors.email = "Please enter a valid email address.";
        isValid = false;
      }
    }

    if (!phone) {
      validationErrors.phone = "Phone number is required.";
      isValid = false;
    } else {
      // Phone number validation (must be a number and at least 10 digits)
      if (isNaN(Number(phone)) || phone.length < 10) {
        validationErrors.phone = "Phone number must be at least 10 digits.";
        isValid = false;
      }
    }

    if (!salary) {
      validationErrors.salary = "Salary is required.";
      isValid = false;
    } else {
      // Salary validation (must be a number greater than 0)
      if (isNaN(Number(salary)) || Number(salary) <= 0) {
        validationErrors.salary = "Salary must be a valid number greater than 0.";
        isValid = false;
      }
    }

    if (!joiningdate) {
      validationErrors.joiningdate = "Joining date is required.";
      isValid = false;
    }

    if (!designation) {
      validationErrors.designation = "designation is required.";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Employee Name"
        className="border p-2 rounded"
      />
      {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 rounded"
      />
      {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="border p-2 rounded"
      />
      {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}

      <input
        type="number"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        placeholder="Salary"
        className="border p-2 rounded"
      />
      {errors.salary && <span className="text-red-500 text-sm">{errors.salary}</span>}

      <input
        type="date"
        name="joiningdate"
        value={formData.joiningdate}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      {errors.joiningdate && <span className="text-red-500 text-sm">{errors.joiningdate}</span>}

    {/*  <input
        type="text"
        name="designation"
        value={formData.designation}
        onChange={handleChange}
        placeholder="designation"
        className="border p-2 rounded"
      />
            {errors.designation && <span className="text-red-500 text-sm">{errors.designation}</span>}

      */}
        <select
        name="designation"
        value={formData.designation}
        onChange={handleChange}
        className="border p-2 rounded"
      >

        <option value="Engineer">Engineer</option>
        <option value="Product Manager">Product Manager</option>
        <option value="Data Science">Data Science</option>
        <option value="Marketing">Marketing </option>
        <option value="DevOps">DevOps </option>


      </select>

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {employee ? "Update" : "Add"} Employee
        </button>
      </div>
    </div>
  );
};
