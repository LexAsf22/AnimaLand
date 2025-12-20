import React, { useEffect, useState } from "react";
import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

const useAuth = () => ({ token: localStorage.getItem("token") });

export default function AppointmentPage() {
  const { token } = useAuth();
  const authHeaders = { headers: { Authorization: token ? `Bearer ${token}` : "" } };

  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingAppt, setEditingAppt] = useState(null);

  const [selectedPetId, setSelectedPetId] = useState("");
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState("");
  const [appointmentDatetime, setAppointmentDatetime] = useState("");
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("Scheduled");

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const selectedPet = pets.find(p => String(p.petId) === String(selectedPetId));
  const petHasOwner = Boolean(selectedPet?.ownerId);

  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completeAppt, setCompleteAppt] = useState(null);

  const [findings, setFindings] = useState("");
  const [medicinePrescribed, setMedicinePrescribed] = useState("");

  // Calculate totals
  const selectedServices = services.filter(s => selectedServiceIds.includes(s.serviceId));
  const totalPrice = selectedServices.reduce((sum, s) => sum + (s.price || 0), 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + (s.duration || 0), 0);

  // Service toggle handler
  const handleServiceToggle = (serviceId) => {
    setSelectedServiceIds(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // =======================
  // FETCH DATA
  // =======================
  useEffect(() => {
    if (!token) {
      setInitialLoading(false);
      return;
    }

    const fetchAll = async () => {
      try {
        setInitialLoading(true);

        const [petsRes, servicesRes, staffRes, apptsRes] = await Promise.all([
          api.get("/pets", authHeaders),
          api.get("/services", authHeaders),
          api.get("/employee", authHeaders),
          api.get("/appointments", authHeaders),
        ]);

        setPets(petsRes.data || []);
        setServices(servicesRes.data || []);
        setStaff(staffRes.data || []);

        // ✅ Backend already returns services — no enrichment needed
        setAppointments(apptsRes.data || []);

      } catch (err) {
        console.error(err);
        alert("Failed to load data. Check console.");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchAll();
  }, [token]);



  // =======================
  // SUBMIT NEW OR EDIT
  // =======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPetId || selectedServiceIds.length === 0 || !selectedStaffId || !appointmentDatetime) {
      return alert("Please fill all required fields and select at least one service.");
    }
    if (!petHasOwner) return alert("Selected pet has no owner.");

    const payload = {
      petId: Number(selectedPetId),
      staffId: Number(selectedStaffId),
      serviceIds: selectedServiceIds.map(Number), // send all selected services
      appointmentDatetime: new Date(appointmentDatetime).toISOString().slice(0, 19),
      remarks: remarks || "-",
      status,
    };

    try {
      setLoading(true);

      if (editingAppt) {
        // Update existing appointment
        await api.put(`/appointments/${editingAppt.appointmentId}`, payload, authHeaders);
        alert("Appointment updated successfully!");
      } else {
        // Create new appointment
        const createRes = await api.post("/appointments", payload, authHeaders);
        const newAppt = createRes.data;

        // Map the services for frontend display
        const apptServices = (selectedServiceIds || []).map(id => {
          const svc = services.find(s => s.serviceId === id);
          return svc ? { ...svc } : {};
        });

        // Add the new appointment locally
        setAppointments(prev => [
          ...prev,
          { ...newAppt, services: apptServices, staffName: staff.find(s => s.employeeId === Number(selectedStaffId))?.firstName + " " + staff.find(s => s.employeeId === Number(selectedStaffId))?.lastName }
        ]);

        alert("Appointment added successfully!");
      }

      // Reset form
      setShowForm(false);
      setEditingAppt(null);
      setSelectedPetId("");
      setSelectedStaffId("");
      setSelectedServiceIds([]);
      setAppointmentDatetime("");
      setRemarks("");
      setStatus("Scheduled");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save appointment");
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // EDIT & DELETE
  // =======================
  const handleEdit = (appt) => {
    setEditingAppt(appt);
    setShowForm(true);
    setSelectedPetId(appt.pet?.petId || "");
    setSelectedStaffId(appt.staff?.employeeId || "");
    setSelectedServiceIds(appt.services?.map(s => s.serviceId) || []);
    setAppointmentDatetime(appt.appointmentDatetime?.slice(0, 16) || "");
    setRemarks(appt.remarks || "");
    setStatus(appt.status || "Scheduled");
  };

  const handleDelete = async (appt) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await api.delete(`/appointments/${appt.appointmentId}`, authHeaders);
      setAppointments(prev => prev.filter(a => a.appointmentId !== appt.appointmentId));
      alert("Appointment deleted.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete appointment");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'confirmed': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      case 'in progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // =======================
  // COMPLETE APPOINTMENT
  // =======================
  const handleCompleteClick = (appt) => {
    setCompleteAppt(appt);
    setShowCompleteModal(true);
  };

  const handleCompleteSubmit = async () => {
  if (!completeAppt) return alert("No appointment selected!");
  if (!findings.trim()) return alert("Please enter findings/diagnosis.");

  try {
    setLoading(true);

    // Prepare treatment records payload
    const records = completeAppt.services.map(s => ({
      serviceGiven: s.serviceName,
      totalBill: s.price || 0,
      serviceDate: new Date().toISOString().slice(0, 10),
      medicinePrescribed: medicinePrescribed || "-",
      findings: findings || "-",
      appointmentId: completeAppt.appointmentId,
      petId: completeAppt.petId
    }));

    // Send to backend
    await api.post(
      `/appointments/${completeAppt.appointmentId}/complete`,
      records,
      authHeaders
    );

    // Update the appointment status locally
    setAppointments(prev =>
      prev.map(appt =>
        appt.appointmentId === completeAppt.appointmentId
          ? { ...appt, status: "Completed" }
          : appt
      )
    );

    // Clear modal and form
    setShowCompleteModal(false);
    setFindings("");
    setMedicinePrescribed("");
    setCompleteAppt(null);

    alert("Appointment completed and treatment records saved successfully!");
  } catch (error) {
    console.error("Failed to complete appointment:", error);
    alert(error.response?.data?.message || "Error completing appointment. Check console for details.");
  } finally {
    setLoading(false);
  }
};



  

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-pink-100 border-t-pink-500 mb-4"></div>
          <p className="text-gray-700 font-semibold text-lg">Loading appointments...</p>
        </div>
      </div>
    );
  }

  // =======================
  // UI
  // =======================
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-t-4 border-pink-400">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                Appointment Management
              </h1>
              <p className="text-gray-600">Schedule and manage veterinary appointments</p>
            </div>
            <button
              onClick={() => {
                setShowForm(prev => !prev);
                if (showForm) {
                  setEditingAppt(null);
                  setSelectedPetId("");
                  setSelectedStaffId("");
                  setSelectedServiceIds([]);
                  setAppointmentDatetime("");
                  setRemarks("");
                  setStatus("Scheduled");
                }
              }}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              {showForm ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Close Form
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New Appointment
                </>
              )}
            </button>
          </div>
        </div>

        {/* Rest of your content continues here... */}
        {/* FORM */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg border border-pink-100 mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4">
              <h2 className="text-xl font-bold text-white">
                {editingAppt ? "Edit Appointment" : "Schedule New Appointment"}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Pet Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pet <span className="text-pink-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    value={selectedPetId}
                    onChange={e => setSelectedPetId(e.target.value)}
                    required
                  >
                    <option value="">Select a pet</option>
                    {pets.map(p => (
                      <option key={p.petId} value={p.petId}>
                        {p.name} {p.breed ? `(${p.breed})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Staff Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Veterinarian <span className="text-pink-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    value={selectedStaffId}
                    onChange={e => setSelectedStaffId(e.target.value)}
                    required
                  >
                    <option value="">Select veterinarian</option>
                    {staff.map(s => (
                      <option key={s.employeeId} value={s.employeeId}>
                        Dr. {s.firstName} {s.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date & Time <span className="text-pink-500">*</span>
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    type="datetime-local"
                    value={appointmentDatetime}
                    onChange={e => setAppointmentDatetime(e.target.value)}
                    required
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Services */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Services <span className="text-pink-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {services.map((s) => (
                    <label
                      key={s.serviceId}
                      className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedServiceIds.includes(s.serviceId)
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-pink-300 bg-white'
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedServiceIds.includes(s.serviceId)}
                        onChange={() => handleServiceToggle(s.serviceId)}
                        className="mt-1 mr-3 h-4 w-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{s.serviceName}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          ₱{(s.price ?? 0).toFixed(2)} • {s.duration ?? 0} min
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Remarks / Notes
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                  value={remarks}
                  onChange={e => setRemarks(e.target.value)}
                  placeholder="Add any special instructions or notes..."
                  rows="3"
                />
              </div>

              {/* Summary & Submit */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-200">
                <div className="space-y-1">
                  <div className="text-lg font-bold text-gray-800">
                    Total: ₱{totalPrice.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Duration: {totalDuration} minutes
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingAppt(null);
                      setSelectedPetId("");
                      setSelectedStaffId("");
                      setSelectedServiceIds([]);
                      setAppointmentDatetime("");
                      setRemarks("");
                      setStatus("Scheduled");
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Saving..." : editingAppt ? "Update Appointment" : "Schedule Appointment"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-lg border border-pink-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-pink-50 to-rose-50">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Pet
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Services
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Veterinarian
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <svg
                          className="w-16 h-16 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-lg font-medium">No appointments scheduled</p>
                        <p className="text-sm mt-1">
                          Click "New Appointment" to schedule one
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  appointments.map((appt) => (
                    <tr key={appt.appointmentId}>

                      {/* PET */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold text-gray-800">{appt.petName || "-"}</div>
                        <div className="text-sm text-gray-500">{appt.petSpecies || ""}</div>
                      </td>

                      {/* SERVICES */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-800">
                          {appt.services?.map(s => s.serviceName).join(", ") || "-"}
                        </div>
                      </td>

                      {/* VETERINARIAN */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-800">
                          {appt.staffName ? `Dr. ${appt.staffName}` : "-"}
                        </div>
                      </td>

                      {/* DATE & TIME */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-800">
                          {appt.appointmentDatetime
                            ? new Date(appt.appointmentDatetime).toLocaleDateString()
                            : "-"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appt.appointmentDatetime
                            ? new Date(appt.appointmentDatetime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                            : "-"}
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(
                            appt.status
                          )}`}
                        >
                          {appt.status}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-3">
                          {appt.status !== "Completed" && (
                            <button
                              onClick={() => handleCompleteClick(appt)}
                              className="text-green-600 hover:text-green-800 font-semibold transition-colors"
                            >
                              Complete
                            </button>
                          )}

                          <button
                            onClick={() => handleEdit(appt)}
                            className="text-pink-600 hover:text-pink-800 font-semibold transition-colors"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(appt)}
                            className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* COMPLETE APPOINTMENT MODAL */}
      {showCompleteModal && completeAppt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-4 sticky top-0">
              <h2 className="text-2xl font-bold text-white">Complete Appointment</h2>
              <p className="text-green-100 text-sm mt-1">
                Pet: {completeAppt.petName} • Vet: Dr. {completeAppt.staffName}
              </p>
            </div>

            <div className="p-6 space-y-5">
              {/* Findings */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Findings / Diagnosis <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Enter clinical findings, diagnosis, and observations..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                  value={findings}
                  onChange={e => setFindings(e.target.value)}
                  rows="4"
                />
              </div>

              {/* Medicine Prescribed */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Medicine Prescribed
                </label>
                <textarea
                  placeholder="Enter prescribed medications, dosages, and instructions..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all resize-none"
                  value={medicinePrescribed}
                  onChange={e => setMedicinePrescribed(e.target.value)}
                  rows="3"
                />
              </div>

              {/* Services Summary */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Services Provided
                </label>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <div className="flex justify-between text-xs font-semibold text-gray-600 uppercase">
                      <span>Service</span>
                      <span>Amount</span>
                    </div>
                  </div>
                  <div className="max-h-40 overflow-y-auto">
                    {completeAppt.services && completeAppt.services.length > 0 ? (
                      completeAppt.services.map((s) => (
                        <div
                          key={`${completeAppt.appointmentId}-${s.serviceId}`}
                          className="flex justify-between px-4 py-3 border-b border-gray-100 last:border-b-0"
                        >
                          <span className="text-gray-800">{s.serviceName}</span>
                          <span className="font-semibold text-gray-900">
                            ₱{Number(s.price || 0).toFixed(2)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="px-4 py-3 text-gray-500 text-center">No services selected</p>
                    )}

                  </div>
                </div>
              </div>

              {/* Total Bill */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 rounded-lg px-6 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">Total Bill</span>
                  <span className="text-2xl font-bold text-pink-600">
                    ₱{completeAppt.services && completeAppt.services.length > 0
                      ? completeAppt.services.reduce(
                        (sum, s) => sum + (Number(s.price || s.cost) || 0),
                        0
                      ).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowCompleteModal(false);
                  setFindings("");
                  setMedicinePrescribed("");
                  setCompleteAppt(null);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleCompleteSubmit}
                disabled={!findings.trim()}
              >
                Complete Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}