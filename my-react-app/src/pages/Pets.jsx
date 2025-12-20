import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Pets() {
  const { token } = useAuth();
  const [pets, setPets] = useState([]);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [saving, setSaving] = useState(false);

  const emptyForm = { name: "", species: "", breed: "", age: "", gender: "", ownerId: "" };
  const [form, setForm] = useState(emptyForm);

  // Fetch pets and owners
  useEffect(() => {
    if (!token) return setLoading(false);

    const fetchAll = async () => {
      try {
        setLoading(true);
        const [petsRes, ownersRes] = await Promise.all([
          api.get("/pets", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/owners", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const petsArray = Array.isArray(petsRes.data) ? petsRes.data : [];
        const ownersArray = Array.isArray(ownersRes.data) ? ownersRes.data : [];

        // Map owner object into each pet
        const normalizedPets = petsArray.map((p) => {
          const owner = ownersArray.find((o) => o.ownerId === p.ownerId) || null;
          return {
            ...p,
            owner,
            appointmentCount: Array.isArray(p.appointments) ? p.appointments.length : 0,
          };
        });

        setPets(normalizedPets);
        setOwners(ownersArray);
      } catch (err) {
        console.error("Failed to fetch pets/owners:", err);
        alert(err.response?.data?.error || "Failed to load pets or owners");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [token]);

  const openAdd = () => {
    setForm(emptyForm);
    setEditingPet(null);
    setShowModal(true);
  };

  const openEdit = (pet) => {
    setEditingPet(pet);
    setForm({
      name: pet.name || "",
      species: pet.species || "",
      breed: pet.breed || "",
      age: pet.age || "",
      gender: pet.gender || "",
      ownerId: pet.owner?.ownerId?.toString() || "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPet(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    if (!form.name || !form.species || !form.breed || form.age === "" || !form.gender || !form.ownerId) {
      alert("Please fill all fields.");
      setSaving(false);
      return;
    }

    const payload = {
      name: form.name,
      species: form.species,
      breed: form.breed,
      age: parseInt(form.age, 10),
      gender: form.gender,
      ownerId: parseInt(form.ownerId, 10),
    };

    try {
      if (editingPet) {
        const res = await api.put(`/pets/${editingPet.petId}`, payload, { headers: { Authorization: `Bearer ${token}` } });
        const ownerObj = owners.find((o) => o.ownerId === res.data.ownerId) || null;
        setPets((prev) =>
          prev.map((p) =>
            p.petId === res.data.petId
              ? { ...res.data, owner: ownerObj, appointmentCount: p.appointmentCount ?? 0 }
              : p
          )
        );
      } else {
        const res = await api.post("/pets", payload, { headers: { Authorization: `Bearer ${token}` } });
        const ownerObj = owners.find((o) => o.ownerId === res.data.ownerId) || null;
        setPets((prev) => [...prev, { ...res.data, owner: ownerObj, appointmentCount: 0 }]);
      }
      closeModal();
    } catch (err) {
      console.error("Save pet failed:", err);
      alert(err.response?.data?.error || "Failed to save pet");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (petId) => {
    if (!confirm("Delete this pet?")) return;
    try {
      await api.delete(`/pets/${petId}`, { headers: { Authorization: `Bearer ${token}` } });
      setPets((prev) => prev.filter((p) => p.petId !== petId));
    } catch (err) {
      console.error("Delete pet failed:", err);
      alert(err.response?.data?.error || "Failed to delete pet");
    }
  };

  const filteredPets = pets.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    const ownerName = `${p.owner?.firstName || ""} ${p.owner?.lastName || ""}`.toLowerCase();
    return (
      (p.name || "").toLowerCase().includes(q) ||
      (p.species || "").toLowerCase().includes(q) ||
      ownerName.includes(q)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pink-200 border-t-pink-500 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading pets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-t-4 border-pink-400">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Pets Registry</h1>
              <p className="text-gray-600">Manage all registered pets in your clinic</p>
            </div>
            <button
              onClick={openAdd}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
            >
              + Add New Pet
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by pet name, species, or owner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 transition-colors duration-200"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-pink-100 to-rose-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Pet Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Species</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Breed</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Appointments</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPets.length > 0 ? (
                  filteredPets.map((pet, idx) => (
                    <tr key={pet.petId} className={`hover:bg-pink-50 transition-colors duration-150 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold">
                            {pet.name ? pet.name[0].toUpperCase() : '?'}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">{pet.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{pet.species}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{pet.breed}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{pet.age} {pet.age === 1 ? 'year' : 'years'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${pet.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                          {pet.gender}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{pet.owner ? `${pet.owner.firstName} ${pet.owner.lastName}` : 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          {pet.appointmentCount}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button onClick={() => openEdit(pet)} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-150 font-medium">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(pet.petId)} className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-150 font-medium">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                        </div>
                        <p className="text-gray-500 font-medium">No pets found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your search or add a new pet</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Section */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-5 rounded-t-2xl flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{editingPet ? "Edit Pet" : "Add New Pet"}</h2>
                <button onClick={closeModal} className="text-white hover:bg-white/20 rounded-full p-2 transition-colors duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pet Name <span className="text-pink-500">*</span></label>
                  <input type="text" placeholder="Enter pet name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Species <span className="text-pink-500">*</span></label>
                    <input type="text" placeholder="e.g., Dog, Cat" value={form.species} onChange={(e) => setForm({ ...form, species: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Breed <span className="text-pink-500">*</span></label>
                    <input type="text" placeholder="Enter breed" value={form.breed} onChange={(e) => setForm({ ...form, breed: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Age <span className="text-pink-500">*</span></label>
                    <input type="number" placeholder="Age in years" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gender <span className="text-pink-500">*</span></label>
                    <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Owner <span className="text-pink-500">*</span></label>
                  <select value={form.ownerId} onChange={(e) => setForm({ ...form, ownerId: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200">
                    <option value="">Select Owner</option>
                    {owners.map((o) => (
                      <option key={o.ownerId} value={o.ownerId}>{o.firstName} {o.lastName}</option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button type="button" onClick={closeModal} className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors duration-200">Cancel</button>
                  <button onClick={handleSubmit} disabled={saving} className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                    {saving ? "Saving..." : editingPet ? "Save Changes" : "Add Pet"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}