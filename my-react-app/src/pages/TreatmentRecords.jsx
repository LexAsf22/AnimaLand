import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TreatmentRecords() {
  const [pets, setPets] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ type: null, treatment: null });

  // Fetch pets and treatments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const petsRes = await axios.get("http://localhost:8080/api/pets");
        const treatmentsRes = await axios.get("http://localhost:8080/api/treatments");
        setPets(petsRes.data);
        setTreatments(treatmentsRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Add treatment
  const addTreatment = async (newTreatment) => {
    try {
      const res = await axios.post("http://localhost:8080/api/treatments", newTreatment);
      setTreatments([...treatments, res.data]);
      setModal({ type: null, treatment: null });
    } catch (err) {
      console.error(err);
    }
  };

  // Edit treatment
  const editTreatment = async (updatedTreatment) => {
    try {
      const res = await axios.put(`http://localhost:8080/api/treatments/${updatedTreatment.id}`, updatedTreatment);
      setTreatments(treatments.map(t => t.id === updatedTreatment.id ? res.data : t));
      setModal({ type: null, treatment: null });
    } catch (err) {
      console.error(err);
    }
  };

  // Delete treatment
  const deleteTreatment = async (id) => {
    if (window.confirm("Are you sure you want to delete this treatment?")) {
      try {
        await axios.delete(`http://localhost:8080/api/treatments/${id}`);
        setTreatments(treatments.filter(t => t.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-gray-800 mb-3">Treatment Records Dashboard</h1>
          <p className="text-gray-600">Monitor treatments, services, prescribed medicines, and service dates for each pet.</p>
        </div>

        {/* Pet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => {
            const petRecords = treatments.filter(t => t.petId === pet.id);
            return (
              <div key={pet.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{pet.name} ({pet.species})</h2>
                <p className="text-gray-600 mb-2">Breed: {pet.breed}</p>
                <p className="text-gray-600 mb-2">Owner: {pet.owner}</p>
                <p className="text-gray-600 mb-4">Last Visit: {pet.lastVisit}</p>
                
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-700">Treatment Records:</h3>
                  <button
                    className="text-white bg-pink-400 px-2 py-1 rounded hover:bg-pink-500"
                    onClick={() => setModal({ type: 'add', petId: pet.id })}
                  >
                    Add
                  </button>
                </div>

                {petRecords.length > 0 ? (
                  <ul className="space-y-2">
                    {petRecords.map((t) => (
                      <li key={t.id} className="bg-pink-50 rounded-xl p-3 border border-pink-100">
                        <p><span className="font-semibold">Service:</span> {t.serviceGiven}</p>
                        <p><span className="font-semibold">Findings:</span> {t.findings}</p>
                        <p><span className="font-semibold">Medicine:</span> {t.medicinePrescribed}</p>
                        <p><span className="font-semibold">Date:</span> {t.serviceDate}</p>
                        <div className="flex gap-2 mt-2">
                          <button
                            className="text-green-500"
                            onClick={() => setModal({ type: 'edit', treatment: t })}
                          >Edit</button>
                          <button
                            className="text-red-500"
                            onClick={() => deleteTreatment(t.id)}
                          >Delete</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No records found.</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {modal.type && (
        <TreatmentModal
          modal={modal}
          close={() => setModal({ type: null, treatment: null })}
          addTreatment={addTreatment}
          editTreatment={editTreatment}
        />
      )}
    </div>
  );
}

// ----------------- Modal Component -----------------
function TreatmentModal({ modal, close, addTreatment, editTreatment }) {
  const isEdit = modal.type === 'edit';
  const [form, setForm] = useState({
    petId: modal.petId || modal.treatment?.petId || '',
    serviceGiven: modal.treatment?.serviceGiven || '',
    findings: modal.treatment?.findings || '',
    medicinePrescribed: modal.treatment?.medicinePrescribed || '',
    serviceDate: modal.treatment?.serviceDate || '',
  });

  const handleSubmit = () => {
    if (isEdit) {
      editTreatment({ ...form, id: modal.treatment.id });
    } else {
      addTreatment(form);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">{isEdit ? 'Edit' : 'Add'} Treatment</h2>

        <div className="flex flex-col gap-3">
          <label>Service Given:</label>
          <input
            type="text"
            value={form.serviceGiven}
            onChange={e => setForm({ ...form, serviceGiven: e.target.value })}
            className="border p-2 rounded"
          />

          <label>Findings:</label>
          <input
            type="text"
            value={form.findings}
            onChange={e => setForm({ ...form, findings: e.target.value })}
            className="border p-2 rounded"
          />

          <label>Medicine Prescribed:</label>
          <input
            type="text"
            value={form.medicinePrescribed}
            onChange={e => setForm({ ...form, medicinePrescribed: e.target.value })}
            className="border p-2 rounded"
          />

          <label>Service Date:</label>
          <input
            type="date"
            value={form.serviceDate}
            onChange={e => setForm({ ...form, serviceDate: e.target.value })}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={close} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded bg-pink-400 text-white">{isEdit ? 'Save' : 'Add'}</button>
        </div>
      </div>
    </div>
  );
}
