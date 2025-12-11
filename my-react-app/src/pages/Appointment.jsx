import React, { useEffect, useState } from "react";
import api from "../api/api"; // axios instance with baseURL: http://localhost:8080/api
import { useAuth } from "../context/AuthContext";

export default function AppointmentPage() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedStaffId, setSelectedStaffId] = useState("");
  const [appointmentDatetime, setAppointmentDatetime] = useState("");
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("Scheduled");

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Helper: headers for requests (api has interceptor but we include for clarity)
  const authHeaders = { headers: { Authorization: token ? `Bearer ${token}` : "" } };

  // Fetch appointments + dropdown data on mount
  useEffect(() => {
    if (!token) {
      // if not logged in, don't try
      setInitialLoading(false);
      return;
    }

    const fetchAll = async () => {
      try {
        setInitialLoading(true);
        const [apptsRes, petsRes, servicesRes, staffRes] = await Promise.all([
          api.get("/appointments", authHeaders),
          api.get("/pets", authHeaders),
          api.get("/services", authHeaders),
          api.get("/employee", authHeaders),
        ]);

        setAppointments(Array.isArray(apptsRes.data) ? apptsRes.data : []);
        setPets(Array.isArray(petsRes.data) ? petsRes.data : []);
        setServices(Array.isArray(servicesRes.data) ? servicesRes.data : []);
        setStaff(Array.isArray(staffRes.data) ? staffRes.data : []);
      } catch (err) {
        console.error("Failed to load appointment page data:", err);
        setAppointments([]);
        setPets([]);
        setServices([]);
        setStaff([]);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchAll();
    // no interval here — appointments may be refreshed after add
  }, [token]);

  // When pet selection changes, automatically show owner if exists (no backend call required)
  const selectedPet = pets.find((p) => String(p.petId) === String(selectedPetId));
  const petOwner = selectedPet?.owner || null;

  // Convert datetime-local input (YYYY-MM-DDTHH:mm) to 'YYYY-MM-DDTHH:mm:ss' for backend LocalDateTime
  function normalizeDatetimeForBackend(inputValue) {
    if (!inputValue) return null;
    // inputValue usually "2025-12-12T18:00" (no seconds) — append ":00" if missing
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(inputValue)) {
      return `${inputValue}:00`;
    }
    // if seconds already present, return as-is
    return inputValue;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!selectedPetId) return alert("Please select a pet.");
    if (!selectedServiceId) return alert("Please select a service.");
    if (!selectedStaffId) return alert("Please select a staff.");
    if (!appointmentDatetime) return alert("Please choose a date & time.");

    // Extra validation: ensure pet has an owner
    if (!petOwner) {
      return alert(
        "Selected pet does not have an owner assigned. Please pick a pet that has an owner."
      );
    }

    // Format datetime properly for Java LocalDateTime expectation (no trailing Z)
    const normalized = normalizeDatetimeForBackend(appointmentDatetime);

    const payload = {
      petId: Number(selectedPetId),
      serviceId: Number(selectedServiceId),
      staffId: Number(selectedStaffId),
      appointmentDatetime: normalized,
      remarks: remarks || "",
      status: status || "Scheduled",
    };

    try {
      setLoading(true);
      const res = await api.post("/appointments", payload, authHeaders);
      // success
      alert("Appointment added successfully!");
      setShowForm(false);

      // reset form
      setSelectedPetId("");
      setSelectedServiceId("");
      setSelectedStaffId("");
      setAppointmentDatetime("");
      setRemarks("");
      setStatus("Scheduled");

      // refresh appointments (GET)
      const refreshed = await api.get("/appointments", authHeaders);
      setAppointments(Array.isArray(refreshed.data) ? refreshed.data : []);
    } catch (err) {
      console.error("Failed to add appointment:", err);
      // show a helpful message, prefer server message if available
      const serverMsg = err.response?.data?.message || err.response?.data?.error;
      alert("Failed to add appointment: " + (serverMsg || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="p-8 text-center text-gray-500">Loading appointments...</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-600">Appointments</h1>

      <div className="flex justify-between mb-4 items-center gap-4">
        <div className="flex-1">
          <button
            onClick={() => setShowForm((s) => !s)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md shadow"
          >
            {showForm ? "Close Form" : "Add Appointment"}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white shadow-md border border-pink-200 rounded-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Pet */}
            <div>
              <label className="font-semibold text-gray-700">Pet</label>
              <select
                className="w-full mt-1 p-2 border rounded-md"
                value={selectedPetId}
                onChange={(e) => setSelectedPetId(e.target.value)}
                required
              >
                <option value="">-- Select Pet --</option>
                {pets.map((p) => (
                  <option key={p.petId} value={p.petId}>
                    {p.name} ({p.species}) — {p.owner ? `${p.owner.firstName} ${p.owner.lastName}` : "No owner"}
                  </option>
                ))}
              </select>
              {selectedPetId && petOwner && (
                <p className="mt-2 text-sm text-gray-600">
                  Owner: {petOwner.firstName} {petOwner.lastName} — {petOwner.email || petOwner.phoneNumber || ""}
                </p>
              )}
              {selectedPetId && !petOwner && (
                <p className="mt-2 text-sm text-red-600">Selected pet has no owner — cannot schedule.</p>
              )}
            </div>

            {/* Service */}
            <div>
              <label className="font-semibold text-gray-700">Service</label>
              <select
                className="w-full mt-1 p-2 border rounded-md"
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                required
              >
                <option value="">-- Select Service --</option>
                {services.map((s) => (
                  <option key={s.serviceId} value={s.serviceId}>
                    {s.serviceName}
                  </option>
                ))}
              </select>
            </div>

            {/* Staff */}
            <div>
              <label className="font-semibold text-gray-700">Staff</label>
              <select
                className="w-full mt-1 p-2 border rounded-md"
                value={selectedStaffId}
                onChange={(e) => setSelectedStaffId(e.target.value)}
                required
              >
                <option value="">-- Select Staff --</option>
                {staff.map((st) => (
                  <option key={st.employeeId} value={st.employeeId}>
                    {st.firstName} {st.lastName} ({st.role || st.position || "Staff"})
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
            <div>
              <label className="font-semibold text-gray-700">Date & Time</label>
              <input
                type="datetime-local"
                className="w-full mt-1 p-2 border rounded-md"
                value={appointmentDatetime}
                onChange={(e) => setAppointmentDatetime(e.target.value)}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Note: time will be saved as local date/time (stored as LocalDateTime on backend).
              </p>
            </div>

            {/* Remarks */}
            <div>
              <label className="font-semibold text-gray-700">Remarks</label>
              <textarea
                className="w-full mt-1 p-2 border rounded-md"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Optional notes for the appointment (required by backend — you may enter '-' if none)."
              />
              <p className="text-sm text-gray-500 mt-1">Backend requires a non-empty remarks field — enter '-' if none.</p>
            </div>

            {/* Status */}
            <div>
              <label className="font-semibold text-gray-700">Status</label>
              <select
                className="w-full mt-1 p-2 border rounded-md"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-pink-500 text-white rounded"
              >
                {loading ? "Adding..." : "Add Appointment"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Appointments table */}
      <div className="overflow-x-auto bg-white shadow-md border border-pink-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-pink-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Pet</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Service</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Staff</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date & Time</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No appointments scheduled.
                </td>
              </tr>
            )}

            {appointments.map((appt) => {
              // appt.appointmentDatetime might be "YYYY-MM-DDTHH:mm:ss"
              // new Date(...) can interpret as local vs UTC inconsistently - show raw if invalid
              let displayDatetime = appt.appointmentDatetime;
              try {
                const parsed = new Date(appt.appointmentDatetime);
                if (!isNaN(parsed)) displayDatetime = parsed.toLocaleString();
              } catch (e) {
                // fallback: keep original string
              }

              return (
                <tr key={appt.appointmentId || appt.id}>
                  <td className="px-6 py-4">
                    {appt.pet?.name ?? "—"}
                    <div className="text-xs text-gray-400">
                      {appt.pet?.species ? `${appt.pet.species}` : ""}
                    </div>
                  </td>
                  <td className="px-6 py-4">{appt.service?.serviceName ?? "—"}</td>
                  <td className="px-6 py-4">
                    {appt.staff ? `${appt.staff.firstName} ${appt.staff.lastName}` : "—"}
                  </td>
                  <td className="px-6 py-4">{displayDatetime}</td>
                  <td className="px-6 py-4">{appt.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
