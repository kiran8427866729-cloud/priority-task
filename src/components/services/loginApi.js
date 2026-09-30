// const loginData = async (userData) => {
//   try {
//     const apiUrl = `${import.meta.env.VITE_APP_API_URL}/api/v1/auth/login`;

//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: userData.email,
//         password: userData.password,
//       }),
//     });

//     // Use result consistently throughout the function
//     const result = await response.text();

//     console.log("Login API status:", response.status);
//     console.log("Backend response:", result);

//     if (!response.ok) {
//       return {
//         error: result.message || "Login failed",
//       };
//     }

//     // Handle { message, data: { accessToken, user } }
//     // or { accessToken, user }
//     const payload = result.data ?? result;

//     const accessToken = payload.accessToken;
//     const user = payload.user;

//     if (!accessToken || !user) {
//       return {
//         error: "Access token or user data is missing from backend",
//       };
//     }

//     // Save the latest logged-in user's data
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("user", JSON.stringify(user));

//     console.log("Token saved:", !!localStorage.getItem("accessToken"));
//     console.log("User saved:", !!localStorage.getItem("user"));

//     return {
//       data: {
//         accessToken,
//         user,
//       },
//       error: null,
//     };
//   } catch (error) {
//     console.error("LOGIN ERROR:", error);

//     return {
//       error: error.message || "Unable to connect to server",
//     };
//   }
// };

// export default loginData;

const loginData = async (userData) => {
  try {
    const apiUrl = `${import.meta.env.VITE_APP_API_URL}/api/v1/auth/login`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });

    const result = await response.json();

    console.log("Login API status:", response.status);
    console.log("Backend response:", result);

    if (!response.ok) {
      return {
        error: result.message || "Login failed",
      };
    }

    // Extract token and user from the nested data object
    const accessToken = result.data?.accessToken;
    const user = result.data?.user;

    if (!accessToken || !user) {
      return {
        error: "Access token or user data is missing from backend",
      };
    }

    // Save token and user in localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    console.log("Token saved:", !!localStorage.getItem("accessToken"));
    console.log("User saved:", !!localStorage.getItem("user"));

    return {
      data: {
        accessToken,
        user,
      },
      error: null,
    };
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return {
      error: error.message || "Unable to connect to server",
    };
  }
};

export default loginData;
