import { useNavigate } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
const ForgetPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* Left Image */}
      <div className="relative w-full lg:w-1/2 h-64 lg:h-screen">
        <img
          src="https://img.magnific.com/free-photo/gradient-iphone-wallpaper-oil-bubble-water-background_53876-176849.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Wallpaper"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl lg:text-5xl font-bold">
            Welcome Back!
          </h1>

          <p className="text-lg lg:text-xl mt-4 text-center px-4">
            Manage your team's tasks with ease
          </p>
        </div>
      </div>

       {/* Right Form  */}
      <div className="w-full lg:w-1/2 flex justify-center items-center  bg-gray-100 p-6">

        <div className="bg-white w-full max-w-md rounded-xl border-red-300 border shadow-lg p-8">

          <h1 className="text-2xl text-bold font-bold text-center">
            Forgot Your Password
          </h1>

          <p className="text-sm text-center mt-4">
            Enter your email and we'll send you a link to
            <br />
            reset your password.
          </p>

          <div className="relative mt-6">
            <label>Email</label>

            <IoIosMail className="absolute left-3 top-11 text-gray-500 text-xl" />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border mt-2 border-gray-300 rounded-xl py-2 pl-10"
            />
          </div>

          <button className="w-full bg-black text-white mt-6 py-2 rounded-md">
            Reset Password
          </button>

          <button
            onClick={() => navigate("/")}
            className=" flex mt-2 w-full items-center justify-center gap-2 text-blue-600"
          >
              <FaArrowLeft/>
            Back to Login
          
          </button>

        </div>

      </div>

    </div>
  );
};

export default ForgetPassword;