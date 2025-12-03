export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back to AnimaLand Vet Clinic</p>
            </div>
          </div>
          <p className="text-gray-600 max-w-3xl">
            Monitor your clinic's activity and keep track of important stats. Your compassionate care makes all the difference. 🐾
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Active Patients Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-400 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-pink-600 bg-pink-100 px-3 py-1 rounded-full">+12%</span>
            </div>
            <h2 className="text-lg font-medium text-gray-600 mb-2">Active Patients</h2>
            <p className="text-4xl font-bold text-gray-800">128</p>
            <p className="text-sm text-gray-500 mt-3">Registered this month</p>
          </div>

          {/* Appointments Today Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-400 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-pink-600 bg-pink-100 px-3 py-1 rounded-full">Today</span>
            </div>
            <h2 className="text-lg font-medium text-gray-600 mb-2">Appointments Today</h2>
            <p className="text-4xl font-bold text-gray-800">24</p>
            <p className="text-sm text-gray-500 mt-3">6 pending, 18 completed</p>
          </div>

          {/* Service Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-400 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-pink-600 bg-pink-100 px-3 py-1 rounded-full">Service</span>
            </div>
            <h2 className="text-lg font-medium text-gray-600 mb-2">Service Details</h2>
            <p className="text-2xl font-bold text-gray-800">Grooming</p> {/* service_name */}
            <p className="text-sm text-gray-500 mt-1">Type: Pet Care</p> {/* service_type */}
            <p className="text-sm text-gray-500">Price: ₱1,200</p> {/* price */}
            <p className="text-sm text-gray-500">Duration: 45 mins</p> {/* duration */}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100 mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 border border-pink-200 transition-all hover:scale-105 hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">New Patient</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 border border-pink-200 transition-all hover:scale-105 hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Schedule</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 border border-pink-200 transition-all hover:scale-105 hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Records</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 border border-pink-200 transition-all hover:scale-105 hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Analytics</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100">
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">MP</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Max (Poodle) - Vaccination</p>
                <p className="text-sm text-gray-500">Completed 2 hours ago</p>
              </div>
              <span className="text-xs font-medium text-pink-600 bg-pink-100 px-3 py-1 rounded-full">Complete</span>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">LC</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Luna (Cat) - Check-up</p>
                <p className="text-sm text-gray-500">Scheduled in 1 hour</p>
              </div>
              <span className="text-xs font-medium text-amber-600 bg-amber-100 px-3 py-1 rounded-full">Pending</span>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">BR</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">Buddy (Rabbit) - Grooming</p>
                <p className="text-sm text-gray-500">In progress</p>
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
