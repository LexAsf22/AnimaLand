import { useEffect, useState } from "react";
import api from "../api/api"; // Axios instance with baseURL
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [recentPets, setRecentPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data once on mount
  useEffect(() => {
    if (!token) return;

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const [statsRes, appointmentsRes, petsRes] = await Promise.all([
          api.get("/dashboard/stats", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/dashboard/recent", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/dashboard/recent-pets", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setStats(statsRes.data);
        setRecentAppointments(appointmentsRes.data);
        setRecentPets(petsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Employees" value={stats.totalEmployees} color="pink" />
          <StatCard title="Appointments" value={stats.totalAppointments} color="blue" />
          <StatCard title="Pets" value={stats.totalPets} color="green" />
          <StatCard title="Owners" value={stats.totalOwners} color="amber" />
        </div>

        {/* Recent Appointments */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Appointments</h2>
          <div className="space-y-4">
            {recentAppointments.map((appt) => (
              <ActivityItem key={appt.appointmentId} activity={appt} />
            ))}
          </div>
        </div>

        {/* Recent Pets */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recently Added Pets</h2>
          <ul className="space-y-2">
            {recentPets.map((pet) => (
              <li key={pet.petId} className="p-4 bg-pink-50 rounded-lg shadow-sm">
                {pet.name} ({pet.species})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// StatCard Component
function StatCard({ title, value, color }) {
  const colorClasses = {
    pink: "from-pink-400 to-pink-500 border-pink-200 text-pink-600",
    blue: "from-blue-400 to-blue-500 border-blue-200 text-blue-600",
    green: "from-green-400 to-green-500 border-green-200 text-green-600",
    amber: "from-amber-400 to-amber-500 border-amber-200 text-amber-600",
  };
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border ${colorClasses[color]}`}>
      <h3 className="text-lg font-medium text-gray-600 mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

// ActivityItem Component
function ActivityItem({ activity }) {
  return (
    <div className="flex items-center justify-between p-4 bg-pink-50 rounded-xl border border-pink-100 shadow-sm">
      <div>
        <p className="font-medium text-gray-800">
          Appointment #{activity.appointmentId} - {activity.petName}
        </p>
        <p className="text-sm text-gray-500">
          {activity.ownerName} | {activity.serviceName} | {activity.appointmentDatetime}
        </p>
      </div>
    </div>
  );
}
