import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("STAFF");
  const [contactNumber, setContactNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", { username, password });
      const { token, role: returnedRole } = response.data;
      login(token, username, returnedRole);
      setShowSuccess(true);
      setTimeout(() => navigate(returnedRole === "ADMIN" ? "/dashboard" : "/home"), 1500);
    } catch {
      setError("Invalid username or password");
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await api.post("/auth/register", { firstName, lastName, username, password, role, contactNumber });
      setShowSuccess(true);
      setIsLoading(false);
      setUsername(""); setPassword(""); setFirstName(""); setLastName(""); setContactNumber(""); setRole("STAFF");
      setTimeout(() => { setShowSuccess(false); setIsRegister(false); }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register employee");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 p-4 sm:p-6 lg:p-8">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-6xl flex bg-white rounded-2xl shadow-xl overflow-hidden relative z-10 border border-pink-100">
        {/* Left Side Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 p-16 flex-col justify-center relative overflow-hidden">
          {/* Decorative Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="mb-8">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-12 h-12 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
                VetPets<br/>AnimaLand
              </h1>
              <div className="w-16 h-1 bg-white rounded-full mb-6"></div>
              <p className="text-white/95 text-lg leading-relaxed max-w-md">
                Professional pet care management system designed for veterinary excellence and compassionate animal care.
              </p>
            </div>
            
            <div className="space-y-4 mt-12">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                <p className="text-white/90 text-sm">Streamlined appointment scheduling</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                <p className="text-white/90 text-sm">Comprehensive medical records</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2"></div>
                <p className="text-white/90 text-sm">Team collaboration tools</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative bg-white">
          {showSuccess && (
            <div className="absolute inset-0 bg-white flex items-center justify-center z-50 rounded-r-2xl">
              <div className="text-center animate-fadeIn">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {isRegister ? "Registration Successful!" : "Welcome Back!"}
                </h3>
                <p className="text-gray-600 text-lg">
                  {isRegister ? "Account created successfully" : "Login successful"}
                </p>
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-600 text-base">
              {isRegister ? "Register a new team member" : "Sign in to your account"}
            </p>
          </div>

          <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-5">
            {isRegister && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    placeholder="John" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Doe" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white" 
                    required 
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input 
                type="text" 
                placeholder="Enter your username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white" 
                required 
              />
            </div>
            
            {isRegister && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                  <input 
                    type="text" 
                    placeholder="+1 (555) 000-0000" 
                    value={contactNumber} 
                    onChange={(e) => setContactNumber(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
                  >
                    <option value="STAFF">Staff</option>
                    <option value="VETERINARIAN">Veterinarian</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3.5 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? "Processing..." : isRegister ? "Create Account" : "Sign In"}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              className="text-pink-600 hover:text-pink-700 font-medium text-sm transition-colors"
              onClick={() => { setIsRegister(!isRegister); setError(""); }}
            >
              {isRegister ? "← Back to Login" : "Register New Employee/Admin →"}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 15s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}