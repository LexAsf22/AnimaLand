export default function Employee() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-gray-800 mb-3">Employee Dashboard</h1>
          <p className="text-gray-600">Track employee count, roles, and contact information for better team management.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Employees</p>
                <p className="text-3xl font-bold text-gray-800">24</p>
                <p className="text-sm text-pink-500 mt-2">↑ 2% from last month</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Managers</p>
                <p className="text-3xl font-bold text-gray-800">5</p>
                <p className="text-sm text-pink-500 mt-2">↑ 1% from last month</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Staff Contacts</p>
                <p className="text-3xl font-bold text-gray-800">24</p>
                <p className="text-sm text-pink-500 mt-2">Up to date</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4m-4 8h16a2 2 0 002-2v-5a2 2 0 00-2-2h-1a2 2 0 01-2-2V9a4 4 0 00-8 0v1a2 2 0 01-2 2H4a2 2 0 00-2 2v5a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Charts */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100">
            <h2 className="text-2xl font-serif text-gray-800 mb-6">Roles Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">By Role</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Veterinarian</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-3 bg-pink-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-pink-400 to-rose-400" style={{ width: '40%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">40%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Nurse</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-3 bg-pink-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-pink-400 to-rose-400" style={{ width: '30%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">30%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Receptionist</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-3 bg-pink-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-pink-400 to-rose-400" style={{ width: '20%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">20%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Others</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-3 bg-pink-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-pink-400 to-rose-400" style={{ width: '10%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">10%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Employee Contacts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Dr. Anna Cruz</span>
                    <span className="text-sm font-medium text-gray-700">anna.cruz@email.com</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">John Santos</span>
                    <span className="text-sm font-medium text-gray-700">john.santos@email.com</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Maria Lopez</span>
                    <span className="text-sm font-medium text-gray-700">maria.lopez@email.com</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Kyle Tan</span>
                    <span className="text-sm font-medium text-gray-700">kyle.tan@email.com</span>
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
