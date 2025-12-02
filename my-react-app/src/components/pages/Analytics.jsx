export default function Analytics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-gray-800 mb-3">Analytics Dashboard</h1>
          <p className="text-gray-600">Track appointment trends, patient visits, and revenue growth over time.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Appointments</p>
                <p className="text-3xl font-bold text-gray-800">1,284</p>
                <p className="text-sm text-pink-500 mt-2">↑ 12% from last month</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Active Patients</p>
                <p className="text-3xl font-bold text-gray-800">842</p>
                <p className="text-sm text-pink-500 mt-2">↑ 8% from last month</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Monthly Revenue</p>
                <p className="text-3xl font-bold text-gray-800">₱48,320</p>
                <p className="text-sm text-pink-500 mt-2">↑ 15% from last month</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100">
            <h2 className="text-2xl font-serif text-gray-800 mb-6">Monthly Appointments</h2>
            <div className="h-64 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl flex items-center justify-center border border-pink-100">
              <div className="text-center">
                <svg className="w-16 h-16 text-pink-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-pink-400 font-medium">Appointment trends visualization</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100">
            <h2 className="text-2xl font-serif text-gray-800 mb-6">Revenue Growth</h2>
            <div className="h-64 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl flex items-center justify-center border border-pink-100">
              <div className="text-center">
                <svg className="w-16 h-16 text-pink-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <p className="text-pink-400 font-medium">Revenue trends visualization</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100">
            <h2 className="text-2xl font-serif text-gray-800 mb-6">Patient Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">By Species</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Dogs</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-3 bg-pink-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-pink-400 to-rose-400" style={{width: '65%'}}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Cats</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-3 bg-pink-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-pink-400 to-rose-400" style={{width: '28%'}}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">28%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Others</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-3 bg-pink-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-pink-400 to-rose-400" style={{width: '7%'}}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">7%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Top Services</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Checkups</span>
                    <span className="text-sm font-medium text-gray-700">452</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Vaccinations</span>
                    <span className="text-sm font-medium text-gray-700">328</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Surgeries</span>
                    <span className="text-sm font-medium text-gray-700">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Grooming</span>
                    <span className="text-sm font-medium text-gray-700">284</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}