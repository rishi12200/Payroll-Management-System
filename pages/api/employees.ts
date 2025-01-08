import { NextApiRequest, NextApiResponse } from "next";
import { Employee } from "../../types/employee";

let employees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: 6434235678,
    //position: "Software Engineer",
    joiningdate:new Date( "2020-07-10"),// Ensure this is a Date object
    status: "Active",
    salary: 90000,
    designation: "Engineer",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: 9078451245,
    //position: "Product Manager",
    joiningdate: new Date( "2020-07-10"), // Ensure this is a Date object
    status: "Active",
    salary: 95000,
    designation: "Product Manager",
  },
  {
    id: "3",
    name: "Mike Brown",
    email: "mike.brown@example.com",
    phone: 9078451245,
    //position: "Product Manager",
    salary: 90000,
    joiningdate: new Date( "2023-11-10"),
    status: "Active",
    designation: "Engineer",
  },
  {
    id: "4",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: 9078451245,
    //position: "Quality Analyst",
    salary: 62000,
    joiningdate: new Date( "2024-09-13"),
    status: "Active",
    designation: "Data Science",
  },
  {
    id: "5",
    name: "Chris Davis",
    email: "chris.davis@example.com",
    phone: 9078451245,
    //position: "Data Scientist",
    salary: 85000,
    joiningdate: new Date( "2022-07-10"),
    status: "Active",
    designation: "Data Science",
  },
  {
    id: "6",
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    phone: 9078451245,
    //position: "Data Science",
    salary: 78000,
    joiningdate: new Date( "2023-11-12"),
    status: "Active",
    designation: "Marketing",
  },
  {
    id: "7",
    name: "Ryan Taylor",
    email: "ryan.taylor@example.com",
    phone: 9078451245,
    //position: "HR Specialist",
    salary: 65000,
    joiningdate: new Date( "2020-07-10"),
    status: "Active",
    designation: "Marketing",
  },
  {
    id: "8",
    name: "Olivia Wilson",
    email: "olivia.wilson@example.com",
    phone: 9078451245,
    //position: "Product Manager",
    salary: 87000,
    joiningdate: new Date( "2020-07-10"),
    status: "Active",
    designation: "Engineer",
  },
  {
    id: "9",
    name: "Ethan Moore",
    email: "ethan.moore@example.com",
    phone: 9078451245,
    //position: "DevOps Engineer",
    salary: 80000,
    joiningdate: new Date( "2020-07-10"),
    status: "Active",
    designation: "DevOps",
  },
  {
    id: "10",
    name: "Isabella Lee",
    email: "isabella.lee@example.com",
    phone: 9078451245,
    //position: "Business Analyst",
    salary: 70000,
    joiningdate: new Date( "2020-07-10"),
    status: "Active",
    designation: "Data Science",
  },
  {
    id: "11",
    name: "Ethan ",
    email: "ethan@example.com",
    phone: 9078451245,
    //position: "DevOps Engineer",
    salary: 50000,
    joiningdate:new Date( "2020-07-10"),
    status: "Inactive",
    designation: "DevOps",
  },
]


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
     // res.status(200).json(employees);
      res.status(200).json(
        employees.map((employee) => ({
          ...employee,
          joiningdate: employee.joiningdate instanceof Date 
            ? employee.joiningdate.toLocaleDateString("en-GB") 
            : employee.joiningdate, // Ensure it's a Date object before formatting
        }))
      )
      break;
    case "POST":
      const newEmployee: any = req.body;
      newEmployee.id = (employees.length + 1).toString();
      employees.push(newEmployee);
      res.status(201).json(newEmployee);
      break;
    case "PUT":

      const updatedEmployee: any = req.body;
      employees = employees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      );
      res.status(200).json(updatedEmployee);
      break;
    case "DELETE":
      const { id } = req.query;
      employees = employees.filter((employee) => employee.id !== id);
      res.status(204).end();
      break;
    default:
      res.status(405).end();
      
  }

}