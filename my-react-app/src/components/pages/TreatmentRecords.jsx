export default function TreatmentRecords() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-gray-800 mb-3">Treatment Records Dashboard</h1>
          <p className="text-gray-600">
            Monitor treatments, services given, prescribed medicines, and service dates.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Treatments */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Treatments</p>
                <p className="text-3xl font-bold text-gray-800">128</p>
                <p className="text-sm text-pink-500 mt-2">↑ 10% from last month</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Services Given */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Services Given</p>
                <p className="text-3xl font-bold text-gray-800">5</p>
                <p className="text-sm text-pink-500 mt-2">Most common: Checkups</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Medicines Prescribed */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Medicines Prescribed</p>
                <p className="text-3xl font-bold text-gray-800">72</p>
                <p className="text-sm text-pink-500 mt-2">Most common: Antibiotics</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
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
                    d="M16 12H8m0 0H4m4 0v8m0-8v-8m0 8h8"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Charts / Tables */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100">
            <h2 className="text-2xl font-serif text-gray-800 mb-6">Treatments by Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service Distribution */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Service Type Distribution</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Checkups</span>
                    <span className="text-sm font-medium text-gray-700">45</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Vaccinations</span>
                    <span className="text-sm font-medium text-gray-700">32</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Surgeries</span>
                    <span className="text-sm font-medium text-gray-700">18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Grooming</span>
                    <span className="text-sm font-medium text-gray-700">33</span>
                  </div>
                </div>
              </div>

              {/* Recent Records */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Treatment Records</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Appointment #101</span>
                    <span className="text-sm font-medium text-gray-700">Checkup - 2025-12-03</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Appointment #102</span>
                    <span className="text-sm font-medium text-gray-700">Vaccination - 2025-12-02</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Appointment #103</span>
                    <span className="text-sm font-medium text-gray-700">Surgery - 2025-12-01</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Appointment #104</span>
                    <span className="text-sm font-medium text-gray-700">Grooming - 2025-11-30</span>
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
