// import { useState ,useEffect} from "react";
// import {getManagers} from "./services/employeeApi"
// const AddEmployees = ({addEmployee,closeForm,}) => {
//   const[managers,setManagers]=useState([])
//   const [employee, setEmployee] = useState({

//     email: "",
//     firstName: "",
//     lastName: "",
//     role: "",
//     temporaryPassword: "",
//     primaryManagerId: "",

//   });
//   useEffect(()=>{

//     const fetchManager=async()=>{
//       try{
// const result=await getManagers();
// console.log("manager",result)
// setManagers(result.data ||[])
//     }

//     catch(error){
//       console.log(error.message)
//     }
//     }
//     fetchManager();
//   },[])

//   const handleChange = (e) => {

//     setEmployee({

//       ...employee,

//       [e.target.name]: e.target.value,

//     });

//   };

//   const handleSubmit = (e) => {

//     e.preventDefault();

//     console.log("Sending employee:", employee);

//     addEmployee(employee);

//   };

//   return (

//     <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">

//       <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">

//         <h2 className="mb-5 text-2xl font-bold">

//           Add Employee

//         </h2>

//         <form onSubmit={handleSubmit}>

//           {/* EMAIL */}

//           <label>Email</label>

//           <input
//             type="email"
//             name="email"
//             autoComplete="new-email"
//             value={employee.email}
//             onChange={handleChange}
//             className="mb-4 w-full rounded-lg border p-2"
//           />

//           {/* FIRST NAME */}

//           <label>First Name</label>

//           <input
//             type="text"
//             name="firstName"
//             value={employee.firstName}
//             onChange={handleChange}
//             required
//             className="mb-4 w-full rounded-lg border p-2"
//           />

//           {/* LAST NAME */}

//           <label>Last Name</label>

//           <input
//             type="text"
//             name="lastName"
//             value={employee.lastName}
//             onChange={handleChange}
//             required
//             className="mb-4 w-full rounded-lg border p-2"
//           />

//           {/* ROLE */}

//           <label>Role</label>

//           <input
//             type="text"
//             name="role"
//             value={employee.role}
//             onChange={handleChange}
//             className="mb-4 w-full rounded-lg border p-2"
//           />

//           {/* PASSWORD */}

//           <label> Password</label>

//           <input
//             type="password"
//             name="temporaryPassword"
//             autoComplete="new-password"
//             value={employee.temporaryPassword}
//             onChange={handleChange}
//             className="mb-4 w-full rounded-lg border p-2"
//           />

//           {/* MANAGER ID */}

//                  <select
//             name="primaryManagerId"
//             value={employee.primaryManagerId}
//             onChange={handleChange}
//             className="mb-4 w-full rounded-lg border p-2"
//           >
//             <option value="">
//               Select Manager
//             </option>

//             {managers.map((manager) => (
//               <option
//                 key={manager.id}
//                 value={manager.id}
//               >
//                 {manager.firstName} {manager.lastName}
//               </option>
//             ))}
//           </select>

//           {/* BUTTONS */}

//           <div className="flex justify-end gap-3">

//             <button
//               type="button"
//               onClick={closeForm}
//               className="rounded bg-gray-200 px-5 py-2"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="rounded bg-blue-600 px-5 py-2 text-white"
//             >
//               Save
//             </button>

//           </div>

//         </form>

//       </div>

//     </div>

//   );

// };

// export default AddEmployees;

import { useState, useEffect } from "react";
import { getManagers } from "./services/employeeApi";

const AddEmployees = ({ addEmployee, closeForm }) => {
  const [managers, setManagers] = useState([]);

  const [employee, setEmployee] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    temporaryPassword: "",
    managerId: "",
  });

  useEffect(() => {
    const fetchManager = async () => {
      try {
        const result = await getManagers();
        console.log("manager", result);
        setManagers(result.data || []);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchManager();
  }, []);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Sending employee:", employee);

    addEmployee(employee);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">
        {/* HEADER */}
        <div className="mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Add Employee</h2>

          <p className="mt-1 text-sm text-gray-500">
            Enter employee details below
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Email
          </label>

          <input
            type="email"
            name="email"
            autoComplete="new-email"
            value={employee.email}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {/* FIRST NAME */}
          <label className="mb-1 block text-sm font-semibold text-gray-700">
            First Name
          </label>

          <input
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            required
            className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {/* LAST NAME */}
          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Last Name
          </label>

          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            required
            className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {/* ROLE */}
          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Role
          </label>

          <input
            type="text"
            name="role"
            value={employee.role}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {/* PASSWORD */}
          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Password
          </label>

          <input
            type="password"
            name="temporaryPassword"
            autoComplete="new-password"
            value={employee.temporaryPassword}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {/* MANAGER ID */}
          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Manager
          </label>

          <select
            name="managerId"
            value={employee.managerId}
            onChange={handleChange}
            className="mb-6 w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select Manager</option>

            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name} 
              </option>
            ))}
          </select>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={closeForm}
              className="rounded-lg border border-gray-300 bg-gray-100 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-95"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployees;