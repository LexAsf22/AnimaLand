import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Employee() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ total: 0, managers: 0, staff: 0 });
  const [roles, setRoles] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  // ---------------- Auto-refresh stats every 2 seconds ----------------
  useEffect(() => {
    if (!token) return;

    async function fetchStats() {
      try {
        const res = await api.get("/employee/stats", authHeaders);
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 2000);
    return () => clearInterval(interval);
  }, [token]);

  // ---------------- Fetch roles + contacts whenever stats updates ----------------
  useEffect(() => {
    if (!token) return;

    async function fetchData() {
      try {
        setLoading(true);

        const [rolesRes, contactsRes] = await Promise.all([
          api.get("/employee/roles", authHeaders),
          api.get("/employee/contacts", authHeaders),
        ]);

        const totalEmployees = stats.total || 1;

        const roleData = rolesRes.data.map((role) => {
          let count =
            role === "Manager"
              ? stats.managers
              : role === "Staff"
              ? stats.staff
              : 0;

          return {
            role,
            percentage: Math.round((count / totalEmployees) * 100),
          };
        });

        setRoles(roleData);
        setContacts(contactsRes.data);
      } catch (err) {
        console.error("Error fetching roles or contacts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token, stats]);

  if (loading)
    return (
      <div className="p-8 text-center text-gray-500">Loading employee data...</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-gray-800 mb-3">
            Employee Dashboard
          </h1>
          <p className="text-gray-600">
            Track employee count, roles, and contact information for better team
            management.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Employees"
            value={stats.total}
            trend="↑ 2% from last month"
            color="pink"
          />
          <StatCard
            title="Managers"
            value={stats.managers}
            trend="↑ 1% from last month"
            color="pink"
          />
          <StatCard
            title="Staff"
            value={stats.staff}
            trend="Up to date"
            color="pink"
          />
        </div>

        {/* Roles + Contacts */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100">
            <h2 className="text-2xl font-serif text-gray-800 mb-6">
              Roles Distribution
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Roles */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  By Role
                </h3>

                <div className="space-y-3">
                  {roles.map((r, idx) => (
                    <div className="flex items-center justify-between" key={idx}>
                      <span className="text-gray-600">{r.role}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-3 bg-pink-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-pink-400 to-rose-400"
                            style={{ width: `${r.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {r.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contacts */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Employee Contacts
                </h3>

                <div className="space-y-3">
                  {contacts.length > 0 ? (
                    contacts.map((c, idx) => (
                      <div
                        className="flex items-center justify-between"
                        key={idx}
                      >
                        <span className="text-gray-600">{c.name}</span>
                        <span className="text-sm font-medium text-gray-700">
                          {c.email}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No contacts found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- Stats Card Component ----------------
function StatCard({ title, value, trend, color }) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-${color}-100 flex items-center justify-between`}
    >
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <p className={`text-sm text-${color}-500 mt-2`}>{trend}</p>
      </div>
      <div
        className={`w-16 h-16 bg-gradient-to-br from-${color}-400 to-rose-400 rounded-full flex items-center justify-center`}
      >
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
    </div>
  );
}
