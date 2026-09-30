// import { useEffect, useState } from "react";
// import Sidebar from "../Layout/Sidebar";
// import AddEmployees from "../AddEmployees";
// import Header from "../Layout/Header";
// import { FaPlus } from "react-icons/fa6";

// import { getEmployees, employeeUser } from "../services/employeeApi";

// const Employee = () => {
//   const [employee, setEmployee] = useState([]);

//   const [showForm, setShowForm] = useState(false);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const role = user?.role;

//   // GET EMPLOYEESAPI
//   const fetchEmployees = async () => {
//     try {
//       const result = await getEmployees();

//       console.log("Employee data:", result);

//       setEmployee(result.data || []);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   // CALL GET API WHEN PAGE LOADS
//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     fetchEmployees();
//   }, []);

//   //POST NEW EMPLOYEE
//   const addEmployee = async (newEmployee) => {
//     try {
//       console.log("Sending employee:", newEmployee);

//       await employeeUser(newEmployee);
//       setShowForm(false);
//       //
//       fetchEmployees();
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar />

//       <div className="flex-1 mr-6 bg-gray-50">
//         <Header />

//         <div className="ml-5">
//           {/* Heading */}

//           <div className="flex items-center mt-5 justify-between">
//             <h1 className="text-2xl font-semibold">Employee Management</h1>

//             {role === "ADMIN" && (
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="bg-blue-600 mr-4 p-2 flex text-white rounded-xl"
//               >
//                 <FaPlus className="mr-2 mt-1" />
//                 Add Employee
//               </button>
//             )}
//           </div>

//           {/* Search */}

//           <input
//             type="text"
//             placeholder="Search employees"
//             className="w-full border border-gray-200 p-2 mb-2 rounded-xl mt-3  focus:ring-blue-400 focus:ring-2 focus:border-blue-200 outline-none"
//           />

//           {/* EMPLOYEE TABLE */}

//           <table className="w-full bg-white">
//             <thead>
//               <tr className="border-b">
//                 <th className="px-5 py-5 text-left">Email</th>

//                 <th className="px-5 py-5 text-left">First Name</th>

//                 <th className="px-5 py-5 text-left">Last Name</th>

//                 <th className="px-5 py-5 text-left">Role</th>

//                 <th className="px-5 py-5 text-left">Manager Name</th>
//               </tr>
//             </thead>
//             {["ADMIN", "EMPLOYEE"].includes(role) && (
//               <tbody>
//                 {employee.length > 0 ? (
//                   employee.map((item) => (
//                     <tr key={item.id} className="border-b">
//                       <td className="px-5 py-3">{item.email}</td>

//                       <td className="px-5 py-3">{item.firstName}</td>

//                       <td className="px-5 py-3">{item.lastName}</td>

//                       <td className="px-5 py-3">{item.role}</td>

//                       <td className="px-5 py-3">
//                         {item.managedRelationships?.[0]?.manager?.firstName}{" "}
//                         {item.managedRelationships?.[0]?.manager?.lastName}{" "}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="text-center py-5">
//                       No employees found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             )}
//           </table>

//           {/* ADD EMPLOYEE FORM */}

//           {showForm && (
//             <AddEmployees
//               addEmployee={addEmployee}
//               closeForm={() => setShowForm(false)}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Employee;




import { useEffect, useState } from "react";
import Sidebar from "../Layout/Sidebar";
import AddEmployees from "../AddEmployees";
import Header from "../Layout/Header";
import { FaPlus } from "react-icons/fa6";

import { getEmployees, employeeUser } from "../services/employeeApi";

const Employee = () => {
  const [employee, setEmployee] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  // GET EMPLOYEESAPI
  const fetchEmployees = async () => {
    try {
      const result = await getEmployees();

      console.log("Employee data:", result);

      setEmployee(result.data || []);
    } catch (error) {
      console.log(error.message);
    }
  };

  // CALL GET API WHEN PAGE LOADS
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEmployees();
  }, []);

  //POST NEW EMPLOYEE
  const addEmployee = async (newEmployee) => {
    try {
      console.log("Sending employee:", newEmployee);

      await employeeUser(newEmployee);
      setShowForm(false);
      //
      fetchEmployees();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 mr-6 bg-gray-100">
        <Header />

        <div className="ml-5 mr-5">
          {/* Heading */}

          <div className="flex items-center mt-6 justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Employee Management
              </h1>

              <p className="text-gray-500 mt-1">
                Manage and view your employees
              </p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 mr-4 px-5 py-3 flex items-center text-white rounded-xl shadow-md hover:bg-blue-700 transition duration-200"
            >
              <FaPlus className="mr-2" />
              Add Employee
            </button>
          </div>

          {/* Search */}

          <div className="mt-6 mb-4">
            <input
              type="text"
              placeholder="Search employees"
              className="w-full bg-white border border-gray-200 p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            />
          </div>

          {/* EMPLOYEE TABLE */}

          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <table className="w-full bg-white">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Email
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    First Name
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Last Name
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Role
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Manager Name
                  </th>
                </tr>
              </thead>

              <tbody>
                {employee.length > 0 ? (
                  employee.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-5 py-4 text-gray-700">{item.email}</td>

                      <td className="px-5 py-4 text-gray-700">
                        {item.firstName}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {item.lastName}
                      </td>

                      <td className="px-5 py-4">
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                          {item.role}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {item.manager?.name || "No Manager"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-500">
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ADD EMPLOYEE FORM */}

          {showForm && (
            <AddEmployees
              addEmployee={addEmployee}
              closeForm={() => setShowForm(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Employee;

