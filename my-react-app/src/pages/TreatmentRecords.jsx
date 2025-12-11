import { useEffect, useState } from "react";
import api from "../api/api"; // axios instance
import { useAuth } from "../context/AuthContext";

export default function TreatmentRecords() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ type: null, treatment: null, appointmentId: null });

  // Fetch appointments and treatments
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [apptRes, trRes] = await Promise.all([
          api.get("/appointments"),
          api.get("/treatments")
        ]);

        setAppointments(Array.isArray(apptRes.data) ? apptRes.data : []);
        setTreatments(Array.isArray(trRes.data) ? trRes.data : []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Add treatment
  const addTreatment = async (newTreatment) => {
    try {
      const res = await api.post("/treatments", newTreatment);
      setTreatments(prev => [...prev, res.data]);
      setModal({ type: null, treatment: null, appointmentId: null });
    } catch (err) {
      console.error(err);
      alert("Failed to add treatment.");
    }
  };

  // Edit treatment
  const editTreatment = async (updatedTreatment) => {
    try {
      const res = await api.put(`/treatments/${updatedTreatment.treatmentId}`, updatedTreatment);
      setTreatments(prev => prev.map(t => t.treatmentId === updatedTreatment.treatmentId ? res.data : t));
      setModal({ type: null, treatment: null, appointmentId: null });
    } catch (err) {
      console.error(err);
      alert("Failed to update treatment.");
    }
  };

  // Delete treatment
  const deleteTreatment = async (id) => {
    if (!confirm("Are you sure you want to delete this treatment?")) return;
    try {
      await api.delete(`/treatments/${id}`);
      setTreatments(prev => prev.filter(t => t.treatmentId !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete treatment.");
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading treatment records...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif text-gray-800 mb-3">Treatment Records Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map(appt => {
            const trRecords = treatments.filter(t => t.appointment?.appointmentId === appt.appointmentId);
            return (
              <div key={appt.appointmentId} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
                <h2 className="text-2xl font-semibold">{appt.pet?.name} ({appt.pet?.species})</h2>
                <p>Owner: {appt.pet?.owner?.firstName} {appt.pet?.owner?.lastName}</p>
                <div className="flex justify-between items-center mt-2 mb-2">
                  <h3>Treatment Records:</h3>
                  <button onClick={() => setModal({ type: 'add', appointmentId: appt.appointmentId })} className="bg-pink-500 text-white px-2 py-1 rounded">Add</button>
                </div>
                {trRecords.length > 0 ? (
                  <ul>
                    {trRecords.map(t => (
                      <li key={t.treatmentId} className="mb-2 border-b border-pink-200 pb-2">
                        <p>Service: {t.serviceGiven}</p>
                        <p>Findings: {t.findings}</p>
                        <p>Medicine: {t.medicinePrescribed}</p>
                        <p>Date: {t.serviceDate}</p>
                        <div className="flex gap-2 mt-1">
                          <button onClick={() => setModal({ type: 'edit', treatment: t })} className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
                          <button onClick={() => deleteTreatment(t.treatmentId)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : <p>No records</p>}
              </div>
            );
          })}
        </div>
      </div>

      {modal.type && (
        <TreatmentModal 
          modal={modal} 
          close={() => setModal({ type: null, treatment: null, appointmentId: null })}
          addTreatment={addTreatment} 
          editTreatment={editTreatment} 
        />
      )}
    </div>
  );
}

function TreatmentModal({ modal, close, addTreatment, editTreatment }) {
  const isEdit = modal.type === 'edit';
  const [form, setForm] = useState({
    appointmentId: modal.appointmentId || modal.treatment?.appointment?.appointmentId || '',
    serviceGiven: modal.treatment?.serviceGiven || '',
    findings: modal.treatment?.findings || '',
    medicinePrescribed: modal.treatment?.medicinePrescribed || '',
    serviceDate: modal.treatment?.serviceDate || '',
  });

  useEffect(() => {
    setForm({
      appointmentId: modal.appointmentId || modal.treatment?.appointment?.appointmentId || '',
      serviceGiven: modal.treatment?.serviceGiven || '',
      findings: modal.treatment?.findings || '',
      medicinePrescribed: modal.treatment?.medicinePrescribed || '',
      serviceDate: modal.treatment?.serviceDate || '',
    });
  }, [modal]);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = e => { 
    e.preventDefault(); 
    isEdit ? editTreatment({ ...form, treatmentId: modal.treatment.treatmentId }) : addTreatment(form); 
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit' : 'Add'} Treatment</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input type="hidden" name="appointmentId" value={form.appointmentId} />
          <input name="serviceGiven" placeholder="Service Given" value={form.serviceGiven} onChange={handleChange} required className="p-2 border rounded"/>
          <input name="findings" placeholder="Findings" value={form.findings} onChange={handleChange} required className="p-2 border rounded"/>
          <input name="medicinePrescribed" placeholder="Medicine" value={form.medicinePrescribed} onChange={handleChange} className="p-2 border rounded"/>
          <input type="date" name="serviceDate" value={form.serviceDate} onChange={handleChange} required className="p-2 border rounded"/>
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={close} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-pink-400 text-white rounded">{isEdit ? 'Save' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
