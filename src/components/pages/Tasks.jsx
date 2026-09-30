import { use, useState, useEffect } from "react";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import { FaPencilAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import AddTasks from "../AddTasks";
import {
  AddTaskTeam,
  getTasks,
  getPriority,
  getStatus,
  getUser,
} from "../services/TaskApi.js";

const testResponsePromise = getPriority();

const Tasks = () => {
  // const newRes = use(testResponsePromise);
  // console.log(newRes.data);

  const [task, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [priority, setPriority] = useState([]);
  const [status, setStatus] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  // GET Task API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await getTasks();

        console.log("Tasks:", result);

        setTasks(result.data || []);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTasks();
  }, []);

  // get status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const result = await getStatus();

        console.log("Status", result);

        setStatus(result.data || []);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchStatus();
  }, []);

  // get user from api
  const showUsers = async () => {
    try {
      const result = await getUser();

      console.log("Users:", result);

      setUsers(result.data || []);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    showUsers();
  }, []);

  // get priority task api
  const showPriority = async () => {
    try {
      const result = await getPriority();

      console.log("Priorities:", result);

      setPriority(result.data || []);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    showPriority();
  }, []);

  // POST Task API
  // const addTask = async (newTask) => {
  //   try {
  //     console.log("Sending Task:", newTask);

  //     // POST API
  //     await AddTaskTeam(newTask);

  //     setShowForm(false);

  //     // GET updated tasks
  //     const result = await getTasks();

  //     setTasks(result.data || []);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const addTask = async (newTask) => {
    try {
      console.log("Sending Task:", newTask);

      const result = await AddTaskTeam(newTask);

      console.log("POST Task Response:", result);

      setShowForm(false);

      const taskResult = await getTasks();

      console.log("Updated Tasks:", taskResult);

      setTasks(taskResult.data || []);
    } catch (error) {
      console.error("ADD TASK ERROR:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 mr-6">
        <Header />

        {/* Page Header */}
        <div className="flex items-center mt-10 justify-between px-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Tasks</h1>

            <p className="text-gray-500 mt-1">
              Daily and weekly reports from your team
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 mr-7 px-5 py-2.5 flex items-center text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
          >
            <FaPlus className="mr-2" />
            New Task
          </button>
        </div>

        {/* Table */}
        <div className="mt-6 mx-4 bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                  Task Name
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                  Description
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                  Due Date
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                  Priority
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>

                {/* <th className="px-5 py-4 text-left">Assign To</th> */}

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {task.length > 0 ? (
                task.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-5 py-4 font-medium text-gray-800">
                      {item.title}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {item.description}
                    </td>

                    <td className="px-5 py-4 text-gray-600">{item.dueDate}</td>

                    <td className="px-5 py-4">
                      <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700">
                        {item.priority?.name}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                        {item.status?.name}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      {users
                        .filter((user) => item.assignUserIds?.includes(user.id))
                        .map((user) => `${user.firstName} ${user.lastName}`)
                        .join(", ")}
                    </td>

                    <td className="px-5 py-4">
                      <button className="p-2 text-blue-500 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition duration-200">
                        <FaPencilAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-500">
                    No task found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Add Task Form */}
          {showForm && (
            <AddTasks
              addTask={addTask}
              closeForm={() => setShowForm(false)}
              priority={priority}
              users={users}
              status={status}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
