import { useEffect, useState } from "react";
import api from "../api/api"; 
import { useAuth } from "../context/AuthContext";

export default function Owner() {
  const { token } = useAuth();
  const [owners, setOwners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState({ type: null, owner: null });
  const [loading, setLoading] = useState(true);

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch owners
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchOwners = async () => {
      try {
        setLoading(true);
        const res = await api.get("/owners", authHeaders);
        setOwners(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || "Failed to fetch owners");
        setOwners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOwners();
  }, [token]);

  // Add owner
  const addOwner = async (newOwner) => {
    try {
      const res = await api.post("/owners", newOwner, authHeaders);
      setOwners((prev) => [...prev, res.data]);
      setModal({ type: null, owner: null });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add owner");
    }
  };

  // Edit owner
  const editOwner = async (updatedOwner) => {
    try {
      const res = await api.put(`/owners/${updatedOwner.ownerId}`, updatedOwner, authHeaders);
      setOwners((prev) =>
        prev.map((o) => (o.ownerId === updatedOwner.ownerId ? res.data : o))
      );
      setModal({ type: null, owner: null });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update owner");
    }
  };

  // Delete owner
  const deleteOwner = async (id) => {
    if (!confirm("Are you sure you want to delete this owner?")) return;
    try {
      await api.delete(`/owners/${id}`, authHeaders);
      setOwners((prev) => prev.filter((o) => o.ownerId !== id));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete owner");
    }
  };

  const filteredOwners = owners.filter((o) => {
    const name = `${o.firstName} ${o.lastName}`.toLowerCase();
    const contact = (o.phoneNumber || "").toLowerCase();
    return (
      name.includes(searchTerm.toLowerCase()) ||
      contact.includes(searchTerm.toLowerCase()) ||
      (o.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading)
    return <div className="p-8 text-center text-gray-500">Loading owners...</div>;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-4">
          <h1 className="text-4xl font-bold text-gray-800">Owners</h1>
          <button
            className="bg-pink-400 text-white px-6 py-3 rounded-lg"
            onClick={() => setModal({ type: "add", owner: null })}
          >
            Add Owner
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by name, email, or phone"
          className="w-full mb-6 p-3 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-pink-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Pets</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOwners.length > 0 ? (
              filteredOwners.map((o) => (
                <tr key={o.ownerId} className="border-t">
                  <td className="p-3">{o.firstName} {o.lastName}</td>
                  <td className="p-3">{o.email}</td>
                  <td className="p-3">{o.phoneNumber}</td>
                  <td className="p-3">{(o.pets || []).length}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => setModal({ type: "view", owner: o })} className="text-blue-500">View</button>
                    <button onClick={() => setModal({ type: "edit", owner: o })} className="text-green-500">Edit</button>
                    <button onClick={() => deleteOwner(o.ownerId)} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="p-4 text-center">No owners found</td></tr>
            )}
          </tbody>
        </table>

        {modal.type && (
          <OwnerModal
            type={modal.type}
            owner={modal.owner}
            addOwner={addOwner}
            editOwner={editOwner}
            close={() => setModal({ type: null, owner: null })}
          />
        )}
      </div>
    </div>
  );
}

// ================= MODAL =================
function OwnerModal({ type, owner, addOwner, editOwner, close }) {
  const [formData, setFormData] = useState(
    owner || { firstName: "", lastName: "", email: "", phoneNumber: "", address: "" }
  );

  useEffect(() => {
    setFormData(owner || { firstName: "", lastName: "", email: "", phoneNumber: "", address: "" });
  }, [owner]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "add") addOwner(formData);
    else if (type === "edit") editOwner({ ...formData, ownerId: owner.ownerId });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {type === "view" ? "View Owner" : type === "edit" ? "Edit Owner" : "Add Owner"}
        </h2>

        {["firstName","lastName","email","phoneNumber","address"].map(field => (
          <div key={field} className="mb-3">
            <label className="block text-sm capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type={field==="email"?"email":"text"}
              value={formData[field]}
              readOnly={type==="view"}
              onChange={e => setFormData({...formData,[field]:e.target.value})}
              required={type!=="view"}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}

        <div className="flex justify-end gap-2">
          <button type="button" onClick={close} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          {type !== "view" && (
            <button type="submit" className="px-4 py-2 bg-pink-400 text-white rounded">
              {type==="add" ? "Add" : "Save"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
