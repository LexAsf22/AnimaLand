export default function Users() {
  const users = [
    { id: 1, name: "Buddy", species: "Dog", breed: "Golden Retriever", owner: "Alice Johnson", lastVisit: "2024-11-28", status: "Active" },
    { id: 2, name: "Whiskers", species: "Cat", breed: "Persian", owner: "Michael Lee", lastVisit: "2024-11-25", status: "Active" },
    { id: 3, name: "Chirpy", species: "Parrot", breed: "Macaw", owner: "Sarah Kim", lastVisit: "2024-11-20", status: "Active" },
    { id: 4, name: "Nibbles", species: "Rabbit", breed: "Holland Lop", owner: "John Smith", lastVisit: "2024-11-15", status: "Inactive" },
    { id: 5, name: "Max", species: "Dog", breed: "Poodle", owner: "Emma Wilson", lastVisit: "2024-12-01", status: "Active" },
    { id: 6, name: "Luna", species: "Cat", breed: "Siamese", owner: "David Chen", lastVisit: "2024-11-30", status: "Active" },
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-serif font-bold text-gray-800">Patients</h1>
                <p className="text-gray-600 mt-1">Manage your furry friends and their care</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-pink-400 to-rose-400 text-white py-3 px-6 rounded-lg hover:from-pink-500 hover:to-rose-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
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
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-100">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search patients by name, species, or owner..."
                className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
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
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-pink-50/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-500">ID: #{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getSpeciesIcon(user.species)}
                        <div>
                          <p className="font-medium text-gray-800">{user.species}</p>
                          <p className="text-sm text-gray-500">{user.breed}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-700">{user.owner}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-700">{user.lastVisit}</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-pink-100 rounded-lg transition-colors" title="View">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-2 hover:bg-pink-100 rounded-lg transition-colors" title="Edit">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button className="p-2 hover:bg-pink-100 rounded-lg transition-colors" title="Delete">
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}