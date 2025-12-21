import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function TreatmentRecords() {
  const { token } = useAuth();
  const [pets, setPets] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Map pets with their treatments
  const petsWithTreatments = pets.map((pet) => {
    const petTreatments = treatments.filter((t) => t.petId === pet.petId);
    return {
      ...pet,
      treatmentCount: petTreatments.length,
      treatments: petTreatments.map((t, idx) => ({
        ...t,
        key: `pet-${pet.petId}-treatment-${t.treatmentId || idx}`,
      })),
    };
  });

  // Filter by search query
  const filteredPets = petsWithTreatments.filter(
    (pet) => pet.name && pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-t-4 border-pink-400">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
<<<<<<< HEAD
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                Treatment Records
              </h1>
              <p className="text-gray-600">
                View complete treatment history for each pet
              </p>
=======
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Treatment Records</h1>
              <p className="text-gray-600">View complete treatment history for each pet</p>
>>>>>>> b1b706ce2146276a68b5befe123318d323e212ed
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by pet name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 transition-colors duration-200"
            />
          </div>
        </div>

        {pets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
<<<<<<< HEAD
            <p className="text-gray-500 font-medium">No pets found</p>
=======
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No pets found</p>
              <p className="text-gray-400 text-sm mt-1">Register pets to start viewing treatment records</p>
            </div>
>>>>>>> b1b706ce2146276a68b5befe123318d323e212ed
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPets.map((pet) => {
              const isExpanded = expandedPet === pet.petId;

              return (
<<<<<<< HEAD
                <div
                  key={`pet-${pet.petId}`}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
=======
                <div key={pet.petId} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
>>>>>>> b1b706ce2146276a68b5befe123318d323e212ed
                  {/* Pet Header */}
                  <div className="p-6 border-l-4 border-pink-400">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full text-white font-bold text-lg">
                          {pet.name ? pet.name[0].toUpperCase() : "?"}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-800">{pet.name}</h2>
                          <div className="flex items-center gap-4 text-gray-500 text-sm mt-1">
                            <span className="flex items-center gap-1">{pet.species}</span>
                            {pet.breed && <span>{pet.breed}</span>}
                            {pet.ownerName && <span>{pet.ownerName}</span>}
                            <span>
                              {pet.treatmentCount} {pet.treatmentCount === 1 ? "Record" : "Records"}
                            </span>
<<<<<<< HEAD
=======
                            {pet.breed && (
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {pet.breed}
                              </span>
                            )}
                            <span className="flex items-center gap-1 px-2 py-1 bg-pink-100 text-pink-600 rounded-full font-semibold">
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
>>>>>>> b1b706ce2146276a68b5befe123318d323e212ed
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleExpand(pet.petId)}
                        className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                      >
<<<<<<< HEAD
                        {isExpanded ? "Hide Records" : "View Records"}
=======
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {isExpanded ? 'Hide Records' : 'View Records'}
>>>>>>> b1b706ce2146276a68b5befe123318d323e212ed
                      </button>
                    </div>
                  </div>

                  {/* Treatment Records Table */}
                  {isExpanded && (
                    <div className="border-t border-gray-200">
                      {pet.treatments.length === 0 ? (
                        <div className="p-12 text-center">
<<<<<<< HEAD
                          <p className="text-gray-500 font-medium">
                            No treatments recorded yet
                          </p>
=======
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <p className="text-gray-500 font-medium">No treatments recorded yet</p>
                            <p className="text-gray-400 text-sm mt-1">Complete appointments to add treatment records for {pet.name}</p>
                          </div>
>>>>>>> b1b706ce2146276a68b5befe123318d323e212ed
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-pink-100 to-rose-100">
                              <tr>
<<<<<<< HEAD
                                <th>#</th>
                                <th>Service Given</th>
                                <th>Findings</th>
                                <th>Medicine</th>
                                <th>Date</th>
                                <th>Total Bill</th>
=======
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">#</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Service Given</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Findings</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Medicine</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Total Bill</th>
>>>>>>> b1b706ce2146276a68b5befe123318d323e212ed
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {pet.treatments.map((t, index) => (
<<<<<<< HEAD
                                <tr
                                  key={t.key}
                                  className={`hover:bg-pink-50 transition-colors duration-150 ${
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                  }`}
                                >
                                  <td className="px-6 py-4">{index + 1}</td>
                                  <td>{t.serviceGiven}</td>
                                  <td>{t.findings || "N/A"}</td>
                                  <td>{t.medicinePrescribed || "N/A"}</td>
                                  <td>
                                    {t.serviceDate
                                      ? new Date(t.serviceDate).toLocaleDateString(
                                          "en-US",
                                          { year: "numeric", month: "short", day: "numeric" }
                                        )
                                      : "N/A"}
                                  </td>
                                  <td>₱{parseFloat(t.totalBill || 0).toFixed(2)}</td>
=======
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
                                    <div className="text-sm text-gray-700 max-w-xs" title={t.findings}>{t.findings}</div>
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
>>>>>>> b1b706ce2146276a68b5befe123318d323e212ed
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
                <p className="text-gray-500 font-medium">No results found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> b1b706ce2146276a68b5befe123318d323e212ed
