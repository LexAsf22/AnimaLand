export default function Analytics() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-green-900">Analytics</h1>
      <p>Track appointment trends, patient visits, and revenue growth over time.</p>

      <div className="mt-8 space-y-6">
        <div className="bg-green-100 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold text-green-800 mb-3">Monthly Appointments</h2>
          <div className="h-40 bg-green-200 rounded-md flex items-center justify-center text-green-600">
            {/* Placeholder for chart */}
            Chart placeholder
          </div>
        </div>

        <div className="bg-green-100 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold text-green-800 mb-3">Revenue Growth</h2>
          <div className="h-40 bg-green-200 rounded-md flex items-center justify-center text-green-600">
            {/* Placeholder for chart */}
            Chart placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
