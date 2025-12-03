import { useState } from "react";

export default function Users() {
  const initialUsers = [
    { id: 1, name: "Buddy", species: "Dog", breed: "Golden Retriever", owner: "Alice Johnson", lastVisit: "2024-11-28", status: "Active" },
    { id: 2, name: "Whiskers", species: "Cat", breed: "Persian", owner: "Michael Lee", lastVisit: "2024-11-25", status: "Active" },
    { id: 3, name: "Chirpy", species: "Parrot", breed: "Macaw", owner: "Sarah Kim", lastVisit: "2024-11-20", status: "Active" },
    { id: 4, name: "Nibbles", species: "Rabbit", breed: "Holland Lop", owner: "John Smith", lastVisit: "2024-11-15", status: "Inactive" },
    { id: 5, name: "Max", species: "Dog", breed: "Poodle", owner: "Emma Wilson", lastVisit: "2024-12-01", status: "Active" },
    { id: 6, name: "Luna", species: "Cat", breed: "Siamese", owner: "David Chen", lastVisit: "2024-11-30", status: "Active" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [modal, setModal] = useState({ type: null, user: null }); // type: 'view', 'edit', 'add'

  const getSpeciesIcon = (species) => {
    switch(species.toLowerCase()) {
      case 'dog':
        return (
          <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zM4 6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm13 4.5c0-.83-.67-1.5-1.5-1.5h-11c-.83 0-1.5.67-1.5 1.5V21c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5v-10.5z"/>
          </svg>
        );
      case 'cat':
        return (
          <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06z"/>
          </svg>
        );
      case 'parrot':
      case 'bird':
        return (
          <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 2c-2.76 0-5 2.24-5 5v5H7V7H5v5c0 1.66 1.34 3 3 3h1.54c-.95 1.29-2.5 2.11-4.28 2.11H4v2h1.26c2.83 0 5.32-1.59 6.54-3.92.82 1.08 2.08 1.76 3.5 1.76 2.21 0 4-1.79 4-4V2h-3.3z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
    }
  };

  // Add, Edit, Delete functions
  const addUser = (newUser) => {
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setModal({ type: null, user: null });
  };

  const editUser = (updatedUser) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setModal({ type: null, user: null });
  };

  const deleteUser = (id) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-serif font-bold text-gray-800">Patients</h1>
          <button
            className="bg-gradient-to-r from-pink-400 to-rose-400 text-white py-3 px-6 rounded-lg hover:from-pink-500 hover:to-rose-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
            onClick={() => setModal({ type: 'add', user: null })}
          >
            Add Patient
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-100">
            <p className="text-sm text-gray-600">Total Patients</p>
            <p className="text-2xl font-bold text-gray-800">{users.length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-100">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'Active').length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-100">
            <p className="text-sm text-gray-600">Dogs</p>
            <p className="text-2xl font-bold text-gray-800">{users.filter(u => u.species === 'Dog').length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-100">
            <p className="text-sm text-gray-600">Cats</p>
            <p className="text-2xl font-bold text-gray-800">{users.filter(u => u.species === 'Cat').length}</p>
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
              placeholder="Search patients by name, species, or owner..."
              className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-pink-100 to-rose-100">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Patient</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Species & Breed</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Owner</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Last Visit</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-pink-50/50 transition-colors">
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.species} ({user.breed})</td>
                    <td className="p-4">{user.owner}</td>
                    <td className="p-4">{user.lastVisit}</td>
                    <td className="p-4">{user.status}</td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => setModal({ type: 'view', user })} className="text-blue-500">View</button>
                      <button onClick={() => setModal({ type: 'edit', user })} className="text-green-500">Edit</button>
                      <button onClick={() => deleteUser(user.id)} className="text-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {modal.type && (
          <Modal
            type={modal.type}
            user={modal.user}
            addUser={addUser}
            editUser={editUser}
            close={() => setModal({ type: null, user: null })}
          />
        )}
      </div>
    </div>
  );
}

// Modal Component (same as previous example)
function Modal({ type, user, addUser, editUser, close }) {
  const [formData, setFormData] = useState(user || {
    name: '',
    species: '',
    breed: '',
    owner: '',
    lastVisit: '',
    status: 'Active',
  });

  const handleSubmit = () => {
    if (type === 'add') addUser(formData);
    if (type === 'edit') editUser({ ...formData, id: user.id });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">{type === 'view' ? 'View' : type === 'edit' ? 'Edit' : 'Add'} Patient</h2>

        <div className="flex flex-col gap-2">
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            readOnly={type === 'view'}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 rounded"
          />
          <label>Species:</label>
          <input
            type="text"
            value={formData.species}
            readOnly={type === 'view'}
            onChange={e => setFormData({ ...formData, species: e.target.value })}
            className="border p-2 rounded"
          />
          <label>Breed:</label>
          <input
            type="text"
            value={formData.breed}
            readOnly={type === 'view'}
            onChange={e => setFormData({ ...formData, breed: e.target.value })}
            className="border p-2 rounded"
          />
          <label>Owner:</label>
          <input
            type="text"
            value={formData.owner}
            readOnly={type === 'view'}
            onChange={e => setFormData({ ...formData, owner: e.target.value })}
            className="border p-2 rounded"
          />
          <label>Last Visit:</label>
          <input
            type="date"
            value={formData.lastVisit}
            readOnly={type === 'view'}
            onChange={e => setFormData({ ...formData, lastVisit: e.target.value })}
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
