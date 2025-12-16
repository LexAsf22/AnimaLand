import React, { useEffect, useState } from "react";

// Mock API for demonstration
const api = {
  get: async (url) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (url === "/appointments") return { data: [] };
    if (url === "/pets") return { data: [
      { petId: 1, name: "Max", species: "Dog", ownerId: 1, ownerName: "John Doe" },
      { petId: 2, name: "Luna", species: "Cat", ownerId: 2, ownerName: "Jane Smith" }
    ]};
    if (url === "/services") return { data: [
      { serviceId: 1, serviceName: "General Consultation", category: "Consultation", duration: 30, price: 500 },
      { serviceId: 2, serviceName: "Vaccination", category: "Preventive Care", duration: 20, price: 800 },
      { serviceId: 3, serviceName: "Deworming", category: "Preventive Care", duration: 20, price: 600 },
      { serviceId: 4, serviceName: "Anti-Rabies Vaccine", category: "Preventive Care", duration: 20, price: 700 },
      { serviceId: 5, serviceName: "Grooming", category: "Grooming", duration: 60, price: 1200 },
      { serviceId: 6, serviceName: "Nail Trimming", category: "Grooming", duration: 15, price: 300 },
      { serviceId: 7, serviceName: "Dental Cleaning", category: "Dental", duration: 60, price: 2500 },
      { serviceId: 8, serviceName: "Laboratory Test", category: "Diagnostics", duration: 45, price: 1500 },
      { serviceId: 9, serviceName: "X-Ray", category: "Diagnostics", duration: 30, price: 3000 },
      { serviceId: 10, serviceName: "Ultrasound", category: "Diagnostics", duration: 45, price: 3500 },
    ]};
    if (url === "/employee") return { data: [
      { employeeId: 1, firstName: "Dr. Sarah", lastName: "Johnson" },
      { employeeId: 2, firstName: "Dr. Mike", lastName: "Williams" }
    ]};
    return { data: [] };
  },
  post: async () => { await new Promise(resolve => setTimeout(resolve, 500)); return { data: {} }; },
  put: async () => { await new Promise(resolve => setTimeout(resolve, 500)); return { data: {} }; },
  delete: async () => { await new Promise(resolve => setTimeout(resolve, 500)); return { data: {} }; }
};

const useAuth = () => ({ token: "demo-token" });

