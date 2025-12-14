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
          <p className="text-gray-600">Here's what's happening in your veterinary clinic today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Employees" 
            value={stats?.totalEmployees || 0} 
            color="pink"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatCard 
            title="Appointments" 
            value={stats?.totalAppointments || 0} 
            color="blue"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />
          <StatCard 
            title="Registered Pets" 
            value={stats?.totalPets || 0} 
            color="green"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            }
          />
          <StatCard 
            title="Pet Owners" 
            value={stats?.totalOwners || 0} 
            color="amber"
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Appointments */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h2 className="text-xl font-bold text-white">Recent Appointments</h2>
                </div>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {recentAppointments.length}
                </span>
              </div>
            </div>
            <div className="p-6">
              {recentAppointments.length > 0 ? (
                <div className="space-y-3">
                  {recentAppointments.map((appt) => (
                    <AppointmentItem key={appt.appointmentId} activity={appt} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">No recent appointments</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Pets */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <h2 className="text-xl font-bold text-white">Recently Added Pets</h2>
                </div>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {recentPets.length}
                </span>
              </div>
            </div>
            <div className="p-6">
              {recentPets.length > 0 ? (
                <div className="space-y-3">
                  {recentPets.map((pet) => (
                    <PetItem key={pet.petId} pet={pet} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">No recently added pets</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// StatCard Component
function StatCard({ title, value, color, icon }) {
  const colorClasses = {
    pink: {
      gradient: "from-pink-500 to-rose-500",
      bg: "bg-pink-50",
      text: "text-pink-600",
      border: "border-pink-200"
    },
    blue: {
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200"
    },
    green: {
      gradient: "from-green-500 to-emerald-500",
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200"
    },
    amber: {
      gradient: "from-amber-500 to-orange-500",
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-200"
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className={`bg-gradient-to-r ${colors.gradient} p-4`}>
        <div className="flex items-center justify-between">
          <div className={`${colors.bg} p-3 rounded-xl ${colors.text}`}>
            {icon}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">{title}</h3>
        <p className="text-4xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

// AppointmentItem Component
function AppointmentItem({ activity }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border-2 border-pink-100 hover:border-pink-200 transition-colors duration-200">
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
        {activity.appointmentId}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 mb-1">
          {activity.petName}
        </p>
        <div className="space-y-1">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {activity.ownerName}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {activity.serviceName}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {activity.appointmentDatetime}
          </p>
        </div>
      </div>
    </div>
  );
}

// PetItem Component
function PetItem({ pet }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-100 hover:border-purple-200 transition-colors duration-200">
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
        {pet.name ? pet.name[0].toUpperCase() : '?'}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 mb-1">{pet.name}</p>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {pet.species}
          </span>
          {pet.breed && (
            <span className="text-sm text-gray-600">{pet.breed}</span>
          )}
        </div>
      </div>
    </div>
  );
}