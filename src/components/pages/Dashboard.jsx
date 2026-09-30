import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
// import { FaTimes, FaBars } from "react-icons/fa";
// import { CiSearch } from "react-icons/ci";
// import { FaBell } from "react-icons/fa6";
// import { IoMdAdd } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
import { RiListSettingsLine } from "react-icons/ri";
import { FaClock } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
// import { FaUser, FaRegHandSpock } from "react-icons/fa";
import { FaRegHandSpock } from "react-icons/fa";
// import Login from "../auth/Login";
// import loginData from "../services/loginApi";
// import { useState } from "react";
const Dashboard = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex">
      <Sidebar />

      <div className=" flex-1  bg-gray-50">
        <Header />
        <div>
          <h1 className="mt-4 text-xl flex items-center gap-1 font-bold ml-3">
            hello, {userData?.name}
            <FaRegHandSpock className="text-yellow-400" />
          </h1>
        </div>

        <div className="grid  grid-cols-1 md:grid-cols-2 h-80 md:h-60 lg:h-50 lg:grid-cols-3 mt-15 ml-5  gap-10 ">
          <div className="bg-blue-200 text-black flex items-center justify-between  p-1 rounded-lg shadow  ">
            <div>
              <p>Total Tasks</p>
              <p className="text-3xl  font-bold mt-2">110</p>
            </div>
            <RiListSettingsLine className="text-blue-300 text-5xl mr-4  " />
          </div>
          <div className="bg-red-50 text-black-100 flex items-center justify-between  p-1 rounded-lg shadow">
            <div>
              <p>In progress</p>
              <p className="text-3xl  font-bold mt-2">20</p>
            </div>
            <FaClock className="text-purple-300  text-5xl  mr-4 " />
          </div>

          <div className="bg-purple-50 text-black-100 flex items-center justify-between  p-1 rounded-lg shadow">
            <div>
              <p>Completed</p>
              <p className="text-3xl  font-bold mt-2">90</p>
            </div>
            <IoStatsChartSharp className="text-green-300  text-5xl  mr-4" />
          </div>
          <div className="bg-green-100 text-black-100 flex items-center justify-between  p-1 rounded-lg shadow">
            <div>
              <p>Overdue</p>
              <p className="text-3xl  font-bold mt-2">10</p>
            </div>
            <CiClock2 className="text-red-300  text-5xl mr-4 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
