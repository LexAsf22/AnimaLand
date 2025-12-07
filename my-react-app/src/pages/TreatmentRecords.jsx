import React from "react";

// Sample pet and treatment data
const pets = [
  { id: 1, name: "Buddy", species: "Dog", breed: "Golden Retriever", owner: "Alice Johnson", lastVisit: "2024-11-28", status: "Active" },
  { id: 2, name: "Whiskers", species: "Cat", breed: "Persian", owner: "Michael Lee", lastVisit: "2024-11-25", status: "Active" },
  { id: 3, name: "Chirpy", species: "Parrot", breed: "Macaw", owner: "Sarah Kim", lastVisit: "2024-11-20", status: "Active" },
  { id: 4, name: "Nibbles", species: "Rabbit", breed: "Holland Lop", owner: "John Smith", lastVisit: "2024-11-15", status: "Inactive" },
  { id: 5, name: "Max", species: "Dog", breed: "Poodle", owner: "Emma Wilson", lastVisit: "2024-12-01", status: "Active" },
  { id: 6, name: "Luna", species: "Cat", breed: "Siamese", owner: "David Chen", lastVisit: "2024-11-30", status: "Active" },
];

const treatmentRecords = [
  { treatment_id: 101, appointment_id: 201, pet_id: 1, findings: "Healthy", service_given: "Checkup", medicine_prescribed: "None", service_date: "2024-11-28" },
  { treatment_id: 102, appointment_id: 202, pet_id: 2, findings: "Mild cold", service_given: "Vaccination", medicine_prescribed: "Antibiotics", service_date: "2024-11-25" },
  { treatment_id: 103, appointment_id: 203, pet_id: 3, findings: "Feather loss", service_given: "Checkup", medicine_prescribed: "Vitamin supplements", service_date: "2024-11-20" },
  { treatment_id: 104, appointment_id: 204, pet_id: 5, findings: "Dental issues", service_given: "Checkup", medicine_prescribed: "Painkillers", service_date: "2024-12-01" },
  { treatment_id: 105, appointment_id: 205, pet_id: 6, findings: "Healthy", service_given: "Vaccination", medicine_prescribed: "None", service_date: "2024-11-30" },
];

export default function TreatmentRecords() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-gray-800 mb-3">Treatment Records Dashboard</h1>
          <p className="text-gray-600">Monitor treatments, services given, prescribed medicines, and service dates for each pet.</p>
        </div>

        {/* Pet Treatment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => {
            const petRecords = treatmentRecords.filter(record => record.pet_id === pet.id);
            return (
              <div key={pet.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{pet.name} ({pet.species})</h2>
                <p className="text-gray-600 mb-2">Breed: {pet.breed}</p>
                <p className="text-gray-600 mb-2">Owner: {pet.owner}</p>
                <p className="text-gray-600 mb-4">Last Visit: {pet.lastVisit}</p>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Treatment Records:</h3>
                {petRecords.length > 0 ? (
                  <ul className="space-y-2">
                    {petRecords.map((record) => (
                      <li key={record.treatment_id} className="bg-pink-50 rounded-xl p-3 border border-pink-100">
                        <p><span className="font-semibold">Service:</span> {record.service_given}</p>
                        <p><span className="font-semibold">Findings:</span> {record.findings}</p>
                        <p><span className="font-semibold">Medicine:</span> {record.medicine_prescribed}</p>
                        <p><span className="font-semibold">Date:</span> {record.service_date}</p>
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
    </div>
  );
}
