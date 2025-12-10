import { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
  const [clinicName, setClinicName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  // Fetch clinic info from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/settings");
        const data = res.data;
        setClinicName(data.clinicName);
        setAddress(data.address);
        setPhone(data.phone);
        setEmail(data.email);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching settings:", err);
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // Save updated settings
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8080/api/settings", {
        clinicName,
        address,
        phone,
        email,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Error saving settings:", err);
    }
  };

  if (loading) return <p className="p-8 text-gray-700">Loading clinic settings...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-gray-800">Settings</h1>
              <p className="text-gray-600 mt-1">Manage your clinic information and preferences</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 text-green-800 px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg animate-bounce">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Settings saved successfully! 🎉</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-6">
          {/* Main Settings Form */}
          <div className="md:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Clinic Information</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Name</label>
                <input
                  type="text"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition bg-white/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition bg-white/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition bg-white/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition bg-white/50"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white py-3 px-6 rounded-lg hover:from-pink-500 hover:to-rose-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Save Settings
              </button>
            </div>
          </div>

          {/* Sidebar Info Cards */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-100">
              <h3 className="text-lg font-serif font-bold text-gray-800 mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>Your clinic information is visible to all staff members.</p>
                <p>Changes are saved securely and take effect immediately.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl p-6 shadow-xl text-white">
              <h3 className="text-lg font-serif font-bold mb-3">Need Help?</h3>
              <p className="text-sm text-white/90 mb-4">Contact our support team for assistance with your clinic settings</p>
              <button className="w-full bg-white text-pink-600 py-2 px-4 rounded-lg hover:bg-pink-50 transition-colors font-medium text-sm">
                Contact Support
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
