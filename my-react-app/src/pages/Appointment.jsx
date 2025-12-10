import { useState, useEffect } from "react";
import api from "../api"; 
import { useAuth } from "../context/AuthContext";

export default function Appointment() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState({ type: null, appointment: null });
  const [loading, setLoading] = useState(true);

  // Fetch appointments from backend
  useEffect(() => {
    if (!token) return;

    setLoading(true);
    api.get("/appointments", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setAppointments(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  // Add appointment
  const addAppointment = async (newAppt) => {
    try {
      const res = await api.post("/appointments", newAppt, { headers: { Authorization: `Bearer ${token}` } });
      setAppointments([...appointments, res.data]);
      setModal({ type: null, appointment: null });
    } catch (err) {
      console.error(err);
    }
  };

  // Edit appointment
  const editAppointment = async (updatedAppt) => {
    try {
      const res = await api.put(`/appointments/${updatedAppt.id}`, updatedAppt, { headers: { Authorization: `Bearer ${token}` } });
      setAppointments(appointments.map(a => a.id === updatedAppt.id ? res.data : a));
      setModal({ type: null, appointment: null });
    } catch (err) {
      console.error(err);
    }
  };

  // Delete appointment
  const deleteAppointment = async (id) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await api.delete(`/appointments/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setAppointments(appointments.filter(a => a.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered appointments
  const filteredAppointments = appointments.filter(a =>
    a.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-8">Loading appointments...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header + Add Button */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-serif font-bold text-gray-800">Appointments</h1>
          <button
            className="bg-gradient-to-r from-pink-400 to-rose-400 text-white py-3 px-6 rounded-lg hover:from-pink-500 hover:to-rose-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
            onClick={() => setModal({ type: 'add', appointment: null })}
          >
            Add Appointment
          </button>
        </div>

        {/* Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-100 mb-6">
          <input
            type="text"
            placeholder="Search by patient, species, or owner..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Appointments Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-pink-100 to-rose-100">
              <tr>
                <th className="p-4 text-left">Patient</th>
                <th className="p-4 text-left">Species</th>
                <th className="p-4 text-left">Owner</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Time</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-100">
              {filteredAppointments.map(a => (
                <tr key={a.id} className="hover:bg-pink-50/50 transition-colors">
                  <td className="p-4">{a.patient}</td>
                  <td className="p-4">{a.species}</td>
                  <td className="p-4">{a.owner}</td>
                  <td className="p-4">{a.date}</td>
                  <td className="p-4">{a.time}</td>
                  <td className="p-4">{a.status}</td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => setModal({ type: 'view', appointment: a })} className="text-blue-500">View</button>
                    <button onClick={() => setModal({ type: 'edit', appointment: a })} className="text-green-500">Edit</button>
                    <button onClick={() => deleteAppointment(a.id)} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

// Appointment Modal Component
function AppointmentModal({ type, appointment, addAppointment, editAppointment, close }) {
  const [formData, setFormData] = useState({
    patient: appointment?.patient || "",
    species: appointment?.species || "",
    owner: appointment?.owner || "",
    date: appointment?.date || "",
    time: appointment?.time || "",
    status: appointment?.status || "Scheduled",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "add") addAppointment(formData);
    if (type === "edit") editAppointment({ ...appointment, ...formData });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{type === "add" ? "Add Appointment" : type === "edit" ? "Edit Appointment" : "View Appointment"}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {["patient", "species", "owner", "date", "time", "status"].map((field) => (
            <input
              key={field}
              type={field === "date" ? "date" : field === "time" ? "time" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${type === "view" ? "bg-gray-100" : ""}`}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              disabled={type === "view"}
            />
          ))}
          {type !== "view" && (
            <button type="submit" className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white py-2 rounded-lg hover:from-pink-500 hover:to-rose-500 transition-all">
              {type === "add" ? "Add" : "Save Changes"}
            </button>
          )}
          <button type="button" onClick={close} className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg mt-2 hover:bg-gray-400 transition-all">Close</button>
        </form>
      </div>
    </div>
  );
}
