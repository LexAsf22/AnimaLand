import { useState } from "react";

export default function Owner() {
  const initialOwners = [
    { id: 1, name: "Alice Johnson", contact: "alice.johnson@email.com", pets: 3, status: "Active" },
    { id: 2, name: "Michael Lee", contact: "michael.lee@email.com", pets: 2, status: "Active" },
    { id: 3, name: "Sarah Kim", contact: "sarah.kim@email.com", pets: 1, status: "Active" },
    { id: 4, name: "John Smith", contact: "john.smith@email.com", pets: 2, status: "Inactive" },
    { id: 5, name: "Emma Wilson", contact: "emma.wilson@email.com", pets: 1, status: "Active" },
    { id: 6, name: "David Chen", contact: "david.chen@email.com", pets: 2, status: "Active" },
  ];

  const [owners, setOwners] = useState(initialOwners);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState({ type: null, owner: null }); // 'view', 'edit', 'add'

  // Add, Edit, Delete functions
  const addOwner = (newOwner) => {
    setOwners([...owners, { ...newOwner, id: Date.now() }]);
    setModal({ type: null, owner: null });
  };

  const editOwner = (updatedOwner) => {
    setOwners(owners.map(o => o.id === updatedOwner.id ? updatedOwner : o));
    setModal({ type: null, owner: null });
  };

  const deleteOwner = (id) => {
    if (confirm("Are you sure you want to delete this owner?")) {
      setOwners(owners.filter(o => o.id !== id));
    }
  };

  // Filter owners based on search
  const filteredOwners = owners.filter(o =>
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-serif font-bold text-gray-800">Owners</h1>
          <button
            className="bg-gradient-to-r from-pink-400 to-rose-400 text-white py-3 px-6 rounded-lg hover:from-pink-500 hover:to-rose-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
            onClick={() => setModal({ type: 'add', owner: null })}
          >
            Add Owner
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-100">
            <p className="text-sm text-gray-600">Total Owners</p>
            <p className="text-2xl font-bold text-gray-800">{owners.length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-100">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold text-green-600">{owners.filter(o => o.status === 'Active').length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-100">
            <p className="text-sm text-gray-600">Inactive</p>
            <p className="text-2xl font-bold text-red-600">{owners.filter(o => o.status === 'Inactive').length}</p>
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
              placeholder="Search owners by name or contact..."
              className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Owners Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-pink-100 to-rose-100">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Contact</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Pets</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-100">
                {filteredOwners.map((owner) => (
                  <tr key={owner.id} className="hover:bg-pink-50/50 transition-colors">
                    <td className="p-4">{owner.name}</td>
                    <td className="p-4">{owner.contact}</td>
                    <td className="p-4">{owner.pets}</td>
                    <td className="p-4">{owner.status}</td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => setModal({ type: 'view', owner })} className="text-blue-500">View</button>
                      <button onClick={() => setModal({ type: 'edit', owner })} className="text-green-500">Edit</button>
                      <button onClick={() => deleteOwner(owner.id)} className="text-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
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

// Owner Modal Component
function OwnerModal({ type, owner, addOwner, editOwner, close }) {
  const [formData, setFormData] = useState(owner || {
    name: '',
    contact: '',
    pets: 0,
    status: 'Active',
  });

  const handleSubmit = () => {
    if (type === 'add') addOwner(formData);
    if (type === 'edit') editOwner({ ...formData, id: owner.id });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">{type === 'view' ? 'View' : type === 'edit' ? 'Edit' : 'Add'} Owner</h2>

        <div className="flex flex-col gap-2">
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            readOnly={type === 'view'}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 rounded"
          />
          <label>Contact:</label>
          <input
            type="text"
            value={formData.contact}
            readOnly={type === 'view'}
            onChange={e => setFormData({ ...formData, contact: e.target.value })}
            className="border p-2 rounded"
          />
          <label>Pets:</label>
          <input
            type="number"
            value={formData.pets}
            readOnly={type === 'view'}
            onChange={e => setFormData({ ...formData, pets: Number(e.target.value) })}
            className="border p-2 rounded"
          />
          <label>Status:</label>
          <select
            value={formData.status}
            disabled={type === 'view'}
            onChange={e => setFormData({ ...formData, status: e.target.value })}
            className="border p-2 rounded"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button onClick={close} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
          {type !== 'view' && (
            <button onClick={handleSubmit} className="px-4 py-2 rounded bg-pink-400 text-white">{type === 'add' ? 'Add' : 'Save'}</button>
          )}
        </div>
      </div>
    </div>
  );
}
