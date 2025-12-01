export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-green-900">Dashboard</h1>
      <p>Welcome to Animaland Vet Clinic Dashboard. Monitor your clinic's activity and keep track of important stats here.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-800">Active Patients</h2>
          <p className="mt-2 text-3xl font-bold text-green-900">128</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-800">Appointments Today</h2>
          <p className="mt-2 text-3xl font-bold text-green-900">24</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-800">Revenue</h2>
          <p className="mt-2 text-3xl font-bold text-green-900">$5,430</p>
        </div>
      </div>
    </div>
  );
}
