const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    console.log("Refresh token:", refreshToken);

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/auth/refresh`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      }
    );

    const data = await response.json();

    console.log("Refresh API response:", data);

    if (!response.ok) {
      throw new Error(
        data?.error?.message || "Refresh token failed"
      );
    }

    // Save new access token
    localStorage.setItem(
      "accessToken",
      data.data.accessToken
    );

    return data.data.accessToken;

  } catch (error) {
    console.log("Refresh error:", error.message);
    throw error;
  }
};

export default refreshAccessToken;