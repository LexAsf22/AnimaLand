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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pink-200 border-t-pink-500 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading owners...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-t-4 border-pink-400">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Pet Owners</h1>
              <p className="text-gray-600">Manage your clinic's pet owner database</p>
            </div>
            <button
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
              onClick={() => setModal({ type: "add", owner: null })}
            >
              + Add New Owner
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, email, or phone number..."
              className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 transition-colors duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Owner Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Phone Number</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Registered Pets</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOwners.length > 0 ? (
                  filteredOwners.map((o, idx) => (
                    <tr key={o.ownerId} className={`hover:bg-pink-50 transition-colors duration-150 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold">
                            {o.firstName[0]}{o.lastName[0]}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">{o.firstName} {o.lastName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{o.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{o.phoneNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-100 text-pink-800">
                          {(o.pets || []).length} {(o.pets || []).length === 1 ? 'Pet' : 'Pets'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setModal({ type: "view", owner: o })} 
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-150 font-medium"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => setModal({ type: "edit", owner: o })} 
                            className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-150 font-medium"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteOwner(o.ownerId)} 
                            className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-150 font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <p className="text-gray-500 font-medium">No owners found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your search or add a new owner</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

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

  const fieldLabels = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phoneNumber: "Phone Number",
    address: "Address"
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-5 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {type === "view" ? "Owner Details" : type === "edit" ? "Edit Owner" : "Add New Owner"}
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

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {["firstName","lastName","email","phoneNumber","address"].map(field => (
              <div key={field}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {fieldLabels[field]}
                  {type !== "view" && <span className="text-pink-500 ml-1">*</span>}
                </label>
                <input
                  type={field==="email"?"email":"text"}
                  value={formData[field] || ""}
                  readOnly={type==="view"}
                  onChange={e => setFormData({...formData,[field]:e.target.value})}
                  required={type!=="view"}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                    type === "view" 
                      ? "bg-gray-50 border-gray-200 cursor-not-allowed" 
                      : "border-gray-200 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
                  }`}
                  placeholder={type !== "view" ? `Enter ${fieldLabels[field].toLowerCase()}` : ""}
                />
              </div>
            ))}
          </div>

          {/* Pet Information Display (View Mode) */}
          {type === "view" && owner?.pets && (
            <div className="mt-6 p-4 bg-pink-50 rounded-xl border-2 border-pink-100">
              <h3 className="font-semibold text-gray-700 mb-2">Registered Pets</h3>
              <p className="text-sm text-gray-600">
                This owner has <span className="font-bold text-pink-600">{owner.pets.length}</span> registered {owner.pets.length === 1 ? 'pet' : 'pets'}
              </p>
            </div>
          )}

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <button 
              type="button" 
              onClick={close} 
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors duration-200"
            >
              {type === "view" ? "Close" : "Cancel"}
            </button>
            {type !== "view" && (
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {type==="add" ? "Add Owner" : "Save Changes"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}