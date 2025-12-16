import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function TreatmentRecords() {
  const { token } = useAuth();
  const [pets, setPets] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ type: null, treatment: null, petId: null });
  const [expandedPet, setExpandedPet] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const [petsRes, trRes] = await Promise.all([
        api.get("/pets"),
        api.get("/treatment-records"),
      ]);
      setPets(petsRes.data || []);
      setTreatments(trRes.data || []);
    } catch (e) {
      console.error(e);
      alert("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const addTreatment = async (data) => {
    data.serviceGiven = data.serviceGiven || "";
    data.findings = data.findings || "";
    await api.post("/treatment-records", data);
    fetchData();
    setModal({ type: null });
  };

  const editTreatment = async (data) => {
    data.serviceGiven = data.serviceGiven || "";
    data.findings = data.findings || "";
    await api.put(`/treatment-records/${data.treatmentId}`, data);
    fetchData();
    setModal({ type: null });
  };

  const deleteTreatment = async (id) => {
    if (!confirm("Delete this treatment?")) return;
    await api.delete(`/treatment-records/${id}`);
    fetchData();
  };

  const toggleExpand = (petId) => {
    setExpandedPet(expandedPet === petId ? null : petId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pink-200 border-t-pink-500 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading treatment records...</p>
        </div>
      </div>
    );
  }

  // Group pets with their treatments
  const petsWithTreatments = pets.map(pet => {
    const petTreatments = treatments.filter(t => t.petId === pet.petId);
    return {
      ...pet,
      treatmentCount: petTreatments.length,
      treatments: petTreatments
    };
  });

  // Filter by search query
  const filteredPets = petsWithTreatments.filter(pet => 
    pet.name && pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-t-4 border-pink-400">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Treatment Records</h1>
              <p className="text-gray-600">Click on a pet to view their complete treatment history</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by pet name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
            />
          </div>
        </div>

        {pets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No pets found</p>
              <p className="text-gray-400 text-sm mt-1">Register pets to start adding treatment records</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPets.map((pet) => {
              const isExpanded = expandedPet === pet.petId;
              
              return (
                <div key={pet.petId} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Pet Header */}
                  <div 
                    className="p-6 cursor-pointer select-none hover:bg-pink-50 transition-colors duration-150 border-l-4 border-pink-400"
                    onClick={() => toggleExpand(pet.petId)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full text-white font-bold text-lg">
                          {pet.name ? pet.name[0].toUpperCase() : '?'}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-800">{pet.name}</h2>
                          <div className="flex items-center gap-4 text-gray-500 text-sm mt-1">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                              {pet.species}
                            </span>
                            {pet.breed && (
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {pet.breed}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              {pet.treatmentCount} {pet.treatmentCount === 1 ? 'Record' : 'Records'}
                            </span>
                            {pet.ownerName && (
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {pet.ownerName}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModal({ type: "add", petId: pet.petId });
                          }}
                        >
                          + Add Treatment
                        </button>
                        <div className={`flex items-center justify-center w-8 h-8 bg-pink-100 rounded-full transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                          <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Treatment Records Table */}
                  {isExpanded && (
                    <div className="border-t border-gray-200">
                      {pet.treatments.length === 0 ? (
                        <div className="p-12 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <p className="text-gray-500 font-medium">No treatments recorded yet</p>
                            <p className="text-gray-400 text-sm mt-1">Click "Add Treatment" to create the first record for {pet.name}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-pink-100 to-rose-100">
                              <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">#</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Service Given</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Findings</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Medicine</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Total Bill</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {pet.treatments.map((t, index) => (
                                <tr key={t.treatmentId} className={`hover:bg-pink-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center justify-center w-8 h-8 bg-pink-100 text-pink-600 rounded-full font-bold text-sm">
                                      {index + 1}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="text-sm font-semibold text-gray-900">{t.serviceGiven}</div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="text-sm text-gray-700 max-w-xs truncate" title={t.findings}>{t.findings}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-700">{t.medicinePrescribed || "N/A"}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-700">
                                      {new Date(t.serviceDate).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric' 
                                      })}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-bold text-green-600">₱{parseFloat(t.totalBill || 0).toFixed(2)}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => setModal({ type: "edit", treatment: t })}
                                        className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors duration-150 font-medium"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => deleteTreatment(t.treatmentId)}
                                        className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-150 font-medium"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            
            {filteredPets.length === 0 && searchQuery && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">No results found</p>
                  <p className="text-gray-400 text-sm mt-1">Try searching with a different pet name</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Treatment Modal */}
      {modal.type && (
        <TreatmentModal
          modal={modal}
          close={() => setModal({ type: null })}
          addTreatment={addTreatment}
          editTreatment={editTreatment}
        />
      )}
    </div>
  );
}

function TreatmentModal({ modal, close, addTreatment, editTreatment }) {
  const isEdit = modal.type === "edit";
  const [form, setForm] = useState({
    petId: modal.petId || modal.treatment?.petId,
    serviceGiven: modal.treatment?.serviceGiven || "",
    findings: modal.treatment?.findings || "",
    medicinePrescribed: modal.treatment?.medicinePrescribed || "",
    serviceDate: modal.treatment?.serviceDate || new Date().toISOString().split("T")[0],
    totalBill: modal.treatment?.totalBill || ""
  });

  const handleSubmit = () => {
    if (!form.serviceGiven.trim() || !form.findings.trim()) {
      alert("Service and Findings cannot be empty");
      return;
    }
    isEdit
      ? editTreatment({ ...form, treatmentId: modal.treatment.treatmentId })
      : addTreatment(form);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-5 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {isEdit ? "Edit Treatment Record" : "Add New Treatment"}
            </h2>
            <button
              onClick={close}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Given <span className="text-pink-500">*</span>
              </label>
              <input
                name="serviceGiven"
                value={form.serviceGiven}
                onChange={e => setForm({ ...form, serviceGiven: e.target.value })}
                placeholder="e.g., Vaccination, Checkup, Surgery"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Findings <span className="text-pink-500">*</span>
              </label>
              <textarea
                name="findings"
                value={form.findings}
                onChange={e => setForm({ ...form, findings: e.target.value })}
                placeholder="Enter diagnosis and observations..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Medicine Prescribed
              </label>
              <input
                name="medicinePrescribed"
                value={form.medicinePrescribed}
                onChange={e => setForm({ ...form, medicinePrescribed: e.target.value })}
                placeholder="e.g., Amoxicillin 500mg"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Date
                </label>
                <input
                  type="date"
                  name="serviceDate"
                  value={form.serviceDate}
                  onChange={e => setForm({ ...form, serviceDate: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Bill (₱) <span className="text-pink-500">*</span>
                </label>
                <input
                  type="number"
                  name="totalBill"
                  value={form.totalBill}
                  onChange={e => setForm({ ...form, totalBill: e.target.value })}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={close}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              {isEdit ? "Save Changes" : "Add Treatment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}