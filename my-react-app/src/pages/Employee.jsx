
import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Employee() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ total: 0, managers: 0, staff: 0 });
  const [roles, setRoles] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch stats, roles, and contacts once when component mounts
  useEffect(() => {
    if (!token) return;

    async function fetchAllData() {
      try {
        setLoading(true);
        setError("");

        const [statsRes, rolesRes, contactsRes] = await Promise.all([
          api.get("/employee/stats", authHeaders),
          api.get("/employee/roles", authHeaders),
          api.get("/employee/contacts", authHeaders),
        ]);

        setStats(statsRes.data);

        const totalEmployees = statsRes.data.total || 1;
        const roleData = rolesRes.data.map((role) => {
          let count =
            role === "Manager"
              ? statsRes.data.managers
              : role === "Staff"
              ? statsRes.data.staff
              : 0;

          return {
            role,
            count,
            percentage: Math.round((count / totalEmployees) * 100),
          };
        });

        setRoles(roleData);
        setContacts(contactsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load employee data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pink-200 border-t-pink-500 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading employee data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-t-4 border-pink-400">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Employee Dashboard
          </h1>
          <p className="text-gray-600">
            Track employee count, roles, and contact information for better team management
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Employees"
            value={stats.total}
            trend="Up to date"
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
            gradient="from-pink-500 to-rose-500"
          />
          <StatCard
            title="Managers"
            value={stats.managers}
            trend="Up to date"
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
            gradient="from-purple-500 to-indigo-500"
          />
          <StatCard
            title="Staff Members"
            value={stats.staff}
            trend="Up to date"
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
            gradient="from-blue-500 to-cyan-500"
          />
        </div>

        {/* Roles & Contacts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Roles Distribution */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Role Distribution</h2>
            </div>
            <div className="p-6 space-y-6">
              {roles.map((r, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        r.role === 'Manager' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {r.role[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{r.role}</p>
                        <p className="text-sm text-gray-500">{r.count} {r.count === 1 ? 'employee' : 'employees'}</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-gray-700">{r.percentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        r.role === 'Manager'
                          ? 'bg-gradient-to-r from-purple-400 to-indigo-400'
                          : 'bg-gradient-to-r from-blue-400 to-cyan-400'
                      }`}
                      style={{ width: `${r.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Employee Contacts */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Employee Contacts</h2>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">{contacts.length}</span>
            </div>
            <div className="p-6">
              {contacts.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {contacts.map((c, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-100 hover:border-purple-200 transition-colors duration-200"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {c.firstName ? c.firstName[0].toUpperCase() : '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 mb-1">{c.firstName} {c.lastName}</p>
                        <p className="text-sm text-gray-600 truncate">{c.contactNumber}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 font-medium">No contacts found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stats Card Component
function StatCard({ title, value, trend, icon, gradient }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className={`bg-gradient-to-r ${gradient} p-4`}>
        <div className="flex items-center justify-between">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl text-white">{icon}</div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">{title}</h3>
        <p className="text-4xl font-bold text-gray-800 mb-3">{value}</p>
        <span className="text-sm text-green-600 font-medium">{trend}</span>
      </div>
    </div>
  );
}
