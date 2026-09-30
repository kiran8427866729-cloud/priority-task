// import { NavLink } from "react-router-dom";
// import { LuLayoutDashboard } from "react-icons/lu";
// import { useState } from "react";
// import {
//   FaUsers,
//   FaUserTie,
//   FaChartBar,
//   FaUserCog,
//   FaUser,
//   FaTimes,
//   FaBars,
// } from "react-icons/fa";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const user=JSON.parse(localStorage.getItem("user"));
//   const role=user?.role

//   return (
//     <>
//       <div
//      className={`min-h-screen bg-gray-700 text-white overflow-hidden transition-all duration-300 ${
//            isOpen ? "w-64" : "w-16"
//       }`}
//     >
//       <div className="flex items-center justify-between p-4">

//         {isOpen && (
//           <h1 className="text-xl font-bold">
//             WORKBOARD
//           </h1>
//         )}

//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="text-xl"
//         >
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </button>

//       </div>

//         <nav className="flex flex-col mt-10 mr-5 ml-3">
//           <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               `flex items-center p-2 mt-5 ${isOpen?"gap-3":"justify-center"} ${
//                 isActive ? "bg-blue-500 text-white" : "text-white"
//               }`}
//           >
//             <LuLayoutDashboard />
//             {isOpen && <span>Dashboard</span>}
//           </NavLink>

//           <NavLink
//             to="/teams"
//             className={({ isActive }) =>
//               `flex items-center p-2 mt-5 ${isOpen? "gap-3" :"justify-center"} ${
//                 isActive ? "bg-blue-500 text-white" : "text-white"
//               }`
//             }
//           >
//             <FaUsers />
//           {isOpen &&  <span>Teams</span>}
//           </NavLink>

//           <NavLink
//             to="/Employee"
//             className={({ isActive }) =>
//               `flex items-center p-2 mt-5 ${isOpen? "gap-3" :"justify-center"} ${
//                 isActive ? "bg-blue-500 text-white" : "text-white"
//               }`
//             }
//           > <FaUserTie />

//           {isOpen &&  <span>Employee</span>}
//           </NavLink>

//           <NavLink
//             to="/Tasks"
//             className={({ isActive }) =>
//               `flex items-center p-2 mt-5 ${isOpen?"gap-3" : "justify-center"} ${
//                 isActive ? "bg-blue-500 text-white" : "text-white"
//               }`
//             }
//           >
//             <FaChartBar />
//             {isOpen && <span>Tasks</span>}
//           </NavLink>

//           <NavLink
//             to="/profile"
//             className={({ isActive }) =>
//               `flex items-center p-2 mt-5   ${isOpen? "gap-3":"justify-center"} ${
//                 isActive ? "bg-blue-500 text-white" : "text-white"
//               }`
//             }
//           >
//             <FaUser />
//             {isOpen &&<span>Profile</span>}
//           </NavLink>

//         </nav>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { useState } from "react";
import {
  FaUsers,
  FaUserTie,
  FaChartBar,
  FaUserCog,
  FaUser,
  FaTimes,
  FaBars,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  return (
    <>
      <div
        className={`min-h-screen bg-gray-700 text-white overflow-hidden transition-all duration-300 shadow-xl ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          {isOpen && (
            <h1 className="text-xl font-bold tracking-wider">WORKBOARD</h1>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xl p-2 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col mt-8 mr-4 ml-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center p-3 mt-3 rounded-lg transition-all duration-200 ${
                isOpen ? "gap-3" : "justify-center"
              } ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-200 hover:bg-gray-600 hover:text-white"
              }`
            }
          >
            <LuLayoutDashboard className="text-xl" />
            {isOpen && <span>Dashboard</span>}
          </NavLink>

          <NavLink
            to="/teams"
            className={({ isActive }) =>
              `flex items-center p-3 mt-3 rounded-lg transition-all duration-200 ${
                isOpen ? "gap-3" : "justify-center"
              } ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-200 hover:bg-gray-600 hover:text-white"
              }`
            }
          >
            <FaUsers className="text-xl" />
            {isOpen && <span>Teams</span>}
          </NavLink>

          <NavLink
            to="/Employee"
            className={({ isActive }) =>
              `flex items-center p-3 mt-3 rounded-lg transition-all duration-200 ${
                isOpen ? "gap-3" : "justify-center"
              } ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-200 hover:bg-gray-600 hover:text-white"
              }`
            }
          >
            <FaUserTie className="text-xl" />
            {isOpen && <span>Employee</span>}
          </NavLink>

          <NavLink
            to="/Tasks"
            className={({ isActive }) =>
              `flex items-center p-3 mt-3 rounded-lg transition-all duration-200 ${
                isOpen ? "gap-3" : "justify-center"
              } ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-200 hover:bg-gray-600 hover:text-white"
              }`
            }
          >
            <FaChartBar className="text-xl" />
            {isOpen && <span>Tasks</span>}
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center p-3 mt-3 rounded-lg transition-all duration-200 ${
                isOpen ? "gap-3" : "justify-center"
              } ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-200 hover:bg-gray-600 hover:text-white"
              }`
            }
          >
            <FaUser className="text-xl" />
            {isOpen && <span>Profile</span>}
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;