import { useState } from "react";

export default function Settings() {
  const [clinicName, setClinicName] = useState("Animaland Vet Clinic");
  const [address, setAddress] = useState("123 Pet Street, Petville");
  const [phone, setPhone] = useState("555-123-4567");

  function handleSubmit(e) {
    e.preventDefault();
    alert("Settings saved!");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-green-900">Settings</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-green-100 p-6 rounded-md shadow"
      >
        <label className="block mb-4">
          <span className="text-green-800 font-semibold">Clinic Name</span>
          <input
            type="text"
            value={clinicName}
            onChange={(e) => setClinicName(e.target.value)}
            className="mt-1 block w-full rounded border border-green-300 p-2"
          />
        </label>

        <label className="block mb-4">
          <span className="text-green-800 font-semibold">Address</span>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full rounded border border-green-300 p-2"
          />
        </label>

        <label className="block mb-4">
          <span className="text-green-800 font-semibold">Phone Number</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full rounded border border-green-300 p-2"
          />
        </label>

        <button
          type="submit"
          className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
