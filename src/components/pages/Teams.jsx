import { useEffect, useState } from "react";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import AddTeams from "../AddTeams";
import { FaPlus, FaUsers, FaSearch } from "react-icons/fa";
import { teamsUser, getTeams } from "../services/teamsApi";
import toast from "react-hot-toast";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get teams
  const fetchTeams = async () => {
    try {
      setLoading(true);

      const result = await getTeams(1, 10, search);

      if (result.success) {
        setTeams(result.data || []);
      } else {
        setTeams([]);
        toast.error(result.message || "Failed to fetch teams");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to fetch teams");
    } finally {
      setLoading(false);
    }
  };

  // Fetch teams
  useEffect(() => {
    fetchTeams();
  }, [search]);

  // Create team
  const addTeam = async (newTeam) => {
    try {
      const result = await teamsUser(newTeam);

      if (!result.success) {
        throw new Error(result.message || "Failed to create team");
      }

      toast.success("Team created successfully");

      setShowForm(false);
      setSearch("");

      fetchTeams();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create team");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="mr-6 flex-1">
        <Header />

        <main className="p-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                <FaUsers className="text-lg text-white" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Team Management
                </h1>

                <p className="text-sm text-gray-500">
                  Manage your organization teams
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700"
            >
              <FaPlus />
              Add Team
            </button>
          </div>

          {/* Teams Card */}
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            {/* Search */}
            <div className="border-b border-gray-200 p-4">
              <div className="relative max-w-md">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search teams..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Team Name
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Description
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Manager
                    </th>

                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                      Members
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-10 text-center text-gray-500"
                      >
                        Loading teams...
                      </td>
                    </tr>
                  ) : teams.length > 0 ? (
                    teams.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-medium text-gray-800">
                          {item.name}
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {item.description || "No description"}
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {item.manager?.name || "No Manager"}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                            {item._count?.members ?? 0}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-10 text-center text-gray-500"
                      >
                        No teams found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Add Team Form */}
      {showForm && (
        <AddTeams addTeam={addTeam} closeForm={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default Teams;