export default function AppointmentPage() {
  const { token } = useAuth();

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

  const [showCompleteForm, setShowCompleteForm] = useState(false);
  const [treatmentData, setTreatmentData] = useState({
    serviceGiven: "",
    medicine: "",
    totalBill: "",
    nextAppointmentNote: "",
  });
  const [currentCompleteAppt, setCurrentCompleteAppt] = useState(null);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const authHeaders = { headers: { Authorization: token ? `Bearer ${token}` : "" } };

  useEffect(() => {
    if (!token) return setInitialLoading(false);

    const fetchAll = async () => {
      try {
        setInitialLoading(true);
        const [apptsRes, petsRes, servicesRes, staffRes] = await Promise.all([
          api.get("/appointments", authHeaders),
          api.get("/pets", authHeaders),
          api.get("/services", authHeaders),
          api.get("/employee", authHeaders),
        ]);

        const petsData = petsRes.data || [];
        const servicesData = servicesRes.data || [];
        const staffData = staffRes.data || [];

        setPets(petsData);
        setServices(servicesData);
        setStaff(staffData);

        const appointmentsMapped = (apptsRes.data || []).map((appt) => ({
          ...appt,
          pet: petsData.find((p) => p.petId === appt.petId) || null,
          service: servicesData.find((s) => s.serviceId === appt.serviceId) || null,
          staff: staffData.find((s) => s.employeeId === appt.staffId) || null,
        }));

        setAppointments(appointmentsMapped);
      } catch (err) {
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchAll();
  }, [token]);

  const selectedPet = pets.find((p) => String(p.petId) === String(selectedPetId));
  const petHasOwner = Boolean(selectedPet?.ownerId);

  // Calculate totals for selected services
  const selectedServices = services.filter(s => selectedServiceIds.includes(s.serviceId));
  const totalPrice = selectedServices.reduce((sum, s) => sum + (s.price || 0), 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + (s.duration || 0), 0);

  const handleServiceToggle = (serviceId) => {
    setSelectedServiceIds(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  function normalizeDatetimeForBackend(value) {
    if (!value) return null;
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return `${value}:00`;
    return value;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPetId || selectedServiceIds.length === 0 || !selectedStaffId || !appointmentDatetime)
      return alert("Please fill all required fields and select at least one service.");
    if (!petHasOwner) return alert("Selected pet has no owner.");

    const payload = {
      petId: Number(selectedPetId),
      serviceIds: selectedServiceIds.map(id => Number(id)),
      staffId: Number(selectedStaffId),
      appointmentDatetime: normalizeDatetimeForBackend(appointmentDatetime),
      remarks: remarks || "-",
      status,
      totalPrice,
      totalDuration,
    };

    try {
      setLoading(true);
      if (editingAppt) {
        await api.put(`/appointments/${editingAppt.appointmentId}`, payload, authHeaders);
        alert("Appointment updated successfully!");
      } else {
        await api.post("/appointments", payload, authHeaders);
        alert("Appointment added successfully!");
      }

      const refreshed = await api.get("/appointments", authHeaders);
      const appointmentsMapped = (refreshed.data || []).map((appt) => ({
        ...appt,
        pet: pets.find((p) => p.petId === appt.petId) || null,
        service: services.find((s) => s.serviceId === appt.serviceId) || null,
        staff: staff.find((s) => s.employeeId === appt.staffId) || null,
      }));
      setAppointments(appointmentsMapped);

      setShowForm(false);
      setEditingAppt(null);
      setSelectedPetId("");
      setSelectedServiceIds([]);
      setSelectedStaffId("");
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

  const handleDelete = async (appt) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await api.delete(`/appointments/${appt.appointmentId}`, authHeaders);
      setAppointments((prev) => prev.filter((a) => a.appointmentId !== appt.appointmentId));
      alert("Appointment deleted.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete appointment");
    }
  };

  const handleCompleteClick = (appt) => {
    setCurrentCompleteAppt(appt);
    setTreatmentData({
      serviceGiven: "",
      medicine: "",
      totalBill: "",
      nextAppointmentNote: "",
    });
    setShowCompleteForm(true);
  };

  const handleCompleteSubmit = async (e) => {
    e.preventDefault();
    if (!currentCompleteAppt) return;

    try {
      setLoading(true);

      await api.put(
        `/appointments/${currentCompleteAppt.appointmentId}`,
        { ...currentCompleteAppt, status: "Completed" },
        authHeaders
      );

      const treatmentPayload = {
        appointmentId: currentCompleteAppt.appointmentId,
        serviceGiven: treatmentData.serviceGiven,
        medicine: treatmentData.medicine,
        totalBill: Number(treatmentData.totalBill || 0),
        nextAppointmentNote: treatmentData.nextAppointmentNote || "",
      };
      await api.post("/treatment-records", treatmentPayload, authHeaders);

      const refreshed = await api.get("/appointments", authHeaders);
      const appointmentsMapped = (refreshed.data || []).map((appt) => ({
        ...appt,
        pet: pets.find((p) => p.petId === appt.petId) || null,
        service: services.find((s) => s.serviceId === appt.serviceId) || null,
        staff: staff.find((s) => s.employeeId === appt.staffId) || null,
      }));
      setAppointments(appointmentsMapped);

      setShowCompleteForm(false);
      setCurrentCompleteAppt(null);
      alert("Appointment completed and treatment record saved!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to complete appointment");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pink-200 border-t-pink-500 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-t-4 border-pink-400">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Appointments</h1>
              <p className="text-gray-600">Schedule and manage pet appointments</p>
            </div>
            <button
              onClick={() => {
                setShowForm((s) => !s);
                setEditingAppt(null);
                setSelectedServiceIds([]);
              }}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
            >
              {showForm ? "✕ Close Form" : "+ Schedule Appointment"}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-pink-400">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingAppt ? "Edit Appointment" : "New Appointment"}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pet <span className="text-pink-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                    value={selectedPetId}
                    onChange={(e) => setSelectedPetId(e.target.value)}
                    required
                  >
                    <option value="">-- Select Pet --</option>
                    {pets.map((p) => (
                      <option key={p.petId} value={p.petId}>
                        {p.name} ({p.species}) — {p.ownerName || "No owner"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Staff Member <span className="text-pink-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                    value={selectedStaffId}
                    onChange={(e) => setSelectedStaffId(e.target.value)}
                    required
                  >
                    <option value="">-- Select Staff --</option>
                    {staff.map((st) => (
                      <option key={st.employeeId} value={st.employeeId}>
                        {st.firstName} {st.lastName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Services <span className="text-pink-500">*</span>
                  <span className="text-gray-500 font-normal text-xs ml-2">
                    (Select at least one)
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border-2 border-gray-200 rounded-xl bg-gray-50">
                  {services.map((service) => (
                    <label
                      key={service.serviceId}
                      className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-pink-300 hover:bg-pink-50 cursor-pointer transition-all duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={selectedServiceIds.includes(service.serviceId)}
                        onChange={() => handleServiceToggle(service.serviceId)}
                        className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-400 focus:ring-2 cursor-pointer mt-0.5"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-700 block">
                          {service.serviceName}
                        </span>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500">
                            {service.duration} mins
                          </span>
                          <span className="text-xs font-semibold text-pink-600">
                            ₱{service.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                
                {selectedServiceIds.length > 0 && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border-2 border-pink-200">
                    <h3 className="text-sm font-bold text-gray-800 mb-3">Service Summary</h3>
                    <div className="space-y-2">
                      {selectedServices.map(service => (
                        <div key={service.serviceId} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700">{service.serviceName}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-gray-500">{service.duration} mins</span>
                            <span className="font-semibold text-gray-800">₱{service.price.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                      <div className="pt-3 mt-3 border-t-2 border-pink-200">
                        <div className="flex justify-between items-center font-bold text-gray-800">
                          <span>Total Duration:</span>
                          <span className="text-pink-600">{totalDuration} minutes</span>
                        </div>
                        <div className="flex justify-between items-center font-bold text-gray-800 mt-2">
                          <span>Total Price:</span>
                          <span className="text-pink-600 text-lg">₱{totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date & Time <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                    value={appointmentDatetime}
                    onChange={(e) => setAppointmentDatetime(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Remarks</label>
                <textarea
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                  rows="3"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Add any special notes or instructions..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingAppt(null);
                    setSelectedServiceIds([]);
                  }}
                  className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : editingAppt ? "Update Appointment" : "Schedule Appointment"}
                </button>
              </div>
            </div>
          </div>
        )}

        {showCompleteForm && currentCompleteAppt && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-5 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Complete Appointment</h2>
                  <button
                    onClick={() => setShowCompleteForm(false)}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Service Given <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                      value={treatmentData.serviceGiven}
                      onChange={(e) => setTreatmentData({ ...treatmentData, serviceGiven: e.target.value })}
                      placeholder="e.g., Vaccination, Surgery"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Prescribed Medicine</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                      value={treatmentData.medicine}
                      onChange={(e) => setTreatmentData({ ...treatmentData, medicine: e.target.value })}
                      placeholder="Medicine name and dosage"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Total Bill <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                      value={treatmentData.totalBill}
                      onChange={(e) => setTreatmentData({ ...treatmentData, totalBill: e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Next Appointment Note</label>
                    <textarea
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                      rows="3"
                      value={treatmentData.nextAppointmentNote}
                      onChange={(e) => setTreatmentData({ ...treatmentData, nextAppointmentNote: e.target.value })}
                      placeholder="Follow-up instructions or next appointment notes..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowCompleteForm(false)}
                    className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCompleteSubmit}
                    disabled={loading}
                    className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Processing..." : "Complete Appointment"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-pink-100 to-rose-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Pet</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Staff</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-500 font-medium">No appointments scheduled</p>
                        <p className="text-gray-400 text-sm mt-1">Click the button above to schedule a new appointment</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  appointments.map((appt, idx) => {
                    let displayDatetime = appt.appointmentDatetime;
                    try {
                      const parsed = new Date(appt.appointmentDatetime);
                      if (!isNaN(parsed)) displayDatetime = parsed.toLocaleString();
                    } catch {}

                    const statusColors = {
                      Scheduled: "bg-blue-100 text-blue-800",
                      Completed: "bg-green-100 text-green-800",
                      Cancelled: "bg-red-100 text-red-800",
                    };

                    return (
                      <tr key={appt.appointmentId || appt.id} className={`hover:bg-pink-50 transition-colors duration-150 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold">
                              {appt.pet?.name ? appt.pet.name[0].toUpperCase() : '?'}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-900">{appt.pet?.name ?? "—"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">{appt.service?.serviceName ?? "—"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            {appt.staff ? `${appt.staff.firstName} ${appt.staff.lastName}` : "—"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">{displayDatetime}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[appt.status] || "bg-gray-100 text-gray-800"}`}>
                            {appt.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingAppt(appt);
                                setShowForm(true);
                                setSelectedPetId(appt.petId);
                                setSelectedServiceIds([appt.serviceId]);
                                setSelectedStaffId(appt.staffId);
                                setAppointmentDatetime(appt.appointmentDatetime.slice(0, 16));
                                setRemarks(appt.remarks);
                                setStatus(appt.status);
                              }}
                              className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors duration-150 font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(appt)}
                              className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-150 font-medium"
                            >
                              Delete
                            </button>
                            {appt.status === "Scheduled" && (
                              <button
                                onClick={() => handleCompleteClick(appt)}
                                className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-150 font-medium"
                              >
                                Complete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}



