// import { useEffect, useState } from "react";
// import { getEmployees, getManagers } from "./services/teamsApi";

// const AddTeams = ({ addTeam, closeForm }) => {
//   const [team, setTeam] = useState({
//     name: "",
//     description: "",
//     managerId: "",
//     memberIds: [],
//   });

//   const [employees, setEmployees] = useState([]);
//   const [managers, setManagers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const employee = await getEmployees();
//         const manager = await getManagers();

//         console.log("Employees:", employee);
//         console.log("Managers:", manager);

//         setEmployees(employee.data || []);
//         setManagers(manager.data || []);
//       } catch (error) {
//         console.log("Error:", error.message);
//       }
//     };

//     fetchUsers();
//   }, []);
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setTeam({
//       ...team,
//       [name]: value,
//     });
//   };

//   // Employee
//   const handleEmployeeChange = (e) => {
//     const employeeId = e.target.value;

//     if (!employeeId) {
//       return;
//     }

//     setTeam({
//       ...team,
//       memberIds: [...team.memberIds, employeeId],
//     });
//   };

//   // Remove Employee
//   const removeEmployee = (employeeId) => {
//     setTeam({
//       ...team,
//       memberIds: team.memberIds.filter((id) => id !== employeeId),
//     });
//   };

//   // Submit
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log("Sending Team:", team);

//     addTeam(team);
//   };

//   return (
//     <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
//       <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
//         <h2 className="mb-5 text-2xl font-bold">Create Team</h2>

//         <form onSubmit={handleSubmit}>
//           {/* Team Name */}
//           <label>Name</label>

//           <input
//             type="text"
//             name="name"
//             value={team.name}
//             onChange={handleChange}
//             className="mb-4 w-full rounded-lg border p-2"
//           />

//           {/* Description */}
//           <label>Description</label>

//           <textarea
//             name="description"
//             value={team.description}
//             onChange={handleChange}
//             className="mb-4 w-full rounded-lg border p-2"
//           />

//           {/* Manager Dropdown */}
//           <label>Manager Name</label>

//           <select
//             name="managerId"
//             value={team.managerId}
//             onChange={handleChange}
//             className="mb-4 w-full rounded-lg border p-2"
//           >
//             <option value="">Select Manager</option>

//             {managers.map((manager) => (
//               <option key={manager.id} value={manager.id}>
//                 {manager.name}
//               </option>
//             ))}
//           </select>

//           {/* Employee Dropdown */}
//           <label>Employees</label>

//           <select
//             onChange={handleEmployeeChange}
//             value=""
//             className="mb-4 w-full rounded-lg border p-2"
//           >
//             <option value="">Select Employee</option>

//             {employees.map((employee) => (
//               <option key={employee.id} value={employee.id}>
//                 {employee.name}
//               </option>
//             ))}
//           </select>

//           {/* Selected Employees */}
//           {team.memberIds.length > 0 && (
//             <div className="mb-4">
//               <p className="mb-2 font-semibold">Selected Employees</p>

//               {team.memberIds.map((id) => {
//                 const employee = employees.find(
//                   (item) => String(item.id) === String(id),
//                 );

//                 return (
//                   <div
//                     key={id}
//                     className="mb-2 flex items-center justify-between rounded bg-gray-100 p-2"
//                   >
//                     <span>
//                       {employee?.firstName} {employee?.lastName}
//                     </span>

//                     <button
//                       type="button"
//                       onClick={() => removeEmployee(id)}
//                       className="text-red-500"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

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

// export default AddTeams;
import { useEffect, useState } from "react";
import { getEmployees, getManagers } from "./services/teamsApi";

const AddTeams = ({ addTeam, closeForm }) => {
  const [team, setTeam] = useState({
    name: "",
    description: "",
    managerId: "",
    memberIds: [],
  });

  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);

  // Fetch managers and employees
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const employeeResult = await getEmployees();
        const managerResult = await getManagers();

        console.log("Employees:", employeeResult);
        console.log("Managers:", managerResult);

        // API response should contain data array
        setEmployees(employeeResult.data || []);
        setManagers(managerResult.data || []);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  // Handle name, description, and manager selection
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTeam((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add employee
  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;

    if (!employeeId) return;

    setTeam((prev) => ({
      ...prev,
      memberIds: prev.memberIds.includes(employeeId)
        ? prev.memberIds
        : [...prev.memberIds, employeeId],
    }));
  };

  // Remove employee
  const removeEmployee = (employeeId) => {
    setTeam((prev) => ({
      ...prev,
      memberIds: prev.memberIds.filter((id) => id !== employeeId),
    }));
  };

  // Submit team
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!team.name.trim()) {
      alert("Please enter team name");
      return;
    }

    if (!team.managerId) {
      alert("Please select a manager");
      return;
    }

    const teamData = {
      name: team.name,
      description: team.description,
      managerId: Number(team.managerId),
      memberIds: team.memberIds.map(Number),
    };

    console.log("Sending Team:", teamData);

    addTeam(teamData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-5 text-2xl font-bold">Create Team</h2>

        <form onSubmit={handleSubmit}>
          {/* Team Name */}
          <label className="mb-1 block font-medium">Team Name</label>

          <input
            type="text"
            name="name"
            value={team.name}
            onChange={handleChange}
            placeholder="Enter team name"
            className="mb-4 w-full rounded-lg border p-2"
            required
          />

          {/* Description */}
          <label className="mb-1 block font-medium">Description</label>

          <textarea
            name="description"
            value={team.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="mb-4 w-full rounded-lg border p-2"
          />

          {/* Manager Dropdown */}
          <label className="mb-1 block font-medium">Manager Name</label>

          {/* <select
            name="managerId"
            value={team.managerId}
            onChange={handleChange}
            className="mb-4 w-full rounded-lg border p-2"
            required
          >
            <option value="">Select Manager</option>

            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </select> */}

          <select
            value={team.managerId}
            onChange={(e) => setTeam({ ...team, managerId: e.target.value })}
          >
            <option value="">Select Manager</option>

            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </select>

          {/* Employee Dropdown */}
          <label className="mb-1 block font-medium">Employees</label>

          <select
            value=""
            onChange={handleEmployeeChange}
            className="mb-4 w-full rounded-lg border p-2"
          >
            <option value="">Select Employee</option>

            {employees
              .filter(
                (employee) => !team.memberIds.includes(String(employee.id)),
              )
              .map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
          </select>

          {/* Selected Employees */}
          {team.memberIds.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 font-semibold">Selected Employees</p>

              {team.memberIds.map((id) => {
                const employee = employees.find(
                  (item) => String(item.id) === String(id),
                );

                return (
                  <div
                    key={id}
                    className="mb-2 flex items-center justify-between rounded bg-gray-100 p-2"
                  >
                    <span>{employee?.name || `User ${id}`}</span>

                    <button
                      type="button"
                      onClick={() => removeEmployee(id)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeForm}
              className="rounded bg-gray-200 px-5 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded bg-blue-600 px-5 py-2 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeams;
