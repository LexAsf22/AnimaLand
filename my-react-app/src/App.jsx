// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const statsCards = [
    {
      title: "Today's Appointments",
      value: "12",
      change: "+3 from yesterday",
      color: "bg-blue-500"
    },
    {
      title: "Total Patients",
      value: "248",
      change: "+15 this month",
      color: "bg-teal-500"
    },
    {
      title: "Pending Treatments",
      value: "8",
      change: "3 urgent",
      color: "bg-orange-500"
    },
    {
      title: "Revenue Today",
      value: "$2,450",
      change: "+12% vs avg",
      color: "bg-green-500"
    }
  ];

  const recentAppointments = [
    { time: "09:00 AM", pet: "Max (Golden Retriever)", owner: "John Smith", type: "Checkup" },
    { time: "10:30 AM", pet: "Luna (Persian Cat)", owner: "Sarah Johnson", type: "Vaccination" },
    { time: "02:00 PM", pet: "Charlie (Beagle)", owner: "Mike Davis", type: "Surgery Follow-up" },
  ];

  const urgentAlerts = [
    { message: "Post-surgery check needed for Bella", time: "30 min ago" },
    { message: "Medication refill required for Duke", time: "1 hour ago" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <Sidebar isOpen={sidebarOpen} />

      <div className="flex flex-col flex-1 transition-all duration-300 overflow-hidden">
        <Header onSidebarToggle={toggleSidebar} />

        <main className="p-8 overflow-auto bg-white rounded-tl-3xl shadow-lg mx-4 my-6">
          {/* Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {statsCards.map(({ title, value, change, color }, idx) => (
              <div key={idx} className={`${color} text-white rounded-lg shadow-md p-6`}>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-sm mt-1 opacity-80">{change}</p>
              </div>
            ))}
          </section>

          {/* Recent Appointments */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-teal-700">Recent Appointments</h2>
            <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Time</th>
                  <th className="py-3 px-6 text-left">Pet</th>
                  <th className="py-3 px-6 text-left">Owner</th>
                  <th className="py-3 px-6 text-left">Type</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map(({ time, pet, owner, type }, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6">{time}</td>
                    <td className="py-3 px-6">{pet}</td>
                    <td className="py-3 px-6">{owner}</td>
                    <td className="py-3 px-6">{type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Urgent Alerts */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-teal-700">Urgent Alerts</h2>
            <ul className="space-y-3">
              {urgentAlerts.map(({ message, time }, idx) => (
                <li
                  key={idx}
                  className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-4 shadow"
                >
                  <p>{message}</p>
                  <p className="text-xs opacity-70 mt-1">{time}</p>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
