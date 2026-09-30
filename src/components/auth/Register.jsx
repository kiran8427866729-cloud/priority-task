import toast from "react-hot-toast";
import registerUser from "../services/registerApi";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useActionState } from "react";
import { loginValidate } from "../utlis/validation";

const Register = () => {
  const navigate = useNavigate();

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleInput = async (prevState, formData) => {
    const name = formData.get("name");
   
    const email = formData.get("email");
    const password = formData.get("password");


    if (!name) {
      return {
        error: "Please enter your  name",
      };
    }

    
    if (!email) {
      return {
        error: "Please enter your email",
      };
    }

    if (!password) {
      return {
        error: "Please enter your password",
      };
    }

    if (!regex.test(password)) {
      return {
        error:
          "Password must contain at least 8 characters,including uppercase,lowercase,number and special character.",
      };
    }

    const userData = {
      email,
      password,
     name,
      role: "employee",
    };

    console.log("Data sending to API:", userData);
    try {
      const response = await registerUser(userData);

      console.log("Registration response:", response);

      localStorage.setItem(
        "user",
        JSON.stringify({
         name,
          email,
          password,
        
        }),
      );

      toast.success("Registration successful!");

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);

      toast.error("Registration failed");

      return {
        error: error.message || "Registration failed. Please try again.",
      };
    }
  };

  const [data, action, pending] = useActionState(handleInput, {
    error: "",
  });

  return (
    <div className="min-h-screen flex">
      <div className="relative w-1/2">
        <img
          src="https://img.magnific.com/free-photo/gradient-iphone-wallpaper-oil-bubble-water-background_53876-176849.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Wallpaper"
          className="w-full min-h-screen object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/30">
          <h1 className="text-5xl font-bold">Welcome Back!</h1>

          <p className="text-xl mt-4">Manage your team's tasks with ease</p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="w-96 bg-white p-6 border border-red-300 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-center mb-5">
            Create Account
          </h2>

          <form action={action} onsubmit={handlePage}>
            <div className="relative mb-4">
              <FaUser className="absolute left-3 top-3 text-gray-500" />

              <input
                type="text"
                placeholder="name"
                name="name"
                className="w-full border rounded py-2 pl-10"
              />
            </div>
            
            
           
            <div className="relative mb-4">
              <FaEnvelope className="absolute left-3 top-3 text-gray-500" />

              <input
                type="email"
                placeholder="Email"
                name="email"
                className="w-full border rounded py-2 pl-10"
              />
            </div>

            <div className="relative mb-4">
              <FaLock className="absolute left-3 top-3 text-gray-500" />

              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-full border rounded py-2 pl-10"
              />
            </div>

          

            {data.error && (
              <p className="text-red-500 text-sm mb-4">{data.error}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-black text-white py-2 rounded"
            >
              {pending ? "Registering..." : "Register"}
            </button>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/" className="text-blue-600">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
