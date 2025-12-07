import { useState } from "react";

export default function Appointment() {
  const initialAppointments = [
    { id: 1, patient: "Buddy", species: "Dog", owner: "Alice Johnson", date: "2025-12-05", time: "10:00 AM", status: "Scheduled" },
    { id: 2, patient: "Whiskers", species: "Cat", owner: "Michael Lee", date: "2025-12-05", time: "11:30 AM", status: "Completed" },
    { id: 3, patient: "Max", species: "Dog", owner: "Emma Wilson", date: "2025-12-06", time: "09:00 AM", status: "Cancelled" },
    { id: 4, patient: "Luna", species: "Cat", owner: "David Chen", date: "2025-12-06", time: "01:00 PM", status: "Scheduled" },
  ];

  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState({ type: null, appointment: null });

  // Add, Edit, Delete
  const addAppointment = (newAppt) => {
    setAppointments([...appointments, { ...newAppt, id: Date.now() }]);
    setModal({ type: null, appointment: null });
  };

  const editAppointment = (updatedAppt) => {
    setAppointments(appointments.map(a => a.id === updatedAppt.id ? updatedAppt : a));
    setModal({ type: null, appointment: null });
  };

  const deleteAppointment = (id) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      setAppointments(appointments.filter(a => a.id !== id));
    }
  };

  const filteredAppointments = appointments.filter(a =>
    a.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-serif font-bold text-gray-800">Appointments</h1>
          <button
            className="bg-gradient-to-r from-pink-400 to-rose-400 text-white py-3 px-6 rounded-lg hover:from-pink-500 hover:to-rose-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
            onClick={() => setModal({ type: 'add', appointment: null })}
          >
            Add Appointment
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-100">
            <p className="text-sm text-gray-600">Total Appointments</p>
            <p className="text-2xl font-bold text-gray-800">{appointments.length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-100">
            <p className="text-sm text-gray-600">Scheduled</p>
            <p className="text-2xl font-bold text-green-600">{appointments.filter(a => a.status === 'Scheduled').length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-100">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-gray-800">{appointments.filter(a => a.status === 'Completed').length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-100">
            <p className="text-sm text-gray-600">Cancelled</p>
            <p className="text-2xl font-bold text-red-600">{appointments.filter(a => a.status === 'Cancelled').length}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-100 mb-6">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search appointments by patient, species, or owner..."
              className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-pink-100 to-rose-100">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Patient</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Species</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Owner</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Time</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-100">
                {filteredAppointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-pink-50/50 transition-colors">
                    <td className="p-4">{appt.patient}</td>
                    <td className="p-4">{appt.species}</td>
                    <td className="p-4">{appt.owner}</td>
                    <td className="p-4">{appt.date}</td>
                    <td className="p-4">{appt.time}</td>
                    <td className="p-4">{appt.status}</td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => setModal({ type: 'view', appointment: appt })} className="text-blue-500">View</button>
                      <button onClick={() => setModal({ type: 'edit', appointment: appt })} className="text-green-500">Edit</button>
                      <button onClick={() => deleteAppointment(appt.id)} className="text-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {modal.type && (
          <AppointmentModal
            type={modal.type}
            appointment={modal.appointment}
            addAppointment={addAppointment}
            editAppointment={editAppointment}
            close={() => setModal({ type: null, appointment: null })}
          />
        )}
      </div>
    </div>
  );
}

// Modal Component
function AppointmentModal({ type, appointment, addAppointment, editAppointment, close }) {
  const [formData, setFormData] = useState(appointment || {
    patient: '',
    species: '',
    owner: '',
    date: '',
    time: '',
    status: 'Scheduled',
  });

  const handleSubmit = () => {
    if (type === 'add') addAppointment(formData);
    if (type === 'edit') editAppointment({ ...formData, id: appointment.id });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">{type === 'view' ? 'View' : type === 'edit' ? 'Edit' : 'Add'} Appointment</h2>

        <div className="flex flex-col gap-2">
          <label>Patient:</label>
          <input type="text" value={formData.patient} readOnly={type === 'view'} onChange={e => setFormData({ ...formData, patient: e.target.value })} className="border p-2 rounded"/>
          <label>Species:</label>
          <input type="text" value={formData.species} readOnly={type === 'view'} onChange={e => setFormData({ ...formData, species: e.target.value })} className="border p-2 rounded"/>
          <label>Owner:</label>
          <input type="text" value={formData.owner} readOnly={type === 'view'} onChange={e => setFormData({ ...formData, owner: e.target.value })} className="border p-2 rounded"/>
          <label>Date:</label>
          <input type="date" value={formData.date} readOnly={type === 'view'} onChange={e => setFormData({ ...formData, date: e.target.value })} className="border p-2 rounded"/>
          <label>Time:</label>
          <input type="time" value={formData.time} readOnly={type === 'view'} onChange={e => setFormData({ ...formData, time: e.target.value })} className="border p-2 rounded"/>
          <label>Status:</label>
          <select value={formData.status} disabled={type === 'view'} onChange={e => setFormData({ ...formData, status: e.target.value })} className="border p-2 rounded">
            <option>Scheduled</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button onClick={close} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
          {type !== 'view' && <button onClick={handleSubmit} className="px-4 py-2 rounded bg-pink-400 text-white">{type === 'add' ? 'Add' : 'Save'}</button>}
        </div>
      </div>
    </div>
  );
}
