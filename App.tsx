import React from "react";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";  // Import the Toastify CSS
import { EmployeeForm } from "@/app/(main)/employee/EmployeeForm";
const App = () => {
  const handleSave = (employeeData: any) => {
    console.log("Saved Employee:", employeeData);
  };

  const handleCancel = () => {
    console.log("Form Cancelled");
  };

  return (
    <div className="App">
      {/* Your component */}
      <EmployeeForm onSave={handleSave} onCancel={handleCancel} />

      {/* Toast Container to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default App;
