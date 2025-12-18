import { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [recentPets, setRecentPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartView, setChartView] = useState("weekly"); // 'weekly' or 'monthly'

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const [
          statsRes,
          appointmentsRes,
          petsRes,
          staffRes,
          trendsRes,
          missedRes,
          remindersRes,
        ] = await Promise.all([
          api.get("/dashboard/stats"),
          api.get("/dashboard/recent"),
          api.get("/dashboard/recent-pets"),
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
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pink-200 border-t-pink-500 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-t-4 border-pink-400">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Welcome to Your Clinic Dashboard
          </h1>
          <p className="text-gray-600">
            Here's what's happening in your veterinary clinic today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Employees"
            value={stats?.totalEmployees || 0}
            color="pink"
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
          />
          <StatCard
            title="Appointments"
            value={stats?.totalAppointments || 0}
            color="blue"
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            }
          />
          <StatCard
            title="Registered Pets"
            value={stats?.totalPets || 0}
            color="green"
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
            }
          />
          <StatCard
            title="Pet Owners"
            value={stats?.totalOwners || 0}
            color="amber"
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            }
          />
        </div>

        {/* Recent Appointments & Pets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Recent Appointments</h2>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {recentAppointments.length}
              </span>
            </div>
            <div className="p-6">
              {recentAppointments.length > 0 ? (
                <div className="space-y-3">
                  {recentAppointments.map((appt) => (
                    <AppointmentItem key={appt.appointmentId} activity={appt} />
                  ))}
                </div>
              ) : (
                <EmptyState icon="calendar" message="No recent appointments" />
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Recently Added Pets</h2>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {recentPets.length}
              </span>
            </div>
            <div className="p-6">
              {recentPets.length > 0 ? (
                <div className="space-y-3">
                  {recentPets.map((pet) => (
                    <PetItem key={pet.petId} pet={pet} />
                  ))}
                </div>
              ) : (
                <EmptyState icon="paw" message="No recently added pets" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------ Components ------------------

function StatCard({ title, value, color, icon }) {
  const colorClasses = {
    pink: { gradient: "from-pink-500 to-rose-500", bg: "bg-pink-50", text: "text-pink-600" },
    blue: { gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50", text: "text-blue-600" },
    green: { gradient: "from-green-500 to-emerald-500", bg: "bg-green-50", text: "text-green-600" },
    amber: { gradient: "from-amber-500 to-orange-500", bg: "bg-amber-50", text: "text-amber-600" },
  };
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className={`bg-gradient-to-r ${colors.gradient} p-4`}>
        <div className={`${colors.bg} p-3 rounded-xl ${colors.text}`}>
          {icon}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">{title}</h3>
        <p className="text-4xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function StaffCard({ staff }) {
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    busy: 'bg-yellow-100 text-yellow-800',
    offline: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border-2 border-teal-100 hover:border-teal-200 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {staff.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{staff.name}</p>
          <p className="text-sm text-gray-600">{staff.role}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[staff.status]}`}>
          {staff.status}
        </span>
        <span className="text-xs text-gray-500">{staff.shiftStart} - {staff.shiftEnd}</span>
      </div>
    </div>
  );
}

function BarChart({ data, labels, color }) {
  if (!data || data.length === 0) return <div className="text-center text-gray-500">No data available</div>;
  
  const maxValue = Math.max(...data, 1);
  
  const colorMap = {
    indigo: { bar: 'bg-indigo-500', hover: 'hover:bg-indigo-600' },
    purple: { bar: 'bg-purple-500', hover: 'hover:bg-purple-600' }
  };
  
  const colors = colorMap[color] || colorMap['indigo'];
  
  return (
    <div className="flex items-end gap-2 h-48">
      {data.map((val, idx) => (
        <div key={idx} className="flex-1 flex flex-col justify-end">
          <div className={`${colors.bar} ${colors.hover} transition-all duration-300`} style={{ height: `${(val / maxValue) * 100}%` }}></div>
          <p className="text-xs text-gray-600 mt-1 text-center">{labels[idx]}</p>
        </div>
      ))}
    </div>
  );
}

function MissedAppointmentItem({ appointment }) {
  return (
    <div className="border border-red-200 rounded-xl p-3 flex justify-between items-center">
      <div>
        <p className="font-semibold text-red-600">{appointment.petName}</p>
        <p className="text-xs text-gray-500">{appointment.ownerName}</p>
      </div>
      <p className="text-xs text-gray-500">{appointment.date}</p>
    </div>
  );
}

function FollowUpReminderItem({ reminder }) {
  return (
    <div className="border border-amber-200 rounded-xl p-3 flex justify-between items-center">
      <div>
        <p className="font-semibold text-amber-600">{reminder.petName}</p>
        <p className="text-xs text-gray-500">{reminder.ownerName}</p>
      </div>
      <p className="text-xs text-gray-500">{reminder.date}</p>
    </div>
  );
}

function AppointmentItem({ activity }) {
  return (
    <div className="border border-pink-200 rounded-xl p-3 flex justify-between items-center">
      <div>
        <p className="font-semibold text-pink-600">{activity.petName}</p>
        <p className="text-xs text-gray-500">{activity.ownerName}</p>
      </div>
      <p className="text-xs text-gray-500">{activity.date}</p>
    </div>
  );
}

function PetItem({ pet }) {
  return (
    <div className="border border-purple-200 rounded-xl p-3 flex justify-between items-center">
      <div>
        <p className="font-semibold text-purple-600">{pet.name}</p>
        <p className="text-xs text-gray-500">{pet.type}</p>
      </div>
      <p className="text-xs text-gray-500">{pet.dateAdded}</p>
    </div>
  );
}

function EmptyState({ icon, message }) {
  const icons = {
    calendar: '📅',
    bell: '🔔',
    paw: '🐾'
  };
  
  return (
    <div className="text-center text-gray-400 py-10 text-lg">
      <div className="text-4xl mb-2">{icons[icon] || 'ℹ️'}</div>
      {message}
    </div>
  );
}
