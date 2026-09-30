import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useActionState } from "react";
import loginData from "../services/loginApi";
const Login = () => {
  const navigate = useNavigate();

  const handleInput = async (prevState, formData) => {
    const userData = Object.fromEntries(formData);

    try {
      const result = await loginData(userData);

      console.log("Login response:", result);

      if (result.error) {
        return { error: result.error };
      }

      // Check token
      if (!result.data?.accessToken) {
        return {
          error: "Access token not received from backend",
        };
      }

      // Save token and user
      localStorage.setItem("accessToken", result.data.accessToken);

      localStorage.setItem("user", JSON.stringify(result.data.user));

      // Navigate to dashboard
      navigate("/dashboard");

      return { error: null };
    } catch (error) {
      console.error("Login error:", error);

      return { error: error.message };
    }
  };
  const [data, action, pending] = useActionState(handleInput, {
    error: null,
  });

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="relative w-1/2">
        <img
          src="https://img.magnific.com/free-photo/gradient-iphone-wallpaper-oil-bubble-water-background_53876-176849.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Wallpaper"
          className="w-full h-screen object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold">Welcome Back!</h1>

          <p className="text-xl mt-4">Manage your team's tasks with ease</p>
        </div>
      </div>

      {/* Right side */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <form
          action={action}
          className="bg-white w-96 border border-red-200 rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Login</h2>

          {/* Email */}
          <div className="relative mb-5">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border rounded-md py-2 pl-10 pr-3"
              disabled={pending}
            />
          </div>

          {/* Password */}
          <div className="relative mb-5">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border rounded-md py-2 pl-10 pr-3"
              disabled={pending}
            />
          </div>

          {/* Error */}
          {data?.error && (
            <p className="text-red-500 text-sm mb-4">{data.error}</p>
          )}

          {/* Remember + Forgot Password */}
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="rememberMe" disabled={pending} />

              <span className="text-sm">Remember Me</span>
            </label>

            <Link to="/forgotPassword" className="text-blue-600 text-sm">
              Forgot Password?
            </Link>
          </div>

          {/* Login */}
          <button
            type="submit"
            disabled={pending}
            className="w-full bg-black text-white py-2 rounded-md disabled:opacity-50"
          >
            {pending ? "Logging in..." : "Login"}
          </button>

          {/* Register */}
          <p className="text-center mt-5 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
