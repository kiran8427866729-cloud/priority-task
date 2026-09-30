import api from "../services/api";

// POST - Create Team
// export const teamsUser = async (teamData) => {
//   const response = await api(
//     `${import.meta.env.VITE_APP_API_URL}/admin/teams`,
//     // `${import.meta.env.VITE_APP_API_URL}/admin/teams`
//     {
//       method: "POST",
//       body: JSON.stringify(teamData),
//     },
//   );

//   const data = await response.text();

//   console.log("Team API response:", data);

//   if (!response.ok) {
//     throw new Error(data?.error?.message || "Team creation failed");
//   }

//   return data;
// };

// GET - Employees
export const getEmployees = async () => {
  console.log("Calling Employee API");

  const response = await api(
    `${import.meta.env.VITE_APP_API_URL}/api/v1/departments/employees`,
    {
      method: "GET",
    },
  );

  const data = await response.json();

  console.log("Employee API response:", data);

  if (!response.ok) {
    throw new Error(data?.error?.message || "Failed to fetch employees");
  }

  return data;
};
export const teamsUser = async (teamData) => {
  const url = "http://localhost:3080/api/v1/admin/teams";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teamData),
  });

  // Read response as text first to avoid JSON parsing errors
  const text = await response.text();

  console.log("POST URL:", url);
  console.log("POST Status:", response.status);
  console.log("POST Response:", text);

  let result;

  try {
    result = JSON.parse(text);
  } catch {
    throw new Error(
      `Backend returned non-JSON response. Status: ${response.status}`,
    );
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Team creation failed");
  }

  return result;
};
// GET - Managers
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

// GET - Teams
export const getTeams = async (page = 1, limit = 10, search = "") => {
  const response = await api(
    `${import.meta.env.VITE_APP_API_URL}/api/v1/admin/teams?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
    {
      method: "GET",
    },
  );

  const data = await response.json();

  console.log("Teams API response:", data);

  if (!response.ok) {
    throw new Error(data?.error?.message || "Failed to fetch teams");
  }

  return data;
};

//show member
export const showTeam = async () => {
  const response = await api(
    `${import.meta.env.VITE_APP_API_URL}/api/v1/manager/teams`,
    {
      method: "GET",
    },
  );
  const data = await response.json();
  console.log("show Teams API response", data);
  if (!response.ok) {
    throw new Error(data?.error?.message || "failed to fetch members");
  }
  return data;
};
