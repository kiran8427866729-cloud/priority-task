import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";

const Profile = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));

    alert("Profile Updated");

    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="min-h-screen w-full bg-gray-100">
          {/* Page Title */}
          <div className="px-6 pt-6">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>

            <p className="text-gray-500 mt-1">
              Manage your profile and account settings
            </p>
          </div>

          <div className="flex flex-col lg:flex-row p-8 gap-6">
            {/* Edit Profile Card */}
            <div className="bg-white mt-4 w-full lg:w-1/2 mx-0 p-7 rounded-2xl shadow-md border border-gray-100">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Edit Profile
              </h1>

              <p className="text-gray-500 mb-6">
                Update your photo, contact details, and personal information
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl mb-5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-200"
              />

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                readOnly
                value={user.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl mb-6 bg-gray-50 text-gray-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />

              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition duration-200"
              >
                Save Profile
              </button>
            </div>

            {/* Change Password Card */}
            <div className="bg-white mt-4 w-full lg:w-1/2 mx-0 p-7 rounded-2xl shadow-md border border-gray-100">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                Change Password
              </h1>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>

                <input
                  type="password"
                  name="currentPassword"
                  autoComplete="new-password"
                  className="w-full border border-gray-300 p-3 rounded-xl mb-5 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition duration-200"
                />
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>

              <input
                type="password"
                name="new password"
                className="w-full border border-gray-300 p-3 rounded-xl mb-5 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition duration-200"
              />

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>

              <input
                type="password"
                name="confirm new password"
                className="w-full border border-gray-300 p-3 rounded-xl mb-6 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition duration-200"
              />

              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
