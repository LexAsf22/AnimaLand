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

        const normalizedPets = petsArray.map((p) => ({
          ...p,
          appointmentCount: Array.isArray(p.appointments) ? p.appointments.length : 0,
        }));

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
        setPets((prev) =>
          prev.map((p) =>
            p.petId === res.data.petId
              ? { ...res.data, appointmentCount: p.appointmentCount ?? 0 }
              : p
          )
        );
      } else {
        const res = await api.post("/pets", payload, { headers: { Authorization: `Bearer ${token}` } });
        setPets((prev) => [...prev, { ...res.data, appointmentCount: 0 }]);
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

  if (loading) return <div className="text-center p-10">Loading pets...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-8">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search pets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <button onClick={openAdd} className="bg-pink-500 text-white px-4 py-2 rounded">Add Pet</button>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-pink-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Species</th>
            <th className="border px-4 py-2">Breed</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">Owner</th>
            <th className="border px-4 py-2">Appointments</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPets.map((pet) => (
            <tr key={pet.petId} className="hover:bg-pink-100">
              <td className="border px-4 py-2">{pet.name}</td>
              <td className="border px-4 py-2">{pet.species}</td>
              <td className="border px-4 py-2">{pet.breed}</td>
              <td className="border px-4 py-2">{pet.age}</td>
              <td className="border px-4 py-2">{pet.gender}</td>
              <td className="border px-4 py-2">{pet.owner ? `${pet.owner.firstName} ${pet.owner.lastName}` : ""}</td>
              <td className="border px-4 py-2">{pet.appointmentCount}</td>
              <td className="border px-4 py-2 space-x-2">
                <button onClick={() => openEdit(pet)} className="bg-yellow-400 px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(pet.petId)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl mb-4">{editingPet ? "Edit Pet" : "Add Pet"}</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border p-2 rounded" />
              <input placeholder="Species" value={form.species} onChange={(e) => setForm({ ...form, species: e.target.value })} className="w-full border p-2 rounded" />
              <input placeholder="Breed" value={form.breed} onChange={(e) => setForm({ ...form, breed: e.target.value })} className="w-full border p-2 rounded" />
              <input placeholder="Age" type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="w-full border p-2 rounded" />
              <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full border p-2 rounded">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <select value={form.ownerId} onChange={(e) => setForm({ ...form, ownerId: e.target.value })} className="w-full border p-2 rounded">
                <option value="">Select Owner</option>
                {owners.map((o) => (
                  <option key={o.ownerId} value={o.ownerId}>{o.firstName} {o.lastName}</option>
                ))}
              </select>
              <div className="flex justify-end space-x-2 mt-4">
                <button type="button" onClick={closeModal} className="px-4 py-2 border rounded">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-pink-500 text-white rounded">{saving ? "Saving..." : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
