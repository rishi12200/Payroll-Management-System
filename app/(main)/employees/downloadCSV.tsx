export const downloadCSV = (tasks: any[]) => {
    if (!tasks.length) {
      alert("No data to download.");
      return;
    }
  
    const headers = [
      "Name,Email,Phone,Designation,Salary,Joining Date,Status",
    ];
    const rows = tasks.map(
      (task) =>
        `${task.name},${task.email},${task.phone},${task.designation},${task.salary},${task.joiningdate},${task.status}`
    );
  
    const csvContent = [headers.join("\n"), rows.join("\n")].join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "employee_data.csv");
    link.click();
  };
  