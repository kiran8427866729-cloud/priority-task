import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { CiLogout, CiSearch } from "react-icons/ci";
import Register from "../auth/Register";
import logoutApi from "../services/logout";
const ProfileSection = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.log("Logout API failed:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      navigate("/");
    }
  };
  const [showMenu, setShowMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const firstLetter = user.name?.charAt(0).toUpperCase();
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        //it checks two condition whether menuRef exist orclick outside the div or not
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="flex bg-gray-700 justify-end items-center p-4 ">
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-12 h-12 rounded-full bg-blue-400 text-white font-semibold"
        >
          {firstLetter}
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-3 w-50 bg-white border border-gray-200 rounded-2xl shadow-lg transition overflow-hidden">
            <div className="px-5 py-4">
              <h1 className="font-semibold text-gray-800">{user.firstName}</h1>

              <p className="text-sm text-gray-500">{user.role}</p>
            </div>

            <hr />

            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 w-full px-5 py-3 hover:bg-gray-100 transition" //make changes like hover effect changes smoothly
            >
              <FaUser className="text-gray-700" />
              <span>My Profile</span>
            </button>

            <hr />

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-5 py-3 hover:bg-red-50 transition"
            >
              <CiLogout className="text-red-600 text-xl" />
              <span className="text-red-800">Log Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
