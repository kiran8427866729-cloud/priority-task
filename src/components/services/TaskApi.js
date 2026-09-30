import api from "../services/api";
//POST team
// export const AddTaskTeam = async (TaskData) => {
//   const response = await api(
//     `${import.meta.env.VITE_APP_API_URL}/api/v1/admin/task-metadata`,
//     {
//       method: "POST",
//       body: JSON.stringify(TaskData),
//       s,
//     },
//   );
//   const data = await response.json();
//   console.log("Task API response", data);
//   if (!response.ok) {
//     throw new Error(data?.error.message || "failed to create team");
//   }
//   return data;
// };

export const AddTaskTeam = async (taskData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/admin/task-metadata`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      },
    );

    const result = await response.json();

    console.log("POST Task Response:", result);

    if (!response.ok) {
      throw new Error(result.message || "Failed to create task");
    }

    return result;
  } catch (error) {
    console.error("AddTaskTeam Error:", error);
    throw error;
  }
};
//Get task

export const getTasks = async () => {
  try {
    const response = await api(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/admin/task-metadata?page=1&limit=10`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || "Failed to fetch tasks");
    }

    return data;
  } catch (error) {
    console.error("Get Tasks Error:", error.message);
    throw error;
  }
};

//   get Priority
export const getPriority = async () => {
  try {
    const response = await api(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/admin/task-metadata/priorities`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || "failed to fetch priority");
    }
    return data;
  } catch (error) {
    console.log("get Priority Error", error.message);
    throw error;
  }
};
// get employee to assign a task
export const getUser = async () => {
  try {
    const response = await api(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/admin/task-metadata/users`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || "failed to fetch users");
    }
    return data;
  } catch (error) {
    console.log("get user error", error.message);
    throw error;
  }
};

//  update the status
export const updateTask = async (id, taskData) => {
  try {
    const response = await api(
      `${import.meta.env.VITE_APP_API_URL}/admin/tasks/${id}/status`,
      {
        method: "PATCH",
        body: JSON.stringify(taskData),
      },
    );

    const data = await response.json();

    console.log("Update Task Response:", data);

    if (!response.ok) {
      throw new Error(data?.error?.message || "Failed to update task");
    }

    return data;
  } catch (error) {
    console.log("Update Task Error:", error.message);
    throw error;
  }
};

// status api

export const getStatus = async () => {
  try {
    const response = await api(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/admin/task-metadata/statuses`,
      {
        method: "GET",
      },
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || "failed to fetch status");
    }
    return data;
  } catch (error) {
    console.log("get status Error", error.message);
    throw error;
  }
};
//Get api for employee
export const getEmployee = async (req, res) => {
  try {
    const employees = await prisma.user.findMany({
      where: {
        userRoles: {
          some: {
            role: {
              slug: "employee",
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      data: employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
