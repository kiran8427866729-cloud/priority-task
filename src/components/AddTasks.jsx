// import { useState, useEffect } from "react";
// import { getUser } from "../services/Taskapi";

// const AddTasks = ({ addTask, closeForm, priority, status }) => {
//   const [user, setUser] = useState([]);
//   const [showUser, setShowUser] = useState(false);
//   const [task, setTasks] = useState({
//     title: "",
//     description: "",
//     dueDate: "",
//     priorityId: "",
//     statusId: "",
//     assignedUserIds: [],
//   });
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const result = await getUser();

//         console.log("Users:", result);

//         setUser(result.data || []);
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleUserSelect = (selectedUser) => {
//     if (task.assignedUserIds.includes(selectedUser.id)) {
//       return;
//     }

//     setTasks({
//       ...task,

//       assignedUserIds: [...task.assignedUserIds, selectedUser.id],
//     });

//     setShowUser(false);
//   };

//   const handleChange = (e) => {
//     setTasks({
//       ...task,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const taskData = {
//       ...task,

//       priorityId: Number(task.priorityId),

//       dueDate: new Date(task.dueDate).toISOString(),
//     };

//     console.log("Sending task:", taskData);

//     addTask(taskData);
//   };

//   return (
//     <div className="absolute inset-0 flex justify-center items-center backdrop-blur-sm">
//       <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
//         <h2 className="text-2xl font-bold mb-2">Create Task</h2>

//         <p className="text-gray-500 mb-5">Create a new task.</p>

//         <form onSubmit={handleSubmit}>
//           {/* TASK NAME */}

//           <label>Task Name</label>

//           <input
//             type="text"
//             name="title"
//             value={task.title}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-2 mb-4"
//           />

//           {/* DESCRIPTION */}

//           <label>Description</label>

//           <textarea
//             name="description"
//             value={task.description}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-2 mb-4"
//           />

//           {/* DUE DATE */}

//           <label>Due Date</label>

//           <input
//             type="datetime-local"
//             name="dueDate"
//             value={task.dueDate}
//             onChange={handleChange}
//             required
//             className="w-full border rounded-lg p-2 mb-4"
//           />
//           <label>Status</label>

//           <select
//             name="statusId"
//             value={task.statusId}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-2 mb-4"
//           >
//             <option value="">select status</option>

//             {status.map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item.name}
//               </option>
//             ))}
//           </select>

//           <label>Priority</label>

//           <select
//             name="priorityId"
//             value={task.priorityId}
//             onChange={handleChange}
//             className="w-full border rounded-lg p-2 mb-4"
//           >
//             <option value="">Select Priority</option>

//             {priority.map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item.name}
//               </option>
//             ))}
//           </select>

//           {/* ASSIGN TO */}

//           <label>Assign To</label>

//           <div className="relative">
//             <div
//               onClick={() => setShowUser(!showUser)}
//               className="w-full border rounded-lg p-2 min-h-10 cursor-pointer"
//             >
//               {task.assignedUserIds.length === 0
//                 ? "Select Employee"
//                 : user
//                     .filter((item) => task.assignedUserIds.includes(item.id))
//                     .map((item) => item.name)
//                     .join(", ")}
//             </div>

//             {showUser && (
//               <div className="absolute w-full border rounded-lg bg-white shadow-lg max-h-40 overflow-y-auto z-10">
//                 {user.length > 0 ? (
//                   user.map((item) => (
//                     <div
//                       key={item.id}
//                       onClick={() => handleUserSelect(item)}
//                       className="p-2 cursor-pointer hover:bg-gray-100"
//                     >
//                       {item.firstName} {item.lastName}
//                     </div>
//                   ))
//                 ) : (
//                   <div className="p-2">No users found</div>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="flex justify-end gap-3 mt-5">
//             <button
//               type="button"
//               onClick={closeForm}
//               className="px-5 py-2 rounded bg-gray-200"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="px-5 py-2 rounded bg-blue-600 text-white"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddTasks;

import { useState, useEffect } from "react";
import { getUser } from "./services/TaskApi";
// import { getUser } from "../services/TaskApi";

const AddTasks = ({ addTask, closeForm, priority, status }) => {
  const [user, setUser] = useState([]);
  const [showUser, setShowUser] = useState(false);

  const [task, setTasks] = useState({
    title: "",
    description: "",
    dueDate: "",
    priorityId: "",
    statusId: "",
    assignedUserIds: [],
  });

  // Fetch employees
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getUser();

        console.log("Users:", result);
        console.log("Employee list:", result.data);

        setUser(result.data || []);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchUsers();
  }, []);

  // Select employee
  const handleUserSelect = (selectedUser) => {
    if (task.assignedUserIds.includes(selectedUser.id)) {
      return;
    }

    setTasks((prev) => ({
      ...prev,
      assignedUserIds: [...prev.assignedUserIds, selectedUser.id],
    }));

    setShowUser(false);
  };

  // Input change
  const handleChange = (e) => {
    setTasks((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit task
  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      ...task,
      priorityId: Number(task.priorityId),
      statusId: Number(task.statusId),
      assignedUserIds: task.assignedUserIds.map(Number),
      dueDate: new Date(task.dueDate).toISOString(),
    };

    console.log("Sending task:", taskData);

    addTask(taskData);
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Create Task</h2>

        <p className="text-gray-500 mb-5">Create a new task.</p>

        <form onSubmit={handleSubmit}>
          {/* TASK NAME */}
          <label>Task Name</label>

          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 mb-4"
          />

          {/* DESCRIPTION */}
          <label>Description</label>

          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 mb-4"
          />

          {/* DUE DATE */}
          <label>Due Date</label>

          <input
            type="datetime-local"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 mb-4"
          />

          {/* STATUS */}
          <label>Status</label>

          <select
            name="statusId"
            value={task.statusId}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 mb-4"
          >
            <option value="">Select Status</option>

            {status.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {/* PRIORITY */}
          <label>Priority</label>

          <select
            name="priorityId"
            value={task.priorityId}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-2 mb-4"
          >
            <option value="">Select Priority</option>

            {priority.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {/* ASSIGN TO */}
          <label>Assign To</label>

          <div className="relative">
            {/* Selected employees */}
            <div
              onClick={() => setShowUser(!showUser)}
              className="w-full border rounded-lg p-2 min-h-10 cursor-pointer"
            >
              {task.assignedUserIds.length === 0
                ? "Select Employee"
                : user
                    .filter((item) => task.assignedUserIds.includes(item.id))
                    .map((item) => `${item.firstName} ${item.lastName}`)
                    .join(", ")}
            </div>

            {/* Employee dropdown */}
            {showUser && (
              <div className="absolute w-full border rounded-lg bg-white shadow-lg max-h-40 overflow-y-auto z-10">
                {user.length > 0 ? (
                  user.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleUserSelect(item)}
                      className={`p-2 cursor-pointer hover:bg-gray-100 ${
                        task.assignedUserIds.includes(item.id)
                          ? "bg-gray-100"
                          : ""
                      }`}
                    >
                      {item.name}
                    </div>
                  ))
                ) : (
                  <div className="p-2">No employees found</div>
                )}
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={closeForm}
              className="px-5 py-2 rounded bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded bg-blue-600 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTasks;
