import api from "./api";

// GET EMPLOYEES
export const getEmployees = async () => {
  try {
    const response = await api(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/admin/users?page=1&limit=10&sortBy=createdAt&sortOrder=desc`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    console.log("Employees:", data);

    if (!response.ok) {
      throw new Error(data?.error?.message || "Failed to fetch employees");
    }

    return data;
  } catch (error) {
    console.log("Get Employees Error:", error.message);
    throw error;
  }
};

// POST / CREATE EMPLOYEE
export const employeeUser = async (employeeData) => {
  try {
    const response = await api(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/admin/users`,
      {
        method: "POST",
        body: JSON.stringify(employeeData),
      },
    );

    const data = await response.json();

    console.log("Employee created:", data);

    if (!response.ok) {
      throw new Error(data?.error?.message || "Failed to create employee");
    }

    return data;
  } catch (error) {
    console.log("Create Employee Error:", error.message);
    throw error;
  }
};

//GET Manager

export const getManagers = async () => {
  const response = await api(
    `${import.meta.env.VITE_APP_API_URL}/api/v1/departments/managers`,
    {
      method: "GET",
    },
  );

  const data = await response.json();

  console.log("Manager API response:", data);

  if (!response.ok) {
    throw new Error(data?.error?.message || "Failed to fetch managers");
  }

  return data;
};
