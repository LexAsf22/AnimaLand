import { useEffect, useState } from "react";

// Mock API - Replace with your actual API calls
const mockApi = {
  get: async (endpoint) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (endpoint === "/dashboard/stats") {
      return { data: { totalEmployees: 3, totalAppointments: 1, totalPets: 2, totalOwners: 1 } };
    }
    if (endpoint === "/dashboard/recent") {
      return { data: [{ appointmentId: 4, petName: "hihi", ownerName: "John Doe", serviceName: "Checkup", appointmentDatetime: "2025-12-16 10:00 AM" }] };
    }
    if (endpoint === "/dashboard/recent-pets") {
      return { data: [{ petId: 1, name: "hihi", species: "Dog", breed: "Labrador" }, { petId: 2, name: "Mimi", species: "Cat", breed: "Persian" }] };
    }
    if (endpoint === "/dashboard/staff-on-duty") {
      return { data: [
        { employeeId: 1, name: "Dr. Sarah Johnson", role: "Veterinarian", status: "available", shiftStart: "08:00 AM", shiftEnd: "04:00 PM" },
        { employeeId: 2, name: "Mike Chen", role: "Vet Tech", status: "busy", shiftStart: "09:00 AM", shiftEnd: "05:00 PM" },
        { employeeId: 3, name: "Emma Wilson", role: "Receptionist", status: "available", shiftStart: "07:00 AM", shiftEnd: "03:00 PM" }
      ]};
    }
    if (endpoint === "/dashboard/appointment-trends") {
      return { data: {
        weekly: [12, 15, 18, 14, 20, 17, 22],
        monthly: [45, 52, 48, 60, 55, 58, 62, 70, 65, 72, 68, 75],
        labels: { weekly: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }
      }};
    }
    if (endpoint === "/dashboard/missed-appointments") {
      return { data: [
        { appointmentId: 12, petName: "Buddy", ownerName: "Alice Smith", ownerPhone: "555-0123", appointmentDate: "2025-12-15", reason: "No show" },
        { appointmentId: 8, petName: "Whiskers", ownerName: "Bob Jones", ownerPhone: "555-0456", appointmentDate: "2025-12-14", reason: "Canceled late" }
      ]};
    }
    if (endpoint === "/dashboard/follow-up-reminders") {
      return { data: [
        { reminderId: 1, petName: "Max", ownerName: "Carol White", service: "Vaccination follow-up", dueDate: "2025-12-18", priority: "high" },
        { reminderId: 2, petName: "Luna", ownerName: "David Brown", service: "Post-surgery check", dueDate: "2025-12-20", priority: "medium" },
        { reminderId: 3, petName: "Charlie", ownerName: "Eve Davis", service: "Dental cleaning reminder", dueDate: "2025-12-22", priority: "low" }
      ]};
    }
    return { data: [] };
  }
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [recentPets, setRecentPets] = useState([]);
  const [staffOnDuty, setStaffOnDuty] = useState([]);
  const [appointmentTrends, setAppointmentTrends] = useState(null);
  const [missedAppointments, setMissedAppointments] = useState([]);
  const [followUpReminders, setFollowUpReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartView, setChartView] = useState('weekly'); // 'weekly' or 'monthly'

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const [statsRes, appointmentsRes, petsRes, staffRes, trendsRes, missedRes, remindersRes] = await Promise.all([
          mockApi.get("/dashboard/stats"),
          mockApi.get("/dashboard/recent"),
          mockApi.get("/dashboard/recent-pets"),
          mockApi.get("/dashboard/staff-on-duty"),
          mockApi.get("/dashboard/appointment-trends"),
          mockApi.get("/dashboard/missed-appointments"),
          mockApi.get("/dashboard/follow-up-reminders")
        ]);

        setStats(statsRes.data);
        setRecentAppointments(appointmentsRes.data);
        setRecentPets(petsRes.data);
        setStaffOnDuty(staffRes.data);
        setAppointmentTrends(trendsRes.data);
        setMissedAppointments(missedRes.data);
        setFollowUpReminders(remindersRes.data);
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

        {/* Staff on Duty Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h2 className="text-xl font-bold text-white">Staff on Duty Today</h2>
              </div>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {staffOnDuty.length} Active
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {staffOnDuty.map((staff) => (
                <StaffCard key={staff.employeeId} staff={staff} />
              ))}
            </div>
          </div>
        </div>

        {/* Appointment Trends Chart */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h2 className="text-xl font-bold text-white">Appointment Trends</h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setChartView('weekly')}
                  className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${
                    chartView === 'weekly' ? 'bg-white text-indigo-600' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setChartView('monthly')}
                  className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${
                    chartView === 'monthly' ? 'bg-white text-indigo-600' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <BarChart 
              data={chartView === 'weekly' ? appointmentTrends.weekly : appointmentTrends.monthly}
              labels={appointmentTrends.labels[chartView]}
              color={chartView === 'weekly' ? 'indigo' : 'purple'}
            />
          </div>
        </div>

        {/* Missed Appointments & Follow-up Reminders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Missed Appointments */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-rose-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-xl font-bold text-white">Missed Appointments</h2>
                </div>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {missedAppointments.length}
                </span>
              </div>
            </div>
            <div className="p-6">
              {missedAppointments.length > 0 ? (
                <div className="space-y-3">
                  {missedAppointments.map((appt) => (
                    <MissedAppointmentItem key={appt.appointmentId} appointment={appt} />
                  ))}
                </div>
              ) : (
                <EmptyState icon="calendar" message="No missed appointments" />
              )}
            </div>
          </div>

          {/* Follow-up Reminders */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <h2 className="text-xl font-bold text-white">Follow-up Reminders</h2>
                </div>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {followUpReminders.length}
                </span>
              </div>
            </div>
            <div className="p-6">
              {followUpReminders.length > 0 ? (
                <div className="space-y-3">
                  {followUpReminders.map((reminder) => (
                    <FollowUpReminderItem key={reminder.reminderId} reminder={reminder} />
                  ))}
                </div>
              ) : (
                <EmptyState icon="bell" message="No follow-up reminders" />
              )}
            </div>
          </div>
        </div>

        {/* Recent Appointments & Pets */}
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
                <EmptyState icon="calendar" message="No recent appointments" />
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
                <EmptyState icon="paw" message="No recently added pets" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Components
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
  
  const maxValue = Math.max(...data, 1); // Ensure at least 1 to avoid division by zero
  
  const colorMap = {
    indigo: { bar: 'bg-indigo-500', hover: 'hover:bg-indigo-600' },
    purple: { bar: 'bg-purple-500', hover: 'hover:bg-purple-600' }
  };

  const colors = colorMap[color] || colorMap.indigo;

  return (
    <div className="w-full">
      <div className="flex items-end justify-around gap-3 h-64 px-2">
        {data.map((value, idx) => {
          // Calculate height as percentage, minimum 20% for visibility
          const heightPercent = Math.max((value / maxValue) * 100, 8);
          
          return (
            <div key={idx} className="flex flex-col items-center gap-2 flex-1 max-w-20">
              {/* Bar container */}
              <div className="w-full flex flex-col items-center justify-end" style={{ height: '240px' }}>
                {/* Value label on top of bar */}
                <div className="text-sm font-bold text-gray-700 mb-2">{value}</div>
                
                {/* The actual bar */}
                <div 
                  className={`w-full ${colors.bar} ${colors.hover} rounded-t-lg transition-all duration-300 shadow-md`}
                  style={{ 
                    height: `${heightPercent}%`,
                    minHeight: '30px' // Ensure minimum visible height
                  }}
                />
              </div>
              
              {/* Label below bar */}
              <div className="text-xs text-gray-600 font-medium text-center whitespace-nowrap">
                {labels[idx]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MissedAppointmentItem({ appointment }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border-2 border-red-100">
      <div className="flex-shrink-0 w-10 h-10 bg-red-400 rounded-full flex items-center justify-center text-white">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{appointment.petName}</p>
        <p className="text-sm text-gray-600">{appointment.ownerName} • {appointment.ownerPhone}</p>
        <p className="text-xs text-gray-500 mt-1">{appointment.appointmentDate} • {appointment.reason}</p>
      </div>
      <button className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors">
        Contact
      </button>
    </div>
  );
}

function FollowUpReminderItem({ reminder }) {
  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  return (
    <div className={`p-4 rounded-xl border-2 ${priorityColors[reminder.priority]}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{reminder.petName}</p>
          <p className="text-sm text-gray-600">{reminder.ownerName}</p>
        </div>
        <span className="text-xs font-semibold uppercase px-2 py-1 rounded bg-white/50">
          {reminder.priority}
        </span>
      </div>
      <p className="text-sm text-gray-700 mb-1">{reminder.service}</p>
      <p className="text-xs text-gray-600">Due: {reminder.dueDate}</p>
    </div>
  );
}

function AppointmentItem({ activity }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border-2 border-pink-100 hover:border-pink-200 transition-colors duration-200">
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
        {activity.appointmentId}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 mb-1">{activity.petName}</p>
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

function EmptyState({ icon, message }) {
  const icons = {
    calendar: (
      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    paw: (
      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
    bell: (
      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    )
  };

  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {icons[icon]}
      </div>
      <p className="text-gray-500 font-medium">{message}</p>
    </div>
  );
}