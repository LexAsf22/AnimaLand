import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
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

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", { username, password });
      const { token, username: returnedUsername, role } = response.data;
      login(token, returnedUsername, role);
      setShowSuccess(true);
      setTimeout(() => navigate(role === "ADMIN" ? "/dashboard" : "/"), 1500);
    } catch (err) {
      setError("Invalid username or password");
      setIsLoading(false);
    }
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await api.post("/auth/register", { 
        firstName, 
        lastName, 
        username, 
        password, 
        role, 
        contactNumber 
      });
      setShowSuccess(true);
      setIsLoading(false);

      setUsername(""); 
      setPassword(""); 
      setFirstName(""); 
      setLastName(""); 
      setContactNumber("");
      setRole("STAFF");

      setTimeout(() => {
        setShowSuccess(false);
        setIsRegister(false);
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to register employee");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-6xl flex bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 transform transition-all duration-500 hover:shadow-3xl">
        {/* Left Side - Branding & Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 p-12 flex-col justify-between relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          
          {/* Logo & Title */}
          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-3 leading-tight">
              VetPets<br/>AnimaLand
            </h1>
            <p className="text-white/90 text-lg font-medium mb-8">
              Comprehensive Pet Care Management System
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Appointment Scheduling</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Pet Medical Records</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Owner Management</span>
              </div>
            </div>
          </div>

          {/* Pet Image */}
          <div className="relative z-10 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 transform hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80" 
                alt="Happy pets" 
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
                onError={(e) => {
                  e.target.src = 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
              <div className="mt-4 text-center">
                <p className="text-white/80 text-sm font-medium">Caring for your beloved companions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center relative bg-white">
          {/* Success Overlay with Animation */}
          {showSuccess && (
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center z-50 rounded-r-3xl animate-fadeIn overflow-hidden">
              {/* Animated Particles */}
              <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-3 h-3 bg-pink-400 rounded-full animate-float"></div>
                <div className="absolute top-20 right-20 w-2 h-2 bg-rose-400 rounded-full animate-float animation-delay-1000"></div>
                <div className="absolute bottom-20 left-20 w-4 h-4 bg-purple-400 rounded-full animate-float animation-delay-2000"></div>
                <div className="absolute top-1/2 right-10 w-3 h-3 bg-pink-300 rounded-full animate-float animation-delay-1500"></div>
                <div className="absolute bottom-10 right-1/3 w-2 h-2 bg-rose-300 rounded-full animate-float animation-delay-500"></div>
              </div>
              
              <div className="text-center relative z-10">
                {/* Animated Checkmark */}
                <div className="relative mx-auto mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl animate-scaleIn">
                    <svg className="w-16 h-16 text-white animate-checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  {/* Ripple Effect */}
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ripple opacity-0"></div>
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ripple animation-delay-300 opacity-0"></div>
                </div>
                
                {/* Success Text */}
                <div className="animate-slideUp">
                  <p className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent mb-3">
                    {isRegister ? "Registration Successful!" : "Welcome Back!"}
                  </p>
                  <p className="text-gray-600 text-lg mb-4">
                    {isRegister ? "Account created successfully" : "Login successful"}
                  </p>
                  
                  {/* Loading Bar */}
                  <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-loadingBar"></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">Redirecting to dashboard...</p>
                </div>
              </div>
            </div>
          )}

          {/* Form Header */}
          <div className="mb-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-rose-100 px-4 py-2 rounded-full mb-4">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-pink-600">
                {isRegister ? "Employee Registration" : "Admin Portal"}
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-3 leading-tight">
              {isRegister ? "Create New Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-600">
              {isRegister ? "Register a new employee or admin account" : "Sign in to manage your veterinary clinic"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-5">
            {isRegister && (
              <div className="grid grid-cols-2 gap-4 animate-slideIn">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    placeholder="John" 
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Doe" 
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    required 
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Enter username" 
                  className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input 
                  type="password" 
                  placeholder="Enter password" 
                  className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>

            {isRegister && (
              <div className="space-y-5 animate-slideIn">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input 
                      type="text" 
                      placeholder="+1 (555) 000-0000" 
                      className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                      value={contactNumber} 
                      onChange={(e) => setContactNumber(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                  <select 
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="STAFF">Staff</option>
                    <option value="VETERINARIAN">Veterinarian</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-3 animate-shake">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isRegister ? "Registering..." : "Signing in..."}</span>
                </div>
              ) : (
                isRegister ? "Register Employee" : "Sign In"
              )}
            </button>
          </form>

          {/* Toggle Link */}
          <div className="mt-6 text-center">
            <button 
              className="text-sm text-pink-600 hover:text-pink-700 font-semibold hover:underline transition-colors duration-200" 
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
              }}
            >
              {isRegister ? "← Back to Login" : "Register New Employee/Admin →"}
            </button>
          </div>
        </div>
      </div>


    </div>
  );
}